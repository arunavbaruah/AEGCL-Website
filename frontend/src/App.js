// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import TermsAndPolicies from './TermsAndPolicies';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Information from './Information';
import PrivateRoute from './PrivateRoute'; // Correct import

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/terms-and-policies" element={<TermsAndPolicies />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
