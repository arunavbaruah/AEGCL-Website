import React from 'react';
import Navbar from './Navbar';
import './Information.css';

const Information = () => {
    return (
        <div>
            <Navbar />
            <div className="information-container">
                <div className="card">
                    <h2>Information</h2>
                    <p>
                        Here you will find all the information regarding our services and operations.
                        Stay updated with the latest news and announcements from AEGCL.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Information;
