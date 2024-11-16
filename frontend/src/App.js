import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // React Router imports
import axios from 'axios'; // Axios for HTTP requests

import LostApp from './pages/LostDashboard'; // Import LostApp component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5001/login_status', { withCredentials: true });
        setIsLoggedIn(response.data.logged_in); // Update login status
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // If error, assume not logged in
      } finally {
        setIsLoading(false); // Stop loading after check
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message or spinner
  }

  return (
    <div>
      
      <Routes>
        {/* Define routes for public and private pages */}
       
        <Route path="/lost_item" element={<LostApp />} />

      </Routes>
    </div>
  );
}

export default App;
