import { createContext } from 'react';

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
  handleGetDetails: (id: number) => Promise<any | null>;
  handleAddItem: (title: string, desc: string, file: File) => Promise<null | undefined>;
  loading: boolean;
  handleDelete: (id: number) => Promise<null | undefined>;
  handleUpdate: (id: number, title: string, desc: string, file: File | null) => Promise<null | undefined>;
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
    handleUpdate: async () => null
  });

export default productContext;
