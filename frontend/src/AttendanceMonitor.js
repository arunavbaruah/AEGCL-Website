import React, { useState, useEffect } from 'react';
import './AttendanceMonitor.css';

function AttendanceMonitor() {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        // Fetch attendance data from an API or local source
        // Example static data for demonstration
        setAttendance([
            { date: '2024-07-29', status: 'Present' },
            { date: '2024-07-28', status: 'Absent' },
            { date: '2024-07-27', status: 'Present' },
        ]);
    }, []);

    return (
        <div className="card attendance-monitor">
            <div className="card-header">
                <h4>Attendance Monitor</h4>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.date}</td>
                                <td>{entry.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AttendanceMonitor;
