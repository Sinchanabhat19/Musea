import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react';

type ArtistSubmission = {
  id: string;
  address: string;
  name: string;
  bio: string;
  email: string;
  artStyle: string;
  submittedAt: string;
  profileImage: string;
};

type AdminVerificationCardProps = {
  submission: ArtistSubmission;
  onVerify: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
};

const AdminVerificationCard = ({ submission, onVerify, onReject }: AdminVerificationCardProps) => {
  const [feedback, setFeedback] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleVerify = () => {
    onVerify(submission.id);
  };

  const handleReject = () => {
    if (showRejectForm) {
      onReject(submission.id, feedback);
      setFeedback('');
      setShowRejectForm(false);
    } else {
      setShowRejectForm(true);
    }
  };

  const handleCancelReject = () => {
    setShowRejectForm(false);
    setFeedback('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="p-5">
        <div className="flex items-start mb-4">
          <img
            src={submission.profileImage}
            alt={submission.name}
            className="w-16 h-16 rounded-md object-cover mr-4"
          />
          <div>
            <h3 className="font-serif font-bold text-lg">{submission.name}</h3>
            <p className="text-amber-500 text-sm">{submission.artStyle}</p>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span className="truncate max-w-[150px]">{submission.address}</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-1">Bio</h4>
          <p className="text-sm text-gray-400 line-clamp-3">{submission.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-1">Email</h4>
            <p className="text-sm text-gray-400">{submission.email}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-300 mb-1">Submitted</h4>
            <p className="text-sm text-gray-400">{submission.submittedAt}</p>
          </div>
        </div>

        {!showRejectForm ? (
          <div className="flex space-x-3">
            <button
              onClick={handleVerify}
              className="flex-1 py-2 bg-green-800 hover:bg-green-700 text-green-200 rounded-md flex items-center justify-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify
            </button>
            <button
              onClick={handleReject}
              className="flex-1 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-md flex items-center justify-center"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback for rejection"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-sm"
              rows={3}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCancelReject}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!feedback.trim()}
                className={`flex-1 py-2 bg-red-900 text-red-200 rounded-md ${
                  !feedback.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminVerificationCard;