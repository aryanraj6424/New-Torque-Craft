import React, { useMemo } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, Users, Package, TrendingUp, Phone, Mail, MapPin, CheckCircle, XCircle, ChevronRight, User } from "lucide-react";
import { distributors } from "../../../../../data/distributors";

interface DealerDetailProps {
  dealerId: string;
  onBack: () => void;
  onCustomerSelect: (customerId: string) => void;
}

const DealerDetail: React.FC<DealerDetailProps> = ({
  dealerId,
  onBack,
  onCustomerSelect,
}) => {
  const dealerData = useMemo(() => {
    for (const distributor of distributors) {
      const dealer = distributor.dealers.find(d => d.id === dealerId);
      if (dealer) {
        return { dealer, distributor };
      }
    }
    return null;
  }, [dealerId]);

  if (!dealerData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Dealer not found</p>
      </div>
    );
  }

  const { dealer, distributor } = dealerData;

  const customerAreas = useMemo(() => {
    const areaMap: Record<string, number> = {};
    dealer.customers.forEach((customer) => {
      const area = customer.location.split(',')[0].trim();
      areaMap[area] = (areaMap[area] || 0) + 1;
    });
    return Object.entries(areaMap).map(([area, count]) => ({ area, count }));
  }, [dealer.customers]);

  const returnRate = ((dealer.totalOrders * 0.015) / dealer.revenue * 100).toFixed(1);
  const activeCustomers = dealer.customers.filter(c => c.status === 'Active').length;

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
        >
          <ArrowLeft size={14} /> Back to Distributor
        </button>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
          dealer.status === 'Active' 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {dealer.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {dealer.status}
        </div>
      </div>

      {/* --- BASIC INFO --- */}
      <GlassCard className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{dealer.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-slate-400 text-sm">{dealer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Phone size={12} /> Contact
            </div>
            <p className="text-white text-sm">{dealer.phone}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Mail size={12} /> Email
            </div>
            <p className="text-white text-sm">{dealer.email}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Package size={12} /> Area
            </div>
            <p className="text-white text-sm">{dealer.area}</p>
          </div>
        </div>
      </GlassCard>

      {/* --- PERFORMANCE METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            ₹{(dealer.revenue / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total Revenue</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {dealer.totalOrders}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total Orders</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {returnRate}%
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Return Rate</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {dealer.customers.length}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total Customers</div>
        </GlassCard>
      </div>

      {/* --- CUSTOMER SECTION --- */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <User className="text-purple-400" size={20} />
            Customer Database ({dealer.customers.length} customers)
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {customerAreas.map(({ area, count }) => (
            <GlassCard
              key={area}
              onClick={() => {}}
              className="cursor-pointer group p-6 hover:bg-purple-600/5 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-lg">{area}</h4>
                  <p className="text-sm text-slate-400 mt-1">{count} customers</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Recent Customers</h4>
          {dealer.customers.slice(0, 3).map((customer) => (
            <div 
              key={customer.id}
              onClick={() => onCustomerSelect(customer.id)}
              className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{customer.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{customer.location}</p>
                  <p className="text-xs text-slate-400">{customer.phone}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{customer.orderCount}</div>
                    <div className="text-xs text-slate-400">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">₹{(customer.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Revenue</div>
                  </div>
                  <ChevronRight className="text-slate-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-sm text-slate-400">Customer Summary</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{dealer.customers.length}</div>
              <div className="text-xs text-slate-400">Total Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{activeCustomers}</div>
              <div className="text-xs text-slate-400">Active Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                ₹{(dealer.revenue / dealer.customers.length / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-slate-400">Avg Revenue per Customer</div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* --- ORDER DATA --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <Package className="text-purple-400" size={20} />
          Order Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{dealer.totalOrders}</div>
            <div className="text-sm text-slate-400 mt-2">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{Math.floor(dealer.totalOrders * 0.85)}</div>
            <div className="text-sm text-slate-400 mt-2">Completed Orders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{Math.floor(dealer.totalOrders * 0.15)}</div>
            <div className="text-sm text-slate-400 mt-2">Pending Orders</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DealerDetail;
