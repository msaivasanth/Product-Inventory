import { HubConnection } from '@microsoft/signalr';
import { createContext, RefObject } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface Message {
  id: string, 
  sender: string,
  content: string,
  chat: string
}
interface ProductContextValue {
  getProducts: () => Promise<null | undefined>;
  products: Product[] | undefined;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  name: string;
  password: string;
  handleLogin: () => Promise<any>;
  handleGetDetails: (id: number) => Promise<any | null>;
  handleAddItem: (title: string, desc: string, price: string, rating: string, brand: string, category: string, thumbnail: File, file: File) => Promise<null | undefined>;
  loading: boolean;
  handleDelete: (id: number) => Promise<null | undefined>;
  handleUpdate: (id: number, title: string, desc: string, file: File | null, thumbnail: File | null, rating: string, brand: string, category: string, price: string) => Promise<null | undefined>;
  search: string;
  setSearch: (search: string) => void
  handleSearch: (search: string) => Promise<undefined | null>;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void
  searchSuggestions: (search: string) => Promise<Product[] | null>
  selected: boolean;
  setSelected: (selected: boolean) => void
  selectedCategories: (cat: string) => Promise<Product[] | null>
  categories: String[];
  sendEmail: (email: string) => Promise<string | null>
  SignUp: (name: string, email: string, password: string, gender: string) => Promise<string | null>
  verifyOtp: (otp: string) => Promise<string | null>,

  fetchChats: () => Promise<void>,
  getUsers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  getMessages: (id: string, chatName: string) => Promise<void>,
  handleSendMessage: () => Promise<void>,
  createChat: (id: string, sender: string, senderName: string) => Promise<void>,
  joinRoom: (user1: string, room: string, receiverId: string) => Promise<void>,
  closeConnection: () => Promise<void>,
  chats: [],
  val: string,
  setVal: (val: string) => void,
  messages: Message[],
  ref:  RefObject<HTMLButtonElement> |null,
  users: [],
  userId: string,
  selectedChat: string,
  message: string,
  setMessage: (message: string) => void,
  setSelectedChat: (selectedChat: string) => void,
  chatId: string,
  connection: HubConnection | undefined,
  notifications: Message[]
  setNotifications: (notifcations: Message[]) => void,
  setMessages: (messages: Message[]) => void,
  setConnection: (connection: HubConnection | undefined) => void,
}

const productContext = createContext<ProductContextValue>({
    getProducts: async () => null,
    products: undefined,
    setName: () => {},
    setPassword: () => {},
    name: '',
    password: '',
    handleLogin: async () => {},
    handleGetDetails: async () => null,
    handleAddItem: async () => null,
    loading: false,
    handleDelete: async () => null,
    handleUpdate: async () => null,
    search: '',
    setSearch: () => {},
    handleSearch: async () => null,
    isSearch: false,
    setIsSearch: () => {},
    searchSuggestions: async () => null,
    selected: false,
    setSelected: () => {},
    selectedCategories: async () => null,
    categories: [],
    sendEmail: async () => null,
    SignUp: async () => null,
    verifyOtp: async () => null,
    fetchChats: async () => {},
    getUsers: async () => {},
    getMessages: async () => {},
    handleSendMessage: async () => {},
    createChat: async () => {},
    joinRoom: async () => {},
    closeConnection: async () => {},
    chats: [],
    val: "",
    setVal: () => {},
    messages: [],
    ref: null,
    users: [],
    userId: "",
    selectedChat: "",
    message: "",
    setMessage: () => {},
    setSelectedChat: () => {},
    chatId: "",
    connection: undefined,
    notifications: [],
    setNotifications: () => {},
    setMessages: () => {},
    setConnection: () => {},
  });

export default productContext;
