import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'
import Loader from './Loader';
import { toast } from 'react-toastify';

interface productDetailsProps {
    title: string,
    description: string,
    price: number,
    rating: number,
    brand: string,
    category: string,
    images: string[],
    thumbnail: string
}
interface contextProps {
    handleGetDetails: (id: number) => Promise<productDetailsProps | null>;
}
const ProductItem = () => {
    const { id } = useParams()

    const context = useContext(productContext)
    const { handleGetDetails }: contextProps  = context

    const navigate = useNavigate()

    const [productDetails, setProductDetails] = useState<productDetailsProps>();
    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = async () => {
        const res: productDetailsProps | null = await handleGetDetails(Number(id))
        if(res === null) {
            toast.error("Session expired! Please login again.",)
            navigate('/login')
        }
        else {
            setProductDetails(res)
        }
    }
    if (!productDetails) {
        return <Loader />;
    }

    return (
        <div className='container border border-black border-2 rounded mt-3 p-2 pb-3'>
            <div className="row mt-3 mx-3 ">
            <Link to={'/home'} className='btn btn-dark btn-lg col-1'>Go Back</Link>
            <h1 className='text-center col-10'>Product Details...</h1>
            </div>
            <div className="row text-center mt-4">
                <div className="col">
                    <img className='' src={`${productDetails.images[0]}`} alt="" style={{ height: '500px', width: '500px'}} />
                </div>
                <div className="col">
                    <h1 className='fs-2 text'>Title: {productDetails.title}</h1><br/>
                    <h4 className='fs-2 text'>Description: {productDetails.description}</h4><br/>
                    <div className="row">
                        <h4 className='col fs-2 text'>Price: {productDetails.price}</h4>
                        <h4 className='col fs-2 text'>Rating: {productDetails.rating}</h4>
                    </div><br/>
                    <div className="row">
                        <h4 className='col fs-2 text'>Brand: {productDetails.brand}</h4>
                        <h4 className='col fs-2 text'>Category: {productDetails.category}</h4>
                    </div><br/>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
