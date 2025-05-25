import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ConnectWalletCard = () => {
  const { loginWithWallet } = useAuth();

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
          <Wallet className="h-10 w-10 text-amber-500" />
        </div>
        
        <h2 className="text-2xl font-serif font-bold mb-3">Connect Your Wallet</h2>
        
        <p className="text-gray-400 mb-6">
          To access the platform as an artist or administrator, please connect your Ethereum wallet.
        </p>
        
        <button 
          onClick={loginWithWallet}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Wallet className="h-5 w-5" />
          <span>Connect with MetaMask</span>
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          New to crypto? <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">Learn how to set up MetaMask</a>
        </p>
      </div>
    </motion.div>
  );
};

export default ConnectWalletCard;