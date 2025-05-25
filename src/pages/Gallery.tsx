import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ArtistCard from '../components/ArtistCard';

// Mock data for verified artists
const mockVerifiedArtists = [
  {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    name: 'Elena Rodriguez',
    bio: 'Contemporary digital artist specializing in abstract expressionism, blending traditional techniques with modern technology.',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    featuredArt: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png',
    artStyle: 'Digital Abstract',
  },
  {
    address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    name: 'Marcus Chen',
    bio: 'Photographer exploring urban landscapes and architectural beauty through a unique lens of light and shadow.',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    featuredArt: 'https://images.pexels.com/photos/2553568/pexels-photo-2553568.jpeg',
    artStyle: 'Urban Photography',
  },
  {
    address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    name: 'Sophia Williams',
    bio: 'Painter focused on emotional landscapes and figurative works that explore the human condition.',
    profileImage: 'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg',
    featuredArt: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png',
    artStyle: 'Oil Painting',
  },
  {
    address: '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    name: 'David Kim',
    bio: 'Multimedia artist creating immersive installations that blend sound, visual elements, and interactive components.',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    featuredArt: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png',
    artStyle: 'Multimedia',
  },
  {
    address: '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    name: 'Aisha Johnson',
    bio: 'Sculptor working with sustainable materials to create thought-provoking pieces about environmental consciousness.',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    featuredArt: 'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg',
    artStyle: 'Sculpture',
  },
  {
    address: '0x976ea74026e726554db657fa54763abd0c3a0aa9',
    name: 'James Wilson',
    bio: 'Digital artist specializing in generative art using algorithms and code to create unique visual experiences.',
    profileImage: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    featuredArt: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    artStyle: 'Generative Art',
  },
];

// Art style options for filtering
const artStyleOptions = [
  'All Styles',
  'Digital Abstract',
  'Urban Photography',
  'Oil Painting',
  'Multimedia',
  'Sculpture',
  'Generative Art',
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [filteredArtists, setFilteredArtists] = useState(mockVerifiedArtists);

  // Apply filters when search term or selected style changes
  useEffect(() => {
    let filtered = mockVerifiedArtists;
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        artist =>
          artist.name.toLowerCase().includes(lowerCaseSearch) ||
          artist.bio.toLowerCase().includes(lowerCaseSearch) ||
          artist.artStyle.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply style filter
    if (selectedStyle !== 'All Styles') {
      filtered = filtered.filter(artist => artist.artStyle === selectedStyle);
    }
    
    setFilteredArtists(filtered);
  }, [searchTerm, selectedStyle]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Digital Museum Gallery
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore artwork from verified artists, each authenticated on the blockchain.
          </motion.p>
        </div>
        
        {/* Search and Filters */}
        <motion.div 
          className="bg-gray-800 rounded-lg p-4 mb-10 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search artists or styles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          
          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="input pl-10 w-full appearance-none"
            >
              {artStyleOptions.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </motion.div>
        
        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist, index) => (
              <ArtistCard key={artist.address} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No artists found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;