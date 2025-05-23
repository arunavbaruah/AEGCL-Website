import React from 'react';
import Navbar from './Navbar';
import './About.css';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="about-us-container">
                <div className="card">
                    <h2>About Us</h2>
                    <p>
                        Welcome to AEGCL. We are committed to providing excellent service and support.
                        Our mission is to ensure the efficient transmission of electricity and promote sustainable energy solutions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
