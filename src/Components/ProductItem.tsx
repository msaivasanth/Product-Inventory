import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ProductItem = () => {
    const { id } = useParams()
    
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
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const json = await response.json();
        console.log(json)
        setProductDetails(json)
    }
    if (!productDetails) {
        return <div>Loading...</div>; // or any loading indicator
    }
  return (
    <div>
        <h1 className='text-center'>Product Details...</h1>
        <div className="text-center mt-5">
            <img className='' src={`${productDetails.thumbnail}`} alt="" style={{height: '500px'}}/>
            <h2>{productDetails.title}</h2>
            <h4>{productDetails.description}</h4>
        </div>
    </div>
  )
}

export default ProductItem
