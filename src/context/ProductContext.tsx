import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

// Product Type Definition
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  sku: string;
  price?: number;
  details?: {
    material?: string;
    torque?: string;
  };
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // 1. Initial Load Logic: Pehle LocalStorage check karo, fir JSON
  useEffect(() => {
    const savedProducts = localStorage.getItem('tc_inventory');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error parsing local storage data", error);
        setProducts(productsData);
      }
    } else {
      setProducts(productsData);
    }
  }, []);

  // 2. Persistence Logic: Jab bhi products state change ho, LocalStorage update karo
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('tc_inventory', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    // Future: API Call (POST)
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    
    // Agar saare products delete ho jayein toh storage empty karo
    if (updatedProducts.length === 0) {
      localStorage.setItem('tc_inventory', JSON.stringify([]));
    }
    // Future: API Call (DELETE)
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts((prev) => prev.map(p => p.id === id ? updatedProduct : p));
    // Future: API Call (PUT/PATCH)
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};