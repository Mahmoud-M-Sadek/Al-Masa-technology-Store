
import React from 'react';
import { STORE_PHONE_INTERNATIONAL } from '../constants';
import { WhatsAppIcon } from './icons/Icons';
import { CartItem, Product } from '../types';

interface WhatsAppButtonProps {
  product?: Product;
  cartItems?: CartItem[];
  totalPrice?: number;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product, cartItems, totalPrice }) => {
  const generateMessage = () => {
    let message = '';
    if (product) {
      const productUrl = `${window.location.origin}/#/products/${product.id}`;
      message = `مرحباً، أود طلب المنتج التالي:\n\n*اسم المنتج:* ${product.name}\n*السعر:* ${product.price.toLocaleString()} جنيه\n*رابط المنتج:* ${productUrl}\n\n`;
    } else if (cartItems && totalPrice) {
      message = 'مرحباً، أود طلب المنتجات التالية من سلة التسوق:\n\n';
      cartItems.forEach(item => {
        message += `*المنتج:* ${item.name}\n*الكمية:* ${item.quantity}\n*السعر:* ${(item.price * item.quantity).toLocaleString()} جنيه\n-----------------\n`;
      });
      message += `\n*الإجمالي:* ${totalPrice.toLocaleString()} جنيه`;
    }
    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/${STORE_PHONE_INTERNATIONAL}?text=${generateMessage()}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
    >
      <WhatsAppIcon className="ml-2"/>
      <span>اطلب عبر واتساب</span>
    </a>
  );
};

export default WhatsAppButton;
