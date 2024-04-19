import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import ProductState from './ProductsContext/ProductState';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ProductItem from './Components/ProductItem';
import AddItem from './Components/AddItem';
import UpdateItem from './Components/UpdateItem';


function App() {
  return (
    <ProductState>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<ProductItem />} />
            <Route path='/addItem' element={<AddItem />} />
            <Route path='/updateItem/:id' element={<UpdateItem />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ProductState>
  );
}







export default App;
