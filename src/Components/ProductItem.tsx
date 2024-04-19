import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import productContext from '../ProductsContext/productContext'

interface productDetailsProps {
    title: string,
    description: string,
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
            navigate('/login')
        }
        else {
            setProductDetails(res)
        }
    }
    if (!productDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="row mt-3 mx-3">
            <Link to={'/'} className='btn btn-dark btn-lg col-1'>Go Back</Link>
            <h1 className='text-center col-10'>Product Details...</h1>
            </div>
            <div className="text-center mt-4">
                <img className='' src={`${productDetails.thumbnail}`} alt="" style={{ height: '500px', width: '500px'}} />
                <h2>{productDetails.title}</h2>
                <h4>{productDetails.description}</h4>
            </div>
        </div>
    )
}

export default ProductItem
