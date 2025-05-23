import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Navbar.css';

function Navbar({ hideLoginSignup }) {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">AEGCL</Link>
                    
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {location.pathname !== "/" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        )}
                        {location.pathname !== "/about" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                        )}
                        {location.pathname !== "/contact" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        )}
                        {location.pathname !== "/information" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/information">Information</Link>
                            </li>
                        )}
                        {!hideLoginSignup && (location.pathname !== "/login" && location.pathname !== "/signup") && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login/Signup</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item logout-box">
                                <button className="logout-btn" onClick={logout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
