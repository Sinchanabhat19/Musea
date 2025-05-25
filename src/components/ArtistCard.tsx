import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

type ArtistCardProps = {
  artist: {
    address: string;
    name: string;
    bio: string;
    profileImage: string;
    featuredArt: string;
    artStyle: string;
  };
};

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <motion.div 
      className="card group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={artist.featuredArt} 
          alt={`Artwork by ${artist.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={artist.profileImage} 
            alt={artist.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
          />
          <div>
            <div className="flex items-center">
              <h3 className="font-serif font-semibold text-lg">{artist.name}</h3>
              <BadgeCheck className="h-4 w-4 text-amber-500 ml-1" />
            </div>
            <p className="text-sm text-gray-400">{artist.artStyle}</p>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          {artist.bio}
        </p>
        
        <Link 
          to={`/artist/${artist.address}`}
          className="btn-outline text-sm w-full text-center"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
};

export default ArtistCard;