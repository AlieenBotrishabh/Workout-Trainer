import React, { useState } from 'react';

const Progress = ({ progress }) => {
  const [timeframe, setTimeframe] = useState('weekly');
  const { weekly, monthly } = progress;
  
  const data = timeframe === 'weekly' ? weekly : monthly;
  const labels = timeframe === 'weekly' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-tabs">
          <button 
            className={`tab ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="progress-chart">
        {data.map((value, index) => (
          <div className="chart-bar-container" key={index}>
            <div 
              className="chart-bar" 
              style={{ height: `${value}%` }}
              title={`${value}%`}
            ></div>
            <div className="chart-label">{labels[index]}</div>
          </div>
        ))}
      </div>
      
      <div className="progress-summary">
        <p>Average Progress: {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}%</p>
        <p>Target: 85%</p>
      </div>
    </div>
  );
};

export default Progress;