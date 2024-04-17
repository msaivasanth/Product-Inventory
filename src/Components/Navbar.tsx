import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Product Inventory</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">About</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
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
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div>
            <Link className="btn btn-primary mx-3" to="/addItem" role="button">Add Item</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
