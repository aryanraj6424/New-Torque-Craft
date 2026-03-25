import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Plus, Trash2, Edit3, Save, X, 
  Play, Pause, Target, BarChart3, TrendingUp,
  Mail, Send, Smartphone
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Campaign {
  id: number;
  name: string;
  type: 'Email' | 'SMS' | 'Push Notification';
  status: 'Active' | 'Paused' | 'Ended';
  reach: string;
  conversion: string;
  budget: string;
}

export default function Campaigns() {
  // --- Data State ---
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Q1 Tech Gear Blast', type: 'Email', status: 'Active', reach: '45.2K', conversion: '3.8%', budget: '$1,200' },
    { id: 2, name: 'Flash Sale SMS', type: 'SMS', status: 'Paused', reach: '12.1K', conversion: '5.2%', budget: '$450' },
    { id: 3, name: 'App Re-engagement', type: 'Push Notification', status: 'Active', reach: '89K', conversion: '1.2%', budget: '$800' },
  ]);

  // --- UI States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // --- Handlers ---
  const handleDelete = (id: number) => {
    if (window.confirm("Permanently terminate this campaign? Data cannot be recovered.")) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'Active' ? 'Paused' : 'Active';
        return { ...c, status: newStatus as any };
      }
      return c;
    }));
  };

  const openModal = (campaign?: Campaign) => {
    setEditingCampaign(campaign || {
      id: Date.now(),
      name: '',
      type: 'Email',
      status: 'Paused',
      reach: '0',
      conversion: '0%',
      budget: '$0'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign?.name) return alert("Campaign name is mandatory.");

    const exists = campaigns.find(c => c.id === editingCampaign.id);
    if (exists) {
      setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? editingCampaign : c));
    } else {
      setCampaigns(prev => [editingCampaign, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/50 pb-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic flex items-center gap-3">
            <Rocket className="text-cyan-500" size={24} /> Campaign Command
          </h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Multi-Channel Deployment System</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
        >
          <Plus size={16} /> Deploy New Campaign
        </button>
      </div>

      {/* Stats Summary - Mini Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Live Now', val: campaigns.filter(c => c.status === 'Active').length, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Avg Conv.', val: '3.4%', icon: Target, color: 'text-cyan-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#05070A] border border-slate-800/50 p-4 rounded-2xl">
            <p className="text-[8px] uppercase font-black text-slate-500 tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-center gap-2">
              <stat.icon size={14} className={stat.color} />
              <span className="text-xl font-black text-white italic">{stat.val}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode='popLayout'>
          {campaigns.map((campaign) => (
            <motion.div 
              layout
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B0F18] border border-slate-800/60 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group"
            >
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Info & Type */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center border",
                    campaign.status === 'Active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-slate-800/50 border-slate-700 text-slate-500"
                  )}>
                    {campaign.type === 'Email' && <Mail size={20} />}
                    {campaign.type === 'SMS' && <Send size={20} />}
                    {campaign.type === 'Push Notification' && <Smartphone size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{campaign.name}</h4>
                    <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em]">{campaign.type}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-8 w-full md:w-auto px-6 border-x border-slate-800/50">
                  <div className="text-center">
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Reach</p>
                    <p className="text-xs font-black text-white italic">{campaign.reach}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Conv.</p>
                    <p className="text-xs font-black text-emerald-400 italic">{campaign.conversion}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Budget</p>
                    <p className="text-xs font-black text-white italic">{campaign.budget}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => toggleStatus(campaign.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all",
                      campaign.status === 'Active' ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                    )}
                  >
                    {campaign.status === 'Active' ? <><Pause size={12}/> Pause</> : <><Play size={12}/> Resume</>}
                  </button>
                  <button onClick={() => openModal(campaign)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg transition-all">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(campaign.id)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 rounded-lg transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {isModalOpen && editingCampaign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-[#05070A] border border-slate-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm italic">Config Campaign</h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">Internal Campaign Name</label>
                  <input 
                    autoFocus 
                    type="text" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" 
                    value={editingCampaign.name} 
                    onChange={e => setEditingCampaign({...editingCampaign, name: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Channel Type</label>
                    <select 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-[10px] font-bold outline-none" 
                      value={editingCampaign.type} 
                      onChange={e => setEditingCampaign({...editingCampaign, type: e.target.value as any})}
                    >
                      <option>Email</option>
                      <option>SMS</option>
                      <option>Push Notification</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Allocated Budget</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" 
                      value={editingCampaign.budget} 
                      onChange={e => setEditingCampaign({...editingCampaign, budget: e.target.value})} 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-900/40">
                  <Save size={16} /> Save Configuration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



