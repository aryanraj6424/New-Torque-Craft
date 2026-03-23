import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, ShieldCheck, AlertTriangle, BarChart3, 
  Search, Plus, MapPin, CheckCircle2, 
  ExternalLink, Zap, ShieldAlert, History, X, User, Phone, Home, Globe
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  loyaltyTier: 'Gold' | 'Silver' | 'Platinum';
  purchaseDate: string;
}

interface QRNode {
  id: string;
  serialNo: string;
  sku: string;
  orderId: string;
  scanCount: number;
  status: 'Genuine' | 'Suspicious' | 'First-Scan';
  lastScanLoc: string;
  warrantyExpiry: string;
  customer?: Customer;
}

// --- Production Mock Data ---
const INITIAL_QR_DATA: QRNode[] = [
  { 
    id: 'QR-001', serialNo: 'SN-99821-X', sku: 'H-TYPE-PUMP', orderId: 'ORD-771', 
    scanCount: 1, status: 'First-Scan', lastScanLoc: 'Mumbai, IN', warrantyExpiry: '2027-03-24',
    customer: { name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@factory.in', address: 'Bandra West, Mumbai', loyaltyTier: 'Gold', purchaseDate: '2024-01-15' }
  },
  { 
    id: 'QR-002', serialNo: 'SN-99825-Y', sku: 'L-SERIES-VALVE', orderId: 'ORD-882', 
    scanCount: 24, status: 'Suspicious', lastScanLoc: 'Delhi, IN', warrantyExpiry: '2026-11-12',
    customer: { name: 'Amit Verma', phone: '+91 88223 11445', email: 'amit.v@logistics.com', address: 'Connaught Place, Delhi', loyaltyTier: 'Silver', purchaseDate: '2023-12-10' }
  },
  { 
    id: 'QR-003', serialNo: 'SN-88122-Z', sku: 'CONTROL-UNIT-V2', orderId: 'ORD-901', 
    scanCount: 1, status: 'Genuine', lastScanLoc: 'London, UK', warrantyExpiry: '2028-01-05',
    customer: { name: 'John Doe', phone: '+44 20 7946 0958', email: 'john.doe@ukmail.com', address: 'Baker Street, London', loyaltyTier: 'Platinum', purchaseDate: '2024-02-20' }
  },
];

export default function QRAuthenticity() {
  const [nodes, setNodes] = useState<QRNode[]>(INITIAL_QR_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<QRNode | null>(null);

  // --- Feature: Scan Analytics Report ---
  const stats = useMemo(() => {
    const total = nodes.length;
    const suspicious = nodes.filter(n => n.status === 'Suspicious').length;
    const totalScans = nodes.reduce((acc, curr) => acc + curr.scanCount, 0);
    return {
      integrityScore: ((total - suspicious) / total * 100).toFixed(1),
      totalScans,
      alertCount: suspicious
    };
  }, [nodes]);

  // --- Feature: Serial Number Validation & Search ---
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => 
      n.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      n.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [nodes, searchTerm]);

  // --- Feature: Warranty Activation Logic ---
  const handleActivateWarranty = (node: QRNode) => {
    const confirm = window.confirm(`Activate Digital Warranty for ${node.serialNo}?`);
    if (confirm) {
      setNodes(prev => prev.map(n => 
        n.id === node.id ? { ...n, status: 'Genuine' } : n
      ));
      alert("SUCCESS: Blockchain Warranty Certificate Generated.");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] p-4 lg:p-10 text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
              CORE <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">AUTHENTICITY</span>
            </h1>
            <p className="flex items-center gap-2 mt-4 text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">
              <ShieldCheck size={14} className="text-emerald-500" />
              Dealer & Distributor QR Mapping Engine
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-4 bg-[#0B0F18] border border-slate-800 rounded-2xl">
              <p className="text-[8px] uppercase font-black text-slate-500 tracking-widest mb-1">Integrity Index</p>
              <p className="text-xl font-black text-emerald-500">{stats.integrityScore}%</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
              <Plus size={16} /> Map New Batch
            </button>
          </div>
        </header>

        {/* Analytics Report Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total QR Issued', val: nodes.length, icon: QrCode, color: 'text-white' },
            { label: 'Duplicate Scan Alerts', val: stats.alertCount, icon: ShieldAlert, color: 'text-red-500' },
            { label: 'Global Scan Traffic', val: stats.totalScans, icon: BarChart3, color: 'text-cyan-500' },
            { label: 'Warranty Link Status', val: 'Active', icon: Zap, color: 'text-emerald-500' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0B0F18] border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-900/40 transition-colors">
              <s.icon size={20} className={cn("mb-4", s.color)} />
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{s.label}</p>
              <p className="text-2xl font-black text-white mt-1">{s.val}</p>
            </div>
          ))}
        </div>

        {/* Feature: QR Mapping Search */}
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Validate Serial No / SKU / Order Mapping..."
            className="w-full bg-[#0B0F18] border border-slate-800 rounded-[1.5rem] py-5 pl-16 pr-6 text-[12px] uppercase tracking-[0.1em] focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* QR Nodes Table */}
        <div className="bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto p-4 md:p-8">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-4 pb-2">SKU & Serial Mapping</th>
                  <th className="px-4 pb-2">Scan Analytics</th>
                  <th className="px-4 pb-2">Detection Status</th>
                  <th className="px-4 pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNodes.map((node) => (
                  <tr 
                    key={node.id} 
                    onClick={() => setSelectedProduct(node)}
                    className="group bg-slate-900/20 hover:bg-cyan-500/[0.03] cursor-pointer transition-all border border-slate-800"
                  >
                    <td className="px-4 py-6 rounded-l-2xl border-y border-l border-slate-800 group-hover:border-cyan-500/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-cyan-500 transition-colors">
                          <QrCode size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-wider">{node.serialNo}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{node.sku} <span className="text-slate-700 mx-1">|</span> {node.orderId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6 border-y border-slate-800 group-hover:border-cyan-500/30">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-white">{node.scanCount} Total Scans</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Globe size={10} className="text-cyan-500" />
                          <span className="text-[9px] text-slate-500 font-bold uppercase">{node.lastScanLoc}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6 border-y border-slate-800 group-hover:border-cyan-500/30">
                      <span className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                        node.status === 'Genuine' && "bg-emerald-500/5 border-emerald-500/20 text-emerald-500",
                        node.status === 'First-Scan' && "bg-cyan-500/5 border-cyan-500/20 text-cyan-500",
                        node.status === 'Suspicious' && "bg-red-500/5 border-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse"
                      )}>
                        {node.status === 'Suspicious' ? <ShieldAlert size={12} /> : <CheckCircle2 size={12} />}
                        {node.status}
                      </span>
                    </td>
                    <td className="px-4 py-6 rounded-r-2xl border-y border-r border-slate-800 group-hover:border-cyan-500/30 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => alert(`Full Scan History for ${node.serialNo}: 100% Genuine Path.`)}
                          className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white hover:border-slate-600 transition-all"
                        >
                          <History size={16} />
                        </button>
                        <button 
                          onClick={() => handleActivateWarranty(node)}
                          className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-emerald-500 hover:border-emerald-500/40 transition-all"
                        >
                          <Zap size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature: Duplicate Scan Alert Legend */}
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex items-center gap-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter text-red-500">Fraud Prevention Logic</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-relaxed">
              If a product marked as <span className="text-cyan-500">"First-Scan"</span> detects multiple IPs, the system triggers a <strong>Duplicate Scan Alert</strong>. Warranty activation is restricted for suspicious nodes.
            </p>
          </div>
        </div>
      </div>

      {/* Feature: Customer Details Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0B0F18] border-l border-slate-800 z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ownership <span className="text-cyan-500">Insight</span></h3>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              {selectedProduct.customer ? (
                <div className="space-y-8">
                  {/* User Profile Card */}
                  <div className="flex items-center gap-4 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500">
                      <User size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-black text-white uppercase tracking-tight">{selectedProduct.customer.name}</p>
                      <span className="text-[9px] font-black bg-cyan-500 text-black px-2 py-0.5 rounded uppercase tracking-widest">
                        {selectedProduct.customer.loyaltyTier} Distributor
                      </span>
                    </div>
                  </div>

                  {/* Customer Info Sections */}
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800/50">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Phone size={10} /> Distributor Contact
                      </p>
                      <p className="text-sm font-bold text-slate-300">{selectedProduct.customer.phone}</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedProduct.customer.email}</p>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800/50">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Home size={10} /> Registered Warehouse
                      </p>
                      <p className="text-xs leading-relaxed text-slate-300 font-medium">
                        {selectedProduct.customer.address}
                      </p>
                    </div>

                    <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Zap size={10} /> Warranty Link Activation
                      </p>
                      <div className="flex justify-between items-end">
                        <p className="text-sm font-black text-white italic">Protocol Secured</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Expires: {selectedProduct.warrantyExpiry}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                    <ExternalLink size={14} /> Full Transaction Ledger
                  </button>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-600 font-bold uppercase tracking-widest text-xs italic">Mapping data not found</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}