import React, { useMemo } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, User, Phone, Mail, MapPin, Package, TrendingUp, CheckCircle, XCircle, Calendar, Shield, QrCode, RefreshCw } from "lucide-react";
import { distributors } from "../../../../../data/distributors";

interface CustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customerId,
  onBack,
}) => {
  const customerData = useMemo(() => {
    for (const distributor of distributors) {
      for (const dealer of distributor.dealers) {
        const customer = dealer.customers.find(c => c.id === customerId);
        if (customer) {
          return { customer, dealer, distributor };
        }
      }
    }
    return null;
  }, [customerId]);

  if (!customerData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Customer not found</p>
      </div>
    );
  }

  const { customer, dealer, distributor } = customerData;

  // Mock data for additional customer details
  const orders = [
    { id: "ORD-001", date: "2024-01-15", status: "Completed", amount: 25000, product: "Torque Bolt Set" },
    { id: "ORD-002", date: "2024-02-20", status: "Completed", amount: 18000, product: "Hydraulic Filter" },
    { id: "ORD-003", date: "2024-03-10", status: "Pending", amount: 32000, product: "Brake Fluid Kit" },
  ];

  const warrantyData = [
    { id: "WRT-001", product: "Torque Bolt Set", startDate: "2024-01-15", endDate: "2025-01-15", status: "Active" },
    { id: "WRT-002", product: "Hydraulic Filter", startDate: "2024-02-20", endDate: "2025-02-20", status: "Active" },
  ];

  const qrScans = [
    { date: "2024-01-16", product: "Torque Bolt Set", location: "Service Center" },
    { date: "2024-02-21", product: "Hydraulic Filter", location: "Customer Site" },
    { date: "2024-03-11", product: "Brake Fluid Kit", location: "Warehouse" },
  ];

  const refundRequests = [
    { id: "REF-001", date: "2024-02-25", amount: 5000, reason: "Defective Product", status: "Approved" },
  ];

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all bg-white/5 px-4 py-2 rounded border border-white/5"
        >
          <ArrowLeft size={14} /> Back to Dealer
        </button>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
          customer.status === 'Active' 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {customer.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {customer.status}
        </div>
      </div>

      {/* --- BASIC INFO --- */}
      <GlassCard className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{customer.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-slate-400 text-sm">{customer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Phone size={12} /> Phone
            </div>
            <p className="text-white text-sm">{customer.phone}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Mail size={12} /> Email
            </div>
            <p className="text-white text-sm">{customer.email}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
              <Package size={12} /> Total Orders
            </div>
            <p className="text-white text-sm">{customer.orderCount} orders</p>
          </div>
        </div>
      </GlassCard>

      {/* --- PERFORMANCE METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            ₹{(customer.revenue / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total Revenue</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {customer.orderCount}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Orders Placed</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {warrantyData.length}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Active Warranties</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {qrScans.length}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">QR Scans</div>
        </GlassCard>
      </div>

      {/* --- ORDER HISTORY --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <Package className="text-purple-400" size={20} />
          Order History
        </h3>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{order.product}</h4>
                  <p className="text-xs text-slate-400 mt-1">Order ID: {order.id}</p>
                  <p className="text-xs text-slate-400">Date: {order.date}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">₹{(order.amount / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Amount</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* --- WARRANTY DATA --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <Shield className="text-purple-400" size={20} />
          Warranty Information
        </h3>
        
        <div className="space-y-4">
          {warrantyData.map((warranty) => (
            <div key={warranty.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{warranty.product}</h4>
                  <p className="text-xs text-slate-400 mt-1">Warranty ID: {warranty.id}</p>
                  <p className="text-xs text-slate-400">
                    {warranty.startDate} - {warranty.endDate}
                  </p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  warranty.status === 'Active' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {warranty.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* --- QR SCAN HISTORY --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <QrCode className="text-purple-400" size={20} />
          QR Scan History
        </h3>
        
        <div className="space-y-4">
          {qrScans.map((scan, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{scan.product}</h4>
                  <p className="text-xs text-slate-400 mt-1">Location: {scan.location}</p>
                  <p className="text-xs text-slate-400">Date: {scan.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* --- REFUND REQUESTS --- */}
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <RefreshCw className="text-purple-400" size={20} />
          Refund Requests
        </h3>
        
        <div className="space-y-4">
          {refundRequests.map((refund) => (
            <div key={refund.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{refund.reason}</h4>
                  <p className="text-xs text-slate-400 mt-1">Request ID: {refund.id}</p>
                  <p className="text-xs text-slate-400">Date: {refund.date}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">₹{(refund.amount / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Amount</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    refund.status === 'Approved' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {refund.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default CustomerDetail;
