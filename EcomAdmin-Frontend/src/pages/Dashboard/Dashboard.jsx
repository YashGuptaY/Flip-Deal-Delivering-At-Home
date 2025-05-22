import React, { useEffect, useState } from 'react';
import { getUserCount, getOrderCount, getProductCount, getTotalRevenue } from '../../services/dashboardService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0
  });

  const fetchDashboardStats = async () => {
    try {
      const [users, orders, products, revenue] = await Promise.all([
        getUserCount(),
        getOrderCount(),
        getProductCount(),
        getTotalRevenue()
      ]);

      setStats({
        users,
        orders,
        products,
        revenue
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p className="text-muted">Overview of your business</p>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats.users}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-people"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats.products}</h3>
                  <p className="text-muted mb-0">Total Products</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-box"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats.orders}</h3>
                  <p className="text-muted mb-0">Total Orders</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-cart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>₹{stats.revenue.toFixed(2)}</h3>
                  <p className="text-muted mb-0">Total Revenue</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
