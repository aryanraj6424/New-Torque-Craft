import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Plus, Trash2, Edit3, Save, X, 
  Search, Users, HandCoins, Award, 
  ArrowUpRight, CheckCircle2, Clock, Filter
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Referral {
  id: number;
  userName: string;
  referralCode: string;
  successfulReferrals: number;
  totalEarned: string;
  status: 'Pending' | 'Paid' | 'Processing';
  tier: 'Gold' | 'Silver' | 'Bronze';
}

export default function ReferralTracking() {
  // --- Data State ---
  const [referrals, setReferrals] = useState<Referral[]>([
    { id: 1, userName: 'John Wick', referralCode: 'WICK44', successfulReferrals: 128, totalEarned: '$1,280', status: 'Paid', tier: 'Gold' },
    { id: 2, userName: 'Emma Stone', referralCode: 'EMMA99', successfulReferrals: 45, totalEarned: '$450', status: 'Pending', tier: 'Silver' },
    { id: 3, userName: 'Ray Palmer', referralCode: 'ATOM10', successfulReferrals: 12, totalEarned: '$120', status: 'Processing', tier: 'Bronze' },
  ]);

  // --- UI States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  // --- Handlers ---
  const handleDelete = (id: number) => {
    if (window.confirm("Remove this referral record?")) {
      setReferrals(prev => prev.filter(r => r.id !== id));
    }
  };

  const processPayout = (id: number) => {
    setReferrals(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'Paid' } : r
    ));
    alert("Payout sequence initiated successfully.");
  };

  const openModal = (ref?: Referral) => {
    setEditingReferral(ref || {
      id: Date.now(),
      userName: '',
      referralCode: '',
      successfulReferrals: 0,
      totalEarned: '$0',
      status: 'Pending',
      tier: 'Bronze'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReferral?.userName || !editingReferral?.referralCode) return alert("Fill required fields.");

    const exists = referrals.find(r => r.id === editingReferral.id);
    if (exists) {
      setReferrals(prev => prev.map(r => r.id === editingReferral.id ? editingReferral : r));
    } else {
      setReferrals(prev => [editingReferral, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReferral(null);
  };

  const filteredReferrals = referrals.filter(r => 
    r.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Global Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic flex items-center gap-3">
            <Share2 className="text-cyan-500" size={24} /> Network Tracking
          </h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Growth & Affiliate Analytics</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH USER / CODE..."
              className="bg-[#05070A] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold text-white uppercase tracking-widest outline-none focus:border-cyan-500/50 w-full sm:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            <Plus size={16} /> Manual Entry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals', val: '2,480', icon: Users, color: 'text-cyan-500' },
          { label: 'Pending Payouts', val: '$3,150', icon: HandCoins, color: 'text-amber-500' },
          { label: 'Top Tier users', val: '12', icon: Award, color: 'text-emerald-500' },
          { label: 'Conv. Rate', val: '14.2%', icon: ArrowUpRight, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0B0F18] border border-slate-800/50 p-5 rounded-2xl">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-white italic">{stat.val}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Referrals Table */}
      <div className="bg-[#0B0F18] border border-slate-800/60 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/40 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Referrer Details</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-center">Tier Status</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-center">Successful</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-center">Commission</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              <AnimatePresence mode='popLayout'>
                {filteredReferrals.map((ref) => (
                  <motion.tr layout key={ref.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center font-black text-cyan-500 text-xs">
                          {ref.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-white uppercase tracking-tight">{ref.userName}</div>
                          <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{ref.referralCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest border",
                        ref.tier === 'Gold' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : 
                        ref.tier === 'Silver' ? "bg-slate-300/10 text-slate-300 border-slate-300/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                      )}>
                        {ref.tier}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center font-black text-white italic">{ref.successfulReferrals}</td>
                    <td className="px-6 py-5 text-center font-black text-emerald-400 italic">{ref.totalEarned}</td>
                    <td className="px-6 py-5">
                      <div className={cn(
                        "flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest",
                        ref.status === 'Paid' ? "text-emerald-500" : 
                        ref.status === 'Processing' ? "text-cyan-500" : "text-amber-500"
                      )}>
                        {ref.status === 'Paid' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                        {ref.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {ref.status !== 'Paid' && (
                          <button 
                            onClick={() => processPayout(ref.id)}
                            className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                            title="Release Payout"
                          >
                            <HandCoins size={14} />
                          </button>
                        )}
                        <button onClick={() => openModal(ref)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(ref.id)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {isModalOpen && editingReferral && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }} 
              className="bg-[#05070A] border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-white font-black uppercase tracking-[0.3em] text-sm italic">Referrer Protocol</h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">User Full Name</label>
                  <input autoFocus type="text" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none focus:border-cyan-500 transition-all" value={editingReferral.userName} onChange={e => setEditingReferral({...editingReferral, userName: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Referral Code</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none focus:border-cyan-500 transition-all uppercase" value={editingReferral.referralCode} onChange={e => setEditingReferral({...editingReferral, referralCode: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Reward Tier</label>
                    <select className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-[10px] font-black outline-none" value={editingReferral.tier} onChange={e => setEditingReferral({...editingReferral, tier: e.target.value as any})}>
                      <option>Bronze</option>
                      <option>Silver</option>
                      <option>Gold</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Conversion Count</label>
                    <input type="number" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none" value={editingReferral.successfulReferrals} onChange={e => setEditingReferral({...editingReferral, successfulReferrals: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Total Commission</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm outline-none" value={editingReferral.totalEarned} onChange={e => setEditingReferral({...editingReferral, totalEarned: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-[1.5rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-900/30">
                  <Save size={18} /> Update Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

