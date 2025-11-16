
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import WhatsAppButton from '../components/WhatsAppButton';
import { TrashIcon } from '../components/icons/Icons';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  return (
    <div className="bg-gray-100 py-12 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">سلة التسوق</h1>

        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">سلتك فارغة!</h2>
            <p className="text-gray-500 mt-2">لم تقم بإضافة أي منتجات إلى السلة بعد.</p>
            <Link
              to="/products"
              className="mt-6 inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors"
            >
              ابدأ التسوق
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">المنتجات ({itemCount})</h2>
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-grow">
                      <Link to={`/products/${item.id}`} className="font-semibold hover:text-red-600">{item.name}</Link>
                      <p className="text-gray-600 mt-1">{item.price.toLocaleString()} جنيه</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 p-2 border rounded-md text-center"
                      />
                    </div>
                    <p className="font-semibold w-24 text-center">
                      {(item.price * item.quantity).toLocaleString()} جنيه
                    </p>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600">
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                <h2 className="text-2xl font-semibold mb-6">ملخص الطلب</h2>
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span>الإجمالي</span>
                  <span className="font-bold text-xl">{totalPrice.toLocaleString()} جنيه</span>
                </div>
                <div className="mt-8">
                  <WhatsAppButton cartItems={cartItems} totalPrice={totalPrice} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
