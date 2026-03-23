import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, Globe, Link, Upload, RefreshCw, CheckCircle2, 
  MapPin, Package, FileCheck, ExternalLink, Plus, Search,
  AlertCircle, ChevronRight, Map, X, Filter
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface ShippingZone {
  id: string;
  region: string;
  countries: string[];
  rateType: 'Flat' | 'Weight-based';
  status: 'Active' | 'Inactive';
}

interface CourierPartner {
  id: string;
  name: string;
  apiConnected: boolean;
  trackingUrl: string;
  serviceType: string;
}

interface Shipment {
  id: string;
  orderId: string;
  courier: string;
  trackingNo: string;
  status: 'Pending' | 'Dispatched' | 'In-Transit' | 'Delivered' | 'Returned';
  dispatchProof?: string;
  deliveryProof?: string;
  lastSync: string;
}

// --- Initial Data ---
const INITIAL_ZONES: ShippingZone[] = [
  { id: 'Z-1', region: 'North America', countries: ['USA', 'Canada'], rateType: 'Weight-based', status: 'Active' },
  { id: 'Z-2', region: 'Europe', countries: ['Germany', 'UK', 'France'], rateType: 'Flat', status: 'Active' },
];

const INITIAL_COURIERS: CourierPartner[] = [
  { id: 'C-1', name: 'DHL Express', apiConnected: true, trackingUrl: 'dhl.com/track/', serviceType: 'Air' },
  { id: 'C-2', name: 'FedEx', apiConnected: true, trackingUrl: 'fedex.com/track/', serviceType: 'Surface' },
  { id: 'C-3', name: 'BlueDart', apiConnected: false, trackingUrl: 'bluedart.com/', serviceType: 'Domestic' },
];

const INITIAL_SHIPMENTS: Shipment[] = [
  { id: 'SHP-9921', orderId: 'ORD-771', courier: 'DHL Express', trackingNo: '1234567890', status: 'In-Transit', lastSync: '10 mins ago' },
  { id: 'SHP-9925', orderId: 'ORD-882', courier: 'FedEx', trackingNo: 'FX-88122', status: 'Delivered', dispatchProof: 'verified_img.jpg', deliveryProof: 'pod_doc.pdf', lastSync: '2 hours ago' },
];

export default function ShippingEngine() {
  const [activeTab, setActiveTab] = useState<'Zones' | 'Couriers' | 'Shipments'>('Shipments');
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<{id: string, type: 'dispatch' | 'pod'} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. Auto Status Sync Logic ---
  const handleApiSync = async () => {
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setShipments(prev => prev.map(s => ({ ...s, lastSync: `${now} (API)` })));
    setSyncing(false);
  };

  // --- 2. Proof Upload Logic ---
  const triggerUpload = (id: string, type: 'dispatch' | 'pod') => {
    setUploadTarget({ id, type });
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && uploadTarget) {
      const fileName = e.target.files[0].name;
      setShipments(prev => prev.map(s => {
        if (s.id === uploadTarget.id) {
          const updated = { ...s };
          if (uploadTarget.type === 'dispatch') {
            updated.dispatchProof = fileName;
            if (updated.status === 'Pending') updated.status = 'Dispatched';
          } else {
            updated.deliveryProof = fileName;
            updated.status = 'Delivered';
          }
          return updated;
        }
        return s;
      }));
      setUploadTarget(null);
    }
  };

  // --- 3. Filter Logic ---
  const filteredShipments = useMemo(() => {
    return shipments.filter(s => 
      s.trackingNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, shipments]);

  return (
    <div className="min-h-screen bg-[#05070A] p-4 lg:p-10 text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none flex items-center gap-4">
              SHIPPING <span className="text-cyan-500 underline decoration-cyan-500/30 decoration-8 underline-offset-8">ENGINE</span>
            </h1>
            <div className="flex items-center gap-2 mt-4 text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Global Logistics Node v2.0
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleApiSync}
              disabled={syncing}
              className={cn(
                "flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                syncing ? "cursor-not-allowed opacity-50" : "hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] active:scale-95"
              )}
            >
              <RefreshCw size={14} className={cn("text-cyan-500", syncing && "animate-spin")} /> 
              {syncing ? 'Fetching API Data...' : 'Auto Sync Status'}
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-3 px-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
            >
              <Plus size={14} /> New Configuration
            </button>
          </div>
        </header>

        {/* Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#0B0F18]/50 p-2 border border-slate-800/50 rounded-[2rem]">
          <nav className="flex gap-1">
            {['Shipments', 'Zones', 'Couriers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                  activeTab === tab ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Filter by Tracking, Order, or Courier..."
              className="w-full md:w-96 bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] uppercase tracking-wider focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all placeholder:text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Interface Table/Grid */}
        <main className="bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <AnimatePresence mode="wait">
            {activeTab === 'Shipments' && (
              <motion.div 
                key="shipments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 md:p-8 overflow-x-auto"
              >
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      <th className="px-4 pb-4">Tracking Node</th>
                      <th className="px-4 pb-4">Origin Details</th>
                      <th className="px-4 pb-4">Current Status</th>
                      <th className="px-4 pb-4 text-right">Verification Proofs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((ship) => (
                      <tr key={ship.id} className="group bg-slate-900/20 hover:bg-slate-800/40 border border-slate-800 transition-all">
                        <td className="px-4 py-6 rounded-l-2xl border-y border-l border-slate-800 group-hover:border-cyan-500/30">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                              ship.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-950 text-cyan-500 border border-slate-800"
                            )}>
                              {ship.status === 'Delivered' ? <CheckCircle2 size={20} /> : <Truck size={20} />}
                            </div>
                            <div>
                              <p className="text-sm font-black text-white uppercase italic tracking-wider">{ship.trackingNo}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ship.courier}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-6 border-y border-slate-800 group-hover:border-cyan-500/30">
                          <p className="text-xs font-black text-slate-300">ID: {ship.orderId}</p>
                          <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-500 uppercase font-bold italic">
                            <RefreshCw size={10} className={syncing ? "animate-spin" : ""} />
                            Synced {ship.lastSync}
                          </div>
                        </td>
                        <td className="px-4 py-6 border-y border-slate-800 group-hover:border-cyan-500/30">
                          <span className={cn(
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                            ship.status === 'Delivered' 
                              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" 
                              : "bg-cyan-500/5 border-cyan-500/20 text-cyan-500"
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full", ship.status === 'Delivered' ? "bg-emerald-500" : "bg-cyan-500 animate-pulse")} />
                            {ship.status}
                          </span>
                        </td>
                        <td className="px-4 py-6 rounded-r-2xl border-y border-r border-slate-800 group-hover:border-cyan-500/30 text-right">
                          <div className="flex justify-end gap-3">
                            {/* Dispatch Proof Tooltip Area */}
                            <div className="relative group/btn">
                              <button 
                                onClick={() => triggerUpload(ship.id, 'dispatch')}
                                className={cn(
                                  "p-3 rounded-xl border transition-all",
                                  ship.dispatchProof ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-slate-950 border-slate-800 text-slate-500 hover:text-cyan-500 hover:border-cyan-500/40"
                                )}
                              >
                                <Package size={18} />
                              </button>
                              <div className="absolute bottom-full mb-3 right-0 bg-slate-950 border border-slate-800 p-2 rounded-lg text-[8px] uppercase font-bold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                                {ship.dispatchProof ? `File: ${ship.dispatchProof}` : 'Upload Dispatch Proof'}
                              </div>
                            </div>

                            {/* POD Tooltip Area */}
                            <div className="relative group/btn">
                              <button 
                                onClick={() => triggerUpload(ship.id, 'pod')}
                                className={cn(
                                  "p-3 rounded-xl border transition-all",
                                  ship.deliveryProof ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-slate-950 border-slate-800 text-slate-500 hover:text-emerald-500 hover:border-emerald-500/40"
                                )}
                              >
                                <FileCheck size={18} />
                              </button>
                              <div className="absolute bottom-full mb-3 right-0 bg-slate-950 border border-slate-800 p-2 rounded-lg text-[8px] uppercase font-bold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                                {ship.deliveryProof ? `File: ${ship.deliveryProof}` : 'Upload POD (Delivery Proof)'}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredShipments.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="inline-flex p-6 bg-slate-900/50 rounded-full text-slate-700 border border-slate-800">
                      <Search size={40} />
                    </div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 italic">No matching shipment data found in matrix</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ZONES TAB */}
            {activeTab === 'Zones' && (
              <motion.div key="zones" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_ZONES.map((zone) => (
                  <div key={zone.id} className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/30 transition-all group overflow-hidden relative">
                    <div className="absolute -right-4 -top-4 text-slate-900 opacity-20 group-hover:text-cyan-900 transition-colors">
                      <Globe size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex gap-4 items-center">
                          <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-500">
                            <Globe size={28} />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{zone.region}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{zone.id}</p>
                          </div>
                        </div>
                        <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg border border-emerald-500/20 uppercase tracking-widest">{zone.status}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {zone.countries.map(c => (
                          <span key={c} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2 rounded-xl font-black uppercase tracking-wider group-hover:border-slate-700 transition-all">{c}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-500" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{zone.rateType} Strategy</span>
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:gap-3 transition-all">
                          Edit Zone <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* COURIERS TAB */}
            {activeTab === 'Couriers' && (
              <motion.div key="couriers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {INITIAL_COURIERS.map((courier) => (
                    <div key={courier.id} className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex flex-col justify-between hover:border-slate-700 hover:shadow-2xl transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{courier.name}</h4>
                          <div className={cn(
                            "p-3 rounded-2xl border",
                            courier.apiConnected ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" : "bg-orange-500/5 border-orange-500/20 text-orange-500"
                          )}>
                            {courier.apiConnected ? <Link size={18} /> : <AlertCircle size={18} />}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-8 tracking-[0.3em] uppercase font-black italic">{courier.serviceType} Transport Matrix</p>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</span>
                          <span className={cn("text-[9px] font-black uppercase tracking-widest", courier.apiConnected ? "text-emerald-500" : "text-orange-500")}>
                            {courier.apiConnected ? 'API Connected' : 'Manual Entry'}
                          </span>
                        </div>
                        <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2">
                          <RefreshCw size={12} /> Sync Credentials
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Hidden Global File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        className="hidden" 
        accept="image/*,application/pdf"
      />

      {/* Basic New Config Modal Mock */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">New Shipment <span className="text-cyan-500">Node</span></h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-8 italic">Add a new tracking ID to the global engine</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Tracking ID</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-cyan-500 transition-all" placeholder="Enter courier tracking no." />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Select Courier</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-cyan-500 transition-all appearance-none uppercase font-bold text-xs tracking-wider">
                    {INITIAL_COURIERS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <button className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-cyan-500/20">
                  Initialize Shipment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}