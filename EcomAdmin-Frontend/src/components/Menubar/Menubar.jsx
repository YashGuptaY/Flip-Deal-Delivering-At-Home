import React from 'react';

const Menubar = ({toggleSidebar}) => {
  return (
    <nav className="navbar navbar-expand-lg cyan-navbar border-bottom">
      <div className="container-fluid">
        <button className="btn btn-cyan" id="sidebarToggle" onClick={toggleSidebar}>
          <i className='bi bi-list'></i>
        </button>
      </div>
    </nav>
  )
}

export default Menubar;