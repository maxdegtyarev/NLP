import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import './styles/components.css'

interface Product {
  id: string;
  name: string;
  price: number;
  store: string;
  imageUrl: string;
  rating?: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>BestPrice</h1>
        <p>Find the best deals across multiple stores</p>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(p) => window.open(`/product/${p.id}`, '_blank')}
              />
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2024 BestPrice. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
