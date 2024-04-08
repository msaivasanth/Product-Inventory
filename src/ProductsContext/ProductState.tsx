import React, { FC, ReactNode, useState } from 'react'
import productContext from './productContext'

interface ProductStateProps {
  children: ReactNode;
}
const ProductState: React.FC<ProductStateProps> = (props: any) => {
  const host = 'https://dummyjson.com'
  const [products, setProducts] = useState<[]>([])

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username: name, password: password })
    })

    const json = await response.json();
    return json
  }


  const checkFn = async () => {
    const check = await fetch(`${host}/auth/me`, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
    const checkRes = await check.json()
    if (!checkRes.id) {
      localStorage.removeItem('token')
      // navigate('/login')
      return null
    }
  }


  const getProducts: () => void = async () => {
    const res = await checkFn();
    if(res === null) return null 
    else {
      const response = await fetch(`${host}/products?limit=0`);
      const json = await response.json();
      setProducts(json.products)
    }
  }


  const handleGetDetails = async (id: number) => {
      const res = await checkFn();
      if(res === null) return null 
      else {
        const response = await fetch(`${host}/products/${id}`)
        const json = await response.json();
        return json
      }
  }


  const value: any = { getProducts, products, setName, setPassword, name, password, handleLogin, handleGetDetails };
  return (
    <productContext.Provider value={value}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState
