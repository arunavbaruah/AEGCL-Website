import React from 'react';
import './HolidaysCard.css';

function HolidaysCard() {
    return (
        <div className="card holidays-card">
            <div className="card-header">
                <h4>Upcoming Holidays</h4>
            </div>
            <div className="card-body">
                <ul>
                    <li>Independence Day - August 15, 2024</li>
                    <li>Labor Day - September 2, 2024</li>
                    <li>Diwali - October 31, 2024</li>
                </ul>
            </div>
        </div>
    );
}

export default HolidaysCard;
