
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">الخدمة غير موجودة</h1>
        <p className="text-gray-600 mt-4">عفواً، لم نتمكن من العثور على الخدمة التي تبحث عنها.</p>
        <Link to="/services" className="mt-6 inline-block bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
          العودة إلى صفحة الخدمات
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-6xl">{service.icon}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">{service.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-8 space-y-6">
            {service.details.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
          </div>

          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">هل أنت مهتم بهذه الخدمة؟</h2>
            <p className="text-gray-600 mt-2 mb-6">تواصل معنا اليوم للحصول على مزيد من المعلومات أو لبدء مشروعك.</p>
            <Link to="/contact" className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-transform transform hover:scale-105 duration-300">
                تواصل معنا الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
