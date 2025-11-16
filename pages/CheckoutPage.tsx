
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { CustomerInfo } from '../types';
import { STORE_PHONE_INTERNATIONAL } from '../constants';
import { WhatsAppIcon } from '../components/icons/Icons';

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
  });

  if (cartItems.length === 0 && (window.location.hash !== '#/order-success')) {
      navigate('/cart');
      return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const generateWhatsAppMessage = () => {
    let message = `*طلب جديد من متجر الماسة للتقنية*\n\n`;
    message += `*بيانات العميل:*\n`;
    message += `الاسم: ${customerInfo.name}\n`;
    message += `العنوان: ${customerInfo.address}\n`;
    message += `الهاتف: ${customerInfo.phone}\n\n`;
    message += `*تفاصيل الطلب:*\n`;
    message += `-----------------\n`;
    cartItems.forEach(item => {
      message += `*المنتج:* ${item.name}\n`;
      message += `*الكمية:* ${item.quantity}\n`;
      message += `*السعر:* ${(item.price * item.quantity).toLocaleString()} جنيه\n`;
      message += `-----------------\n`;
    });
    message += `\n*الإجمالي:* ${totalPrice.toLocaleString()} جنيه`;
    return encodeURIComponent(message);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder(cartItems, customerInfo, totalPrice);

    const whatsappUrl = `https://wa.me/${STORE_PHONE_INTERNATIONAL}?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    navigate('/order-success');
  };


  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">إتمام الطلب</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">أدخل بياناتك</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                <input type="text" name="name" id="name" value={customerInfo.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">العنوان بالتفصيل</label>
                <input type="text" name="address" id="address" value={customerInfo.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                <input type="tel" name="phone" id="phone" value={customerInfo.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"/>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 text-lg"
              >
                <WhatsAppIcon className="ml-2" />
                تأكيد الطلب عبر واتساب
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md h-fit sticky top-28">
            <h2 className="text-2xl font-semibold mb-6">ملخص طلبك</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <img src={item.images[0]} alt={item.name} className='w-12 h-12 rounded object-cover ml-3'/>
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} ج</p>
                    </div>
                ))}
            </div>
             <div className="mt-6 pt-6 border-t flex justify-between items-center text-xl">
              <span className="font-semibold">الإجمالي</span>
              <span className="font-bold text-red-600">{totalPrice.toLocaleString()} جنيه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
