import React, { useState, useEffect, useMemo } from "react";
import DistributorList from "./DistributorList";
import DistributorDetail from "./DistributorDetail";
import DealerList from "./DealerList";
import DealerDetail from "./DealerDetail";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import AdminDealerForm from "../../../forms/AdminDealerForm";
import AdminDistributorForm from "../../../forms/AdminDistributorForm";
import { GlassCard } from "../../../ui/GlassCard";
import { Store, Truck, Plus, ArrowLeft, ShieldCheck, Globe, Users, Package, TrendingUp, User } from "lucide-react";
import { distributors } from "../../../../../data/distributors";

const Reports = () => {
  const [view, setView] = useState<
    | 'regions'
    | 'distributorList'
    | 'distributorDetail'
    | 'dealerList'
    | 'dealerDetail'
    | 'customerList'
    | 'customerDetail'
    | 'form'
  >('regions');

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistributorId, setSelectedDistributorId] = useState<string | null>(null);
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const distributorRegions = useMemo(() => {
    const regionMap: Record<string, number> = {};
    distributors.forEach((d) => {
      regionMap[d.region] = (regionMap[d.region] || 0) + 1;
    });

    return Object.entries(regionMap).map(([name, count]) => ({ name, count }));
  }, []);

  // --- NAVIGATION HANDLERS ---
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSelectedDistributorId(null);
    setView('distributorList');
  };

  const handleDistributorSelect = (id: string) => {
    setSelectedDistributorId(id);
    setView('distributorDetail');
  };

  const handleDealerAreaSelect = (area: string) => {
    setSelectedArea(area);
    setView('dealerList');
  };

  const handleDealerSelect = (id: string) => {
    setSelectedDealerId(id);
    setView('dealerDetail');
  };

  const handleCustomerSelect = (id: string) => {
    setSelectedCustomerId(id);
    setView('customerDetail');
  };

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setSelectedDistributorId(null);
    setView('regions');
  };

  const handleBackToDistributorList = () => {
    setSelectedDistributorId(null);
    setView('distributorList');
  };

  const handleBackToDistributorDetail = () => {
    setSelectedDealerId(null);
    setSelectedArea(null);
    setView('distributorDetail');
  };

  const handleBackToDealerList = () => {
    setSelectedCustomerId(null);
    setView('dealerList');
  };

  const handleOpenForm = () => {
    setView('form');
  };

  const handleSuccess = () => {
    setView('distributorList');
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
                {view === 'regions'
                  ? "Select a region to drill into distributor performance"
                  : view === 'distributorList'
                  ? selectedRegion
                    ? `${selectedRegion.toUpperCase()} DISTRIBUTORS`
                    : "ALL DISTRIBUTORS"
                  : view === 'distributorDetail'
                  ? "Distributor detail and performance metrics"
                  : view === 'dealerList'
                  ? selectedArea
                    ? `${selectedArea.toUpperCase()} DEALERS`
                    : "DEALER DIRECTORY"
                  : view === 'dealerDetail'
                  ? "Dealer detail and customer information"
                  : view === 'customerList'
                  ? "CUSTOMER DIRECTORY"
                  : view === 'customerDetail'
                  ? "Customer profile and order history"
                  : "Manage partner records"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- 1. DISTRIBUTOR REGION VIEW --- */}
      {view === 'regions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500 max-w-6xl mx-auto">
          {distributorRegions.map((region) => (
            <GlassCard
              key={region.name}
              onClick={() => handleRegionSelect(region.name)}
              className="cursor-pointer group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-slate-200" />
                    <h3 className="text-xl font-bold text-white tracking-tight">{region.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{region.count} distributors</p>
                </div>
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest">View</div>
              </div>
              <div className="mt-6 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                Drill down into distributor details
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* --- 2. DISTRIBUTOR LIST VIEW --- */}
      {view === 'distributorList' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => handleBackToRegions()}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
            >
              <ArrowLeft size={14} /> Back to Regions
            </button>

            <button 
              onClick={handleOpenForm}
              className="w-full sm:w-auto px-8 py-3 rounded bg-brand-red hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-red/20 active:scale-95"
            >
              <Plus size={16} /> Register New Distributor
            </button>
          </div>
          
          <div className="relative z-10">
            <DistributorList region={selectedRegion || undefined} onDistributorSelect={handleDistributorSelect} />
          </div>
        </div>
      )}

      {/* --- 3. DISTRIBUTOR DETAIL VIEW --- */}
      {view === 'distributorDetail' && selectedDistributorId && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
          <DistributorDetail 
            distributorId={selectedDistributorId} 
            onBack={handleBackToDistributorList}
            onDealerAreaSelect={handleDealerAreaSelect}
            onDealerSelect={handleDealerSelect}
          />
        </div>
      )}

      {/* --- 4. DEALER LIST VIEW --- */}
      {view === 'dealerList' && selectedDistributorId && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => handleBackToDistributorDetail()}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
            >
              <ArrowLeft size={14} /> Back to Distributor
            </button>
          </div>
          
          <div className="relative z-10">
            <DealerList 
              distributorId={selectedDistributorId}
              area={selectedArea || undefined}
              onDealerSelect={handleDealerSelect}
            />
          </div>
        </div>
      )}

      {/* --- 5. DEALER DETAIL VIEW --- */}
      {view === 'dealerDetail' && selectedDealerId && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
          <DealerDetail 
            dealerId={selectedDealerId} 
            onBack={handleBackToDistributorDetail}
            onCustomerSelect={handleCustomerSelect}
          />
        </div>
      )}

      {/* --- 6. CUSTOMER LIST VIEW --- */}
      {view === 'customerList' && selectedDealerId && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <button 
              onClick={() => handleBackToDealerList()}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
            >
              <ArrowLeft size={14} /> Back to Dealer
            </button>
          </div>
          
          <div className="relative z-10">
            <CustomerList 
              dealerId={selectedDealerId}
              onCustomerSelect={handleCustomerSelect}
            />
          </div>
        </div>
      )}

      {/* --- 7. CUSTOMER DETAIL VIEW --- */}
      {view === 'customerDetail' && selectedCustomerId && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
          <CustomerDetail 
            customerId={selectedCustomerId} 
            onBack={handleBackToDealerList}
          />
        </div>
      )}

      {/* --- 8. FORM VIEW --- */}
      {view === 'form' && (
        <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <button 
            onClick={() => setView('distributorList')} 
            className="group mb-8 flex items-center gap-3 text-[11px] font-black text-white/40 hover:text-brand-red uppercase tracking-[0.3em] transition-all"
          >
            <div className="p-2 border border-white/10 rounded group-hover:border-brand-red transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span>Return to distributor list</span>
          </button>

          <div className="bg-black/60 border border-white/5 rounded-sm p-6 sm:p-12 shadow-3xl backdrop-blur-xl">
            <AdminDistributorForm onSuccess={handleSuccess} />
          </div>
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