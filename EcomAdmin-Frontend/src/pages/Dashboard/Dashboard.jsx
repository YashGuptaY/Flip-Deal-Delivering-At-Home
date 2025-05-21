import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p className="text-muted">Overview of your restaurant's performance</p>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3>3</h3>
                <p className="text-muted mb-0">Total Users</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-people"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3>62</h3>
                <p className="text-muted mb-0">Menu Items</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-grid"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3>0</h3>
                <p className="text-muted mb-0">Total Orders</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-cart"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3>₹0</h3>
                <p className="text-muted mb-0">Total Revenue</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-currency-rupee"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Orders Trend</h5>
              <div className="chart-container">
                {/* Chart implementation will go here */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Revenue Breakdown</h5>
              <div className="chart-container">
                {/* Chart implementation will go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
