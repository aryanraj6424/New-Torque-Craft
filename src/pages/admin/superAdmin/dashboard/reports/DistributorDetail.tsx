import React, { useMemo } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, Truck, Package, Users, TrendingUp, Globe, Phone, Mail, MapPin, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { distributors, DistributorRecord } from "../../../../../data/distributors";

interface DistributorDetailProps {
  distributorId: string;
  onBack: () => void;
  onDealerAreaSelect: (area: string) => void;
  onDealerSelect: (dealerId: string) => void;
}

const DistributorDetail: React.FC<DistributorDetailProps> = ({
  distributorId,
  onBack,
  onDealerAreaSelect,
  onDealerSelect,
}) => {
  const distributor = useMemo(() => 
    distributors.find(d => d.id === distributorId), 
    [distributorId]
  );

  if (!distributor) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Distributor not found</p>
      </div>
    );
  }

  const dealerAreas = useMemo(() => {
    const areaMap: Record<string, number> = {};
    distributor.dealers.forEach((dealer) => {
      areaMap[dealer.area] = (areaMap[dealer.area] || 0) + 1;
    });
    return Object.entries(areaMap).map(([area, count]) => ({ area, count }));
  }, [distributor.dealers]);

  const totalAvailableStock = distributor.products.reduce(
    (sum, product) => sum + product.availableStock,
    0
  );

  const totalReservedStock = distributor.products.reduce(
    (sum, product) => sum + product.reservedStock,
    0
  );

  const returnRate = ((distributor.totalOrders * 0.02) / distributor.totalRevenue * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
        >
          <ArrowLeft size={14} /> Back to Distributors
        </button>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
          distributor.status === 'Active' 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {distributor.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {distributor.status}
        </div>
      </div>

      {/* --- BASIC INFO --- */}
      <GlassCard className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400">
              <Truck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{distributor.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Globe size={14} className="text-slate-400" />
                <span className="text-slate-400 text-sm">{distributor.region}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <MapPin size={12} /> Address
            </div>
            <p className="text-white text-sm">{distributor.address}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Phone size={12} /> Contact
            </div>
            <p className="text-white text-sm">{distributor.phone}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Mail size={12} /> Email
            </div>
            <p className="text-white text-sm">{distributor.email}</p>
          </div>
        </div>
      </GlassCard>

      {/* --- PERFORMANCE METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            ₹{(distributor.totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total Revenue</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {distributor.totalOrders.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Orders Fulfilled</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {returnRate}%
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Return Rate</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            2.3 days
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Avg Fulfillment</div>
        </GlassCard>
      </div>

      {/* --- INVENTORY SECTION --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <Package className="text-purple-400" size={20} />
          Inventory Overview
        </h3>
        
        <div className="space-y-4">
          {distributor.products.map((product) => (
            <div key={product.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{product.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">SKU: {product.sku}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{product.totalStock.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{product.reservedStock.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Reserved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{product.availableStock.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Available</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">Total Stock Summary</div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{(totalAvailableStock + totalReservedStock).toLocaleString()}</div>
                <div className="text-xs text-slate-400">Total Stock</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{totalAvailableStock.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Available</div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* --- DEALER SECTION --- */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="text-purple-400" size={20} />
            Dealer Network ({distributor.totalDealers} dealers)
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dealerAreas.map(({ area, count }) => (
            <GlassCard
              key={area}
              onClick={() => onDealerAreaSelect(area)}
              className="cursor-pointer group p-6 hover:bg-purple-600/5 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-lg">{area}</h4>
                  <p className="text-sm text-slate-400 mt-1">{count} dealers</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-sm text-slate-400">Dealer Performance Summary</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{distributor.totalDealers}</div>
              <div className="text-xs text-slate-400">Total Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{distributor.dealers.filter(d => d.status === 'Active').length}</div>
              <div className="text-xs text-slate-400">Active Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                ₹{(distributor.totalRevenue / distributor.totalDealers / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-slate-400">Avg Revenue per Dealer</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DistributorDetail;
