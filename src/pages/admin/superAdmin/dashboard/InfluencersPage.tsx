import React, { useState, useMemo } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { Search, User, Mail, Phone, TrendingUp, DollarSign, Copy, CheckCircle, XCircle, Pause, Play, ChevronRight, Star, Award, BarChart3, Users, ShoppingCart, Link, Calendar, Filter, ArrowUpDown, Eye, Target, Zap, ShieldAlert, Clock, Settings, AlertCircle, Plus, Trash2, Ban, UserX, Download } from "lucide-react";

interface InfluencerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  assignedCouponCode: string;
  referralLink: string;
  totalOrders: number;
  totalRevenue: number;
  totalDiscountGiven: number;
  commissionEarned: number;
  commissionPending: number;
  commissionRate: number;
  status: "Active" | "Paused";
  conversionRate: number;
  averageOrderValue: number;
  totalClicks: number;
  uniqueVisitors: number;
  joinedDate: string;
  lastPayoutDate?: string;
}

const InfluencersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerRecord | null>(null);
  const [filterBy, setFilterBy] = useState<"all" | "top-performers" | "revenue" | "orders">("all");
  const [sortBy, setSortBy] = useState<"name" | "revenue" | "orders" | "commission">("revenue");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [influencers, setInfluencers] = useState<InfluencerRecord[]>([
    {
      id: "INF-001",
      name: "Mike Johnson",
      email: "mike@influencer.com",
      phone: "+1 234-567-8901",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      assignedCouponCode: "MIKE20",
      referralLink: "https://torquecraft.com/mike",
      totalOrders: 156,
      totalRevenue: 2450000,
      totalDiscountGiven: 490000,
      commissionEarned: 245000,
      commissionPending: 49000,
      commissionRate: 10,
      status: "Active",
      conversionRate: 3.2,
      averageOrderValue: 15705,
      totalClicks: 4875,
      uniqueVisitors: 3210,
      joinedDate: "2024-01-15",
      lastPayoutDate: "2024-02-28"
    },
    {
      id: "INF-002",
      name: "Sarah Williams",
      email: "sarah@influencer.com",
      phone: "+1 234-567-8902",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      assignedCouponCode: "SARAH15",
      referralLink: "https://torquecraft.com/sarah",
      totalOrders: 89,
      totalRevenue: 1680000,
      totalDiscountGiven: 252000,
      commissionEarned: 168000,
      commissionPending: 25200,
      commissionRate: 10,
      status: "Active",
      conversionRate: 4.1,
      averageOrderValue: 18876,
      totalClicks: 2168,
      uniqueVisitors: 1890,
      joinedDate: "2024-01-20",
      lastPayoutDate: "2024-02-28"
    },
    {
      id: "INF-003",
      name: "Dan Martinez",
      email: "dan@influencer.com",
      phone: "+1 234-567-8903",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
      assignedCouponCode: "DAN25",
      referralLink: "https://torquecraft.com/dan",
      totalOrders: 234,
      totalRevenue: 3890000,
      totalDiscountGiven: 972500,
      commissionEarned: 389000,
      commissionPending: 97250,
      commissionRate: 10,
      status: "Active",
      conversionRate: 5.8,
      averageOrderValue: 16624,
      totalClicks: 4035,
      uniqueVisitors: 2890,
      joinedDate: "2024-01-10",
      lastPayoutDate: "2024-02-28"
    },
    {
      id: "INF-004",
      name: "Emma Davis",
      email: "emma@influencer.com",
      phone: "+1 234-567-8904",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      assignedCouponCode: "EMMA12",
      referralLink: "https://torquecraft.com/emma",
      totalOrders: 67,
      totalRevenue: 890000,
      totalDiscountGiven: 106800,
      commissionEarned: 89000,
      commissionPending: 10680,
      commissionRate: 10,
      status: "Paused",
      conversionRate: 2.9,
      averageOrderValue: 13284,
      totalClicks: 2310,
      uniqueVisitors: 1987,
      joinedDate: "2024-02-01"
    }
  ]);

  // Admin action functions
  const toggleInfluencerStatus = (influencerId: string) => {
    setInfluencers(prev => prev.map(influencer => 
      influencer.id === influencerId 
        ? { ...influencer, status: influencer.status === 'Active' ? 'Paused' : 'Active' }
        : influencer
    ));
  };

  const suspendInfluencer = (influencerId: string) => {
    setInfluencers(prev => prev.map(influencer => 
      influencer.id === influencerId 
        ? { ...influencer, status: 'Paused' }
        : influencer
    ));
  };

  const removeInfluencer = (influencerId: string) => {
    if (window.confirm('Are you sure you want to remove this influencer? This action cannot be undone.')) {
      setInfluencers(prev => prev.filter(influencer => influencer.id !== influencerId));
    }
  };

  const addInfluencer = (newInfluencer: Omit<InfluencerRecord, 'id'>) => {
    const id = `INF-${String(influencers.length + 1).padStart(3, '0')}`;
    const influencerWithId = { ...newInfluencer, id };
    setInfluencers(prev => [...prev, influencerWithId]);
    setShowAddModal(false);
  };

  const filteredAndSortedInfluencers = useMemo(() => {
    let filtered = influencers.filter(influencer =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.assignedCouponCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (filterBy === "top-performers") {
      filtered = filtered.filter(i => i.conversionRate > 3.5 && i.totalRevenue > 1000000);
    } else if (filterBy === "revenue") {
      filtered = filtered.filter(i => i.totalRevenue > 1500000);
    } else if (filterBy === "orders") {
      filtered = filtered.filter(i => i.totalOrders > 100);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "revenue":
          return b.totalRevenue - a.totalRevenue;
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "commission":
          return b.commissionEarned - a.commissionEarned;
        default:
          return 0;
      }
    });

    return filtered;
  }, [influencers, searchTerm, filterBy, sortBy]);

  const copyToClipboard = (link: string, influencerId: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(influencerId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Add Influencer Modal Component
  const AddInfluencerModal: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      assignedCouponCode: '',
      commissionRate: 10,
      status: 'Active' as 'Active' | 'Paused',
      instagram: '',
      twitter: '',
      bio: '',
      ageRange: '',
      location: '',
      contentCategories: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newInfluencer: Omit<InfluencerRecord, 'id'> = {
        ...formData,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.replace(/\s/g, '')}`,
        referralLink: `https://torquecraft.com/${formData.name.toLowerCase().replace(/\s/g, '')}`,
        totalOrders: 0,
        totalRevenue: 0,
        totalDiscountGiven: 0,
        commissionEarned: 0,
        commissionPending: 0,
        conversionRate: 0,
        averageOrderValue: 0,
        totalClicks: 0,
        uniqueVisitors: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      addInfluencer(newInfluencer);
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="absolute inset-0 rounded-3xl blur-2xl" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.3) 0%, rgba(0, 51, 102, 0.3) 50%, rgba(5, 7, 10, 0.3) 100%)'
          }} />
          
          <div className="relative bg-black/90 backdrop-blur-2xl rounded-3xl border shadow-2xl p-8" style={{ borderColor: 'rgba(0, 51, 102, 0.5)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                Add New Influencer
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="Enter influencer name"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="influencer@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="+1 234-567-8900"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Coupon Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.assignedCouponCode}
                      onChange={(e) => setFormData({...formData, assignedCouponCode: e.target.value.toUpperCase()})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="INFLUENCER20"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Commission Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={formData.commissionRate}
                      onChange={(e) => setFormData({...formData, commissionRate: Number(e.target.value)})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Initial Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Paused'})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-all appearance-none cursor-pointer"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Social Media Handles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Instagram</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Twitter</label>
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                      className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Profile Details</h3>
                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Bio / Description</label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all resize-none"
                    style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                    placeholder="Tell us about the influencer..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Audience Age Range</label>
                    <input
                      type="text"
                      value={formData.ageRange}
                      onChange={(e) => setFormData({...formData, ageRange: e.target.value})}
                      className="bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="25-45"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Audience Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                      style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                      placeholder="USA, Canada"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Content Categories</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {['Automotive', 'Performance', 'Reviews', 'DIY', 'Racing', 'Lifestyle', 'Technology', 'Fashion', 'Sports', 'Entertainment'].map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.contentCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({...formData, contentCategories: [...formData.contentCategories, category]});
                            } else {
                              setFormData({...formData, contentCategories: formData.contentCategories.filter(c => c !== category)});
                            }
                          }}
                          className="w-4 h-4 rounded border-2 bg-black/40 border-purple-400/30 text-purple-400 focus:ring-purple-400/50 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg text-green-300 font-semibold hover:bg-green-500/30 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Plus size={20} />
                    <span>Add Influencer</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-500/20 to-slate-500/20 border border-slate-400/30 rounded-lg text-slate-300 font-semibold hover:bg-slate-500/30 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (selectedInfluencer) {
    return <InfluencerDetail influencer={selectedInfluencer} onBack={() => setSelectedInfluencer(null)} />;
  }

  return (
    <>
      <div className="w-full min-h-screen pb-40 px-4 pt-12 relative z-10" style={{
        background: 'linear-gradient(135deg, #0A0F1E 0%, #003366 50%, #05070A 100%)'
      }}>
        {/* --- PREMIUM HEADER --- */}
        <div className="max-w-7xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-2xl" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.15) 0%, rgba(0, 51, 102, 0.15) 50%, rgba(5, 7, 10, 0.15) 100%)'
            }} />
            
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-black/50 backdrop-blur-2xl rounded-3xl border shadow-2xl" style={{
              borderColor: 'rgba(0, 51, 102, 0.3)'
            }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl" style={{
                  background: 'linear-gradient(135deg, #E10600 0%, #003366 50%, #05070A 100%)'
                }}>
                  <Users className="text-white" size={32} />
                </div>
                
                <div>
                  <h1 className="text-4xl font-black uppercase italic mb-2" style={{
                    backgroundImage: 'linear-gradient(135deg, #E10600 0%, #003366 50%, #05070A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    INFLUENCER <span className="text-white">MANAGEMENT</span>
                  </h1>
                  <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">
                    Advanced Influencer Marketing Platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    {influencers.length}
                  </div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider">Total Influencers</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    ₹{(influencers.reduce((sum, i) => sum + i.totalRevenue, 0) / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider">Total Revenue</p>
                </div>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl text-green-300 font-semibold hover:bg-green-500/30 transition-all flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>Add Influencer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH AND FILTERS --- */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search influencer by name, email, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/60 backdrop-blur-xl border rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:border-yellow-400/50 focus:outline-none focus:bg-black/80 transition-all duration-300"
                style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="w-full bg-black/60 backdrop-blur-xl border rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-400/50 focus:outline-none focus:bg-black/80 transition-all duration-300 appearance-none cursor-pointer"
                style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
              >
                <option value="all">All Influencers</option>
                <option value="top-performers">Top Performers</option>
                <option value="revenue">High Revenue</option>
                <option value="orders">High Orders</option>
              </select>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-black/60 backdrop-blur-xl border rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-400/50 focus:outline-none focus:bg-black/80 transition-all duration-300 appearance-none cursor-pointer"
                style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
              >
                <option value="revenue">Sort by Revenue</option>
                <option value="orders">Sort by Orders</option>
                <option value="commission">Sort by Commission</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- INFLUENCER CARDS --- */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedInfluencers.map((influencer) => (
              <div key={influencer.id} className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
                }} />
                
                <div
                  onClick={() => setSelectedInfluencer(influencer)}
                  className="relative cursor-pointer p-6 bg-black/60 backdrop-blur-xl border transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 rounded-xl"
                  style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className={`px-3 py-1 rounded-full border-2 shadow-lg flex items-center gap-1 ${
                      influencer.status === 'Active'
                        ? 'bg-green-500/20 text-green-300 border-green-400/30'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                    }`}>
                      {influencer.status === 'Active' ? <Play size={12} /> : <Pause size={12} />}
                      <span className="text-xs font-bold uppercase tracking-wider">{influencer.status}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    {/* Profile Image */}
                    <div className="relative">
                      <img
                        src={influencer.profileImage}
                        alt={influencer.name}
                        className="w-16 h-16 rounded-2xl border-2 shadow-lg"
                        style={{ borderColor: 'rgba(224, 6, 0, 0.5)' }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center border-2 border-yellow-300/50">
                        <Star className="text-black" size={14} fill="currentColor" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 transition-all duration-300">
                        {influencer.name}
                      </h3>
                      <div className="flex items-center gap-3 text-slate-300 text-sm mb-2">
                        <Mail className="text-purple-400" size={14} />
                        <span className="truncate">{influencer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
                          <span className="text-purple-300 text-xs font-bold">{influencer.assignedCouponCode}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(influencer.referralLink, influencer.id);
                          }}
                          className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30 hover:bg-green-500/30 transition-all"
                        >
                          {copiedLink === influencer.id ? (
                            <CheckCircle className="text-green-400" size={14} />
                          ) : (
                            <Copy className="text-green-400" size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingCart className="text-blue-400" size={14} />
                        <span className="text-blue-300 text-xs uppercase tracking-wider">Orders</span>
                      </div>
                      <div className="text-xl font-bold text-white">{influencer.totalOrders}</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="text-green-400" size={14} />
                        <span className="text-green-300 text-xs uppercase tracking-wider">Revenue</span>
                      </div>
                      <div className="text-xl font-bold text-white">₹{(influencer.totalRevenue / 1000).toFixed(0)}K</div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="text-purple-400" size={14} />
                        <span className="text-purple-300 text-xs uppercase tracking-wider">Conversion</span>
                      </div>
                      <div className="text-xl font-bold text-white">{influencer.conversionRate}%</div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="text-yellow-400" size={14} />
                        <span className="text-yellow-300 text-xs uppercase tracking-wider">Commission</span>
                      </div>
                      <div className="text-xl font-bold text-white">₹{(influencer.commissionEarned / 1000).toFixed(0)}K</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Eye className="text-purple-400" size={12} />
                        <span>{influencer.totalClicks} clicks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="text-green-400" size={12} />
                        <span>{influencer.uniqueVisitors} visitors</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Admin Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleInfluencerStatus(influencer.id);
                          }}
                          className={`p-2 rounded-lg transition-all ${
                            influencer.status === 'Active'
                              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-400/30'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/30'
                          }`}
                          title={influencer.status === 'Active' ? 'Pause' : 'Resume'}
                        >
                          {influencer.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            suspendInfluencer(influencer.id);
                          }}
                          className="p-2 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 rounded-lg transition-all border border-orange-400/30"
                          title="Suspend"
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                      
                      <ChevronRight className="text-yellow-400 group-hover:translate-x-2 transition-all duration-300" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedInfluencers.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded bg-white/[0.01]">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-xl" style={{
                  background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.1) 0%, rgba(0, 51, 102, 0.1) 100%)'
                }} />
                <div className="relative bg-black/60 backdrop-blur-xl border rounded-3xl p-12" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                  <Search className="text-purple-400 mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 uppercase italic tracking-widest mb-4">
                    No Influencers Found
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
      <AddInfluencerModal />
    </>
  );
};

// Influencer Detail Component
interface InfluencerDetailProps {
  influencer: InfluencerRecord;
  onBack: () => void;
}

const InfluencerDetail: React.FC<InfluencerDetailProps> = ({ influencer, onBack }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedLink, setCopiedLink] = useState(false);

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mock order data
  const orders = [
    { id: "ORD-001", customer: "John Doe", value: 25000, date: "2024-03-15", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", value: 18000, date: "2024-03-14", status: "Completed" },
    { id: "ORD-003", customer: "Bob Johnson", value: 32000, date: "2024-03-13", status: "Processing" }
  ];

  return (
    <div className="w-full min-h-screen pb-40 px-4 pt-12 relative z-10" style={{
      background: 'linear-gradient(135deg, #0A0F1E 0%, #003366 50%, #05070A 100%)'
    }}>
      {/* --- PREMIUM HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <button 
          onClick={onBack}
          className="group relative flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-all bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border mb-8"
          style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
        >
          <div className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <ChevronRight className="relative z-10 group-hover:text-yellow-400 transition-colors rotate-180" size={16} />
          <span className="relative z-10">Back to Influencers</span>
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl blur-2xl" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.15) 0%, rgba(0, 51, 102, 0.15) 50%, rgba(5, 7, 10, 0.15) 100%)'
          }} />
          
          <div className="relative flex items-center gap-8 p-10 bg-black/50 backdrop-blur-2xl rounded-3xl border shadow-2xl" style={{
            borderColor: 'rgba(0, 51, 102, 0.3)'
          }}>
            <div className="relative">
              <img
                src={influencer.profileImage}
                alt={influencer.name}
                className="w-32 h-32 rounded-3xl border-4 shadow-2xl"
                style={{ borderColor: 'rgba(224, 6, 0, 0.5)' }}
              />
              <div className="absolute -top-2 -right-2">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-yellow-300/50 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="text-black" size={14} />
                    <span className="text-black text-[8px] font-black uppercase tracking-wider">PRO</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-5xl font-black uppercase italic mb-4" style={{
                backgroundImage: 'linear-gradient(135deg, #E10600 0%, #003366 50%, #05070A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {influencer.name}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="text-purple-400" size={20} />
                    <span className="text-lg">{influencer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="text-purple-400" size={20} />
                    <span className="text-lg">{influencer.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                      <span className="text-purple-300 font-bold">{influencer.assignedCouponCode}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(influencer.referralLink)}
                      className="px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 hover:bg-green-500/30 transition-all"
                    >
                      {copiedLink ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : (
                        <Copy className="text-green-400" size={20} />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="text-yellow-400" size={16} />
                    <span className="text-slate-300 text-sm truncate">{influencer.referralLink}</span>
                  </div>
                </div>
              </div>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                influencer.status === 'Active'
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30'
                  : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-400/30'
              }`}>
                {influencer.status === 'Active' ? <Play size={16} /> : <Pause size={16} />}
                {influencer.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM NAVIGATION TABS --- */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl blur-lg" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.1) 0%, rgba(0, 51, 102, 0.1) 100%)'
          }} />
          <div className="relative flex gap-1 border-b rounded-2xl p-2 bg-black/40 backdrop-blur-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            {[
              { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
              { id: "profile", label: "Profile", icon: <User size={16} /> },
              { id: "performance", label: "Performance", icon: <TrendingUp size={16} /> },
              { id: "commission", label: "Commission", icon: <DollarSign size={16} /> },
              { id: "orders", label: "Orders", icon: <ShoppingCart size={16} /> },
              { id: "analytics", label: "Analytics", icon: <Eye size={16} /> },
              { id: "marketing", label: "Marketing", icon: <Target size={16} /> },
              { id: "security", label: "Security", icon: <ShieldAlert size={16} /> }
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

      {/* --- CONTENT SECTIONS --- */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                <ShoppingCart className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-3xl font-black text-white mb-2">{influencer.totalOrders}</div>
                <p className="text-slate-300 text-sm uppercase tracking-wider">Total Orders</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                <DollarSign className="text-green-400 mx-auto mb-3" size={32} />
                <div className="text-3xl font-black text-white mb-2">₹{(influencer.totalRevenue / 1000000).toFixed(1)}M</div>
                <p className="text-slate-300 text-sm uppercase tracking-wider">Total Revenue</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                <Target className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-3xl font-black text-white mb-2">{influencer.conversionRate}%</div>
                <p className="text-slate-300 text-sm uppercase tracking-wider">Conversion Rate</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
              }} />
              <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                <Award className="text-yellow-400 mx-auto mb-3" size={32} />
                <div className="text-3xl font-black text-white mb-2">₹{(influencer.commissionEarned / 1000).toFixed(0)}K</div>
                <p className="text-slate-300 text-sm uppercase tracking-wider">Commission Earned</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Profile Information */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
                }} />
                <div className="relative p-8 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
                    Profile Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
                        <input
                          type="text"
                          value={influencer.name}
                          className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                          style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                        <input
                          type="email"
                          value={influencer.email}
                          className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                          style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                        <input
                          type="tel"
                          value={influencer.phone}
                          className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                          style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Social Media Handles</label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Instagram"
                            defaultValue="@mikejohnson_official"
                            className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                            style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                          />
                          <input
                            type="text"
                            placeholder="Twitter"
                            defaultValue="@mikejohnson"
                            className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                            style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Bio / Description</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about the influencer..."
                          defaultValue="Automotive enthusiast and content creator specializing in performance parts and vehicle modifications."
                          className="w-full bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all resize-none"
                          style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Audience Demographics</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Age Range"
                            defaultValue="25-45"
                            className="bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                            style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            defaultValue="USA, Canada"
                            className="bg-black/40 border rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-400/50 focus:outline-none transition-all"
                            style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Content Categories</label>
                        <div className="flex flex-wrap gap-2">
                          {['Automotive', 'Performance', 'Reviews', 'DIY', 'Racing'].map((category) => (
                            <span key={category} className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg text-xs text-purple-300">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <button className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg text-green-300 font-semibold hover:bg-green-500/30 transition-all">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-slate-500/20 to-slate-500/20 border border-slate-400/30 rounded-lg text-slate-300 font-semibold hover:bg-slate-500/30 transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
                }} />
                <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                  <h4 className="text-lg font-bold text-white mb-4">Profile Strength</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Profile Completion</span>
                        <span className="text-green-400">85%</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Engagement Rate</span>
                        <span className="text-purple-400">4.2%</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
                }} />
                <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                  <h4 className="text-lg font-bold text-white mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg text-blue-300 font-semibold hover:bg-blue-500/30 transition-all text-left">
                      <div className="flex items-center gap-3">
                        <Mail size={16} />
                        <span>Send Email</span>
                      </div>
                    </button>
                    <button className="w-full p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg text-purple-300 font-semibold hover:bg-purple-500/30 transition-all text-left">
                      <div className="flex items-center gap-3">
                        <Link size={16} />
                        <span>View Social Profiles</span>
                      </div>
                    </button>
                    <button className="w-full p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg text-yellow-300 font-semibold hover:bg-yellow-500/30 transition-all text-left">
                      <div className="flex items-center gap-3">
                        <Award size={16} />
                        <span>Update Commission</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this influencer? This action cannot be undone.')) {
                          // In a real app, this would call the delete function
                          console.log('Delete influencer:', influencer.id);
                        }
                      }}
                      className="w-full p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-lg text-red-300 font-semibold hover:bg-red-500/30 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 size={16} />
                        <span>Delete Influencer</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeSection === "orders" && (
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
            }} />
            <div className="relative p-8 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
                Order Tracking
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Order ID</th>
                      <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Customer</th>
                      <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Value</th>
                      <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Date</th>
                      <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                        <td className="py-4 text-white text-sm">{order.id}</td>
                        <td className="py-4 text-white text-sm">{order.customer}</td>
                        <td className="py-4 text-white text-sm">₹{(order.value / 1000).toFixed(0)}K</td>
                        <td className="py-4 text-white text-sm">{order.date}</td>
                        <td className="py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Completed'
                              ? 'bg-green-500/10 text-green-300 border border-green-400/30'
                              : 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/30'
                          }`}>
                            {order.status === 'Completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                            {order.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencersPage;
