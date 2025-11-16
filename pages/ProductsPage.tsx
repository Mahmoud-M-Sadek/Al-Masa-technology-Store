
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Category } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  );

  const handleCategoryChange = (category: Category | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        selectedCategory === 'all' ? true : product.category === selectedCategory
      )
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">منتجاتنا</h1>
        <p className="text-gray-600 mt-2">تصفح مجموعتنا الواسعة من أحدث المنتجات التقنية</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">الأقسام</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-right px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  كل المنتجات
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-right px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === cat ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-700">لا توجد منتجات تطابق بحثك</h2>
              <p className="text-gray-500 mt-2">حاول تغيير كلمات البحث أو الفلترة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;