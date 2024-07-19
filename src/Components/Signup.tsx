import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import productContext from '../ProductsContext/productContext';

interface props {
  sendEmail: (email: string) => Promise<string | null>,
  SignUp: (name: string, email: string, password: string, gender: string) => Promise<string | null>,
  verifyOtp: (otp: string) => Promise<string | null>
}

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);


  const { sendEmail, SignUp, verifyOtp }: props = useContext(productContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await sendEmail(email);
    if (res === "Sent Mail!") {
      ref.current?.click();
    }
  }

  const handleSignUp = async () => {
    const res = await SignUp(name, email, password, gender);
    console.log(res);
    const respone = await fetch(`http://localhost:5103/api/Chat/addUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({Name: name, Email: email})
    })
    const json = await respone.json();

    setEmail("");
    setName("");
    setPassword("");
    setGender("");
    if (res === "User Added :)") {
      toast.success("User registered successfully!", {
        position: "bottom-right",
        theme: "colored"
      })
      toast.info('Please login!', {
        position: "bottom-right",
        theme: "colored"
      });
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
    else {
      toast.error("User registration failed!, try again", {
        position: "bottom-right",
        theme: "colored"
      })
    }
  }
  const handleOTP = async () => {
    const res = await verifyOtp(otp);
    if (res === "OTP is valid") {
      refClose.current?.click();
      toast.success('OTP Verified!', {
        position: "bottom-right",
        theme: "colored"
      });
      await handleSignUp();
    }
    else {
      toast.error('Validation Failed! try again', {
        position: "bottom-right",
        theme: "colored"
      });
    }
    setOtp("");
  }
  return (
    <div>
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">OTP Verification.</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body m-3">
              <p className='fs-4'>We have sent an verification code to your entered email.</p>
              <label htmlFor="otp" className='mb-2 form-label fs-4'>Enter the 6-digit OTP</label>
              <input className="form-control-lg" type="text" placeholder="Default input" aria-label="default input example" id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success fs-4" onClick={handleOTP}>Verify</button>
              {/* <button type="button" className="btn btn-primary fs-4">Resend OTP</button> */}
            </div>
          </div>
        </div>
      </div>


      <div className='container mt-4 border border-black rounded p-5 mb-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <p className='text-center mt-1 mb-2 fs-1'>Sign Up here.</p>
        <p className='mb-4 fs-1'>Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-3">Username</label>
            <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => { setName(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-3">Email</label>
            <input type="email" className="form-control form-control-lg" id="exampleInputEmail2" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputGender" className="form-label fs-3">Gender</label>
            <input type="text" className="form-control form-control-lg" id="exampleInputGender" aria-describedby="emailHelp" value={gender} onChange={(e) => { setGender(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-3">Password</label>
            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary fs-3">Submit</button>
        </form>

      <div className='fs-4 mt-2'>Already have an account ? <Link to={"/login"}>Log in</Link></div>
      </div>
    </div>
  )
}

export default Signup
