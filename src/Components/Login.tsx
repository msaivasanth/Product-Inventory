import React, { ReactEventHandler, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'
import Loader from './Loader';
import { toast, ToastContainer } from 'react-toastify';


interface Login {
    name: string;
    token: string;
}
interface contextProps {
    name: string,
    password: string,
    setName: (name: string) => void,
    setPassword: (password: string) => void,
    handleLogin: () => Promise<Login>,
}
const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {name, password, setName, setPassword, handleLogin}: contextProps = useContext(productContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(name === '' || password === '') {
            toast.warn('Please enter all details correctly')
        }
        else {
            setLoading(true);
            e.preventDefault()
            setName('')
            setPassword('')
            
            const resp = await handleLogin()
            
            if(resp !== null) {
                console.log(resp.token)
                if(resp.token !== undefined) {
                    localStorage.setItem('token', resp.token)
                    toast.success("Logged in successfully", {
                        position: "bottom-right",
                        theme:"colored"
                    });
                    // console.log(resp)
                    navigate('/home')
                }
                else {
                    toast.error("Invalid credentials!", {
                        position: "bottom-right",
                        theme: "colored"
                    })
                }
            }
            setLoading(false);

        }
    }

    return (
        <div>
            {loading ? <Loader />: 
            <div className='container mt-4 border border-black rounded p-5 shadow p-3 mb-5 bg-body-tertiary rounded'>
                <p className='text-center mt-1 mb-5 fs-1'>Login Page.</p>
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
                <div className='fs-4 mt-2'>Don't have an account ? <Link to={'/signup'}>Sign up</Link></div>
            </div>
            }
        </div>
    )
}

export default Login
