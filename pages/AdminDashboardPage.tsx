
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types';

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');

  const { products, deleteProduct, updateProductsCategory } = useProducts();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { orders } = useOrders();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ oldName: string; newName: string } | null>(null);

  // Order Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const TabButton = ({ tabName, label }: { tabName: string, label: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-red-600 text-white'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">لوحة التحكم</h1>
        
        <div className="mb-8 flex space-x-2 space-x-reverse border-b">
           <TabButton tabName="products" label="إدارة المنتجات" />
           <TabButton tabName="categories" label="إدارة الأقسام" />
           <TabButton tabName="orders" label="إدارة الطلبات" />
        </div>

        <div>
            {activeTab === 'products' && (
                 <div>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">المنتجات</h2>
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
            )}
            
            {activeTab === 'categories' && (
                <div>
                     <h2 className="text-2xl font-bold text-gray-800 mb-4">الأقسام</h2>
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
            )}
            
            {activeTab === 'orders' && (
                 <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">الطلبات الواردة</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                         <table className="min-w-full leading-normal">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">رقم الطلب</th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">العميل</th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">التاريخ</th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-right">الإجمالي</th>
                                <th className="px-5 py-3 border-b-2 border-gray-300 text-center">إجراءات</th>
                            </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? [...orders].reverse().map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{order.id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{order.customer.name}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{new Date(order.date).toLocaleDateString('ar-EG')}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm font-semibold">{order.total.toLocaleString()} جنيه</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                                            <button onClick={() => setSelectedOrder(order)} className="text-indigo-600 hover:text-indigo-900">
                                                عرض التفاصيل
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-gray-500">لا توجد طلبات حالياً.</td>
                                    </tr>
                                )}
                            </tbody>
                         </table>
                    </div>
                </div>
            )}
        </div>

        {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                         <h3 className="text-xl font-bold">تفاصيل الطلب #{selectedOrder.id}</h3>
                         <button onClick={() => setSelectedOrder(null)} className="text-gray-500 text-3xl hover:text-gray-800">&times;</button>
                    </div>
                    <div className='p-6'>
                        <div className='mb-6'>
                            <h4 className='font-bold text-lg mb-2'>بيانات العميل</h4>
                            <p><strong>الاسم:</strong> {selectedOrder.customer.name}</p>
                            <p><strong>العنوان:</strong> {selectedOrder.customer.address}</p>
                            <p><strong>الهاتف:</strong> {selectedOrder.customer.phone}</p>
                            <p><strong>تاريخ الطلب:</strong> {new Date(selectedOrder.date).toLocaleString('ar-EG', { dateStyle: 'full', timeStyle: 'short' })}</p>
                        </div>
                        <div>
                            <h4 className='font-bold text-lg mb-2'>المنتجات المطلوبة</h4>
                            <div className="space-y-4">
                                {selectedOrder.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded-md">
                                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} جنيه</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t text-right">
                            <p className="text-xl font-bold">الإجمالي: <span className='text-red-600'>{selectedOrder.total.toLocaleString()} جنيه</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboardPage;
