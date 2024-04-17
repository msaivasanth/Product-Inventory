import React, { useContext, useEffect, useRef } from 'react'
import productContext from '../ProductsContext/productContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ScrollToTop from 'react-scroll-to-top'

const HomePage = () => {
  const context = useContext(productContext)
  const { products, getProducts, handleDelete }: any = context
  const navigate = useNavigate()


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getProductsFn()
    }
    else {
      navigate('/login')
    }
    //eslint-disable-next-line
  }, [products])

  const getProductsFn = async () => {
    const res = await getProducts()
    if (res === null) navigate('/login')
  }

  const handleDeleteItem = async (id: number) => {
    const res = await handleDelete(id)
    if (res === null) navigate('/login')
    else alert('Item deleted successfully')
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className='container mt-3'>
        <div className='row'>
          {products.map((product: any, ind: number) => {
            return <>
              <div key={product.id} className='col-md-3 my-3 text-center'>
                <div className="card">
                  <img src={product.images[0]} className="card-img-top rounded-top" alt="..." style={{ height: "300px" }} />
                  <div className="card-body" >
                    <h5 className="card-title">{product.title.slice(0, 20) + (product.title.length > 20 ? "..." : "")}</h5>
                    <p className="card-text">{product.description.slice(0, 20) + (product.description.length > 20 ? "..." : "")}</p>

                    <Link to={`product/${product.id}`} className="btn btn-dark">Read More</Link>

                    <button className="fa-solid fa-trash-can bg-light ms-3 btn btn-light" onClick={() => handleDeleteItem(ind)}></button>
                  </div>
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage
