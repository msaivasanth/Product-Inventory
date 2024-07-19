import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Search from './Search'
import productContext from '../ProductsContext/productContext';
import { toast } from 'react-toastify';


interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface contextProps {
  setSelected: (selected: boolean) => void,
  selectedCategories: (cat: string) => Promise<Product[] | null>,
  categories: String[],
  closeConnection: () => Promise<void>
}
const Navbar = () => {
  
  const navigate = useNavigate();
  const context = useContext(productContext)
  const { selectedCategories, setSelected, categories, closeConnection }: contextProps = context

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    closeConnection();
    toast.success('LoggedOut successfully!', {
      position: "bottom-right",
      theme: "colored"
    })
    navigate('/login')
  }

  const handleSelect = async (value: string) => {
      let res = await selectedCategories(value)
      if(res === null) navigate('/login')
      else {
        setSelected(true); 
        toast.info(`Products related to ${value}`, {
          position: "bottom-right",
        });
      }
      
  }

  
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href={"/home"}>Product Inventory</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href={"/home"}>Home</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </button>
                <ul className="dropdown-menu">
                  {categories.map(cat => {
                    return <li><button className="dropdown-item"  onClick={() => handleSelect(`${cat}`)}>{cat}</button></li>
                  })}
                </ul>
              </li>

            </ul>
            <Search />
            <div>
            <Link className="btn btn-primary ms-3" to="/addItem" role="button">Add Item</Link>
            <Link className="btn btn-primary mx-1" to="/chat" role="button">Chats</Link>
            <button className="btn btn-danger" onClick={handleLogout}>LogOut</button>
            </div>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Navbar
