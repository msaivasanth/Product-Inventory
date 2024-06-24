import React, { FC, ReactNode, useState } from 'react'
import productContext from './productContext'
import thumbnailImg from '../images/dummy.jpg'
import Img from '../images/image.webp'
import { Search } from 'react-router-dom';

interface ProductStateProps {
  children: ReactNode;
}

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: string
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
  handleAddItem: (title: string, desc: string, price: string, rating: string, brand: string, category: string, thumbnail: File, file: File) => Promise<null | undefined>;
  loading: boolean;
  handleDelete: (id: number) => Promise<null | undefined>;
  handleUpdate: (id: number, title: string, desc: string, file: File | null, thumbnail: File | null, rating: string, brand: string, category: string, price: string) => Promise<null | undefined>;
  search: string;
  setSearch: (search: string) => void;
  handleSearch: (search: string) => Promise<undefined | null>;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void
  searchSuggestions: (search: string) => Promise<Product[] | undefined>
  selected: boolean;
  setSelected: (selected: boolean) => void;
  selectedCategories: (cat: string) => Promise<Product[] | undefined>
}

const ProductState: React.FC<ProductStateProps> = (props: any) => {
  const host = 'https://dummyjson.com'
  const azure_api = "https://productinventorybackend.azurewebsites.net"
  const [products, setProducts] = useState<Product[]>([])

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)

  let data = JSON.parse(localStorage.getItem('products')!) || []

  // To handle the login functionality.
  const handleLogin = async () => {
    const response = await fetch(`${azure_api}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username: name, password: password })
    })

    const json = await response.json();
    return json
  }

  // To upload an image to cloud
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

  // To validate the token status expired or not.
  const checkFn = async () => {
    const check = await fetch(`${azure_api}/api/user/me`, {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
    const checkRes = await check.json()
    if (checkRes.message !== "Token is valid") {
      localStorage.removeItem('token')
      // navigate('/login')
      return null
    }
  }

 // To fetch all the products.
  const getProducts = async () => {
    const res = await checkFn();
    if (res === null) return null
    else {
      const response = await fetch(`${azure_api}/api/products`);
      const json = await response.json();
      setProducts(json);
    }
  }

 // To fetch details of a product.
  const handleGetDetails = async (id: number) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      const response = await fetch(`${azure_api}/api/products/${id}`);
      const json = response.json();
      return json;

    }
  }

  // To add a new proudct Item.
  const handleAddItem = async (title: string, desc: string, price: string, rating: string, brand: string, category: string, thumbnail: File, file: File) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      setLoading(true)
      let image = await uploadImage(file);
      let thumb = await uploadImage(thumbnail)

      const images = [image]
      const newItem = {
        title: title,
        description: desc,
        price: parseInt(price),
        rating: parseFloat(rating),
        brand: brand,
        category: category,
        thumbnail: thumb,
        images: images
      }
      
      const response = await fetch(`${azure_api}/api/products/addProduct`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      })
      const json = await response.json()
      
    }
  }

  // To delete an existing product.
  const handleDelete = async (id: number) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      const response = await fetch(`${azure_api}/api/products/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = response.json();
      return json;
    }
  }

  // To update an existing product.
  const handleUpdate = async (id: number, title: string, desc: string, file: File | null, thumbnail: File | null, rating: string, brand: string, category: string, price: string) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      let images = [];
      if(file != null) {
        let image = await uploadImage(file);
        images = [image];
      }
      else {
        images = [null]
      }

      let thumb = "null";
      if(thumbnail != null) {
        thumb = await uploadImage(thumbnail);
      }
      
      const updateItem = {
        id: id,
        title: title,
        description: desc,
        price: parseInt(price),
        rating: parseFloat(rating),
        brand: brand,
        category: category,
        thumbnail: thumb,
        images: images
      }

      const response = await fetch(`${azure_api}/api/products/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateItem)
      })

      const json = await response.json();
      return json;
    }
  }

  // To fetch the products based on search value.
  const handleSearch = async (search: string) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      setLoading(true)
      let result = data.filter((product: Product) => {
        if(product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || product.description.toLowerCase().indexOf(search.toLowerCase()) !== -1) return product;
      })
      setProducts(result)
      
  
      const resp = await fetch(`${host}/products/search?q=${search}`)
      const json = resp.json();
      setLoading(false)
      setIsSearch(true)
    }
  }

  // To give suggestions to enterd value in search.
  const searchSuggestions = async (search: string) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      const filteredResult = data.filter((product: Product) => {
        if(search && product.title.toLowerCase().includes(search.toLowerCase())) {
          return product.title
        }
      })
      return filteredResult;
    }
  }

  const selectedCategories = async (cat: string) => {
    setSelected(true)
    const res = await checkFn();
    if (res === null) return null
    else {
      let res = data.filter((product: Product) => {
        return cat == product.category;
      })

      setProducts(res);
      setSelected(true)
      
      return res
    }
  }
  const value: ProductContextValue = { getProducts, products, setName, setPassword, name, password, handleLogin, handleGetDetails, handleAddItem, loading, handleDelete, handleUpdate, search, setSearch, handleSearch, isSearch, setIsSearch, searchSuggestions, setSelected, selected, selectedCategories }
  return (
    <productContext.Provider value={value}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState
