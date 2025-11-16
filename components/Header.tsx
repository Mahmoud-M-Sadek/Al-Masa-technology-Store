
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { STORE_NAME } from '../constants';
import { CartIcon, MenuIcon, XIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'العروض', path: '/offers' },
    { name: 'من نحن', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
    // { name: 'إدارة', path: '/admin' }, // Hidden link
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-3 rounded ${
      isActive
        ? 'bg-red-700 text-white md:bg-transparent md:text-red-700 font-bold'
        : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700'
    } transition-colors duration-300`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-black text-red-600">{STORE_NAME}</h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={linkClass}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
             <Link to="/cart" className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">فتح القائمة الرئيسية</span>
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;