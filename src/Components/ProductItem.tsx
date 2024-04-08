import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'


const ProductItem = () => {
    const { id } = useParams()

    const context = useContext(productContext)
    const { handleGetDetails }: any = context

    const navigate = useNavigate()

    interface productDetailsProps {
        title: string,
        description: string,
        images: string[],
        thumbnail: string
    }
    const [productDetails, setProductDetails] = useState<productDetailsProps | null>(null);
    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = async () => {
        const res = await handleGetDetails(id)
        if(res === null) {
            navigate('/login')
        }
        else {
            setProductDetails(res)
        }
    }
    if (!productDetails) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return (
        <div>
            <h1 className='text-center'>Product Details...</h1>
            <div className="text-center mt-5">
                <img className='' src={`${productDetails.thumbnail}`} alt="" style={{ height: '500px' }} />
                <h2>{productDetails.title}</h2>
                <h4>{productDetails.description}</h4>
            </div>
        </div>
    )
}

export default ProductItem
