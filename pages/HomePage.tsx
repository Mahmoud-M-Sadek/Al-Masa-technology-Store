
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { FACEBOOK_URL, TIKTOK_URL, INSTAGRAM_URL, STORE_PHONE_INTERNATIONAL } from '../constants';
import { FacebookIcon, TiktokIcon, WhatsAppIcon, InstagramIcon } from '../components/icons/Icons';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const latestProducts = products.slice(-4).reverse();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const whatsappUrl = `https://wa.me/${STORE_PHONE_INTERNATIONAL}`;

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-4 animate-fade-in-down">متجر الماسة للتقنية</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">وجهتك الأولى لكل ما يخص الكمبيوتر واللابتوب في السويس</p>
          <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-transform transform hover:scale-105 duration-300">
            تصفح المنتجات
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">أقسام المتجر</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="block p-4 bg-white text-center rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="font-semibold">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">أحدث المنتجات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">الأكثر مبيعاً</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Digital Marketing Section */}
      <section className="bg-red-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">خدمات التسويق الرقمي</h2>
            <p className="max-w-2xl mx-auto mb-6">هل تحتاج إلى تعزيز وجودك على الإنترنت؟ نقدم خدمات تسويق رقمي احترافية لمساعدتك في الوصول إلى جمهور أوسع وتحقيق أهدافك.</p>
            <Link to="/services" className="bg-white text-red-700 font-bold py-2 px-6 rounded-md hover:bg-gray-200 transition-colors">
                اعرف المزيد
            </Link>
        </div>
      </section>

       {/* Quick Contact */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-6">تواصل معنا بسرعة</h3>
          <div className="flex justify-center items-center space-x-6 space-x-reverse">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-300 hover:text-green-500 transition-colors">
              <WhatsAppIcon className="w-10 h-10 mb-1" />
              <span>واتساب</span>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-300 hover:text-blue-500 transition-colors">
              <FacebookIcon className="w-10 h-10 mb-1" />
              <span>فيسبوك</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-300 hover:text-pink-500 transition-colors">
              <InstagramIcon className="w-10 h-10 mb-1" />
              <span>انستجرام</span>
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
              <TiktokIcon className="w-10 h-10 mb-1" />
              <span>تيك توك</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;