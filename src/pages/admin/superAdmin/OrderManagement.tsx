import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { 
  Plus, 
  FileUp, 
  Search, 
  MapPin, 
  User, 
  X, 
  Download,
  Calendar,
  CreditCard,
  Hash,
  Activity
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Constants ---
type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Returned';
type Role = 'Dealer' | 'Distributor';

interface Order {
  id: string;
  buyer: string;
  sku: string;
  country: string;
  role: Role;
  distributor: string;
  status: OrderStatus;
  date: string;
  amount: string;
}

const DISTRIBUTOR_MAP: Record<string, string> = {
  'India': 'North-Zone Hub',
  'USA': 'US-West Logistics',
  'UAE': 'Dubai Central',
  'UK': 'Europe Express',
  'Germany': 'EU-Central Warehouse'
};

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-7740', buyer: 'Apex Motors', sku: 'GFX-990', country: 'India', role: 'Distributor', distributor: 'North-Zone Hub', status: 'Pending', date: '2026-03-22', amount: '₹1,20,000' },
  { id: 'ORD-7741', buyer: 'John Doe', sku: 'GFX-100', country: 'USA', role: 'Dealer', distributor: 'US-West Logistics', status: 'Shipped', date: '2026-03-21', amount: '$4,500' },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newOrder, setNewOrder] = useState({
    buyer: '',
    sku: '',
    country: 'India',
    role: 'Dealer' as Role,
    amount: ''
  });

  // --- PDF Generation Logic ---
  const generateInvoicePDF = (order: Order) => {
    const doc = new jsPDF();
    
    // Design matching the Dark/Cyan theme
    doc.setFillColor(5, 7, 10);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("INVOICE", 20, 25);
    doc.setFontSize(10);
    doc.text(order.id, 160, 25);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 20, 50);
    doc.text(`Buyer: ${order.buyer}`, 20, 60);
    doc.text(`Role: ${order.role}`, 20, 70);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 80, 190, 80);

    doc.text("Description", 20, 95);
    doc.text("SKU", 100, 95);
    doc.text("Amount", 160, 95);

    doc.setFont("helvetica", "bold");
    doc.text("Inventory Batch Release", 20, 110);
    doc.text(order.sku, 100, 110);
    doc.text(order.amount, 160, 110);

    doc.setDrawColor(0, 255, 255); // Cyan accent line
    doc.line(150, 120, 190, 120);
    doc.text(`Total: ${order.amount}`, 155, 130);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Route: ${order.distributor} (${order.country})`, 20, 280);

    doc.save(`Invoice_${order.id}.pdf`);
  };

  // --- Core Functions ---
  const assignDistributor = (country: string) => DISTRIBUTOR_MAP[country] || 'Global Logistics Hub';

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newOrder,
      distributor: assignDistributor(newOrder.country),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    setOrders([order, ...orders]);
    setIsModalOpen(false);
    setNewOrder({ buyer: '', sku: '', country: 'India', role: 'Dealer', amount: '' });
  };

  const handleBulkImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').slice(1);
      const importedOrders: Order[] = rows.map(row => {
        const [buyer, sku, country, role, amount] = row.split(',');
        return {
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          buyer: buyer?.trim(),
          sku: sku?.trim(),
          country: country?.trim(),
          role: (role?.trim() as Role) || 'Dealer',
          distributor: assignDistributor(country?.trim()),
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          amount: amount?.trim() || '₹0'
        };
      }).filter(o => o.buyer);
      setOrders(prev => [...importedOrders, ...prev]);
    };
    reader.readAsText(file);
  };

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilter === 'All' || order.status === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, activeFilter, orders]);

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header (Same as before) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Order <span className="text-cyan-500">Warehouse</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-1">Real-time Inventory Management</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <input type="file" ref={fileInputRef} onChange={handleBulkImport} accept=".csv" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">
              <FileUp size={14} /> Bulk Import
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20">
              <Plus size={14} /> Create Order
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <div className="xl:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type="text" placeholder="Search by Buyer, SKU..." className="w-full bg-[#0B0F18] border border-slate-800 rounded-xl py-3 pl-12 text-sm focus:border-cyan-500 outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-1 bg-[#0B0F18] p-1 border border-slate-800 rounded-xl">
            {(['All', 'Pending', 'Shipped', 'Delivered'] as const).map((status) => (
              <button key={status} onClick={() => setActiveFilter(status)} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all", activeFilter === status ? "bg-cyan-500 text-black" : "text-slate-500 hover:text-slate-300")}>
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0B0F18] border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="p-5">Order Detail</th>
                  <th className="p-5">Segmentation</th>
                  <th className="p-5">Auto-Route</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <AnimatePresence mode='popLayout'>
                  {filteredOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedOrder(order)}
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-white font-black text-sm tracking-tighter">{order.id}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold">{order.date}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-cyan-500" />
                          <span className="text-xs font-bold text-slate-200">{order.buyer}</span>
                        </div>
                        <span className="text-[9px] bg-blue-500/10 px-2 py-0.5 rounded text-blue-400 font-bold uppercase">{order.role}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin size={12} />
                          <span className="text-[11px] font-medium">{order.country}</span>
                        </div>
                      </td>
                      <td className="p-5" onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className={cn("bg-transparent border-none text-[9px] font-black uppercase tracking-widest cursor-pointer", 
                            order.status === 'Pending' ? "text-amber-500" : order.status === 'Shipped' ? "text-blue-500" : "text-emerald-500")}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); generateInvoicePDF(order); }}
                          className="p-2.5 bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-700"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODALS --- */}

        {/* NEW: Order Details Sidebar Drawer */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-[60] flex justify-end">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                className="relative w-full max-w-md bg-[#0B0F18] border-l border-slate-800 h-full p-8 shadow-2xl overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-white uppercase italic">Order <span className="text-cyan-500">Details</span></h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                </div>

                <div className="space-y-6">
                  {/* Status & ID */}
                  <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase">Tracking ID</p>
                      <p className="text-lg font-black text-white">{selectedOrder.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-black uppercase">Current Status</p>
                      <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">{selectedOrder.status}</span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Customer Segmentation</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500"><User size={24}/></div>
                      <div>
                        <p className="font-black text-white">{selectedOrder.buyer}</p>
                        <p className="text-xs text-slate-500">{selectedOrder.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Meta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                       <div className="flex items-center gap-2 text-slate-500 mb-1"><Calendar size={12}/><span className="text-[10px] font-black uppercase">Date</span></div>
                       <p className="text-sm font-bold">{selectedOrder.date}</p>
                    </div>
                    <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                       <div className="flex items-center gap-2 text-slate-500 mb-1"><CreditCard size={12}/><span className="text-[10px] font-black uppercase">Total Amount</span></div>
                       <p className="text-sm font-bold text-cyan-400">{selectedOrder.amount}</p>
                    </div>
                  </div>

                  {/* Routing */}
                  <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 mb-2"><MapPin size={12}/><span className="text-[10px] font-black uppercase">Logistics Path</span></div>
                    <p className="text-sm font-bold text-white">{selectedOrder.country}</p>
                    <p className="text-xs text-slate-500 mt-1 italic">Handled by: {selectedOrder.distributor}</p>
                  </div>

                  <button 
                    onClick={() => generateInvoicePDF(selectedOrder)}
                    className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest rounded-xl transition-all mt-8 flex items-center justify-center gap-3"
                  >
                    <Download size={18}/> Download Invoice PDF
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Existing Create Modal (Same as your code) */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0B0F18] border border-slate-800 w-full max-w-md rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black uppercase italic text-white">Manual <span className="text-cyan-500">Entry</span></h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-500"><X/></button>
                </div>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <input required placeholder="Buyer Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" value={newOrder.buyer} onChange={e => setNewOrder({...newOrder, buyer: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="SKU" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" value={newOrder.sku} onChange={e => setNewOrder({...newOrder, sku: e.target.value})} />
                    <input required placeholder="Amount" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" value={newOrder.amount} onChange={e => setNewOrder({...newOrder, amount: e.target.value})} />
                  </div>
                  <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" value={newOrder.country} onChange={e => setNewOrder({...newOrder, country: e.target.value})}>
                    {Object.keys(DISTRIBUTOR_MAP).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="submit" className="w-full py-4 bg-cyan-600 text-white font-black uppercase tracking-widest rounded-xl">Confirm & Create</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}