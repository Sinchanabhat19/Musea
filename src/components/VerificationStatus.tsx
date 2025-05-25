import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VerificationStatus = () => {
  const { verificationStatus } = useAuth();

  // Define status content based on verification status
  const getStatusContent = () => {
    switch (verificationStatus) {
      case 'verified':
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          title: 'Verified Artist',
          description: 'Congratulations! Your artist profile has been verified. You can now showcase your artwork in the gallery.',
          color: 'bg-green-900/20',
          borderColor: 'border-green-500',
        };
      
      case 'pending':
        return {
          icon: <Clock className="h-12 w-12 text-amber-500" />,
          title: 'Verification Pending',
          description: 'Your application is under review. Our admin team will evaluate your profile shortly.',
          color: 'bg-amber-900/20',
          borderColor: 'border-amber-500',
        };
      
      case 'rejected':
        return {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          title: 'Verification Rejected',
          description: 'Unfortunately, your verification was not approved. Please review the feedback and resubmit your application.',
          color: 'bg-red-900/20',
          borderColor: 'border-red-500',
        };
      
      default:
        return {
          icon: <Clock className="h-12 w-12 text-gray-500" />,
          title: 'No Application Submitted',
          description: 'You haven\'t submitted your artist profile for verification yet.',
          color: 'bg-gray-800',
          borderColor: 'border-gray-700',
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border ${statusContent.borderColor} ${statusContent.color} p-6 flex flex-col items-center text-center`}
    >
      {statusContent.icon}
      
      <h3 className="text-xl font-serif font-bold mt-4 mb-2">
        {statusContent.title}
      </h3>
      
      <p className="text-gray-300">
        {statusContent.description}
      </p>
      
      {verificationStatus === 'rejected' && (
        <div className="mt-4 p-4 bg-red-900/30 rounded-md w-full">
          <h4 className="font-medium text-red-300 mb-2">Feedback from Admin:</h4>
          <p className="text-sm text-gray-300">
            Please provide more information about your artistic background and include links to your previous work. We need to verify your identity as an artist.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VerificationStatus;