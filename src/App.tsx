import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import ProductState from './ProductsContext/ProductState';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ProductItem from './Components/ProductItem';
import AddItem from './Components/AddItem';
import UpdateItem from './Components/UpdateItem';
import { TimeoutProvider } from './Components/TimeoutProvider';
import Welcome from './Components/Welcome';
import Signup from './Components/Signup';
import Chatpage from './Components/Chatpage';


function App() {
  return (
    <ProductState>
      <div>
        <BrowserRouter>
          <TimeoutProvider>
          <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/product/:id' element={<ProductItem />} />
                <Route path='/addItem' element={<AddItem />} />
                <Route path='/updateItem/:id' element={<UpdateItem />} />
                <Route path='/chat' element={<Chatpage />} />
          </Routes>
          </TimeoutProvider>
        </BrowserRouter>
      </div>
    </ProductState>
  );
}







export default App;
