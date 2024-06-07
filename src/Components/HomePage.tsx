import React, { useContext, useEffect, useRef, useState } from 'react'
import productContext from '../ProductsContext/productContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ScrollToTop from 'react-scroll-to-top'

interface productProps {
  id: number,
  title: string,
  description: string,
  images: string[],
  thumbnail: string;
}

interface HomeProps {
  products: productProps[] | undefined;
  getProducts: () => Promise<null | undefined>;
  handleDelete: (id: number) => Promise<null | undefined>;
  search: string;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void
  selected: boolean  
}
const HomePage = () => {
  const context = useContext(productContext)
  const { products, getProducts, handleDelete, search, isSearch, setIsSearch, selected }: HomeProps = context
  const navigate = useNavigate()
  const [dSearch, SetDSearch] = useState<string>('')
  
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    else {
      if(search !== '') {
        SetDSearch(search)
      }
      else if (selected === false) {
        getProductsFn()
      }
    }
    //eslint-disable-next-line
  }, [products, selected])


  const getProductsFn = async () => {
    const res = await getProducts()
    if (res === null) {
      alert("Session expired! Please login again.")
      navigate('/login')
    }
  }
  
  const handleDeleteItem = async (id: number) => {
    const del = confirm('Are you sure want to delete')
    if(del === true) {
      const res = await handleDelete(id)
      if (res === null) navigate('/login')
      else alert('Item deleted successfully')
    }
    else {
      alert("Item is not deleted")
    }
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className='container mt-3'>
        
        {isSearch && <h2>{`Search Result for '${dSearch}'`}</h2>}
        <div className='row'>
          {products && products.map((product: productProps, ind: number) => {
            return <>
              <div key={product.id} className='col-md-3 my-3 text-center'>
                <div className="card">
                  <img src={product.thumbnail} className="card-img-top rounded-top" alt="..." style={{ height: "300px" }} />
                  <div className="card-body" >
                    <h5 className="card-title">{product.title.slice(0, 20) + (product.title.length > 20 ? "..." : "")}</h5>
                    <p className="card-text">{product.description.slice(0, 20) + (product.description.length > 20 ? "..." : "")}</p>
                  
                    <Link to={`product/${product.id}`} className="btn btn-dark">Read More</Link>

                    {isSearch === false && <><button className="fa-solid fa-trash-can bg-light ms-3 btn btn-light" onClick={() => handleDeleteItem(ind)}></button>
                    <Link to={`/updateItem/${ind + 1}`} className="fa-solid fa-pen-to-square mx-2 btn btn-light"></Link></>}
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
