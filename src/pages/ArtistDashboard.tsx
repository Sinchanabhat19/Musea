import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';
import ArtistSubmissionForm from '../components/ArtistSubmissionForm';
import VerificationStatus from '../components/VerificationStatus';
import ConnectWalletCard from '../components/ConnectWalletCard';

const ArtistDashboard = () => {
  const { isConnected, account } = useWeb3();
  const { currentUser, hasSubmittedProfile, verificationStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // If not connected, show connect wallet card
  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-serif font-bold text-center mb-8">Artist Dashboard</h1>
            <ConnectWalletCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Dashboard Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-serif font-bold mb-2">Artist Dashboard</h1>
            <p className="text-gray-400">
              {hasSubmittedProfile
                ? 'Manage your artist profile and verification status'
                : 'Submit your profile for verification to showcase your artwork'}
            </p>
          </motion.div>
          
          {/* Dashboard Tabs */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-gray-700 text-amber-500'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <Paintbrush className="h-5 w-5 inline mr-2" />
                Artist Profile
              </button>
              <button
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === 'verification'
                    ? 'bg-gray-700 text-amber-500'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('verification')}
              >
                {hasSubmittedProfile ? (
                  verificationStatus === 'verified' ? (
                    <CheckCircle className="h-5 w-5 inline mr-2" />
                  ) : (
                    <Clock className="h-5 w-5 inline mr-2" />
                  )
                ) : (
                  <Clock className="h-5 w-5 inline mr-2" />
                )}
                Verification Status
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'profile' && (
                <>
                  {hasSubmittedProfile ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-serif font-bold mb-2">Profile Submitted</h2>
                      <p className="text-gray-400 mb-6">
                        Thank you for submitting your artist profile. You can check the status of your verification in the Verification Status tab.
                      </p>
                      <button
                        className="btn-outline"
                        onClick={() => setActiveTab('verification')}
                      >
                        Check Verification Status
                      </button>
                    </div>
                  ) : (
                    <ArtistSubmissionForm />
                  )}
                </>
              )}
              
              {activeTab === 'verification' && <VerificationStatus />}
            </div>
          </div>
          
          {/* Wallet Info */}
          <motion.div 
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-4">Connected Wallet</h3>
            <div className="bg-gray-700 rounded-md p-3 break-all text-gray-300 font-mono text-sm">
              {account}
            </div>
            <p className="mt-2 text-sm text-gray-400">
              This wallet address will be used to identify you on the blockchain.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;