import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Search from './Search'


const Navbar = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    alert('LoggedOut successfully!')
  }

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href={"/"}>Product Inventory</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href={"/"}>Home</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">smartphones</a></li>
                  <li><a className="dropdown-item" href="#">laptops</a></li>
                  <li><a className="dropdown-item" href="#">fragrances</a></li>
                  <li><a className="dropdown-item" href="#">groceries</a></li>
                  <li><a className="dropdown-item" href="#">furniture</a></li>
                  {/* <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
              </li>

            </ul>
            <Search />
            <div>
            <Link className="btn btn-primary mx-3" to="/addItem" role="button">Add Item</Link>
            <button className="btn btn-danger" onClick={handleLogout}>LogOut</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
