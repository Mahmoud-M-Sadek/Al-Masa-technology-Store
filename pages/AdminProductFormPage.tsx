import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Product } from '../types';

const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProducts();
  const { categories } = useCategories();

  const isEditing = Boolean(id);
  
  const [product, setProduct] = useState<Omit<Product, 'id'> | Product>({
    name: '',
    price: 0,
    oldPrice: undefined,
    description: '',
    images: [],
    category: categories[0] || '',
    isAvailable: true,
    isBestSeller: false,
  });
  const [imagesText, setImagesText] = useState('');

  useEffect(() => {
    if (isEditing) {
      const existingProduct = getProductById(parseInt(id!));
      if (existingProduct) {
        setProduct(existingProduct);
        setImagesText(existingProduct.images.join(', '));
      } else {
        // Handle case where product is not found
        navigate('/admin');
      }
    } else {
        // Set default category for new product
        setProduct(prev => ({...prev, category: categories[0] || ''}));
    }
  }, [id, isEditing, getProductById, navigate, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setProduct(prev => ({ ...prev, [name]: checked }));
    } else {
        setProduct(prev => ({ ...prev, [name]: type === 'number' && name !== 'oldPrice' ? parseFloat(value) || 0 : (name === 'oldPrice' ? (value ? parseFloat(value) : undefined) : value) }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setImagesText(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imagesText.split(',').map(url => url.trim()).filter(url => url);
    if(images.length === 0) {
        alert("الرجاء إضافة رابط صورة واحدة على الأقل.");
        return;
    }
    const productData = {...product, images};

    if (isEditing) {
      updateProduct(productData as Product);
    } else {
      addProduct(productData);
    }
    navigate('/admin');
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المنتج</label>
              <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر (جنيه)</label>
                    <input type="number" name="price" id="price" value={product.price} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
                </div>
                 <div>
                    <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">السعر القديم (اختياري)</label>
                    <input type="number" name="oldPrice" id="oldPrice" value={product.oldPrice || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
                </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">القسم</label>
              <select name="category" id="category" value={product.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
              <textarea name="description" id="description" value={product.description} onChange={handleChange} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"></textarea>
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">روابط الصور (مفصولة بفاصلة)</label>
              <textarea name="images" id="images" value={imagesText} onChange={handleImageChange} rows={3} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"></textarea>
            </div>
            
            <div className="flex items-start space-x-4 space-x-reverse">
                <div className="flex items-center h-5">
                    <input id="isAvailable" name="isAvailable" type="checkbox" checked={product.isAvailable} onChange={handleChange} className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" />
                </div>
                <div className="text-sm">
                    <label htmlFor="isAvailable" className="font-medium text-gray-700">متوفر</label>
                </div>

                 <div className="flex items-center h-5">
                    <input id="isBestSeller" name="isBestSeller" type="checkbox" checked={product.isBestSeller || false} onChange={handleChange} className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" />
                </div>
                <div className="text-sm">
                    <label htmlFor="isBestSeller" className="font-medium text-gray-700">الأكثر مبيعاً</label>
                </div>
            </div>

            <div className="flex justify-end space-x-3 space-x-reverse">
                <Link to="/admin" className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                    إلغاء
                </Link>
                <button type="submit" className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                    {isEditing ? 'حفظ التغييرات' : 'إضافة المنتج'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductFormPage;