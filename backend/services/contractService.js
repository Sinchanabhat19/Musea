import { ethers } from 'ethers';

// ABI for the Artist Verification Contract
const CONTRACT_ABI = [
  "function submitArtistProfile(string memory ipfsHash) external",
  "function verifyArtist(address artist) external",
  "function rejectArtist(address artist) external",
  "function getVerificationStatus(address artist) external view returns (uint8, uint256)",
  "function getArtistIPFSHash(address artist) external view returns (string)"
];

class ContractService {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      // Connect to network
      this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      
      // Create wallet instance
      this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      
      // Connect to contract
      this.contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        CONTRACT_ABI,
        this.wallet
      );
    } catch (error) {
      console.error('Contract initialization error:', error);
      throw new Error('Failed to initialize contract service');
    }
  }

  async submitArtistProfile(ipfsHash) {
    try {
      const tx = await this.contract.submitArtistProfile(ipfsHash);
      const receipt = await tx.wait();
      return { success: true, txHash: receipt.hash };
    } catch (error) {
      console.error('Contract submission error:', error);
      throw new Error('Failed to submit artist profile to contract');
    }
  }

  async verifyArtist(artistAddress) {
    try {
      const tx = await this.contract.verifyArtist(artistAddress);
      const receipt = await tx.wait();
      return { success: true, txHash: receipt.hash };
    } catch (error) {
      console.error('Artist verification error:', error);
      throw new Error('Failed to verify artist');
    }
  }

  async getArtistStatus(artistAddress) {
    try {
      const [status, timestamp] = await this.contract.getVerificationStatus(artistAddress);
      const ipfsHash = await this.contract.getArtistIPFSHash(artistAddress);
      
      const statusMap = {
        0: 'pending',
        1: 'verified',
        2: 'rejected'
      };

      return {
        success: true,
        status: statusMap[status] || 'unknown',
        timestamp: Number(timestamp) * 1000,
        ipfsHash
      };
    } catch (error) {
      console.error('Status retrieval error:', error);
      throw new Error('Failed to get artist status');
    }
  }
}

export default new ContractService();