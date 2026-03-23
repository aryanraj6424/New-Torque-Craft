import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, UserPlus, FileText, QrCode, ShieldCheck, 
  Download, MoreVertical, X, CheckCircle2, AlertCircle, 
  RotateCcw, User, Mail, Phone, MapPin, Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  status: 'Active' | 'Flagged';
  joinDate: string;
}

interface OrderHistory {
  id: string;
  date: string;
  product: string;
  amount: number;
  status: 'Delivered' | 'Refunded' | 'Replaced';
  warrantyStatus: 'Valid' | 'Expired' | 'Claimed';
  qrVerified: boolean;
  type: 'Orders' | 'QR' | 'Warranty' | 'Refunds'; 
}

// --- Mock Data ---
const CUSTOMERS: Customer[] = [
  { id: 'CUS-101', name: 'Rajesh Diesel Works', email: 'rajesh@diesel.com', phone: '+91 98765 43210', location: 'Mumbai, MH', totalOrders: 12, status: 'Active', joinDate: '2024-01-15' },
  { id: 'CUS-102', name: 'Precision Motors', email: 'info@precision.in', phone: '+91 88822 11100', location: 'Delhi, NCR', totalOrders: 5, status: 'Active', joinDate: '2024-02-20' },
  { id: 'CUS-103', name: 'Aggarwal Spare Parts', email: 'sales@aggarwal.com', phone: '+91 70011 22233', location: 'Ludhiana, PB', totalOrders: 28, status: 'Flagged', joinDate: '2023-11-05' },
];

const ORDER_LOGS: OrderHistory[] = [
  { id: 'INV-2026-01', date: '2026-03-10', product: 'Main Stud Kit 12V', amount: 299, status: 'Delivered', warrantyStatus: 'Valid', qrVerified: true, type: 'Orders' },
  { id: 'INV-2026-05', date: '2026-02-15', product: 'Head Stud Kit 24V', amount: 450, status: 'Refunded', warrantyStatus: 'Claimed', qrVerified: true, type: 'Refunds' },
  { id: 'INV-2026-09', date: '2026-01-20', product: 'Gasket Set Pro', amount: 120, status: 'Replaced', warrantyStatus: 'Valid', qrVerified: false, type: 'Warranty' },
  { id: 'QR-8821', date: '2026-03-12', product: 'Turbo Bolt Set', amount: 45, status: 'Delivered', warrantyStatus: 'Valid', qrVerified: true, type: 'QR' },
  { id: 'QR-9902', date: '2026-03-15', product: 'Piston Ring Set', amount: 85, status: 'Delivered', warrantyStatus: 'Valid', qrVerified: true, type: 'QR' },
  { id: 'WR-441', date: '2026-02-10', product: 'Camshaft Kit', amount: 550, status: 'Replaced', warrantyStatus: 'Claimed', qrVerified: true, type: 'Warranty' },
];

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'Orders' | 'QR' | 'Warranty' | 'Refunds'>('Orders');
  const [showAddModal, setShowAddModal] = useState(false);

  // --- PDF Download Function ---
  const handleDownloadInvoice = (orderId: string) => {
    const content = `Invoice ID: ${orderId}\nCustomer: ${selectedCustomer?.name}\nDate: ${new Date().toLocaleDateString()}\nStatus: Verified`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Filtering Logic for Logs ---
  const filteredLogs = ORDER_LOGS.filter(log => {
    if (activeTab === 'Orders') return true; // History tab shows all
    return log.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              CUSTOMER <span className="text-cyan-500">DATABASE</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-2">Global CRM & Order Verification</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20"
          >
            <UserPlus size={14} /> Add New Partner
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Customer List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Search customers..."
                className="w-full bg-[#0B0F18] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {filteredCustomers.map((customer) => (
                <motion.div 
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  whileHover={{ x: 5 }}
                  className={cn(
                    "p-4 rounded-[1.5rem] border cursor-pointer transition-all",
                    selectedCustomer?.id === customer.id 
                      ? "bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/5" 
                      : "bg-[#0B0F18] border-slate-800/50 hover:border-slate-600"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500 font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{customer.name}</h4>
                        <p className="text-[10px] text-slate-500">{customer.id}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[8px] px-2 py-1 rounded-full font-black uppercase",
                      customer.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {customer.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Details & Logs */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedCustomer ? (
                <motion.div 
                  key={selectedCustomer.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  {/* Profile Header */}
                  <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900/50 to-transparent">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-3xl bg-cyan-600 flex items-center justify-center text-3xl font-black text-white italic shadow-xl shadow-cyan-500/20">
                          {selectedCustomer.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-white tracking-tight italic uppercase">{selectedCustomer.name}</h2>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold"><Mail size={12} className="text-cyan-500"/> {selectedCustomer.email}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold"><Phone size={12} className="text-cyan-500"/> {selectedCustomer.phone}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold"><MapPin size={12} className="text-cyan-500"/> {selectedCustomer.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-start">
                        <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"><MoreVertical size={18}/></button>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="flex border-b border-slate-800 px-8 bg-slate-900/20">
                    {[
                      { id: 'Orders', icon: FileText, label: 'History' },
                      { id: 'QR', icon: QrCode, label: 'QR Logs' },
                      { id: 'Warranty', icon: ShieldCheck, label: 'Warranty' },
                      { id: 'Refunds', icon: RotateCcw, label: 'Refunds' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          "flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
                          activeTab === tab.id ? "text-cyan-500" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        <tab.icon size={14} /> {tab.label}
                        {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />}
                      </button>
                    ))}
                  </div>

                  {/* Table Content */}
                  <div className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                            <th className="pb-4">Transaction Details</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Verification</th>
                            <th className="pb-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                            <tr key={log.id} className="group hover:bg-slate-800/20 transition-colors">
                              <td className="py-4">
                                <p className="text-sm font-bold text-white uppercase italic">{log.product}</p>
                                <p className="text-[10px] text-slate-500">{log.id} • {log.date}</p>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-2">
                                  {log.status === 'Delivered' && <CheckCircle2 size={14} className="text-emerald-500" />}
                                  {log.status === 'Refunded' && <RotateCcw size={14} className="text-red-500" />}
                                  {log.status === 'Replaced' && <AlertCircle size={14} className="text-orange-500" />}
                                  <span className="text-[10px] font-bold uppercase">{log.status}</span>
                                </div>
                              </td>
                              <td className="py-4">
                                <div className={cn(
                                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-black uppercase",
                                  log.qrVerified ? "bg-cyan-500/10 text-cyan-500" : "bg-slate-800 text-slate-500"
                                )}>
                                  <QrCode size={12} /> {log.qrVerified ? 'Verified' : 'Manual'}
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                <button 
                                  onClick={() => handleDownloadInvoice(log.id)}
                                  className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all shadow-sm"
                                >
                                  <Download size={14} />
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={4} className="py-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest">
                                No logs found in this category
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[600px] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600">
                  <User size={48} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Select a customer to view logs</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ADD MODAL --- */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0B0F18] border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-sm font-black uppercase tracking-widest text-white italic">Register Partner</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <input type="text" placeholder="Partner Name" className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition-all" />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition-all" />
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-4 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-2 hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Confirm Registration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}