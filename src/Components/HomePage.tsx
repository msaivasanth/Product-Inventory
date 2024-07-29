import React, { useContext, useEffect, useRef, useState } from 'react'
import productContext from '../ProductsContext/productContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ScrollToTop from 'react-scroll-to-top'
import Loader from './Loader'
import { toast } from 'react-toastify'

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
  selected: boolean,
  loading: boolean  
}
const HomePage = () => {
  const context = useContext(productContext)
  const { products, getProducts, handleDelete, search, isSearch, setIsSearch, selected, loading}: HomeProps = context
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
      toast.error("Session expired! Please login again.")
      navigate('/login')
    }
  }
  
  const handleDeleteItem = async (id: number) => {
    const del = confirm('Are you sure want to delete')
    if(del === true) {
      const res = await handleDelete(id)
      if (res === null) navigate('/login')
      else toast.success('Item deleted successfully')
    }
    else {
      toast.info("Item is not deleted")
    }
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className='container mt-3'>
        
        {!loading ? (isSearch && <h2>{`${products?.length != 0? "Search Results": "No Search Results"} for '${dSearch}'`}</h2>): ""}
        <div className='row'>
          {!loading ? (products && products.map((product: productProps, ind: number) => {
            return <>
              <div key={product.id} className='col-md-3 my-3 text-center'>
                <div className="card">
                  <img src={product.thumbnail} className="card-img-top rounded-top" alt="..." style={{ height: "300px" }} />
                  <div className="card-body" >
                    <h5 className="card-title">{product.title.slice(0, 20) + (product.title.length > 20 ? "..." : "")}</h5>
                    <p className="card-text">{product.description.slice(0, 20) + (product.description.length > 20 ? "..." : "")}</p>
                  
                    <Link to={`/product/${product.id}`} className="btn btn-dark">Read More</Link>

                    {isSearch === false && <><button className="fa-solid fa-trash-can bg-light ms-3 btn btn-light" onClick={() => handleDeleteItem(product.id)}></button>
                    <Link to={`/updateItem/${product.id}`} className="fa-solid fa-pen-to-square mx-2 btn btn-light"></Link></>}
                  </div>
                </div>
              </div>
            </>
          })): <Loader />}
        </div>
      </div>
    </>
  )
}

export default HomePage
