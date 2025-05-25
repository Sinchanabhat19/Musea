import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import ArtistProfile from './pages/ArtistProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="artist/:address" element={<ArtistProfile />} />
          
          {/* Protected routes */}
          <Route 
            path="artist-dashboard" 
            element={
              <ProtectedRoute requiredRole="artist">
                <ArtistDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin-dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;