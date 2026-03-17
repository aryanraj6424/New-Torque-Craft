import React, { useState, useMemo } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { Search, User, Mail, Phone, MapPin, ShieldCheck, ShieldX, ChevronRight, Star, Award, TrendingUp, Zap, Crown, Diamond, ArrowLeft, Calendar, Tag, Package, Truck, FileText, QrCode, DollarSign, Clock, CheckCircle, XCircle, RefreshCcw, Info, Home, Building, Factory, Box, CreditCard, Receipt, Repeat, UserCheck, UserX } from "lucide-react";
import { distributors } from "../../../../data/distributors";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  orderCount: number;
  revenue: number;
  status: "Active" | "Inactive";
  warrantyStatus: "Covered" | "Expired";
  distributorName: string;
  dealerName: string;
  sku?: string;
  productName?: string;
}

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const allCustomers = useMemo(() => {
    const customers: CustomerRecord[] = [];
    distributors.forEach(distributor => {
      distributor.dealers.forEach(dealer => {
        dealer.customers.forEach(customer => {
          customers.push({
            ...customer,
            distributorName: distributor.name,
            dealerName: dealer.name,
            warrantyStatus: Math.random() > 0.3 ? "Covered" : "Expired",
            address: `${customer.location}, ${dealer.area}`
          });
        });
      });
    });
    return customers;
  }, []);

  const filteredCustomers = useMemo(() => {
    return allCustomers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCustomers, searchTerm]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  if (selectedCustomer) {
    return <CustomerDetail customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <div className="w-full min-h-screen pb-40 px-4 pt-12 relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* --- PREMIUM HEADER --- */}
      <div className="max-w-6xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="relative">
          {/* Premium Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 rounded-3xl blur-xl" />
          
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Crown className="text-white" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="text-yellow-900" size={12} fill="currentColor" />
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 tracking-tighter uppercase italic">
                  CUSTOMER <span className="text-white">REGISTRY</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Diamond className="text-yellow-400" size={16} />
                  <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Premium Asset Verification Database
                  </p>
                  <Diamond className="text-yellow-400" size={16} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">Premium</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  {allCustomers.length}
                </div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">Total Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM SEARCH BAR --- */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-yellow-400 transition-colors" size={24} />
          <input
            type="text"
            placeholder="Search Premium Customers by Name, Email, UID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl pl-16 pr-6 py-6 text-white placeholder:text-slate-500 focus:border-yellow-400/50 focus:outline-none focus:bg-black/80 transition-all duration-300 text-lg font-semibold shadow-2xl"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
              <span className="text-black text-[10px] font-black uppercase tracking-wider">PRO</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM STATS CARDS --- */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center">
              <TrendingUp className="text-green-400 mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {allCustomers.filter(c => c.warrantyStatus === 'Covered').length}
              </div>
              <p className="text-slate-300 text-[10px] uppercase tracking-wider mt-2">Active Warranties</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 text-center">
              <Award className="text-purple-400 mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {filteredCustomers.length}
              </div>
              <p className="text-slate-300 text-[10px] uppercase tracking-wider mt-2">Filtered Results</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-center">
              <Star className="text-yellow-400 mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {Math.floor(allCustomers.length * 0.85)}
              </div>
              <p className="text-slate-300 text-[10px] uppercase tracking-wider mt-2">Premium Members</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 text-center">
              <Crown className="text-red-400 mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                ₹{(allCustomers.reduce((sum, c) => sum + c.revenue, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-slate-300 text-[10px] uppercase tracking-wider mt-2">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM CUSTOMER CARDS --- */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => (
            <div key={customer.id} className="relative group">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <GlassCard
                onClick={() => setSelectedCustomer(customer)}
                className="cursor-pointer relative p-6 bg-black/60 backdrop-blur-xl border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25"
              >
                {/* Premium Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-yellow-300/50 shadow-lg">
                    <div className="flex items-center gap-1">
                      <Crown className="text-black" size={12} />
                      <span className="text-black text-[8px] font-black uppercase tracking-wider">PRO</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  {/* Premium Profile Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                      {getInitials(customer.name)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center border-2 border-yellow-300/50">
                      <Star className="text-black" size={14} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-3 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 transition-all duration-300">
                      {customer.name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <Mail className="text-purple-400" size={16} />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <Phone className="text-purple-400" size={16} />
                        <span>{customer.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <MapPin className="text-purple-400" size={16} />
                        <span className="truncate">{customer.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                          customer.warrantyStatus === 'Covered' 
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30' 
                            : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border border-red-400/30'
                        }`}>
                          {customer.warrantyStatus === 'Covered' ? <ShieldCheck size={12} /> : <ShieldX size={12} />}
                          {customer.warrantyStatus}
                        </div>
                        
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <Award size={12} />
                          <span className="font-bold">PREMIUM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <ChevronRight className="text-yellow-400 group-hover:translate-x-2 transition-all duration-300" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded bg-white/[0.01]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-red-600/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12">
                <Search className="text-purple-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 uppercase italic tracking-widest mb-4">
                  No Premium Customers Found
                </h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  Adjust your search parameters and try again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Customer Detail Component
interface CustomerDetailProps {
  customer: CustomerRecord;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onBack }) => {
  const [activeSection, setActiveSection] = useState("overview");

  // Mock data for demonstration
  const transactionData = {
    orderId: "ORD-2024-" + customer.id,
    paymentStatus: "Paid",
    paymentGateway: "Razorpay",
    totalAmount: customer.revenue,
    purchaseDate: "2024-01-15",
    orderQuantity: customer.orderCount
  };

  const warrantyData = {
    certificateId: "WRT-" + customer.id,
    planLevel: "Platinum Lifetime",
    activationStatus: "Authenticated",
    expiryDate: "2025-12-31"
  };

  const orderHistory = [
    { id: "ORD-001", product: "Torque Bolt Set", quantity: 2, price: 25000, date: "2024-01-15", status: "Completed" },
    { id: "ORD-002", product: "Hydraulic Filter", quantity: 1, price: 18000, date: "2024-02-20", status: "Completed" },
    { id: "ORD-003", product: "Brake Fluid", quantity: 3, price: 32000, date: "2024-03-10", status: "In Transit" }
  ];

  const shipmentData = {
    courierPartner: "FedEx Express",
    trackingId: "FDX" + customer.id,
    currentStatus: "In Transit",
    estimatedDelivery: "2024-03-25",
    timeline: [
      { status: "Dispatched", date: "2024-03-20", time: "14:30" },
      { status: "In Transit", date: "2024-03-21", time: "09:15" },
      { status: "Out for Delivery", date: "2024-03-24", time: "08:00" },
      { status: "Delivered", date: "2024-03-25", time: "15:30" }
    ]
  };

  const qrAuthData = {
    qrCodeId: "QR-" + customer.id,
    scanCount: 12,
    scanLocations: ["Service Center", "Customer Site", "Warehouse"],
    authStatus: "Genuine"
  };

  const refundClaims = [
    { caseId: "REF-001", status: "Approved", submittedDate: "2024-02-25", adminNotes: "Product verified defective" }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="w-full min-h-screen pb-40 px-4 pt-12 relative z-10" style={{
      background: 'linear-gradient(135deg, #0A0F1E 0%, #003366 50%, #05070A 100%)'
    }}>
      {/* --- PREMIUM HEADER --- */}
      <div className="max-w-6xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <button 
          onClick={onBack}
          className="group relative flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-purple-500/30 hover:border-yellow-400/50 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <ArrowLeft className="relative z-10 group-hover:text-yellow-400 transition-colors" size={16} />
          <span className="relative z-10">Back to Premium Registry</span>
        </button>
        
        <div className="relative">
          {/* Premium Background Effect */}
          <div className="absolute inset-0 rounded-3xl blur-2xl" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.15) 0%, rgba(0, 51, 102, 0.15) 50%, rgba(5, 7, 10, 0.15) 100%)'
          }} />
          
          <div className="relative flex items-center gap-8 p-10 bg-black/50 backdrop-blur-2xl rounded-3xl border shadow-2xl" style={{
            borderColor: 'rgba(0, 51, 102, 0.3)'
          }}>
            <div className="relative">
              {/* Premium Avatar */}
              <div className="w-32 h-32 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl" style={{
                background: 'linear-gradient(135deg, #E10600 0%, #003366 50%, #05070A 100%)'
              }}>
                {getInitials(customer.name)}
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-yellow-300/50 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Crown className="text-black" size={14} />
                    <span className="text-black text-[8px] font-black uppercase tracking-wider">PRO</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h1 className="text-5xl font-black uppercase italic mb-4" style={{
                  backgroundImage: 'linear-gradient(135deg, #E10600 0%, #003366 50%, #05070A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {customer.name}
                </h1>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="text-purple-400" size={20} />
                    <span className="text-lg">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="text-purple-400" size={20} />
                    <span className="text-lg">{customer.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-yellow-400" size={24} />
                  <span className="text-xl font-semibold px-4 py-2 rounded-xl border" style={{
                    background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)',
                    borderColor: 'rgba(225, 6, 0, 0.5)',
                    color: '#E10600'
                  }}>
                    {customer.address}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Premium Stats */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30">
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">Premium</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-green-400" size={16} />
                  <span className="text-green-300 text-xs font-bold uppercase tracking-wider">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM NAVIGATION TABS --- */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 rounded-2xl blur-lg" />
          <div className="relative flex gap-1 border-b border-purple-500/30 bg-black/40 backdrop-blur-xl rounded-2xl p-2">
            {[
              { id: "overview", label: "Overview", icon: <Info size={16} /> },
              { id: "transaction", label: "Transaction", icon: <CreditCard size={16} /> },
              { id: "warranty", label: "Warranty", icon: <ShieldCheck size={16} /> },
              { id: "orders", label: "Order History", icon: <Package size={16} /> },
              { id: "shipment", label: "Shipment", icon: <Truck size={16} /> },
              { id: "documents", label: "Documents", icon: <FileText size={16} /> },
              { id: "qr", label: "QR Auth", icon: <QrCode size={16} /> },
              { id: "refunds", label: "Refunds", icon: <RefreshCcw size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`group relative px-6 py-3 text-[10px] font-black uppercase tracking-wider transition-all duration-300 rounded-xl border-2 ${
                  activeSection === tab.id
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-brand-red border-purple-400 shadow-lg shadow-purple-500/25"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`transition-transform duration-300 ${
                    activeSection === tab.id ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    {tab.icon}
                  </div>
                  <span className="font-semibold">{tab.label}</span>
                </div>
                {activeSection === tab.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREMIUM CONTENT SECTIONS --- */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* SECTION 1: SOURCE & PRODUCT INFO */}
        {activeSection === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <GlassCard className="relative p-8 bg-black/60 backdrop-blur-xl border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 shadow-2xl">
                <div className="absolute -top-3 -right-3">
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-yellow-300/50 shadow-lg">
                    <div className="flex items-center gap-1">
                      <Home className="text-black" size={10} />
                      <span className="text-black text-[8px] font-black uppercase tracking-wider">SOURCE</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 tracking-tight mb-6">
                  Source & Product Information
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-5">
                    <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Building className="text-purple-400" size={14} />
                      Distributor Name
                    </h4>
                    <p className="text-white text-lg font-semibold">{customer.distributorName}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-5">
                    <h4 className="text-sm text-green-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Factory className="text-green-400" size={14} />
                      Dealer / Retailer Name
                    </h4>
                    <p className="text-white text-lg font-semibold">{customer.dealerName}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-5">
                    <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Tag className="text-blue-400" size={14} />
                      SKU / Product Name
                    </h4>
                    <p className="text-white text-lg font-semibold">{customer.sku || "TBS-01"} / {customer.productName || "Torque Bolt Set"}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-5">
                    <h4 className="text-sm text-yellow-300 uppercase tracking-wider mb-2">Product Description</h4>
                    <p className="text-white">High-performance torque bolts for automotive applications with premium coating and lifetime warranty coverage.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`bg-gradient-to-r ${
                      customer.warrantyStatus === 'Covered' 
                        ? 'from-green-500/10 to-emerald-500/10 border-green-400/30' 
                        : 'from-red-500/10 to-pink-500/10 border-red-400/30'
                    } rounded-xl p-5`}>
                      <h4 className="text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                        {customer.warrantyStatus === 'Covered' ? <ShieldCheck className="text-green-400" size={14} /> : <ShieldX className="text-red-400" size={14} />}
                        Protection Status
                      </h4>
                      <p className="text-white text-lg font-bold">{customer.warrantyStatus}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-5">
                      <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Clock className="text-purple-400" size={14} />
                        Warranty Duration
                      </h4>
                      <p className="text-white text-lg font-bold">720 Days Coverage</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* SECTION 2: TRANSACTION DETAILS */}
        {activeSection === "transaction" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Transaction Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Order ID</h4>
                  <p className="text-white font-semibold">{transactionData.orderId}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Payment Status</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                    <ShieldCheck size={12} />
                    {transactionData.paymentStatus}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Payment Gateway</h4>
                  <p className="text-white font-semibold">{transactionData.paymentGateway}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Total Amount</h4>
                  <p className="text-2xl font-bold text-brand-red">₹{(transactionData.totalAmount / 1000).toFixed(0)}K</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Purchase Date</h4>
                  <p className="text-white font-semibold">{transactionData.purchaseDate}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Order Quantity</h4>
                  <p className="text-white font-semibold">{transactionData.orderQuantity} items</p>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* SECTION 3: WARRANTY METADATA */}
        {activeSection === "warranty" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Warranty Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Certificate ID</h4>
                  <p className="text-white font-semibold">{warrantyData.certificateId}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Plan Level</h4>
                  <p className="text-white font-semibold">{warrantyData.planLevel}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Activation Status</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                    <ShieldCheck size={12} />
                    {warrantyData.activationStatus}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Expiry Date</h4>
                  <p className="text-white font-semibold">{warrantyData.expiryDate}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-brand-red hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                Download Warranty PDF
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/20">
                View Invoice
              </button>
            </div>
          </GlassCard>
        )}

        {/* SECTION 4: ORDER HISTORY */}
        {activeSection === "orders" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Order History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Order ID</th>
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Product Name</th>
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Quantity</th>
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Price</th>
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Order Date</th>
                    <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                      <td className="py-4 text-white text-sm">{order.id}</td>
                      <td className="py-4 text-white text-sm">{order.product}</td>
                      <td className="py-4 text-white text-sm">{order.quantity}</td>
                      <td className="py-4 text-white text-sm">₹{(order.price / 1000).toFixed(0)}K</td>
                      <td className="py-4 text-white text-sm">{order.date}</td>
                      <td className="py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Completed' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {order.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* SECTION 5: LIVE SHIPMENT TRACKING */}
        {activeSection === "shipment" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Live Shipment Tracking</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Courier Partner Name</h4>
                  <p className="text-white font-semibold">{shipmentData.courierPartner}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Tracking ID</h4>
                  <p className="text-white font-semibold">{shipmentData.trackingId}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Current Status</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {shipmentData.currentStatus}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Estimated Delivery Date</h4>
                  <p className="text-white font-semibold">{shipmentData.estimatedDelivery}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-4">Live Timeline</h4>
              <div className="space-y-4">
                {shipmentData.timeline.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${
                      index === shipmentData.timeline.length - 1 
                        ? 'bg-green-500' 
                        : 'bg-slate-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{event.status}</p>
                          <p className="text-slate-400 text-sm">{event.date} at {event.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        )}

        {/* SECTION 6: INVOICE & DOCUMENTS */}
        {activeSection === "documents" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Invoice & Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-4">Invoice Actions</h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-brand-red hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all">
                    View Invoice (PDF)
                  </button>
                  <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/20">
                    Download Invoice
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-4">Payment Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="text-white">₹{(customer.revenue * 0.9 / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tax (10%):</span>
                    <span className="text-white">₹{(customer.revenue * 0.1 / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-brand-red font-bold">₹{(customer.revenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* SECTION 7: QR & AUTHENTICATION DATA */}
        {activeSection === "qr" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">QR & Authentication Data</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">QR Code ID</h4>
                  <p className="text-white font-semibold">{qrAuthData.qrCodeId}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Scan Count</h4>
                  <p className="text-white font-semibold">{qrAuthData.scanCount} scans</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Scan Locations</h4>
                  <div className="space-y-2">
                    {qrAuthData.scanLocations.map((location, index) => (
                      <div key={index} className="text-white text-sm">• {location}</div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Authentication Status</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                    <ShieldCheck size={12} />
                    {qrAuthData.authStatus}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* SECTION 8: REFUND / WARRANTY CLAIMS */}
        {activeSection === "refunds" && (
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">Refund / Warranty Claims</h3>
            
            <div className="space-y-4">
              {refundClaims.map((claim) => (
                <div key={claim.caseId} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Case ID</h4>
                      <p className="text-white font-semibold">{claim.caseId}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Status</h4>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        claim.status === 'Approved' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {claim.status}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Submitted Date</h4>
                      <p className="text-white font-semibold">{claim.submittedDate}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-slate-400 uppercase tracking-wider mb-2">Admin Notes</h4>
                      <p className="text-white text-sm">{claim.adminNotes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
