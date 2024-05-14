import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Search from './Search'
import productContext from '../ProductsContext/productContext';


interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface contextProps {
  setSelected: (selected: boolean) => void,
  selectedCategories: (cat: string) => Promise<Product[] | undefined>,
  selected: boolean,
  
}
const Navbar = () => {
  
  const navigate = useNavigate();
  const context = useContext(productContext)
  const { selectedCategories, selected, setSelected }: contextProps = context

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    alert('LoggedOut successfully!')
  }

  const handleSelect = async (value: string) => {
      let res = await selectedCategories(value)
      if(res === null) navigate('/login')
      else {setSelected(true); alert(`Products related to ${value}`);}
      
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
                  <li><button className="dropdown-item" onClick={() => handleSelect("smartphones")}>smartphones</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSelect("laptops")}>laptops</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSelect("fragrances")}>fragrances</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSelect("groceries")}>groceries</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSelect("furniture")}>furniture</button></li>
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
