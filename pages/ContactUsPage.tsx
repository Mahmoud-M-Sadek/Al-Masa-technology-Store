
import React from 'react';
import { STORE_ADDRESS, STORE_PHONE, FACEBOOK_URL, TIKTOK_URL, INSTAGRAM_URL, STORE_PHONE_INTERNATIONAL } from '../constants';
import { FacebookIcon, TiktokIcon, WhatsAppIcon, InstagramIcon } from '../components/icons/Icons';

const ContactUsPage: React.FC = () => {
    const whatsappUrl = `https://wa.me/${STORE_PHONE_INTERNATIONAL}`;
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS)}`;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">تواصل معنا</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">نحن هنا لمساعدتك. لا تتردد في التواصل معنا.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-start">
                <span className="mt-1 ml-3 text-red-600">📍</span>
                <div>
                  <h3 className="font-semibold">العنوان</h3>
                  <p className="text-gray-600">{STORE_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mt-1 ml-3 text-red-600">📞</span>
                <div>
                  <h3 className="font-semibold">الهاتف</h3>
                  <a href={`tel:${STORE_PHONE_INTERNATIONAL}`} className="text-gray-600 hover:text-red-600 transition-colors">{STORE_PHONE}</a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mt-1 ml-3 text-red-600">🕒</span>
                <div>
                  <h3 className="font-semibold">ساعات العمل</h3>
                  <p className="text-gray-600">السبت - الخميس: 10:00 صباحاً - 10:00 مساءً</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
                 <h3 className="font-semibold text-lg mb-4">تابعنا على</h3>
                 <div className="flex space-x-4 space-x-reverse">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
                        <WhatsAppIcon className="h-8 w-8" />
                    </a>
                    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                        <FacebookIcon className="h-8 w-8" />
                    </a>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
                        <InstagramIcon className="h-8 w-8" />
                    </a>
                    <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        <TiktokIcon className="h-8 w-8" />
                    </a>
                 </div>
            </div>
          </div>
          
          <div className="rounded-xl shadow-lg overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.864771696495!2d32.5487!3d29.9829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU4JzU4LjQiTiAzMsKwMzInNTUuMyJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="موقع المتجر"
                className='min-h-[400px]'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;