import express from 'express';
import { body, param, validationResult } from 'express-validator';
import ipfsService from '../services/ipfsService.js';
import contractService from '../services/contractService.js';

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Submit artist data
router.post('/submit',
  [
    body('name').notEmpty().trim(),
    body('walletAddress').notEmpty().matches(/^0x[a-fA-F0-9]{40}$/),
    body('bio').notEmpty().trim(),
    body('portfolio').isURL(),
    body('email').isEmail(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      // Upload to IPFS
      const { cid } = await ipfsService.uploadArtistData(req.body);
      
      // Submit to smart contract
      const result = await contractService.submitArtistProfile(cid);
      
      res.json({
        success: true,
        message: 'Artist profile submitted successfully',
        data: {
          ipfsCid: cid,
          txHash: result.txHash
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to submit artist profile',
        error: error.message
      });
    }
  }
);

// Approve artist (admin only)
router.post('/approve',
  [
    body('artistAddress').notEmpty().matches(/^0x[a-fA-F0-9]{40}$/),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const result = await contractService.verifyArtist(req.body.artistAddress);
      
      res.json({
        success: true,
        message: 'Artist verified successfully',
        data: {
          txHash: result.txHash
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to verify artist',
        error: error.message
      });
    }
  }
);

// Get artist status
router.get('/status/:address',
  [
    param('address').matches(/^0x[a-fA-F0-9]{40}$/),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const status = await contractService.getArtistStatus(req.params.address);
      
      if (status.ipfsHash) {
        const { data: artistData } = await ipfsService.getArtistData(status.ipfsHash);
        status.artistData = artistData;
      }
      
      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get artist status',
        error: error.message
      });
    }
  }
);

export default router;