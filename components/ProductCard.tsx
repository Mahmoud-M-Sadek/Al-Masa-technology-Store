
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 flex-grow">
          <Link to={`/products/${product.id}`} className="hover:text-red-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-baseline mb-4">
          <p className="text-xl font-bold text-red-600">{product.price.toLocaleString()} جنيه</p>
          {product.oldPrice && (
            <p className="text-sm text-gray-500 line-through mr-2">{product.oldPrice.toLocaleString()} جنيه</p>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={!product.isAvailable}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-300 ${
            product.isAvailable
              ? 'bg-black hover:bg-red-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {product.isAvailable ? 'أضف إلى السلة' : 'غير متوفر'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
