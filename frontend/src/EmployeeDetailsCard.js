import React from 'react';
import './EmployeeDetailsCard.css';

function EmployeeDetailsCard() {
    return (
        <div className="card employee-details-card">
            <div className="card-header">
                <h4>Employee Details</h4>
            </div>
            <div className="card-body">
                <p><strong>Name:</strong> Jane Smith</p>
                <p><strong>Department:</strong> Operations</p>
                <p><strong>Role:</strong> Senior Engineer</p>
                <p><strong>Contact:</strong> janesmith@example.com</p>
            </div>
        </div>
    );
}

export default EmployeeDetailsCard;
