import React, { useState, useEffect } from 'react';
import Stats from './Stats';
import Progress from './Progress';

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      completedTasks: 0,
      pendingTasks: 0
    },
    progress: {
      weekly: [20, 45, 60, 80, 75, 90, 65],
      monthly: [35, 50, 65, 80, 90]
    }
  });

  // Simulate data fetching
  useEffect(() => {
    // In a real application, you would fetch data from an API
    const fetchData = async () => {
      try {
        // Simulating API response with setTimeout
        setTimeout(() => {
          setData({
            stats: {
              totalUsers: 1254,
              activeUsers: 876,
              completedTasks: 432,
              pendingTasks: 89
            },
            progress: {
              weekly: [25, 40, 65, 80, 90, 95, 85],
              monthly: [40, 55, 70, 85, 95]
            }
          });
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="dashboard-content">
        <section className="stats-section">
          <h2>Key Statistics</h2>
          <Stats stats={data.stats} />
        </section>
        
        <section className="progress-section">
          <h2>Project Progress</h2>
          <Progress progress={data.progress} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;