import React, { useState } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { Truck, ChevronRight, Search, Globe, Package, TrendingUp, CheckCircle } from "lucide-react";
import { distributors } from "../../../../../data/distributors";

const DistributorList = ({
  onDistributorSelect,
  region,
}: {
  onDistributorSelect: (id: string) => void;
  region?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = distributors.filter((d) => {
    const matchesRegion = region ? d.region.toLowerCase() === region.toLowerCase() : true;
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.region.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {region ? `${region} Distributors` : "Distributor Network"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {region
              ? `Showing ${filtered.length} distributor${filtered.length === 1 ? '' : 's'} in ${region}`
              : "Regional supply chain and stock distribution metrics"}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text"
            placeholder="Search region or name..."
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white w-full md:w-64 focus:border-purple-500/50 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((dist) => (
          <GlassCard 
            key={dist.id} 
            className="group flex items-center justify-between p-5 hover:bg-purple-600/5 hover:border-purple-500/30 cursor-pointer transition-all"
            onClick={() => onDistributorSelect(dist.id)}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{dist.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 uppercase font-bold">
                    <Globe size={10} /> {dist.region} Region
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-purple-400 uppercase font-bold">
                    <Package size={10} /> {dist.totalDealers} Dealers
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-green-400 uppercase font-bold">
                    <TrendingUp size={10} /> ₹{(dist.totalRevenue / 1000000).toFixed(1)}M
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] uppercase font-bold ${
                    dist.status === 'Active' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <CheckCircle size={10} /> {dist.status}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-slate-600 group-hover:translate-x-1 transition-all" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default DistributorList;