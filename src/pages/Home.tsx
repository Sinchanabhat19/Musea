import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Paintbrush as PaintBrush, ShieldCheck, Users, Image } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import ConnectWalletCard from '../components/ConnectWalletCard';

const Home = () => {
  const { isConnected } = useWeb3();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <img 
            src="https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg" 
            alt="Art Gallery" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-amber-500">Verified</span> Artists. <br />
              <span className="text-amber-500">Authentic</span> Artwork.
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A decentralized platform where artists are verified on-chain, creating a trusted digital museum for authentic artwork.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isConnected ? (
                <>
                  <Link to="/artist-dashboard" className="btn-primary">
                    Artist Dashboard
                  </Link>
                  <Link to="/gallery" className="btn-outline">
                    Browse Gallery
                  </Link>
                </>
              ) : (
                <>
                  <button className="btn-primary">
                    Connect Wallet
                  </button>
                  <Link to="/gallery" className="btn-outline">
                    Browse Gallery
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to ensure authentic artwork and verified artists in a transparent ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-5">
                <PaintBrush className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Artist Submission</h3>
              <p className="text-gray-400">
                Artists submit their profile for verification using their wallet address as a unique identifier.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-5">
                <ShieldCheck className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Admin Verification</h3>
              <p className="text-gray-400">
                Our admin team verifies artist credentials, ensuring authenticity before approval.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">On-Chain Registry</h3>
              <p className="text-gray-400">
                Verified artists are registered on-chain, creating a permanent and transparent record.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-5">
                <Image className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Digital Museum</h3>
              <p className="text-gray-400">
                Verified artists can showcase their authentic artwork in our trusted digital gallery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Platform</h2>
              <p className="text-gray-400">
                Connect your wallet to get started as an artist or browse our gallery as a visitor.
              </p>
            </div>
            
            {!isConnected && <ConnectWalletCard />}
            
            {isConnected && (
              <div className="text-center">
                <p className="text-amber-500 font-medium mb-4">Wallet Connected!</p>
                <div className="flex justify-center space-x-4">
                  <Link to="/artist-dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link to="/gallery" className="btn-outline">
                    Browse Gallery
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;