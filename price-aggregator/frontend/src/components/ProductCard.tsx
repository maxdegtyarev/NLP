import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  store: string;
  imageUrl: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="store">{product.store}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        {product.rating && (
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < product.rating! ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 