import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users2, Plus, Trash2, Edit3, Save, X, 
  Instagram, Youtube, Twitter, Globe,
  Search, TrendingUp, DollarSign, Award
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Influencer {
  id: number;
  name: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'Twitter';
  followers: string;
  status: 'Active' | 'Negotiating' | 'Ended';
  roi: string;
}

export default function Influencers() {
  // --- Data State ---
  const [influencers, setInfluencers] = useState<Influencer[]>([
    { id: 1, name: 'Alex Rivier', platform: 'Instagram', followers: '1.2M', status: 'Active', roi: '4.5x' },
    { id: 2, name: 'Tech Guru Sam', platform: 'YouTube', followers: '850K', status: 'Active', roi: '3.8x' },
    { id: 3, name: 'Sarah Fashion', platform: 'Instagram', followers: '200K', status: 'Negotiating', roi: '-' },
  ]);

  // --- UI States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);

  // --- Handlers ---
  const handleDelete = (id: number) => {
    if (window.confirm("Remove this influencer from your roster?")) {
      setInfluencers(prev => prev.filter(i => i.id !== id));
    }
  };

  const openModal = (inf?: Influencer) => {
    setEditingInfluencer(inf || {
      id: Date.now(),
      name: '',
      platform: 'Instagram',
      followers: '',
      status: 'Negotiating',
      roi: '-'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInfluencer?.name) return alert("Name is required.");

    const exists = influencers.find(i => i.id === editingInfluencer.id);
    if (exists) {
      setInfluencers(prev => prev.map(i => i.id === editingInfluencer.id ? editingInfluencer : i));
    } else {
      setInfluencers(prev => [editingInfluencer, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInfluencer(null);
  };

  const filteredInfluencers = influencers.filter(inf => 
    inf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic flex items-center gap-3">
            <Users2 className="text-cyan-500" size={24} /> Influencer Roster
          </h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Talent Acquisition & ROI Tracking</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH TALENT..."
              className="bg-[#05070A] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold text-white uppercase tracking-widest outline-none focus:border-cyan-500/50 w-full sm:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
          >
            <Plus size={16} /> Add Influencer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0B0F18] border border-slate-800/50 p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500"><TrendingUp size={20}/></div>
          <div>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Avg. ROI</p>
            <p className="text-lg font-black text-white italic">4.2x</p>
          </div>
        </div>
        <div className="bg-[#0B0F18] border border-slate-800/50 p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Award size={20}/></div>
          <div>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Partners</p>
            <p className="text-lg font-black text-white italic">{influencers.filter(i => i.status === 'Active').length}</p>
          </div>
        </div>
      </div>

      {/* Influencer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredInfluencers.map((inf) => (
            <motion.div 
              layout
              key={inf.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0B0F18] border border-slate-800/60 rounded-3xl p-6 group hover:border-cyan-500/30 transition-all relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className={cn(
                "absolute top-0 right-0 px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-bl-xl",
                inf.status === 'Active' ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-400"
              )}>
                {inf.status}
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-700 group-hover:text-cyan-500 transition-colors">
                  {inf.platform === 'Instagram' && <Instagram size={28} />}
                  {inf.platform === 'YouTube' && <Youtube size={28} />}
                  {inf.platform === 'Twitter' && <Twitter size={28} />}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">{inf.name}</h4>
                  <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{inf.followers} Followers</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#05070A] p-3 rounded-xl border border-slate-800/50">
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Performance</p>
                  <p className="text-xs font-black text-emerald-400 italic">{inf.roi} ROI</p>
                </div>
                <div className="bg-[#05070A] p-3 rounded-xl border border-slate-800/50">
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Platform</p>
                  <p className="text-xs font-black text-white italic">{inf.platform}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openModal(inf)} className="flex-1 py-2 bg-slate-900 border border-slate-800 text-[9px] font-black uppercase text-slate-400 hover:text-white hover:border-cyan-500 transition-all rounded-lg flex items-center justify-center gap-2">
                  <Edit3 size={12} /> Edit Talent
                </button>
                <button onClick={() => handleDelete(inf.id)} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all rounded-lg">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {isModalOpen && editingInfluencer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="bg-[#05070A] border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm italic">Talent Profile</h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">Influencer Name</label>
                  <input 
                    autoFocus 
                    type="text" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" 
                    value={editingInfluencer.name} 
                    onChange={e => setEditingInfluencer({...editingInfluencer, name: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Main Platform</label>
                    <select 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-[10px] font-bold outline-none" 
                      value={editingInfluencer.platform} 
                      onChange={e => setEditingInfluencer({...editingInfluencer, platform: e.target.value as any})}
                    >
                      <option>Instagram</option>
                      <option>YouTube</option>
                      <option>Twitter</option>
                      <option>TikTok</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Follower Count</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" 
                      placeholder="e.g. 1.2M"
                      value={editingInfluencer.followers} 
                      onChange={e => setEditingInfluencer({...editingInfluencer, followers: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Partnership Status</label>
                  <select 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-[10px] font-bold outline-none" 
                    value={editingInfluencer.status} 
                    onChange={e => setEditingInfluencer({...editingInfluencer, status: e.target.value as any})}
                  >
                    <option value="Active">Active Partnership</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Ended">Terminated</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-900/40 mt-4">
                  <Save size={16} /> Update Talent File
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

