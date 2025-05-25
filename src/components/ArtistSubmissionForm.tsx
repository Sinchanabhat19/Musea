import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

type ArtistFormData = {
  name: string;
  bio: string;
  email: string;
  website: string;
  socialMedia: {
    twitter: string;
    instagram: string;
  };
  artStyle: string;
};

const ArtistSubmissionForm = () => {
  const { updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ArtistFormData>({
    name: '',
    bio: '',
    email: '',
    website: '',
    socialMedia: {
      twitter: '',
      instagram: '',
    },
    artStyle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof ArtistFormData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.bio || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // In a real app, we would upload to IPFS/Blockchain
      await updateUserProfile(formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        bio: '',
        email: '',
        website: '',
        socialMedia: {
          twitter: '',
          instagram: '',
        },
        artStyle: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-serif font-bold mb-6">Artist Verification Application</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Your artistic name"
          />
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
            Artist Bio *
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={4}
            className="input w-full"
            placeholder="Tell us about your artistic journey and style"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-gray-300 mb-1">
              Twitter
            </label>
            <input
              type="text"
              id="socialMedia.twitter"
              name="socialMedia.twitter"
              value={formData.socialMedia.twitter}
              onChange={handleChange}
              className="input w-full"
              placeholder="@username"
            />
          </div>
          
          <div>
            <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-300 mb-1">
              Instagram
            </label>
            <input
              type="text"
              id="socialMedia.instagram"
              name="socialMedia.instagram"
              value={formData.socialMedia.instagram}
              onChange={handleChange}
              className="input w-full"
              placeholder="@username"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="artStyle" className="block text-sm font-medium text-gray-300 mb-1">
            Primary Art Style
          </label>
          <select
            id="artStyle"
            name="artStyle"
            value={formData.artStyle}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="">Select your primary style</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Paintings">Paintings</option>
            <option value="Photography">Photography</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Mixed Media">Mixed Media</option>
            <option value="Generative Art">Generative Art</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </button>
          
          <p className="mt-3 text-sm text-gray-400">
            By submitting, you agree to our verification process. Our admin team will review your application and update your status accordingly.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default ArtistSubmissionForm;