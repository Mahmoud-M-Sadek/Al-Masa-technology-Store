
import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">خدماتنا</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">نقدم حلولاً تقنية متكاملة تلبي جميع احتياجاتك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.slug} 
              to={`/services/${service.slug}`}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-right"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">{service.description}</p>
              <span className="mt-4 font-semibold text-red-600 hover:text-red-800">اعرف المزيد &larr;</span>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800">هل لديك استفسار؟</h2>
            <p className="text-gray-600 mt-2 mb-6">فريقنا جاهز للإجابة على جميع أسئلتك.</p>
            <Link to="/contact" className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-transform transform hover:scale-105 duration-300">
                تواصل معنا
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;