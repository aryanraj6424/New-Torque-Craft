import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Plus, ShieldCheck, MapPin, 
  Search, Trash2, Edit3, ChevronRight,
  Info, CheckCircle2, X, AlertCircle, 
  Flag, Scale, Users, Layers
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Production Types ---
interface Region {
  id: string;
  name: string;
  allowedCountries: string[];
  taxType: 'GST' | 'VAT' | 'Custom';
  distributorCount: number;
  complianceLevel: 'High' | 'Standard' | 'Strict';
  status: 'Active' | 'Under Review';
}

const INITIAL_REGIONS: Region[] = [
  { 
    id: 'REG-001', name: 'South Asia Operations', 
    allowedCountries: ['India', 'Nepal', 'Bhutan'], 
    taxType: 'GST', distributorCount: 24, 
    complianceLevel: 'Strict', status: 'Active' 
  },
  { 
    id: 'REG-002', name: 'Gulf Cooperation Council', 
    allowedCountries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman'], 
    taxType: 'VAT', distributorCount: 12, 
    complianceLevel: 'Standard', status: 'Active' 
  },
];

export default function RegionEngine() {
  const [regions, setRegions] = useState<Region[]>(INITIAL_REGIONS);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
              REGION <span className="text-cyan-500">ENGINE</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-2">Global Compliance & Sales Logistics</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 px-6 py-4 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all"
          >
            <Plus size={16} /> Define New Region
          </button>
        </header>

        {/* Region Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4">
            {regions.map((region) => (
              <motion.div 
                key={region.id}
                layoutId={region.id}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "group p-6 bg-[#0B0F18] border rounded-[2rem] cursor-pointer transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]",
                  selectedRegion?.id === region.id ? "border-cyan-500" : "border-slate-800 hover:border-slate-700"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-cyan-500 shadow-inner">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white italic tracking-tight">{region.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{region.id}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[9px] font-black uppercase text-emerald-500">{region.taxType} ENABLED</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={cn("text-slate-700 transition-transform", selectedRegion?.id === region.id && "rotate-90 text-cyan-500")} />
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {region.allowedCountries.map(country => (
                    <span key={country} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      {country}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contextual Intelligence Panel (Sidebar) */}
          <div className="space-y-6">
            <div className="p-8 bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] sticky top-10">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Info size={14} className="text-cyan-500" /> Operational Context
              </h4>
              
              {selectedRegion ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Compliance Level</p>
                      <div className="flex items-center gap-3">
                        <Scale size={16} className="text-cyan-500" />
                        <p className="text-sm font-black text-white italic uppercase">{selectedRegion.complianceLevel} Protocols</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Distributor Mapping</p>
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-cyan-500" />
                        <p className="text-sm font-black text-white italic uppercase">{selectedRegion.distributorCount} Active Nodes</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Compliance Checklist</p>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-emerald-500">
                      <CheckCircle2 size={14} /> Regional Tax Laws Applied
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-emerald-500">
                      <CheckCircle2 size={14} /> Currency Conversion Validated
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                      <AlertCircle size={14} /> Port Logistics Pending
                    </div>
                  </div>

                  <button className="w-full py-4 bg-slate-900 border border-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-cyan-500 transition-all">
                    Generate Regional Report
                  </button>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <Layers className="mx-auto text-slate-800 mb-4" size={40} />
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Select a region to view<br/>mapping details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Add Region Modal --- */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsAdding(false)} />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-2xl bg-[#0B0F18] border border-slate-800 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white italic uppercase">New Region Configuration</h2>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Region Identity</label>
                  <input type="text" placeholder="e.g. European Union" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-cyan-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Tax Protocol</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none appearance-none focus:border-cyan-500">
                      <option>GST (India Standard)</option>
                      <option>VAT (International)</option>
                      <option>Custom Duty (Special Zone)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Compliance Tier</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none appearance-none focus:border-cyan-500">
                      <option>Standard Level</option>
                      <option>High Strictness</option>
                      <option>Minimal Compliance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Whitelist Countries (Comma separated)</label>
                  <textarea rows={3} placeholder="India, Germany, USA..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-cyan-500 resize-none" />
                </div>

                <div className="pt-6 flex gap-3">
                  <button onClick={() => setIsAdding(false)} className="flex-1 py-4 border border-slate-800 text-slate-500 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 transition-all">Cancel</button>
                  <button className="flex-1 py-4 bg-cyan-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-cyan-500/20 hover:bg-cyan-500 transition-all">Activate Region</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}