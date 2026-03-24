import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserPlus, ShieldCheck, MapPin, 
  Search, Filter, Trash2, Edit3, 
  Package, FileText, Truck, RefreshCcw,
  ShieldAlert, User, History, CreditCard, 
  CheckCircle2, X, AlertCircle, Phone, Calendar,ExternalLink
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Enhanced Types for Production ---
type UserRole = 'Distributor' | 'Dealer' | 'Customer';

interface Order {
  orderId: string;
  product: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  amount: number;
  date: string;
}

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area: string;
  status: 'Active' | 'Suspended';
  lastActive: string;
  orderHistory?: Order[];
  profileDetails?: {
    phone: string;
    joinedDate: string;
    totalRevenue: string;
    managedNodes: number;
    gstin?: string;
  };
}

const INITIAL_USERS: UserAccount[] = [
  { 
    id: 'DIST-102', name: 'Rajesh Diesel Works', email: 'rajesh@diesel.com', 
    role: 'Distributor', area: 'Mumbai, MH', status: 'Active', 
    lastActive: '2 hrs ago',
    profileDetails: { phone: '+91 98765 43210', joinedDate: '12 Jan 2024', totalRevenue: '₹12.5L', managedNodes: 14, gstin: '27AAAAA0000A1Z5' }
  },
  { 
    id: 'DLR-505', name: 'Vikas Auto Parts', email: 'noida.dealer@gmail.com', 
    role: 'Dealer', area: 'Noida, UP', status: 'Active', 
    lastActive: '1 day ago',
    profileDetails: { phone: '+91 88221 00443', joinedDate: '05 Mar 2025', totalRevenue: '₹4.2L', managedNodes: 0 }
  },
  { 
    id: 'CUST-999', name: 'Amit Kumar', email: 'amit@gmail.com', 
    role: 'Customer', area: 'Ladakh (Direct)', status: 'Active', 
    lastActive: '5 mins ago',
    orderHistory: [
      { orderId: 'ORD-8821', product: 'Main Stud Kit 12V', status: 'Pending', amount: 8500, date: '24 Mar 2026' },
      { orderId: 'ORD-7710', product: 'Turbo Bolt Set', status: 'Delivered', amount: 1200, date: '20 Mar 2026' }
    ]
  },
];

export default function UserRoleManagement() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<UserRole | 'All'>('All');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(() => 
    users.find(u => u.id === selectedUserId) || null
  , [selectedUserId, users]);

  // --- Handlers ---
  const handleFulfill = (orderId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === selectedUserId && user.orderHistory) {
        return {
          ...user,
          orderHistory: user.orderHistory.map(order => 
            order.orderId === orderId ? { ...order, status: 'Shipped' } : order
          )
        };
      }
      return user;
    }));
    alert(`Order ${orderId} marked as Shipped!`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || u.role === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, users]);

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
              ENTITY <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">CONTROL</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-2">Access: Global Super Admin</p>
          </motion.div>
          <button className="group flex items-center gap-3 px-6 py-4 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all active:scale-95">
            <UserPlus size={16} className="group-hover:rotate-12 transition-transform" /> Create New Node
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#0B0F18]/50 border border-slate-800 rounded-2xl w-fit">
          {(['All', 'Distributor', 'Dealer', 'Customer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                activeTab === tab ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main List */}
        <div className="bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search by ID, Area, or Name..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-[10px] uppercase tracking-widest outline-none focus:border-cyan-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"><RefreshCcw size={16}/></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <th className="p-6">Account Details</th>
                  <th className="p-6">Region</th>
                  <th className="p-6">Tier</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-800/30 transition-all">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-cyan-500 font-black italic shadow-inner">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-tight">{user.name}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <MapPin size={12} className="text-cyan-500" /> {user.area}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={cn(
                        "text-[8px] font-black uppercase px-2.5 py-1 rounded-md border",
                        user.role === 'Distributor' ? "border-purple-500/30 text-purple-400 bg-purple-500/5" :
                        user.role === 'Dealer' ? "border-orange-500/30 text-orange-400 bg-orange-500/5" : "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={cn(
                          "flex items-center gap-2 text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border transition-all",
                          user.status === 'Active' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"
                        )}
                      >
                        <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-red-500")} /> 
                        {user.status}
                      </button>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => setSelectedUserId(user.id)}
                        className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-[9px] font-black uppercase hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                      >
                        Explore Data
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- PRODUCTION MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedUserId(null)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-5xl bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              <div className="flex flex-col md:flex-row h-[85vh] md:h-[75vh]">
                {/* Profile Sidebar */}
                <div className="w-full md:w-80 p-8 border-r border-slate-800 bg-slate-950/40 flex flex-col">
                  <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-3xl flex items-center justify-center text-4xl font-black text-white italic mb-6 shadow-2xl shadow-cyan-500/20">
                    {selectedUser.name.charAt(0)}
                    <div className="absolute -bottom-2 -right-2 p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <ShieldCheck size={16} className="text-cyan-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{selectedUser.name}</h2>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-cyan-500/20">{selectedUser.role}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">{selectedUser.id}</span>
                  </div>

                  <div className="mt-8 space-y-4 flex-1">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Phone size={14} className="text-cyan-500" />
                      <span className="text-[11px] font-bold">{selectedUser.profileDetails?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Calendar size={14} className="text-cyan-500" />
                      <span className="text-[11px] font-bold">Joined: {selectedUser.profileDetails?.joinedDate || '2026'}</span>
                    </div>
                    {selectedUser.profileDetails?.gstin && (
                      <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl mt-4">
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Tax Identity (GSTIN)</p>
                        <p className="text-[10px] text-white font-mono font-bold tracking-wider">{selectedUser.profileDetails.gstin}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 space-y-3">
                    <button 
                      onClick={() => toggleUserStatus(selectedUser.id)}
                      className={cn(
                        "w-full py-4 rounded-xl text-[10px] font-black uppercase transition-all border",
                        selectedUser.status === 'Active' ? "bg-red-500/5 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white" : "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                      )}
                    >
                      {selectedUser.status === 'Active' ? "Revoke Access" : "Restore Access"}
                    </button>
                    <button className="w-full py-4 bg-slate-900 border border-slate-800 text-white rounded-xl text-[10px] font-black uppercase hover:bg-slate-800">Edit Permissions</button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
                    <div className="flex items-center gap-3">
                      {selectedUser.role === 'Customer' ? <Package className="text-cyan-500" size={20} /> : <History className="text-cyan-500" size={20} />}
                      <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                        {selectedUser.role === 'Customer' ? "Direct Fulfillment Ledger" : "Operational Audit & Metrics"}
                      </h3>
                    </div>
                    <button onClick={() => setSelectedUserId(null)} className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-500 hover:text-white"><X /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {selectedUser.role === 'Customer' ? (
                      <div className="space-y-4">
                        {selectedUser.orderHistory?.map(order => (
                          <div key={order.orderId} className="group p-6 bg-slate-950 border border-slate-800 rounded-3xl hover:border-cyan-500/30 transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{order.orderId}</span>
                                  <span className="text-[10px] text-slate-600 font-bold">• {order.date}</span>
                                </div>
                                <p className="text-lg font-black text-white italic mt-1">{order.product}</p>
                                <p className="text-sm text-emerald-500 font-black mt-1">₹{order.amount.toLocaleString()}</p>
                              </div>
                              <div className={cn(
                                "px-4 py-1.5 rounded-full text-[9px] font-black uppercase border",
                                order.status === 'Pending' ? "bg-orange-500/10 border-orange-500/20 text-orange-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                              )}>
                                {order.status}
                              </div>
                            </div>
                            
                            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                              <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                                  <FileText size={14} /> Invoice
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                                  <Truck size={14} /> Tracking
                                </button>
                              </div>
                              {order.status === 'Pending' && (
                                <button 
                                  onClick={() => handleFulfill(order.orderId)}
                                  className="px-6 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                                >
                                  Mark as Shipped
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Metrics Bar for Distributors/Dealers */}
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Cycle Revenue</p>
                              <p className="text-2xl font-black text-emerald-500 italic">{selectedUser.profileDetails?.totalRevenue}</p>
                           </div>
                           <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Network Nodes</p>
                              <p className="text-2xl font-black text-white italic">{selectedUser.profileDetails?.managedNodes}</p>
                           </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Recent Operational Logs</p>
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl hover:bg-slate-900/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                                <div>
                                  <p className="text-[11px] text-white font-bold italic uppercase">Authorized Warranty Claim #WRY-209{i}</p>
                                  <p className="text-[9px] text-slate-500 font-bold mt-0.5 uppercase tracking-tighter">24 March 2026 • 10:45 AM via Node Server</p>
                                </div>
                              </div>
                              <button className="text-slate-600 hover:text-cyan-500 transition-colors"><ExternalLink size={14}/></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}