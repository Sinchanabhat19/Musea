import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-serif font-bold">ArtChain</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A decentralized platform for verified artists to showcase their authentic artwork in a digital museum.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-gray-200 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/artist-dashboard" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Artist Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-gray-200 font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Smart Contract
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-gray-200 font-medium mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest features and artists.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
              />
              <button
                type="submit"
                className="bg-amber-500 text-gray-900 font-medium px-4 py-2 rounded-r-md hover:bg-amber-600 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} ArtChain. All rights reserved. Built with blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;