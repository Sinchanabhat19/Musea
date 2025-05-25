import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWeb3 } from '../contexts/Web3Context';
import AdminVerificationCard from '../components/AdminVerificationCard';
import ConnectWalletCard from '../components/ConnectWalletCard';

// Mock data for pending artist submissions
const mockPendingSubmissions = [
  {
    id: '1',
    address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    name: 'Sarah Johnson',
    bio: 'Contemporary artist working with mixed media and installations focusing on environmental themes.',
    email: 'sarah@example.com',
    artStyle: 'Mixed Media',
    submittedAt: '2025-03-15',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    id: '2',
    address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    name: 'Michael Chen',
    bio: 'Digital artist creating abstract compositions inspired by natural landscapes and cosmic phenomena.',
    email: 'michael@example.com',
    artStyle: 'Digital Art',
    submittedAt: '2025-03-16',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
  {
    id: '3',
    address: '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    name: 'Isabella Rodriguez',
    bio: 'Photographer specializing in street photography that captures urban life and cultural diversity.',
    email: 'isabella@example.com',
    artStyle: 'Photography',
    submittedAt: '2025-03-17',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
];

const AdminDashboard = () => {
  const { isConnected } = useWeb3();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSubmissions, setPendingSubmissions] = useState(mockPendingSubmissions);
  const [stats, setStats] = useState({
    pending: 3,
    verified: 15,
    rejected: 2,
  });

  // Filter submissions based on search term
  const filteredSubmissions = pendingSubmissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.artStyle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle verify artist
  const handleVerifyArtist = (id: string) => {
    // In a real application, this would call a smart contract function
    console.log(`Verifying artist with ID: ${id}`);
    
    // Update local state
    setPendingSubmissions(pendingSubmissions.filter(sub => sub.id !== id));
    setStats({
      ...stats,
      pending: stats.pending - 1,
      verified: stats.verified + 1,
    });
  };

  // Handle reject artist
  const handleRejectArtist = (id: string, feedback: string) => {
    // In a real application, this would call a smart contract function
    console.log(`Rejecting artist with ID: ${id}, Feedback: ${feedback}`);
    
    // Update local state
    setPendingSubmissions(pendingSubmissions.filter(sub => sub.id !== id));
    setStats({
      ...stats,
      pending: stats.pending - 1,
      rejected: stats.rejected + 1,
    });
  };

  // If not connected or not admin, show connect wallet card
  if (!isConnected || !isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-serif font-bold text-center mb-8">Admin Dashboard</h1>
            {!isConnected ? (
              <ConnectWalletCard />
            ) : (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
                <h2 className="text-xl font-medium mb-2">Access Denied</h2>
                <p className="text-gray-300">
                  You do not have admin privileges to access this dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">
            Verify artist submissions and manage the platform
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-amber-400 mb-1">Pending</h3>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
          
          <div className="bg-green-900/20 border border-green-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-green-400 mb-1">Verified</h3>
            <p className="text-3xl font-bold">{stats.verified}</p>
          </div>
          
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-400 mb-1">Rejected</h3>
            <p className="text-3xl font-bold">{stats.rejected}</p>
          </div>
        </motion.div>
        
        {/* Pending Submissions */}
        <motion.div 
          className="bg-gray-800 rounded-lg overflow-hidden mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Pending Verifications
              </h2>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {filteredSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSubmissions.map((submission) => (
                  <AdminVerificationCard
                    key={submission.id}
                    submission={submission}
                    onVerify={handleVerifyArtist}
                    onReject={handleRejectArtist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">
                  {searchTerm
                    ? 'No submissions matching your search criteria'
                    : 'No pending submissions to verify'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;