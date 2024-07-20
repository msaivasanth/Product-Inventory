import React, { FC, ReactNode, RefObject, useRef, useState } from 'react'
import productContext from './productContext'
import thumbnailImg from '../images/dummy.jpg'
import Img from '../images/image.webp'
import { Search } from 'react-router-dom';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

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
  searchSuggestions: (search: string) => Promise<Product[] | null>
  selected: boolean;
  setSelected: (selected: boolean) => void;
  selectedCategories: (cat: string) => Promise<Product[] | null>
  categories: String[],
  sendEmail: (email: string) => Promise<string | null>,
  SignUp: (name: string, email: string, password: string, gender: string) => Promise<string | null>,
  verifyOtp: (otp: string) => Promise<string | null>,
  fetchChats: () => Promise<void>,
  getUsers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  getMessages: (id: string, chatName: string) => Promise<void>,
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  createChat: (id: string, sender: string, senderName: string) => Promise<void>,
  joinRoom: (user: string, room: string, name: string) => Promise<void>,
  closeConnection: () => Promise<void>,
  chats: [],
  val: string,
  setVal: (val: string) => void,
  messages: [],
  ref:  RefObject<HTMLButtonElement> | null,
  users: [],
  userId: string,
  selectedChat: string,
  message: string,
  setMessage: (message: string) => void,
  setSelectedChat: (selectedChat: string) => void
}

const ProductState: React.FC<ProductStateProps> = (props: any) => {
  const host = 'http://localhost:5103'
  const azure_api = "https://productinventorybackend.azurewebsites.net"
  const [products, setProducts] = useState<Product[]>([])

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)
  const [data, setData] = useState<Product[]>([])
  const [categories, setCategories] = useState<String[]>([]);

  // UseStates related to chat feature
  const Id = localStorage.getItem("user");
  const [chats, setChats] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<string>("");
  const [users, setUsers] = useState<[]>([]);
  const [val, setVal] = useState<string>("");
  const [userId, setUserId] = useState<string>(Id!)
  
  const [connection, setConnection] = useState<HubConnection>();

  const ref = useRef<HTMLButtonElement | null>(null)


  // To handle the login functionality.
  const handleLogin = async () => {
    const response = await fetch(`${host}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({ username: name, password: password })
    })

    const json = await response.json();
    
    if(!json.token) {
      return {token: undefined}
    }
    else {
      const c_resp = await fetch(`${host}/api/Chat/user/${json.user.email}`);
      const c_json = await c_resp.json();
  
      localStorage.setItem("user", c_json.id);
      setUserId(c_json.id);
  
      return json
    }
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
    const check = await fetch(`${host}/api/user/me`, {
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
      const response = await fetch(`${host}/api/products`);
      const json = await response.json();
      setProducts(json);
      setData(json)

      // To fetch categories
      const resp = await fetch(`${host}/api/products/categories`);
      const json2 = await resp.json();
      setCategories(json2);
    }
  }

  // To fetch details of a product.
  const handleGetDetails = async (id: number) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      const response = await fetch(`${host}/api/products/${id}`);
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

      const response = await fetch(`${host}/api/products/addProduct`, {
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
      const response = await fetch(`${host}/api/products/deleteProduct/${id}`, {
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
      if (file != null) {
        let image = await uploadImage(file);
        images = [image];
      }
      else {
        images = [null]
      }

      let thumb = "null";
      if (thumbnail != null) {
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

      const response = await fetch(`${host}/api/products/update/${id}`, {
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
      const response = await fetch(`${host}/api/products/search/${search}`);
      const json = await response.json();

      setProducts(json);

      setLoading(false)
      setIsSearch(true)
    }
  }

  // To give suggestions to enterd value in search.
  const searchSuggestions = async (search: string) => {
    const res = await checkFn();
    if (res === null) return null
    else {
      console.log(data)
      const filteredResult = data.filter((product: Product) => {
        if (search && product.title.toLowerCase().includes(search.toLowerCase())) {
          return product.title
        }
      })
      return filteredResult;
    }
  }

  // Return products related to selected category.
  const selectedCategories = async (cat: string) => {
    setIsSearch(false)
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

  // Sends email to registered user.
  const sendEmail = async (email: string) => {
    const response = await fetch(`${host}/api/user/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ to: email })
    })
    const json = await response.json();
    return json.result;
  }

  // User registration.
  const SignUp = async (name: string, email: string, password: string, gender: string) => {
    const response = await fetch(`${host}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Name: name, Email: email, Password: password, Gender: gender })
    })
    const json = await response.json();
    return json.result;
  }

  // Verify the otp.
  const verifyOtp = async (otp: string) => {
    const response = await fetch(`${host}/api/user/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otp })
    });
    const json = await response.json();
    return json.result;
  }


  //Functions Related to chat and webscokets(SingalR)
  // 1. Fetch all the chats of a user
  const fetchChats = async () => {
    const response = await fetch(`http://localhost:5103/api/Chat/getAllChats/${userId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const json = await response.json();
    setChats(json)

  }

  // 2. Search users based on the name
  const getUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(users)
    ref.current?.click();
    if (val.length !== 0 || val !== "") {
        const respone = await fetch(`http://localhost:5103/api/Chat/users/${val}`);
        const json = await respone.json();
        console.log(json)
        setUsers(json)
    }
    if(val.length === 0) setUsers([])
    setVal("")
  }

  // 3. Fetch messages related to a chat
  const getMessages = async (id: string, chatName: string) => {
    setSelectedChat(chatName);
    setChatId(id)
    const response = await fetch(`http://localhost:5103/api/Chat/fetchMessages/${id}`);
    const json = await response.json();
    setMessages(json);
  }

  // 4. Send message to selected user
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5103/api/Chat/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sender: userId, content: message, chat: chatId })
    })
    const json = await response.json();
    console.log(json)

    await connection?.invoke("SendMessage", message)

    await getMessages(chatId, selectedChat);
    setMessage("")
  }

  // 5. Fetch a chat on searched chats
  const createChat = async (id: string, sender: string, senderName: string) => {
    const response = await fetch(`http://localhost:5103/api/Chat/chat/${id}/${sender}`);
    const json = await response.json();
    console.log(json)

    await getMessages(json.id, senderName);
  }

  // 6. Join the room for real time chatting, between sender and receiver
  const joinRoom = async (user: string, room: string, name: string) => {
    try {
        const connection = new HubConnectionBuilder().withUrl("http://localhost:5103/chatRoom")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", (message) => {
            console.log(`mesage received: ${message}`)
            getMessages(room, user);
        })

        connection.onclose((e) => {
            setConnection(undefined)
        })

        await connection.start();
        
        
        const User = name;
        await connection.invoke("JoinRoom", {User, room});
      
        setConnection(connection)

        // await connection.stop();
        // setConnection(undefined);
    } catch (error) {
        console.log(error)
    }
  }

  // 7. Close the socket connection from the user, this helps user to come out of the room
  const closeConnection = async () => {
    try {
        await connection?.stop();
    } catch (error) {
        console.log(error)
    }
  }

  const value: ProductContextValue = { getProducts, products, setName, setPassword, name, password, handleLogin, handleGetDetails, handleAddItem, loading, handleDelete, handleUpdate, search, setSearch, handleSearch, isSearch, setIsSearch, searchSuggestions, setSelected, selected, selectedCategories, categories, sendEmail, verifyOtp, SignUp, fetchChats, getUsers, getMessages, handleSendMessage, createChat, joinRoom, closeConnection, chats, val, setVal, messages, ref, users, userId, selectedChat, message, setMessage, setSelectedChat }
  return (
    <productContext.Provider value={value}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState
