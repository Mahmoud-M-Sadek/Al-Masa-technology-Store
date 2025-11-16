import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

const AdminDashboardPage: React.FC = () => {
  const { products, deleteProduct, updateProductsCategory } = useProducts();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ oldName: string; newName: string } | null>(null);

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      deleteProduct(id);
    }
  };
  
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    } else {
        alert('اسم القسم موجود بالفعل أو غير صالح.');
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
      const isCategoryInUse = products.some(p => p.category === categoryName);
      if(isCategoryInUse) {
          alert('لا يمكن حذف هذا القسم لأن هناك منتجات مرتبطة به. يرجى تغيير قسم هذه المنتجات أولاً.');
          return;
      }
    if (window.confirm(`هل أنت متأكد أنك تريد حذف قسم "${categoryName}"؟`)) {
      deleteCategory(categoryName);
    }
  };
  
  const handleUpdateCategory = () => {
      if (!editingCategory) return;
      const { oldName, newName } = editingCategory;
      if (newName.trim() && !categories.includes(newName.trim())) {
          updateCategory(oldName, newName.trim());
          updateProductsCategory(oldName, newName.trim());
          setEditingCategory(null);
      } else {
          alert('اسم القسم الجديد موجود بالفعل أو غير صالح.');
      }
  };


  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Management */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">إدارة الأقسام</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
                    <input 
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="اسم القسم الجديد"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                    <button type="submit" className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">إضافة قسم</button>
                </form>
                <div className="space-y-3">
                    {categories.map(cat => (
                        <div key={cat} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            {editingCategory?.oldName === cat ? (
                                <div className="flex-grow flex gap-2">
                                    <input 
                                        type="text"
                                        value={editingCategory.newName}
                                        onChange={(e) => setEditingCategory({...editingCategory, newName: e.target.value})}
                                        className="flex-grow px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                    <button onClick={handleUpdateCategory} className="text-sm text-green-600 hover:text-green-900">حفظ</button>
                                    <button onClick={() => setEditingCategory(null)} className="text-sm text-gray-600 hover:text-gray-900">إلغاء</button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-800">{cat}</p>
                                    <div className="space-x-4 space-x-reverse">
                                        <button onClick={() => setEditingCategory({ oldName: cat, newName: cat })} className="text-sm text-indigo-600 hover:text-indigo-900">تعديل</button>
                                        <button onClick={() => handleDeleteCategory(cat)} className="text-sm text-red-600 hover:text-red-900">حذف</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Product Management */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">إدارة المنتجات</h1>
          <Link
            to="/admin/products/new"
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            إضافة منتج جديد
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">المنتج</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">السعر</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">القسم</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-center">الحالة</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16">
                        <img className="w-full h-full rounded object-cover" src={product.images[0]} alt={product.name} />
                      </div>
                      <div className="mr-3">
                        <p className="text-gray-900 font-semibold whitespace-no-wrap">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product.price.toLocaleString()} جنيه</p>
                    {product.oldPrice && (
                        <p className="text-gray-600 line-through whitespace-no-wrap">{product.oldPrice.toLocaleString()} جنيه</p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product.category}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                        product.isAvailable ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'
                      }`}
                    >
                      {product.isAvailable ? 'متوفر' : 'غير متوفر'}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 ml-4"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;