import React, { ReactEventHandler, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'
import Loader from './Loader';

interface Login {
    name: string;
    token: string;
}
interface contextProps {
    name: string,
    password: string,
    setName: (name: string) => void,
    setPassword: (password: string) => void,
    handleLogin: () => Promise<Login>
}
const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {name, password, setName, setPassword, handleLogin}: contextProps = useContext(productContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(name === '' || password === '') {
            alert('Please enter all details correctly')
        }
        else {
            setLoading(true);
            e.preventDefault()
            setName('')
            setPassword('')
            
            const resp = await handleLogin()
            
            if(resp !== null) {
                if(resp.token !== undefined) {
                    localStorage.setItem('token', resp.token)
                    navigate('/')
                    alert('Logged in successfully!')
                }
                else {
                    alert("Invalid credentials!")
                }
            }

            setLoading(false);
        }
    }

    if(loading) {
        return <Loader />
    }
    return (
        <div className='container mt-4 border border-black rounded p-5'>
            <p className='text-center mt-1 mb-5 fs-1'>Welcome to Product Inventory.</p>
            <p className='mb-4 fs-1'>Please enter your login details.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fs-3">Username</label>
                    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label fs-3">Password</label>
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary fs-3">Submit</button>
            </form>

        </div>
    )
}

export default Login
