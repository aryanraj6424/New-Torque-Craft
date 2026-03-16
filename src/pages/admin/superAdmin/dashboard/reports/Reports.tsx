


import React, { useState, useEffect } from "react";
import DealerList from "./DealerList";
import DistributorList from "./DistributorList"; 
import DealerDetail from "./DealerDetail";
import AdminDealerForm from "../../../forms/AdminDealerForm"; 
import AdminDistributorForm from "../../../forms/AdminDistributorForm"; 
import { GlassCard } from "../../../ui/GlassCard";
import { Store, Truck, Plus, ArrowLeft, ShieldCheck } from "lucide-react";

const Reports = () => {
  const [view, setView] = useState<'landing' | 'list' | 'detail' | 'form'>('landing');
  const [reportType, setReportType] = useState<'dealer' | 'distributor' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 1. Navigation Handlers
  const handleViewList = (type: 'dealer' | 'distributor') => {
    setReportType(type);
    setView('list');
  };

  const handleOpenForm = () => {
    setView('form');
  };

  // Sahi function jo detail view open karega
  const handlePartnerSelect = (id: string) => {
    console.log("Partner Selected Triggered:", id); 
    setSelectedId(id);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setView('list');
  };

  const handleSuccess = () => {
    setView('list');
    console.log(`${reportType} processed successfully!`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="w-full min-h-screen pb-40 px-4 pt-12 relative z-10 bg-[#020617]">
      
      {/* --- HEADER --- */}
      {view !== 'form' && (
        <div className="max-w-6xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
                <ShieldCheck className="text-brand-red shadow-[0_0_15px_rgba(231,31,41,0.3)]" size={32} />
                Partner Management
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                {view === 'landing' ? "Global Network Control" : `${reportType?.toUpperCase()} MODULE ACTIVE`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- 1. LANDING VIEW --- */}
      {view === 'landing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-500 max-w-6xl mx-auto">
          <LandingCard 
            title="Dealers" 
            desc="Manage retail footprint and authorized service outlets." 
            icon={Store} 
            color="brand-red"
            onClick={() => handleViewList('dealer')} 
          />
          <LandingCard 
            title="Distributors" 
            desc="Monitor regional hubs and inventory movements." 
            icon={Truck} 
            color="white"
            onClick={() => handleViewList('distributor')} 
          />
        </div>
      )}

      {/* --- 2. LIST VIEW --- */}
      {view === 'list' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => { setView('landing'); setReportType(null); }} 
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
            >
              <ArrowLeft size={14} /> Back to Network
            </button>

            <button 
              onClick={handleOpenForm}
              className="w-full sm:w-auto px-8 py-3 rounded bg-brand-red hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-red/20 active:scale-95"
            >
              <Plus size={16} /> Register New {reportType}
            </button>
          </div>
          
          <div className="relative z-10">
            {reportType === 'dealer' ? (
              // FIX: Yahan handlePartnerSelect pass kiya hai jo defined hai
              <DealerList onDealerSelect={handlePartnerSelect} />
            ) : (
              <DistributorList onDistributorSelect={handlePartnerSelect} />
            )}
          </div>
        </div>
      )}

      {/* --- 3. FORM VIEW --- */}
      {view === 'form' && (
        <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <button 
            onClick={() => setView('list')} 
            className="group mb-8 flex items-center gap-3 text-[11px] font-black text-white/40 hover:text-brand-red uppercase tracking-[0.3em] transition-all"
          >
            <div className="p-2 border border-white/10 rounded group-hover:border-brand-red transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span>Return to {reportType} list</span>
          </button>

          <div className="bg-black/60 border border-white/5 rounded-sm p-6 sm:p-12 shadow-3xl backdrop-blur-xl">
            {reportType === 'dealer' ? (
              <AdminDealerForm onSuccess={handleSuccess} />
            ) : (
              <AdminDistributorForm onSuccess={handleSuccess} />
            )}
          </div>
        </div>
      )}

      {/* --- 4. DETAIL VIEW --- */}
      {view === 'detail' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
          <DealerDetail 
            dealerId={selectedId || ""} 
            onBack={handleBackToList} 
          />
        </div>
      )}

    </div>
  );
};

const LandingCard = ({ title, desc, icon: Icon, color, onClick }: any) => (
  <div onClick={onClick} className="cursor-pointer group">
    <GlassCard className={`relative overflow-hidden p-8 sm:p-10 border-white/5 transition-all duration-300 bg-white/[0.02] ${color === 'brand-red' ? 'group-hover:border-brand-red/50' : 'group-hover:border-white/20'}`}>
      <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 pointer-events-none">
        <Icon size={200} />
      </div>
      <Icon size={40} className={`mb-6 group-hover:scale-110 transition-transform duration-500 ${color === 'brand-red' ? 'text-brand-red' : 'text-white'}`} />
      <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">{title}</h2>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-xs">{desc}</p>
      <span className={`${color === 'brand-red' ? 'text-brand-red' : 'text-white'} text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2`}>
        Open Directory <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-2 transition-transform" />
      </span>
    </GlassCard>
  </div>
);

export default Reports;