import './App.css';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import ProductState from './ProductsContext/ProductState';

function App() {
  return (
    <ProductState>
      <div className="bg-body-secondary">
        <Navbar />
        <HomePage />
      </div>
    </ProductState>
  );
}

export default App;
