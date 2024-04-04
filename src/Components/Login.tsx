import React, { ReactEventHandler, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'

const Login = () => {
    const {name, password, setName, setPassword, handleLogin}: any = useContext(productContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(name === '' || password === '') {
            alert('Please enter all details correctly')
        }
        else {

            e.preventDefault()
            setName('')
            setPassword('')
            
            const resp = await handleLogin()
            console.log(resp)
            if(resp) {
                localStorage.setItem('token', resp.token)
                navigate('/')
            }
            
        }
    }
    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Welcome to Product Inventory.</h1>
            <h1 className='text-center mb-4'>Please enter your login details.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login
