import React, { createContext, useContext, useState, useEffect } from 'react';

interface Warranty {
  id: string;
  customerName: string;
  email: string;
  sku: string; // Product ID
  purchaseDate: string;
  invoiceNumber: string;
  status: 'Active' | 'Expired' | 'Pending Verification';
}

interface WarrantyContextType {
  warranties: Warranty[];
  registerWarranty: (data: Warranty) => void;
}

const WarrantyContext = createContext<WarrantyContextType | undefined>(undefined);

export const WarrantyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tc_warranties');
    if (saved) setWarranties(JSON.parse(saved));
  }, []);

  const registerWarranty = (newWarranty: Warranty) => {
    const updated = [newWarranty, ...warranties];
    setWarranties(updated);
    localStorage.setItem('tc_warranties', JSON.stringify(updated));
  };

  return (
    <WarrantyContext.Provider value={{ warranties, registerWarranty }}>
      {children}
    </WarrantyContext.Provider>
  );
};

export const useWarranty = () => {
  const context = useContext(WarrantyContext);
  if (!context) throw new Error("useWarranty must be used within WarrantyProvider");
  return context;
};