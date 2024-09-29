// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Navbar = () => (
  <nav className="navbar">
    <h2>Contacts App</h2>
    <div>
      <Link to="/">Home</Link>
      <Link to="/contact">Add Contact</Link>
    </div>
  </nav>
);

export default Navbar;
