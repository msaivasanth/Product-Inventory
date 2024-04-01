import React, { useState } from 'react'
import productContext from './productContext'

const ProductState = (props) => {
    const host = 'https://dummyjson.com/products'
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await fetch(`${host}?limit=0`);
        const json = await response.json();
        setProducts(json.products)
        // console.log(json.products)
    }
  return (
    <productContext.Provider value={{getProducts, products}}>
        {props.children}
    </productContext.Provider>
  )
}

export default ProductState
