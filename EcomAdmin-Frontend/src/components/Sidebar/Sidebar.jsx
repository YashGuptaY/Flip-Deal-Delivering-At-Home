import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {assets} from '../../assets/assets';

const Sidebar = ({sidebarVisible}) => {
  const location = useLocation();

  return (
    <div className={`border-end cyan-sidebar ${sidebarVisible ? '': 'd-none'}`} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom cyan-header">
            <img src={assets.logo} alt="" height={32} width={32}/>
        </div>
        <div className="list-group list-group-flush">
            {[
              { path: '/', icon: 'bi-speedometer2', text: 'Dashboard' },
              { path: '/list', icon: 'bi-list-ul', text: 'Product Management' },
              { path: '/orders', icon: 'bi-cart', text: 'Orders Management' },
              { path: '/users', icon: 'bi-people', text: 'Users Management' }
            ].map((item) => (
              <Link 
                key={item.path}
                className={`list-group-item list-group-item-action p-3 ${
                  location.pathname === item.path ? 'active golden-active' : ''
                }`}
                to={item.path}
              >
                <i className={`bi ${item.icon} me-2`}></i> {item.text}
              </Link>
            ))}
        </div>
    </div>
  )
}

export default Sidebar;