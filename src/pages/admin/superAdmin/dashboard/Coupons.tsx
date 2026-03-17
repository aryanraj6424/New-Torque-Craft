import React, { useState } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { Ticket, Plus, BarChart3, AlertCircle, Zap, ChevronRight } from "lucide-react";
import AllCoupons from "./coupons/AllCoupons";
import CouponDetails from "./coupons/CouponDetails";
import CreateCoupon from "./coupons/CreateCoupon";
import BulkCodes from "./coupons/BulkCodes";

interface CouponCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  count: number | string;
  description: string;
}

const CouponsPage = () => {
  const [currentView, setCurrentView] = useState<"overview" | "all-coupons" | "create" | "bulk" | "details" | "analytics">("overview");
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);

  const couponCategories: CouponCard[] = [
    {
      id: "all-coupons",
      title: "All Coupons",
      icon: <Ticket size={32} />,
      count: 156,
      description: "View and manage all active and inactive coupons"
    },
    {
      id: "create-coupon",
      title: "Create Coupon",
      icon: <Plus size={32} />,
      count: "New",
      description: "Create new discount coupons for customers"
    },
    {
      id: "bulk-codes",
      title: "Bulk Codes",
      icon: <Zap size={32} />,
      count: 45,
      description: "Generate and manage bulk coupon codes"
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <BarChart3 size={32} />,
      count: "Reports",
      description: "View coupon performance and usage analytics"
    },
    {
      id: "abuse-monitoring",
      title: "Abuse Monitoring",
      icon: <AlertCircle size={32} />,
      count: 3,
      description: "Monitor and report suspicious coupon usage"
    }
  ];

  const handleCardClick = (cardId: string) => {
    if (cardId === "all-coupons") {
      setCurrentView("all-coupons");
    } else if (cardId === "create-coupon") {
      setCurrentView("create");
    } else if (cardId === "bulk-codes") {
      setCurrentView("bulk");
    } else if (cardId === "analytics") {
      setCurrentView("analytics");
    }
  };

  const handleViewDetails = (couponId: string) => {
    setSelectedCouponId(couponId);
    setCurrentView("details");
  };

  const handleBackToAllCoupons = () => {
    setCurrentView("all-coupons");
    setSelectedCouponId(null);
  };

  const handleBackToOverview = () => {
    setCurrentView("overview");
    setSelectedCouponId(null);
  };

  // All Coupons View
  if (currentView === "all-coupons") {
    return (
      <div className="space-y-4">
        <button
          onClick={handleBackToOverview}
          className="text-blue-400 hover:text-blue-300 font-medium text-sm mb-4"
        >
          ← Back to Coupons
        </button>
        <AllCoupons onViewDetails={handleViewDetails} />
      </div>
    );
  }

  // Create Coupon View
  if (currentView === "create") {
    return (
      <CreateCoupon onBack={handleBackToOverview} />
    );
  }

  // Bulk Codes View
  if (currentView === "bulk") {
    return (
      <BulkCodes onBack={handleBackToOverview} />
    );
  }

  // Coupon Details View
  if (currentView === "details" && selectedCouponId) {
    return (
      <CouponDetails couponId={selectedCouponId} onBack={handleBackToAllCoupons} />
    );
  }

  // Analytics View
  if (currentView === "analytics") {
    return (
      <div className="space-y-6">
        <button
          onClick={handleBackToOverview}
          className="text-blue-400 hover:text-blue-300 font-medium text-sm mb-4"
        >
          ← Back to Coupons
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Total Usage Count */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
            }} />
            <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
              <Ticket className="text-blue-400 mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-white mb-2">2,847</div>
              <p className="text-slate-300 text-sm uppercase tracking-wider">Total Usage Count</p>
            </div>
          </div>

          {/* Revenue Generated */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
            }} />
            <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
              <div className="text-3xl font-black text-green-400 mx-auto mb-3">₹</div>
              <div className="text-3xl font-black text-white mb-2">4.2M</div>
              <p className="text-slate-300 text-sm uppercase tracking-wider">Revenue Generated</p>
            </div>
          </div>

          {/* Total Discount Given */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
            }} />
            <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
              <div className="text-3xl font-black text-orange-400 mx-auto mb-3">%</div>
              <div className="text-3xl font-black text-white mb-2">847K</div>
              <p className="text-slate-300 text-sm uppercase tracking-wider">Total Discount Given</p>
            </div>
          </div>

          {/* Active Coupons */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
            }} />
            <div className="relative p-6 bg-black/60 backdrop-blur-xl border text-center rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
              <div className="text-3xl font-black text-purple-400 mx-auto mb-3">📈</div>
              <div className="text-3xl font-black text-white mb-2">12</div>
              <p className="text-slate-300 text-sm uppercase tracking-wider">Active Coupons</p>
            </div>
          </div>
        </div>

        {/* Top Performing Coupons */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-8 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
              Top Performing Coupons
            </h3>
            
            <div className="space-y-4">
              {[
                { code: "SUMMER20", usage: 847, revenue: "₹1.2M", discount: "₹240K", conversion: "4.2%" },
                { code: "WELCOME15", usage: 623, revenue: "₹890K", discount: "₹133K", conversion: "3.8%" },
                { code: "FLASH25", usage: 456, revenue: "₹1.1M", discount: "₹275K", conversion: "5.1%" },
                { code: "FIRST10", usage: 389, revenue: "₹567K", discount: "₹57K", conversion: "6.3%" },
                { code: "LOYALTY30", usage: 234, revenue: "₹445K", discount: "₹134K", conversion: "4.9%" }
              ].map((coupon, index) => (
                <div 
                  key={coupon.code}
                  onClick={() => handleViewDetails(coupon.code)}
                  className="flex items-center justify-between p-4 bg-black/40 rounded-xl border cursor-pointer hover:bg-black/60 transition-all"
                  style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                      <Ticket className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{coupon.code}</h4>
                      <p className="text-slate-400 text-sm">{coupon.usage} uses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-green-400 font-bold">{coupon.revenue}</p>
                      <p className="text-slate-500 text-xs">Revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-bold">{coupon.discount}</p>
                      <p className="text-slate-500 text-xs">Discount</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-bold">{coupon.conversion}</p>
                      <p className="text-slate-500 text-xs">Conversion</p>
                    </div>
                    <ChevronRight className="text-yellow-400" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overview - Card Layout
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Coupons Management</h1>
        <p className="text-slate-400">Manage discount coupons, bulk codes, and track usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {couponCategories.map((category) => (
          <GlassCard
            key={category.id}
            className="hover:border-blue-500/50 transition-all cursor-pointer group p-6"
            onClick={() => handleCardClick(category.id)}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left - Icon and Info */}
              <div className="flex-1 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                  <div className="text-blue-400">
                    {category.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                  <p className="text-sm text-slate-400">{category.count} {typeof category.count === 'number' ? 'coupons' : ''}</p>
                </div>
              </div>

              {/* Right - View Button */}
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex-shrink-0">
                VIEW
              </button>
            </div>

            {/* Bottom - Description */}
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-4 pt-4 border-t border-white/10">
              {category.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default CouponsPage;