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
    categories: []
  });

export default productContext;
