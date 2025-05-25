import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWeb3 } from './Web3Context';
import { toast } from 'react-toastify';

// For the MVP, we'll use a mock admin address for simplicity
const ADMIN_ADDRESS = '0x123456789abcdef123456789abcdef123456789a'; 

// Types
export type UserRole = 'admin' | 'artist' | 'public';

type ArtistStatus = 'pending' | 'verified' | 'rejected';

type UserData = {
  address: string;
  role: UserRole;
  status?: ArtistStatus;
  hasSubmittedProfile?: boolean;
};

type AuthContextType = {
  currentUser: UserData | null;
  isAdmin: boolean;
  isArtist: boolean;
  isVerifiedArtist: boolean;
  hasSubmittedProfile: boolean;
  verificationStatus: ArtistStatus | null;
  loginWithWallet: () => Promise<void>;
  logout: () => void;
  updateUserProfile: (profileData: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  
  // Check and set user role when account changes
  useEffect(() => {
    if (account) {
      determineUserRole(account);
    } else {
      setCurrentUser(null);
    }
  }, [account]);

  // Determine user role based on wallet address
  const determineUserRole = async (address: string) => {
    try {
      // In a real application, this would be a blockchain call to check roles
      // For this MVP, we'll use a mock implementation
      
      // Check if admin
      if (address.toLowerCase() === ADMIN_ADDRESS.toLowerCase()) {
        setCurrentUser({
          address,
          role: 'admin',
        });
        return;
      }
      
      // For the demo, we'll assume any connected wallet can be an artist
      // We'll fetch the artist status from the blockchain 
      // (mocked for now, would be a contract call in production)
      const artistData = await fetchArtistData(address);
      
      if (artistData) {
        setCurrentUser({
          address,
          role: 'artist',
          status: artistData.status,
          hasSubmittedProfile: artistData.hasSubmittedProfile,
        });
      } else {
        // New user, not yet registered as artist
        setCurrentUser({
          address,
          role: 'artist', // Default role for connected wallets
          status: 'pending',
          hasSubmittedProfile: false,
        });
      }
    } catch (error) {
      console.error('Error determining user role:', error);
      toast.error('Failed to load user data');
    }
  };

  // Mock function to fetch artist data
  // In a real application, this would be a call to the blockchain
  const fetchArtistData = async (address: string) => {
    // Mock implementation
    // In production, this would be a contract call
    
    // For demo purposes, return mock data
    const mockArtistDatabase: Record<string, any> = {
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266': {
        status: 'verified',
        hasSubmittedProfile: true,
      },
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8': {
        status: 'pending',
        hasSubmittedProfile: true,
      },
      '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc': {
        status: 'rejected',
        hasSubmittedProfile: true,
      },
    };
    
    return mockArtistDatabase[address.toLowerCase()] || null;
  };

  // Login with wallet
  const loginWithWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error logging in with wallet:', error);
      toast.error('Failed to login with wallet');
    }
  };

  // Logout
  const logout = () => {
    disconnectWallet();
    setCurrentUser(null);
  };

  // Update user profile
  const updateUserProfile = async (profileData: any) => {
    try {
      // In a real application, this would submit data to the blockchain
      // For this MVP, we'll just update the local state
      
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      
      // Update user data
      setCurrentUser({
        ...currentUser,
        hasSubmittedProfile: true,
        status: 'pending',
      });
      
      toast.success('Profile submitted successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin',
    isArtist: currentUser?.role === 'artist',
    isVerifiedArtist: currentUser?.role === 'artist' && currentUser?.status === 'verified',
    hasSubmittedProfile: currentUser?.hasSubmittedProfile || false,
    verificationStatus: currentUser?.status || null,
    loginWithWallet,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}