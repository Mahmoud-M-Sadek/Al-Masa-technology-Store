
import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE, FACEBOOK_URL, TIKTOK_URL, INSTAGRAM_URL, STORE_PHONE_INTERNATIONAL } from '../constants';
import { FacebookIcon, TiktokIcon, WhatsAppIcon, InstagramIcon } from './icons/Icons';

const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${STORE_PHONE_INTERNATIONAL}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-red-500 mb-4">{STORE_NAME}</h3>
            <p className="text-gray-400 mb-2">{STORE_ADDRESS}</p>
            <p className="text-gray-400">
              <a href={`tel:${STORE_PHONE_INTERNATIONAL}`} className="hover:text-red-500 transition-colors">
                هاتف: {STORE_PHONE}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-red-500 transition-colors">المنتجات</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <FacebookIcon />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <InstagramIcon />
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <TiktokIcon />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} {STORE_NAME}. كل الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;