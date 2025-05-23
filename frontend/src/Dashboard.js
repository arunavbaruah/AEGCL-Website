// src/Dashboard.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import Notifications from './Notifications';
import MetricsCard from './MetricsCard';
import Sidebar from './Sidebar';
import EmployeeDetailsCard from './EmployeeDetailsCard';
import HolidaysCard from './HolidaysCard';
import AttendanceMonitor from './AttendanceMonitor';
import './Dashboard.css';

function Dashboard() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar hideLoginSignup={true} />
            <div className="dashboard-container">
                <Sidebar />
                <div className="dashboard-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 col-12 mb-3">
                                <ProfileCard />
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <Notifications />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12 mb-3">
                                <MetricsCard title="Power Consumption" value="1200 MW" />
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <MetricsCard title="Active Users" value="350" />
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <MetricsCard title="Pending Issues" value="15" />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12 mb-3">
                                <EmployeeDetailsCard />
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <HolidaysCard />
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <AttendanceMonitor />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
