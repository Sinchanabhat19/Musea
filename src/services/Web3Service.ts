import { ethers } from 'ethers';
import IPFSService from './IPFSService';

// ABI for the Artist Verification Contract
const ARTIST_VERIFICATION_ABI = [
  "function submitArtistProfile(string memory ipfsHash) external",
  "function getVerificationStatus(address artist) external view returns (uint8, uint256)",
  "function getVerifiedArtists() external view returns (address[])",
  "function verifyArtist(address artist) external",
  "function rejectArtist(address artist) external",
  "function getArtistIPFSHash(address artist) external view returns (string)",
  "event ArtistProfileSubmitted(address indexed artist, string ipfsHash)",
  "event ArtistVerified(address indexed artist)",
  "event ArtistRejected(address indexed artist)"
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;
  
  // Get contract address from environment variable
  private readonly ARTIST_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  
  // Initialize provider, signer, and contract
  async initialize() {
    if (window.ethereum) {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        
        // Initialize the contract
        this.contract = new ethers.Contract(
          this.ARTIST_CONTRACT_ADDRESS,
          ARTIST_VERIFICATION_ABI,
          this.signer
        );
        
        return true;
      } catch (error) {
        console.error('Error initializing Web3Service:', error);
        return false;
      }
    } else {
      console.error('Ethereum provider not found');
      return false;
    }
  }
  
  // Submit artist profile
  async submitArtistProfile(profileData: any) {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }
    
    try {
      const address = await this.signer.getAddress();
      
      // Submit to backend API
      const response = await fetch(`${API_URL}/artist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profileData,
          walletAddress: address,
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to submit artist profile');
      }
      
      return result.data;
    } catch (error: any) {
      console.error('Error submitting artist profile:', error);
      throw new Error(error.message || 'Failed to submit artist profile');
    }
  }
  
  // Get verification status
  async getVerificationStatus(address: string) {
    try {
      const response = await fetch(`${API_URL}/artist/status/${address}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to get verification status');
      }
      
      return result.data;
    } catch (error: any) {
      console.error('Error getting verification status:', error);
      throw new Error(error.message || 'Failed to get verification status');
    }
  }
  
  // Get verified artists
  async getVerifiedArtists() {
    if (!this.contract || !this.provider) {
      throw new Error('Contract or provider not initialized');
    }
    
    try {
      const verifiedArtists = await this.contract.getVerifiedArtists();
      const artistsData = await Promise.all(
        verifiedArtists.map(async (address: string) => {
          const status = await this.getVerificationStatus(address);
          return { address, ...status.artistData };
        })
      );
      return artistsData;
    } catch (error: any) {
      console.error('Error getting verified artists:', error);
      throw new Error(error.message || 'Failed to get verified artists');
    }
  }
  
  // Verify artist (admin function)
  async verifyArtist(artistAddress: string) {
    try {
      const response = await fetch(`${API_URL}/artist/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistAddress,
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to verify artist');
      }
      
      return result.data;
    } catch (error: any) {
      console.error('Error verifying artist:', error);
      throw new Error(error.message || 'Failed to verify artist');
    }
  }

  // Listen for contract events
  async subscribeToEvents(callbacks: {
    onSubmission?: (artist: string, ipfsHash: string) => void;
    onVerification?: (artist: string) => void;
    onRejection?: (artist: string) => void;
  }) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    // Listen for profile submissions
    this.contract.on('ArtistProfileSubmitted', (artist, ipfsHash) => {
      callbacks.onSubmission?.(artist, ipfsHash);
    });

    // Listen for verifications
    this.contract.on('ArtistVerified', (artist) => {
      callbacks.onVerification?.(artist);
    });

    // Listen for rejections
    this.contract.on('ArtistRejected', (artist) => {
      callbacks.onRejection?.(artist);
    });
  }

  // Cleanup event listeners
  async unsubscribeFromEvents() {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }
}

export default new Web3Service();