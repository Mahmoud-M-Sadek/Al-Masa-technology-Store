
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import WhatsAppButton from '../components/WhatsAppButton';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const product = getProductById(parseInt(id || '0'));
  
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);


  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">المنتج غير موجود</h1>
        <p className="text-gray-600 mt-4">عفواً، لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
        <Link to="/products" className="mt-6 inline-block bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
          العودة إلى صفحة المنتجات
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product);
  };


  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="border rounded-lg mb-4 overflow-hidden">
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover aspect-square" />
            </div>
            <div className="flex space-x-2 space-x-reverse">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 border rounded-md overflow-hidden transition-all duration-200 ${selectedImage === img ? 'border-red-600 ring-2 ring-red-500' : 'border-gray-300'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold my-4">{product.name}</h1>
            
            <div className="flex items-baseline mb-6 space-x-3 space-x-reverse">
              <p className="text-3xl font-bold text-red-600">{product.price.toLocaleString()} جنيه</p>
              {product.oldPrice && (
                <p className="text-xl text-gray-500 line-through">{product.oldPrice.toLocaleString()} جنيه</p>
              )}
            </div>
            
            <div
              className="prose max-w-none text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }}
            />

            <div className="space-y-4">
               <button
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className={`w-full py-3 px-4 rounded-md font-bold text-white transition-colors duration-300 text-lg ${
                    product.isAvailable
                      ? 'bg-black hover:bg-gray-800'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.isAvailable ? 'أضف إلى السلة' : 'غير متوفر حالياً'}
                </button>
              <WhatsAppButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;