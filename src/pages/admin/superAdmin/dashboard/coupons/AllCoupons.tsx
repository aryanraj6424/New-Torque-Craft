import React, { useState } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ChevronRight, Search, Filter } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  type: "Percentage" | "Fixed" | "Free Shipping";
  status: "Active" | "Inactive";
  usageCount: number;
  expiryDate: string;
}

interface AllCouponsProps {
  onViewDetails: (couponId: string) => void;
}

const AllCoupons: React.FC<AllCouponsProps> = ({ onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const coupons: Coupon[] = [
    {
      id: "1",
      code: "TORQUE10",
      type: "Percentage",
      status: "Active",
      usageCount: 120,
      expiryDate: "2026-06-30"
    },
    {
      id: "2",
      code: "DIESELMIKE15",
      type: "Percentage",
      status: "Active",
      usageCount: 85,
      expiryDate: "2026-05-15"
    },
    {
      id: "3",
      code: "LAUNCH20",
      type: "Fixed",
      status: "Active",
      usageCount: 45,
      expiryDate: "2026-04-20"
    },
    {
      id: "4",
      code: "FREESHIP25",
      type: "Free Shipping",
      status: "Active",
      usageCount: 32,
      expiryDate: "2026-07-10"
    },
    {
      id: "5",
      code: "SUMMER30",
      type: "Percentage",
      status: "Inactive",
      usageCount: 156,
      expiryDate: "2025-08-31"
    },
    {
      id: "6",
      code: "VIPEXCLUSIVE",
      type: "Fixed",
      status: "Active",
      usageCount: 23,
      expiryDate: "2026-12-31"
    }
  ];

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Percentage":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "Fixed":
        return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "Free Shipping":
        return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "text-green-400 bg-green-500/10"
      : "text-red-400 bg-red-500/10";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">All Coupons</h2>
        <p className="text-slate-400">View and manage all active and inactive coupons</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by coupon code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <button className="p-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
          <Filter size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Code Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Usage Count</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Expiry Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-blue-400">{coupon.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(coupon.type)}`}>
                      {coupon.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <span className="font-semibold">{coupon.usageCount}</span>
                    <span className="text-slate-400 text-sm ml-2">uses</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onViewDetails(coupon.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-all group"
                    >
                      <span className="text-xs font-medium">View</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCoupons.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-400 text-sm">No coupons found matching your search.</p>
          </div>
        )}
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Total Coupons</p>
          <p className="text-3xl font-bold text-white">{coupons.length}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Active</p>
          <p className="text-3xl font-bold text-green-400">{coupons.filter(c => c.status === "Active").length}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Total Used</p>
          <p className="text-3xl font-bold text-blue-400">{coupons.reduce((sum, c) => sum + c.usageCount, 0)}</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default AllCoupons;
