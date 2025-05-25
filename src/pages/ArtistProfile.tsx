import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, Instagram, Twitter, Globe } from 'lucide-react';

// Mock artist data
const mockArtistData = {
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266': {
    name: 'Elena Rodriguez',
    bio: 'Contemporary digital artist specializing in abstract expressionism, blending traditional techniques with modern technology to create unique visual experiences that challenge perception and evoke emotional responses.',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    artStyle: 'Digital Abstract',
    website: 'https://elenadigital.art',
    socialMedia: {
      twitter: '@elenadigital',
      instagram: '@elena.rodriguez',
    },
    artwork: [
      {
        id: '1',
        title: 'Cosmic Reflections',
        image: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png',
        description: 'An exploration of space and consciousness through digital abstraction.',
        year: '2025',
      },
      {
        id: '2',
        title: 'Urban Fragments',
        image: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg',
        description: 'Deconstructed cityscape elements reimagined in abstract form.',
        year: '2024',
      },
      {
        id: '3',
        title: 'Digital Dreams',
        image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
        description: 'A surreal journey through subconscious digital landscapes.',
        year: '2024',
      },
      {
        id: '4',
        title: 'Algorithmic Emotions',
        image: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg',
        description: 'Exploring the intersection of human emotion and computational art.',
        year: '2023',
      },
    ],
  },
};

const ArtistProfile = () => {
  const { address } = useParams<{ address: string }>();
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  useEffect(() => {
    if (address) {
      // In a real app, this would be a blockchain call
      setTimeout(() => {
        const artistData = mockArtistData[address as keyof typeof mockArtistData];
        setArtist(artistData);
        setLoading(false);
        
        if (artistData && artistData.artwork.length > 0) {
          setSelectedArtwork(artistData.artwork[0]);
        }
      }, 500);
    }
  }, [address]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Artist Not Found</h1>
            <p className="text-gray-400 mb-6">
              The artist profile you're looking for doesn't exist or hasn't been verified yet.
            </p>
            <Link to="/gallery" className="btn-primary">
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artist Header */}
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-32 relative">
            <img 
              src={artist.profileImage} 
              alt={artist.name} 
              className="w-full h-full object-cover rounded-full border-2 border-amber-500"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1">
              <BadgeCheck className="h-5 w-5 text-gray-900" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold mb-2">{artist.name}</h1>
            <p className="text-amber-500 font-medium mb-4">{artist.artStyle}</p>
            
            <p className="text-gray-300 mb-6 max-w-2xl">
              {artist.bio}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {artist.website && (
                <a
                  href={artist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Website</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
              
              {artist.socialMedia?.twitter && (
                <a
                  href={`https://twitter.com/${artist.socialMedia.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <Twitter className="h-5 w-5 mr-2" />
                  <span>{artist.socialMedia.twitter}</span>
                </a>
              )}
              
              {artist.socialMedia?.instagram && (
                <a
                  href={`https://instagram.com/${artist.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  <span>{artist.socialMedia.instagram}</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Artist Gallery */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold mb-6">Featured Artwork</h2>
          
          {/* Selected Artwork Display */}
          {selectedArtwork && (
            <motion.div 
              className="bg-gray-800 rounded-lg overflow-hidden mb-8"
              key={selectedArtwork.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2">{selectedArtwork.title}</h3>
                <p className="text-gray-400 mb-2">{selectedArtwork.year}</p>
                <p className="text-gray-300">{selectedArtwork.description}</p>
              </div>
            </motion.div>
          )}
          
          {/* Artwork Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {artist.artwork.map((artwork: any) => (
              <motion.div
                key={artwork.id}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  selectedArtwork?.id === artwork.id 
                    ? 'border-amber-500' 
                    : 'border-transparent hover:border-gray-600'
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Blockchain Verification */}
        <motion.div 
          className="bg-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <BadgeCheck className="h-5 w-5 mr-2 text-amber-500" />
            Blockchain Verification
          </h3>
          <div className="bg-gray-700 rounded-md p-3 mb-4">
            <p className="text-sm font-mono break-all text-gray-300">
              Artist Address: {address}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            This artist has been verified on the blockchain and all displayed artwork is authenticated.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistProfile;