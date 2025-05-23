import React from 'react';
import './Notifications.css';

function Notifications() {
    return (
        <div className="card notifications-card">
            <h4>Notifications</h4>
            <ul>
                <li>Issue resolved at Substation 1</li>
                <li>New report available for March 2024</li>
                <li>Maintenance scheduled for Grid 3</li>
            </ul>
        </div>
    );
}

export default Notifications;
