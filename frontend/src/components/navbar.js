import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav>
        <div className="logo"><h1>GrocerU</h1></div>
        <div className="navbar-actions">
          <button onClick={() => navigate('/lost_dashboard')}>Home</button>
          <button onClick={() => navigate('/matches')}>Inventory</button>
          <button onClick={() => navigate('/logout')}>Grocery List</button>
          <Logout setIsLoggedIn={setIsLoggedIn} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;