import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isConnected, account } = useWeb3();
  const { isAdmin, isArtist, isVerifiedArtist, loginWithWallet, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
    ];

    if (isAdmin) {
      return [...baseLinks, { name: 'Admin Dashboard', path: '/admin-dashboard' }];
    }

    if (isArtist) {
      return [...baseLinks, { name: 'Artist Dashboard', path: '/artist-dashboard' }];
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-serif font-bold">ArtChain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber-500'
                    : 'text-gray-300 hover:text-amber-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Connect Wallet Button / User Menu */}
          <div className="flex items-center">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm text-amber-400">
                  {truncateAddress(account || '')}
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-gray-800"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="h-5 w-5 text-gray-300" />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithWallet}
                className="btn-primary"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 md:hidden p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-800"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-gray-700 text-amber-500'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-amber-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;