import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="/logo.jpg" alt="AEGCL Logo" className="sidebar-logo" />
                <h3>AEGCL Dashboard</h3>
            </div>
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/reports">Reports</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/support">Support</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
