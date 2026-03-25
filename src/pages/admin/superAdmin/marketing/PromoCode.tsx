import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, Plus, Trash2, Edit3, Save, X, 
  Copy, Check, Search, Calendar, 
  Hash, Percent, AlertCircle, Power
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface PromoCode {
  id: number;
  code: string;
  discount: string;
  usageLimit: number;
  usedCount: number;
  expiry: string;
  status: 'Active' | 'Disabled' | 'Expired';
}

export default function PromoCode() {
  // --- Data State ---
  const [promos, setPromos] = useState<PromoCode[]>([
    { id: 1, code: 'TECHNO2026', discount: '20%', usageLimit: 1000, usedCount: 450, expiry: '2026-12-31', status: 'Active' },
    { id: 2, code: 'WELCOME50', discount: '$50', usageLimit: 500, usedCount: 500, expiry: '2026-06-01', status: 'Expired' },
    { id: 3, code: 'FLASH30', discount: '30%', usageLimit: 200, usedCount: 12, expiry: '2026-04-15', status: 'Disabled' },
  ]);

  // --- UI States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // --- Handlers ---
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this promo code? This will prevent any future usage.")) {
      setPromos(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setPromos(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Disabled' : 'Active';
        return { ...p, status: nextStatus as any };
      }
      return p;
    }));
  };

  const openModal = (promo?: PromoCode) => {
    setEditingPromo(promo || {
      id: Date.now(),
      code: '',
      discount: '',
      usageLimit: 100,
      usedCount: 0,
      expiry: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo?.code || !editingPromo?.discount) return alert("All fields are required.");

    const exists = promos.find(p => p.id === editingPromo.id);
    if (exists) {
      setPromos(prev => prev.map(p => p.id === editingPromo.id ? editingPromo : p));
    } else {
      setPromos(prev => [editingPromo, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPromo(null);
  };

  const filteredPromos = promos.filter(p => 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic flex items-center gap-3">
            <Ticket className="text-cyan-500" size={24} /> Promo Systems
          </h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Discount & Voucher Orchestration</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="FILTER CODES..."
              className="bg-[#05070A] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold text-white uppercase tracking-widest outline-none focus:border-cyan-500/50 w-full sm:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            <Plus size={16} /> Generate New
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#0B0F18] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Promo Identifier</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Value</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Usage Analytics</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              <AnimatePresence mode='popLayout'>
                {filteredPromos.map((promo) => (
                  <motion.tr 
                    layout
                    key={promo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-cyan-500">
                          <Hash size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white tracking-tight">{promo.code}</span>
                            <button 
                              onClick={() => copyToClipboard(promo.code, promo.id)}
                              className="text-slate-600 hover:text-white transition-colors"
                            >
                              {copiedId === promo.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                            </button>
                          </div>
                          <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1 uppercase font-bold">
                            <Calendar size={10} /> Exp: {promo.expiry}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] font-black italic tracking-widest">
                        {promo.discount}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="w-32">
                        <div className="flex justify-between text-[8px] font-black uppercase mb-1.5">
                          <span className="text-slate-400">{promo.usedCount} used</span>
                          <span className="text-slate-500">Lmt: {promo.usageLimit}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                            className={cn(
                              "h-full rounded-full",
                              (promo.usedCount / promo.usageLimit) > 0.9 ? "bg-red-500" : "bg-cyan-500"
                            )}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                        promo.status === 'Active' ? "text-emerald-500" : 
                        promo.status === 'Expired' ? "text-red-500/60" : "text-amber-500"
                      )}>
                        {promo.status === 'Active' ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> : <AlertCircle size={12} />}
                        {promo.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => toggleStatus(promo.id)}
                          title={promo.status === 'Active' ? "Disable" : "Enable"}
                          className={cn(
                            "p-2 rounded-lg border transition-all",
                            promo.status === 'Active' ? "border-amber-500/20 text-amber-500 hover:bg-amber-500/10" : "border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10"
                          )}
                        >
                          <Power size={14} />
                        </button>
                        <button onClick={() => openModal(promo)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(promo.id)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredPromos.length === 0 && (
            <div className="p-20 text-center text-slate-600 uppercase text-[10px] font-black tracking-[0.3em]">
              No matching promo protocols found.
            </div>
          )}
        </div>
      </div>

      {/* --- GENERATOR MODAL --- */}
      <AnimatePresence>
        {isModalOpen && editingPromo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }} 
              className="bg-[#05070A] border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-white font-black uppercase tracking-[0.3em] text-sm italic">Promo Configuration</h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">Code Designation</label>
                  <input 
                    autoFocus type="text" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none focus:border-cyan-500 transition-all uppercase" 
                    placeholder="e.g. SUMMER2026"
                    value={editingPromo.code} 
                    onChange={e => setEditingPromo({...editingPromo, code: e.target.value.toUpperCase()})} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Value (%, $)</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none" 
                      placeholder="20% or $50"
                      value={editingPromo.discount} 
                      onChange={e => setEditingPromo({...editingPromo, discount: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Usage Ceiling</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none" 
                      value={editingPromo.usageLimit} 
                      onChange={e => setEditingPromo({...editingPromo, usageLimit: parseInt(e.target.value)})} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Expiry Protocol</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none color-white" 
                    value={editingPromo.expiry} 
                    onChange={e => setEditingPromo({...editingPromo, expiry: e.target.value})} 
                  />
                </div>

                <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-[1.5rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-900/30 mt-4">
                  <Save size={18} /> Deploy Code
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


