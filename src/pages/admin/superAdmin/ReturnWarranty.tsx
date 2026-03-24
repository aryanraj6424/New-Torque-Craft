import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, FileSearch, CheckCircle2, 
  XCircle, Image as ImageIcon, Video, ArrowRight, 
  Search, Filter, Plus, CreditCard, History, MoreVertical
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type WorkflowStatus = 'Dealer_Pending' | 'Distributor_Pending' | 'Admin_Pending' | 'Approved' | 'Rejected';

interface WarrantyCase {
  id: string; // Case ID: WRY-XXXX
  productName: string;
  dealerName: string;
  distributorName: string;
  status: WorkflowStatus;
  fraudFlag: 'Low' | 'Medium' | 'High';
  evidence: { type: 'image' | 'video'; url: string }[];
  amount: number;
  createdAt: string;
}

// --- Initial Mock Data ---
const INITIAL_CASES: WarrantyCase[] = [
  {
    id: 'WRY-8821',
    productName: 'Torque X-100 Alloy',
    dealerName: 'Apex Wheels Noida',
    distributorName: 'North India Logistics',
    status: 'Admin_Pending',
    fraudFlag: 'Low',
    evidence: [{ type: 'image', url: 'crack_rim.jpg' }, { type: 'video', url: 'rotation_wobble.mp4' }],
    amount: 12500,
    createdAt: '2026-03-22'
  },
  {
    id: 'WRY-9012',
    productName: 'ViserFly Flight Hub',
    dealerName: 'Skyline Tech',
    distributorName: 'Global Avio Dist',
    status: 'Distributor_Pending',
    fraudFlag: 'High',
    evidence: [{ type: 'image', url: 'burnt_circuit.jpg' }],
    amount: 45000,
    createdAt: '2026-03-24'
  }
];

export default function ReturnWarranty() {
  const [cases, setCases] = useState<WarrantyCase[]>(INITIAL_CASES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<WarrantyCase | null>(null);

  // --- 1. Case Generation Logic ---
  const generateNewCase = () => {
    const newId = `WRY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: WarrantyCase = {
      id: newId,
      productName: "New Module Intake",
      dealerName: "Manual Admin Entry",
      distributorName: "Direct Factory",
      status: 'Admin_Pending',
      fraudFlag: 'Low',
      evidence: [],
      amount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCases([newEntry, ...cases]);
  };

  // --- 2. Approval Logic ---
  const handleDecision = (id: string, decision: 'Approved' | 'Rejected') => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: decision } : c));
    setSelectedCase(null);
  };

  // --- 3. Filter Logic ---
  const filteredCases = useMemo(() => {
    return cases.filter(c => 
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cases]);

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
              WARRANTY <span className="text-emerald-500">CONTROL</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-2">
              Super Admin Approval Matrix v4.0
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
              <History size={14} /> Payment Records
            </button>
            <button 
              onClick={generateNewCase}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Plus size={14} /> New Case ID
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending Admin', val: cases.filter(c => c.status === 'Admin_Pending').length, color: 'text-cyan-500' },
            { label: 'Fraud Flags', val: cases.filter(c => c.fraudFlag === 'High').length, color: 'text-red-500' },
            { label: 'Total Approved', val: cases.filter(c => c.status === 'Approved').length, color: 'text-emerald-500' },
            { label: 'System Payout', val: `₹${cases.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}`, color: 'text-white' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0B0F18] border border-slate-800 p-6 rounded-2xl">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{stat.label}</p>
              <p className={cn("text-2xl font-black italic", stat.color)}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="Search by Case ID or Product..."
              className="w-full bg-[#0B0F18] border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-[11px] uppercase tracking-widest outline-none focus:border-emerald-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Filter size={14} /> Filter Status
          </button>
        </div>

        {/* Cases Table */}
        <div className="bg-[#0B0F18] border border-slate-800 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <th className="p-6">Case Identity</th>
                <th className="p-6">Workflow Node</th>
                <th className="p-6">Risk Level</th>
                <th className="p-6">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-6">
                    <p className="text-white font-black italic text-sm tracking-tight">{c.id}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{c.productName}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase border",
                        c.status === 'Approved' ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" :
                        c.status === 'Rejected' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                        "border-cyan-500/30 text-cyan-500 bg-cyan-500/5"
                      )}>
                        {c.status.replace('_', ' ')}
                      </span>
                      <ArrowRight size={12} className="text-slate-700" />
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">
                        Next: {c.status === 'Admin_Pending' ? 'Final Payout' : 'Complete'}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-black uppercase",
                      c.fraudFlag === 'High' ? "text-red-500" : c.fraudFlag === 'Medium' ? "text-orange-500" : "text-emerald-500"
                    )}>
                      {c.fraudFlag === 'High' && <AlertTriangle size={14} className="animate-pulse" />}
                      {c.fraudFlag} Risk
                    </div>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => setSelectedCase(c)}
                      className="px-4 py-2 bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 rounded-lg text-[10px] font-black uppercase text-white transition-all"
                    >
                      Audit & Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedCase(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Info */}
                <div className="p-10 border-r border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-emerald-500" size={32} />
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Audit Case {selectedCase.id}
                      </h2>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Final Authorization Layer</p>
                    </div>
                  </div>

                  <div className="space-y-6 mt-10">
                    <div>
                      <label className="text-[9px] font-black text-slate-500 uppercase">Approval Trail</label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-300">Dealer (Apex Wheels)</span>
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-300">Distributor (North India)</span>
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                      <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase mb-2">
                        <AlertTriangle size={14} /> AI Fraud Scan
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {selectedCase.fraudFlag === 'High' 
                          ? "CRITICAL: Image patterns suggest previous claim duplication. Manual verification required."
                          : "No significant anomalies detected in image metadata."}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => handleDecision(selectedCase.id, 'Rejected')}
                        className="flex-1 py-4 bg-red-600/10 border border-red-600 text-red-600 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                      >
                        Reject Claim
                      </button>
                      <button 
                        onClick={() => handleDecision(selectedCase.id, 'Approved')}
                        className="flex-1 py-4 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20"
                      >
                        Authorize Payout
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Evidence */}
                <div className="p-10 bg-slate-950/50">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FileSearch size={14} /> Submitted Evidence Matrix
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedCase.evidence.map((ev, i) => (
                      <div key={i} className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center group relative overflow-hidden">
                        {ev.type === 'image' ? <ImageIcon size={24} className="text-slate-700" /> : <Video size={24} className="text-slate-700" />}
                        <span className="text-[8px] font-black text-slate-600 uppercase mt-2">{ev.type} Node</span>
                        <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in">
                          <span className="bg-white text-black px-3 py-1 rounded text-[8px] font-black uppercase tracking-tighter">View Full</span>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-square border border-dashed border-slate-800 rounded-2xl flex items-center justify-center">
                      <Plus size={20} className="text-slate-800" />
                    </div>
                  </div>
                  
                  <div className="mt-10 p-6 bg-[#0B0F18] border border-slate-800 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-black text-slate-500 uppercase">Refund Value</span>
                      <span className="text-xl font-black text-white italic">₹{selectedCase.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <CreditCard size={14} className="text-emerald-500" />
                      <span className="text-[8px] font-black text-emerald-500 uppercase">Payment Destination: Linked Dealer Wallet</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}