import React, { createContext, useContext, useState, useEffect } from 'react';

interface Dealer {
  id: string;
  businessName: string;
  email: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dateJoined: string;
}

interface DealerContextType {
  dealers: Dealer[];
  updateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  addDealerRequest: (newDealer: Dealer) => void; // Naya function add kiya
}

const DealerContext = createContext<DealerContextType | undefined>(undefined);

export const DealerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dealers, setDealers] = useState<Dealer[]>([]);

  // 1. Initial Load: LocalStorage se data uthao, agar nahi hai toh mock data use karo
  useEffect(() => {
    const savedDealers = localStorage.getItem('tc_dealers');
    if (savedDealers) {
      setDealers(JSON.parse(savedDealers));
    } else {
      const mockDealers: Dealer[] = [
        { id: '1', businessName: 'Turbo Performance Noida', email: 'turbo@noida.com', location: 'UP', status: 'Pending', dateJoined: '2026-03-05' },
        { id: '2', businessName: 'Elite Offroad Delhi', email: 'elite@delhi.com', location: 'Delhi', status: 'Approved', dateJoined: '2026-02-28' },
      ];
      setDealers(mockDealers);
    }
  }, []);

  // 2. Persistence: Jab bhi dealers state change ho, save it
  useEffect(() => {
    if (dealers.length > 0) {
      localStorage.setItem('tc_dealers', JSON.stringify(dealers));
    }
  }, [dealers]);

  // Status update karne ke liye (Approve/Reject)
  const updateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  // Naya dealer form se add karne ke liye
  const addDealerRequest = (newDealer: Dealer) => {
    setDealers(prev => [newDealer, ...prev]);
  };

  return (
    <DealerContext.Provider value={{ dealers, updateStatus, addDealerRequest }}>
      {children}
    </DealerContext.Provider>
  );
};

export const useDealers = () => {
  const context = useContext(DealerContext);
  if (!context) throw new Error("useDealers must be used within a DealerProvider");
  return context;
};