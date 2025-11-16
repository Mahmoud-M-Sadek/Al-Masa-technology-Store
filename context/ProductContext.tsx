import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  getProductById: (productId: number) => Product | undefined;
  updateProductsCategory: (oldCategory: string, newCategory: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prevProducts => [
      ...prevProducts,
      { ...product, id: Date.now() }, // Use timestamp for unique ID
    ]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const getProductById = (productId: number): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  const updateProductsCategory = (oldCategory: string, newCategory: string) => {
    setProducts(prevProducts =>
        prevProducts.map(p => (p.category === oldCategory ? { ...p, category: newCategory } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        updateProductsCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};