// src/Home.js
import React from 'react';
import Navbar from './Navbar';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <Navbar />
            <div className="content-container">
                <h1>Welcome to AEGCL</h1>
                <p>Your one-stop destination for all information related to AEGCL.</p>
                <a href="/login" className="btn">Login</a>
                <a href="/signup" className="btn">Sign Up</a>
            </div>
            <div className="footer">
                <p>&copy; 2024 AEGCL. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Home;
