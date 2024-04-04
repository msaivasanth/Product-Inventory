import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import ProductState from './ProductsContext/ProductState';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';


function App() {
  return (
    <ProductState>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ProductState>
  );
}







export default App;
