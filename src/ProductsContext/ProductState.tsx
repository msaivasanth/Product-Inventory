import React, { FC, ReactNode, useState } from 'react'
import productContext from './productContext'

interface ProductStateProps {
  children: ReactNode; 
}
const ProductState: React.FC<ProductStateProps> = (props: any) => {
  const host = 'https://dummyjson.com/products'
  const [products, setProducts] = useState<[]>([])

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const getProducts: () => void = async () => {
    const response = await fetch(`${host}?limit=0`);
    const json = await response.json();
    setProducts(json.products)
  }
  const handleLogin = async () => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username: name, password: password })
    })

    const json = await response.json();
    return json
  }
  const value: any = { getProducts, products, setName, setPassword, name, password, handleLogin };
  return (
    <productContext.Provider value={value}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState
