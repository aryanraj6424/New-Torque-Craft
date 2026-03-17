import React, { useState, useMemo } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { 
  Store, ChevronRight, Search, MapPin, 
  Users, TrendingUp, Activity, ShieldCheck 
} from "lucide-react";
import { distributors } from "../../../../../data/distributors";

// 1. StatTile Component (Internal Helper)
const StatTile = ({ label, value, icon, color = "text-white" }: any) => (
  <div className="bg-white/[0.02] border border-white/5 rounded p-4 group hover:border-white/10 transition-all">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-slate-600 group-hover:text-brand-red transition-colors">{icon}</span>
      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">{label}</p>
    </div>
    <h4 className={`text-xl font-black italic ${color}`}>{value}</h4>
  </div>
);

// 2. Main DealerList Component
const DealerList = ({
  onDealerSelect,
  distributorId,
  area,
}: {
  onDealerSelect: (id: string) => void;
  distributorId: string;
  area?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dealerData = useMemo(() => {
    const distributor = distributors.find(d => d.id === distributorId);
    return distributor ? distributor.dealers : [];
  }, [distributorId]);

  const filteredDealers = useMemo(() => {
    return dealerData.filter(dealer => {
      const matchesArea = area ? dealer.area.toLowerCase() === area.toLowerCase() : true;
      const matchesSearch = 
        dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dealer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.area.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesArea && matchesSearch;
    });
  }, [dealerData, area, searchTerm]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* TOP MINI STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile label="Total Dealers" value={dealerData.length} icon={<Store size={14}/>} />
        <StatTile label="Active Warranties" value="490" icon={<ShieldCheck size={14}/>} color="text-brand-red" />
        <StatTile label="Network Reach" value="24 Cities" icon={<MapPin size={14}/>} />
        <StatTile label="Avg. Performance" value="94%" icon={<Activity size={14}/>} color="text-emerald-500" />
      </div>

      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Dealer <span className="text-brand-red">Directory</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Authorized Service Network Control</p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-red transition-colors" size={16} />
          <input 
            type="text"
            placeholder="FILTER BY NAME OR REGION..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-brand-red/50 w-full transition-all backdrop-blur-md placeholder:text-slate-700"
          />
        </div>
      </div>

      {/* DEALERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDealers.length > 0 ? (
          filteredDealers.map((dealer) => (
            <div 
              key={dealer.id}
              onClick={() => {
                console.log("Dealer clicked:", dealer.id);
                onDealerSelect(dealer.id);
              }}
              className="cursor-pointer"
            >
              <GlassCard 
                className="group relative overflow-hidden flex items-center justify-between p-6 border-white/5 hover:border-brand-red/30 transition-all duration-500 bg-white/[0.01]"
              >
                {/* Decorative Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red/0 to-brand-red/0 group-hover:from-brand-red/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative flex items-center gap-6 z-10">
                  <div className="relative">
                    <div className="p-4 bg-white/5 rounded border border-white/5 text-white group-hover:text-brand-red group-hover:border-brand-red/20 transition-all duration-500">
                      <Store size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-red rounded-full border-2 border-[#05070a] shadow-[0_0_8px_rgba(231,31,41,0.5)]" />
                  </div>
                  
                  <div>
                    <h3 className="font-black text-white text-lg uppercase italic tracking-tighter group-hover:text-brand-red transition-colors">
                      {dealer.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <MapPin size={10} /> {dealer.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <Users size={10} /> {dealer.customers.length} Customers
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-brand-red uppercase font-black tracking-[0.2em]">
                        <TrendingUp size={10} /> {dealer.status}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col items-end">
                  <div className="p-2 border border-white/5 rounded group-hover:border-brand-red/40 group-hover:text-brand-red transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </GlassCard>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded bg-white/[0.01]">
            <Search className="text-slate-800 mx-auto mb-4" size={40} />
            <h3 className="text-white font-black uppercase italic tracking-widest text-sm">No Assets Found</h3>
            <p className="text-slate-600 text-[10px] mt-2 font-bold uppercase tracking-widest">Adjust your search parameters and try again.</p>
          </div>
        )}
      </div>

      <div className="h-12" />
    </div>
  );
};

// --- YEH LINE SABSE ZAROORI HAI VITE ERROR HATANE KE LIYE ---
export default DealerList;