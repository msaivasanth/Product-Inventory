import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate();
  return (
    <div className='container m-5 text-center border border-black rounded p-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
      <h1 className='text-center mt-1 mb-5 fs-1'>Welcome to Product Inventory.</h1>
      <p className='fs-1'> Aleary have an account &nbsp; <button type='button' className='btn btn-primary btn-lg' onClick={() => navigate('/login')}>Log IN</button></p>
      <p className='fs-1'>New to our website ? &nbsp; <button className='btn btn-primary btn-lg' onClick={() => navigate('/signup')}>Sign UP</button></p>
    </div>
  )
}

export default Welcome
