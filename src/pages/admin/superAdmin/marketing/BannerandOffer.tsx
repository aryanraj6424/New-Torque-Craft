import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, Plus, Trash2, Eye, Calendar, 
  Tag, X, CheckCircle2, Edit3, Save, AlertCircle 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Banner {
  id: number;
  title: string;
  platform: string;
  status: 'Live' | 'Scheduled';
  impressions: string;
}

interface Offer {
  id: number;
  name: string;
  discount: string;
  expiry: string;
}

export default function BannerandOffer() {
  // --- Data States ---
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, title: 'Summer Sale 2026', platform: 'Mobile App', status: 'Live', impressions: '1.2M' },
    { id: 2, title: 'New Product Launch', platform: 'Web Header', status: 'Scheduled', impressions: '-' },
  ]);

  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, name: 'BOGO - Winter Edition', discount: 'Buy 1 Get 1', expiry: 'Dec 01 - Jan 01' },
    { id: 2, name: 'First Purchase Tech', discount: '20% OFF', expiry: 'Ongoing' },
  ]);

  // --- UI Management States ---
  const [modalType, setModalType] = useState<'banner' | 'offer' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // --- Handlers: Banners ---
  const deleteBanner = (id: number) => {
    if(window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(prev => prev.filter(b => b.id !== id));
    }
  };

  const openBannerModal = (banner?: Banner) => {
    setEditingItem(banner || { id: Date.now(), title: '', platform: 'Mobile App', status: 'Scheduled', impressions: '0' });
    setModalType('banner');
  };

  // --- Handlers: Offers ---
  const deleteOffer = (id: number) => {
    if(window.confirm("Terminate this offer?")) {
      setOffers(prev => prev.filter(o => o.id !== id));
    }
  };

  const openOfferModal = (offer?: Offer) => {
    setEditingItem(offer || { id: Date.now(), name: '', discount: '', expiry: '' });
    setModalType('offer');
  };

  // --- Global Save Handler ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title && !editingItem.name) return alert("Fields cannot be empty!");

    if (modalType === 'banner') {
      const exists = banners.find(b => b.id === editingItem.id);
      setBanners(prev => exists 
        ? prev.map(b => b.id === editingItem.id ? editingItem : b)
        : [editingItem, ...prev]
      );
    } else {
      const exists = offers.find(o => o.id === editingItem.id);
      setOffers(prev => exists 
        ? prev.map(o => o.id === editingItem.id ? editingItem : o)
        : [editingItem, ...prev]
      );
    }
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* SECTION: BANNERS */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic flex items-center gap-2">
              <ImageIcon className="text-cyan-500" size={20} /> Visual Assets
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold">Storefront Banner Management</p>
          </div>
          <button 
            onClick={() => openBannerModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
          >
            <Plus size={14} /> New Banner
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode='popLayout'>
            {banners.map((banner) => (
              <motion.div layout key={banner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0B0F18] border border-slate-800/60 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all">
                <div className="h-32 bg-slate-900/50 flex items-center justify-center relative">
                  <ImageIcon size={32} className="text-slate-800 group-hover:text-cyan-900/40 transition-colors" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[8px] font-bold uppercase text-white tracking-widest">{banner.platform}</div>
                  <div className={cn("absolute top-3 right-3 px-2 py-1 rounded text-[8px] font-black uppercase", banner.status === 'Live' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500")}>
                    {banner.status}
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-gradient-to-b from-transparent to-black/20">
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">{banner.title}</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-tighter italic">Impressions: {banner.impressions}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openBannerModal(banner)} className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 rounded-lg transition-all"><Edit3 size={14} /></button>
                    <button onClick={() => deleteBanner(banner.id)} className="p-2 bg-slate-900 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-red-400 rounded-lg transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION: OFFERS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2 italic">
            <Tag size={16} className="text-cyan-500" /> Live Discounts
          </h3>
          <button 
            onClick={() => openOfferModal()}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
          >
            Add Offer
          </button>
        </div>
        
        <div className="bg-[#0B0F18] border border-slate-800/60 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Promotion</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">Value</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              <AnimatePresence>
                {offers.map((offer) => (
                  <motion.tr layout key={offer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-white uppercase">{offer.name}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1"><Calendar size={10}/> {offer.expiry}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-black text-cyan-400 italic uppercase">{offer.discount}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openOfferModal(offer)} className="text-[9px] font-black uppercase text-slate-500 hover:text-cyan-500 transition-colors">Edit</button>
                        <button onClick={() => deleteOffer(offer.id)} className="text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 transition-colors">Stop</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- UNIFIED EDIT/ADD MODAL --- */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-[#05070A] border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm italic flex items-center gap-2">
                  {editingItem.id > Date.now() - 10000 ? 'Create New' : 'Update'} {modalType}
                </h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {modalType === 'banner' ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">Banner Title</label>
                      <input autoFocus type="text" className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500 transition-all" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="e.g. Summer Sale 2026" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Platform</label>
                        <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-[10px] font-bold outline-none appearance-none cursor-pointer" value={editingItem.platform} onChange={e => setEditingItem({...editingItem, platform: e.target.value})}>
                          <option>Mobile App</option>
                          <option>Web Header</option>
                          <option>Social Media</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Status</label>
                        <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-[10px] font-bold outline-none" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value as any})}>
                          <option value="Live">Live</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-cyan-500 tracking-widest block">Offer Name</label>
                      <input autoFocus type="text" className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} placeholder="e.g. Winter Edition BOGO" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-black text-slate-500 tracking-widest block">Discount Value</label>
                      <input type="text" className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" value={editingItem.discount} onChange={e => setEditingItem({...editingItem, discount: e.target.value})} placeholder="e.g. 50% OFF" />
                    </div>
                  </>
                )}

                <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-900/40">
                  <Save size={16} /> Finalize Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}