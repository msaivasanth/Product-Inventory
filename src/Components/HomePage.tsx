import React, { useContext, useEffect } from 'react'
import productContext from '../ProductsContext/productContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const HomePage = () => {
    const context = useContext(productContext)
    const {products, getProducts }: any = context
    const navigate = useNavigate()

    useEffect(() => {
      if(localStorage.getItem('token')) {
        getProductsFn()
      }
      else {
        navigate('/login')
      }
      //eslint-disable-next-line
    }, [])

    const getProductsFn = async () => {
      const res = await getProducts()
      if(res === null) navigate('/login')
    }
  return (
    <>
      <Navbar />
    <div className='container mt-3'>
        <div className='row'>
        {products.map((product: any) => {
            return <>
            <div key={product.id} className='col-md-3 my-3 text-center'>
                <div className="card" style={{width: "20rem"}} >
                    <img src={product.images[0]} className="card-img-top rounded-top" alt="..." style={{height: "300px"}}/>
                        <div className="card-body" >
                            <h5 className="card-title">{product.title.slice(0, 20) + "..."}</h5>
                            <p className="card-text">{product.description.slice(0, 50) + "..."}</p>
                            <Link to={`product/${product.id}`} className="btn btn-primary">Read More</Link>
                        </div>
                </div>
            </div>
        </>})}
      </div>
    </div>
    </>
  )
}

export default HomePage
