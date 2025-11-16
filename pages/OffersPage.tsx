
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const OffersPage: React.FC = () => {
  const { products } = useProducts();
  const discountedProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">العروض والخصومات</h1>
        <p className="text-gray-600 mt-2">لا تفوت أفضل العروض على منتجاتنا المختارة!</p>
      </div>

      {discountedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700">لا توجد عروض حالياً</h2>
          <p className="text-gray-500 mt-2">تابعنا لمعرفة أحدث الخصومات قريباً.</p>
          <Link
              to="/products"
              className="mt-6 inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors"
            >
              تصفح كل المنتجات
            </Link>
        </div>
      )}
    </div>
  );
};

export default OffersPage;