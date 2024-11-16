import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Add Router for routing functionality
import axios from 'axios';
import Login from './components/login'; 
import Register from './components/register'; 

// Main App component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5001/login_status', { withCredentials: true });
        setIsLoggedIn(response.data.logged_in);
      } catch (error) {
        console.error('Error checking login status:', error);
      } 
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <h1>Welcome to Found It!</h1>
      <p>This is a basic version that just works. No functionality yet!</p>

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
        <Route path="/register" element={<Register />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

// Rendering the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

export default App;
