import React from 'react';
import './MetricsCard.css';

function MetricsCard({ title, value }) {
    return (
        <div className="card metrics-card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
}


export default MetricsCard;
