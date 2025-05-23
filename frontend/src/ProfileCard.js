import React from 'react';
import './ProfileCard.css';

function ProfileCard() {
    return (
        <div className="card profile-card">
            <div className="profile-header">
                <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
                <div>
                    <h4>John Doe</h4>
                    <p>Power Grid Operator</p>
                </div>
            </div>
            <div className="profile-details">
                <p>Email: johndoe@example.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
    );
}

export default ProfileCard;
