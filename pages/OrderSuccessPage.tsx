
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg">
        <div className="text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">تم استلام طلبك بنجاح!</h1>
        <p className="text-gray-600 mt-4">
            شكراً لك. سيقوم فريقنا بالتواصل معك قريباً لتأكيد الطلب وتفاصيل الشحن.
        </p>
        <div className="mt-8">
            <Link 
              to="/" 
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
