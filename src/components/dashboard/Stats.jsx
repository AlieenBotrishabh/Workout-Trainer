import React from 'react';

const Stats = ({ stats }) => {
  const { totalUsers, activeUsers, completedTasks, pendingTasks } = stats;
  
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <h3>Total Users</h3>
          <p className="stat-value">{totalUsers.toLocaleString()}</p>
          <p className="stat-description">Registered users on the platform</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">👤</div>
        <div className="stat-content">
          <h3>Active Users</h3>
          <p className="stat-value">{activeUsers.toLocaleString()}</p>
          <p className="stat-description">Users active in the last 30 days</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>Completed Tasks</h3>
          <p className="stat-value">{completedTasks.toLocaleString()}</p>
          <p className="stat-description">Tasks marked as complete</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <h3>Pending Tasks</h3>
          <p className="stat-value">{pendingTasks.toLocaleString()}</p>
          <p className="stat-description">Tasks awaiting completion</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;