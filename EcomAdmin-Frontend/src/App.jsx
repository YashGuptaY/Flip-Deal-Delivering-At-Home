import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListProduct from './pages/ListProduct/ListProduct';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }
  return (
    <div className="d-flex" id="wrapper">
            
            <Sidebar sidebarVisible={sidebarVisible}/>
            
            <div id="page-content-wrapper">
                
                <Menubar toggleSidebar={toggleSidebar} />
                <ToastContainer />
                
                <div className="container-fluid">
                    <Routes>
                      <Route path='/list' element={<ListProduct />} />
                      <Route path='/orders' element={<Orders />} />
                      <Route path='/' element={<ListProduct />} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;