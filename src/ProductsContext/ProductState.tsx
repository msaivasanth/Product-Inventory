import React, { FC, ReactNode, useState } from 'react'
import productContext from './productContext'

interface ProductStateProps {
  children: ReactNode; // ReactNode can be any JSX content
}
const ProductState: React.FC<ProductStateProps> = (props: any) => {
    const host = 'https://dummyjson.com/products'
    const [products, setProducts] = useState<[]>([])

    const getProducts: ()=> void = async () => {
        const response = await fetch(`${host}?limit=0`);
        const json = await response.json();
        setProducts(json.products)
        // console.log(json.products)
    }
    const value: any = { getProducts, products };
  return (
    <productContext.Provider value={value}>
        {props.children}
    </productContext.Provider>
  )
}

export default ProductState
