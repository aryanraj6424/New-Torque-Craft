import React, { useState, useMemo } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { 
  User, ChevronRight, Search, MapPin, 
  Phone, Mail, TrendingUp, Activity 
} from "lucide-react";
import { distributors } from "../../../../../data/distributors";

interface CustomerListProps {
  dealerId: string;
  onCustomerSelect: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  dealerId,
  onCustomerSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const customerData = useMemo(() => {
    for (const distributor of distributors) {
      const dealer = distributor.dealers.find(d => d.id === dealerId);
      if (dealer) {
        return dealer.customers;
      }
    }
    return [];
  }, [dealerId]);

  const filteredCustomers = useMemo(() => {
    return customerData.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customerData, searchTerm]);

  const totalRevenue = customerData.reduce((sum, customer) => sum + customer.revenue, 0);
  const totalOrders = customerData.reduce((sum, customer) => sum + customer.orderCount, 0);
  const activeCustomers = customerData.filter(c => c.status === 'Active').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* TOP MINI STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded p-4 group hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <User className="text-slate-600 group-hover:text-brand-red transition-colors" size={14} />
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Total Customers</p>
          </div>
          <h4 className="text-xl font-black italic text-white">{customerData.length}</h4>
        </div>
        
        <div className="bg-white/[0.02] border border-white/5 rounded p-4 group hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="text-slate-600 group-hover:text-brand-red transition-colors" size={14} />
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Active</p>
          </div>
          <h4 className="text-xl font-black italic text-brand-red">{activeCustomers}</h4>
        </div>
        
        <div className="bg-white/[0.02] border border-white/5 rounded p-4 group hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="text-slate-600 group-hover:text-brand-red transition-colors" size={14} />
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Total Orders</p>
          </div>
          <h4 className="text-xl font-black italic text-emerald-500">{totalOrders}</h4>
        </div>
        
        <div className="bg-white/[0.02] border border-white/5 rounded p-4 group hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <Phone className="text-slate-600 group-hover:text-brand-red transition-colors" size={14} />
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Revenue</p>
          </div>
          <h4 className="text-xl font-black italic text-blue-400">₹{(totalRevenue / 1000).toFixed(0)}K</h4>
        </div>
      </div>

      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Customer <span className="text-brand-red">Directory</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Customer Database and Order History</p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-red transition-colors" size={16} />
          <input 
            type="text"
            placeholder="FILTER BY NAME OR LOCATION..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-brand-red/50 w-full transition-all backdrop-blur-md placeholder:text-slate-700"
          />
        </div>
      </div>

      {/* CUSTOMERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div 
              key={customer.id}
              onClick={() => onCustomerSelect(customer.id)}
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
                      <User size={24} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#05070a] shadow-[0_0_8px_rgba(231,31,41,0.5)] ${
                      customer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-black text-white text-lg uppercase italic tracking-tighter group-hover:text-brand-red transition-colors">
                      {customer.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <MapPin size={10} /> {customer.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <Phone size={10} /> {customer.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <Mail size={10} /> {customer.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                        Orders: <span className="text-white">{customer.orderCount}</span>
                      </div>
                      <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                        Revenue: <span className="text-green-400">₹{(customer.revenue / 1000).toFixed(0)}K</span>
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
            <h3 className="text-white font-black uppercase italic tracking-widest text-sm">No Customers Found</h3>
            <p className="text-slate-600 text-[10px] mt-2 font-bold uppercase tracking-widest">Adjust your search parameters and try again.</p>
          </div>
        )}
      </div>

      <div className="h-12" />
    </div>
  );
};

export default CustomerList;
