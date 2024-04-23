import React, { FC, ReactNode, useState } from 'react'
import productContext from './productContext'
import thumbnailImg from '../images/dummy.jpg'
import Img from '../images/image.webp'

interface ProductStateProps {
  children: ReactNode;
}

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface ProductContextValue {
  getProducts: () => Promise<null | undefined>;
  products: Product[] | undefined;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  name: string;
  password: string;
  handleLogin: () => Promise<any>;
  handleGetDetails: (id: number) => Promise<{} | null>;
  handleAddItem: (title: string, desc: string, file: File) => Promise<null | undefined>;
  loading: boolean;
  handleDelete: (id: number) => Promise<null | undefined>;
  handleUpdate: (id: number, title: string, desc: string, file: File | null) => Promise<null | undefined>;
}

const ProductState: React.FC<ProductStateProps> = (props: any) => {
  const host = 'https://dummyjson.com'
  const [products, setProducts] = useState<Product[]>([])

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  let data = JSON.parse(localStorage.getItem('products')!) || []

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

  const uploadImage = async (file: File) => {
    let image = ''
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const data = new FormData()
      data.append('file', file!)
      data.append('upload_preset', 'Product-Inventory')
      data.append('cloud_name', "detuevaxw")

      const response = await fetch('https://api.cloudinary.com/v1_1/detuevaxw/image/upload', {
        method: 'post',
        body: data,
      })
      const json = await response.json()
      image = json.url.toString()
      setLoading(false)
    }
    else {
      alert('please upload png or jpeg files or image not found.')
    }
    return image;
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


  const getProducts = async () => {
    const res = await checkFn();
    if (res === null) return null
    else {
      if (data.length === 0) {
        const response = await fetch(`${host}/products?limit=0`);
        const json = await response.json();
        localStorage.setItem('products', JSON.stringify(json.products))
        setProducts(json.products)
      }
      else {
        setProducts(data)
      }
    }
  }


  const handleGetDetails = async (id: number) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      if (id > 0 && id < 100) { const response = await fetch(`${host}/products/${id}`) }
      // const json = await response.json();

      let json: Product = { id, title: "", description: "", images: [], thumbnail: "" };
      for (let i = 0; i < data.length; i++) {
        const pro = data[i]
        if (i === id - 1) {
          json = pro;
          break;
        }
      }
      return json
    }
  }

  const handleAddItem = async (title: string, desc: string, file: File) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      setLoading(true)
      let image = await uploadImage(file)

      const thumbnail = image;
      const images = [image]
      const newItem = {
        id: data.length + 1,
        title: title,
        description: desc,
        thumbnail: thumbnail,
        images: images
      }

      data.push(newItem)
      localStorage.setItem('products', JSON.stringify(data))


      const response = await fetch(`${host}/products/add`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, description: desc })
      })
      const json = await response.json()

    }
  }

  const handleDelete = async (id: number) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      data.splice(id, 1);
      localStorage.setItem('products', JSON.stringify(data));

      if (id != 0 || id < 100) {
        const response = await fetch(`${host}/products/${id}`, {
          method: 'DELETE'
        })
        const json = await response.json()
      }

    }
  }

  const handleUpdate = async (id: number, title: string, desc: string, file: File | null) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      setLoading(true)
      let image = ''
      if(file !== null) {
        image = await uploadImage(file);
      }

      let _id = 0
      for (let i = 0; i < data.length; i++) {
        if (i === id - 1) {
          data[i].title = title;
          data[i].description = desc;
          if(image !== '') {
            data[i].thumbnail = image;
            data[i].images[0] = image;
          }
          _id = data[i].id
          break;
        }
      }
      localStorage.setItem('products', JSON.stringify(data))


      if (_id > 0 && _id <= 100) {
        const response = await fetch(`${host}/products/${_id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: title, description: desc })
        })
        const json = await response.json()
      }
      setLoading(false)
    }
  }
  const value: ProductContextValue = { getProducts, products, setName, setPassword, name, password, handleLogin, handleGetDetails, handleAddItem, loading, handleDelete, handleUpdate }
  return (
    <productContext.Provider value={value}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState
