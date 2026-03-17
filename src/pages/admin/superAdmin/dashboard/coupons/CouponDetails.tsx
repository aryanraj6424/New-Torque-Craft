import React, { useState } from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { ArrowLeft, Calendar, Hash, Globe, User, Package, ChevronRight, Users, ShoppingCart, TrendingUp, DollarSign, Eye } from "lucide-react";
import CountryRestriction from "./CountryRestriction";

interface CouponDetailsProps {
  couponId: string;
  onBack: () => void;
}

const CouponDetails: React.FC<CouponDetailsProps> = ({ couponId, onBack }) => {
  const [isCountryValid, setIsCountryValid] = useState(false);
  const [userCountry, setUserCountry] = useState("");

  // Sample coupon data - in real app, fetch based on couponId
  const couponData: any = {
    "1": {
      code: "TORQUE10",
      discountType: "Percentage",
      value: "10%",
      startDate: "2025-09-01",
      expiryDate: "2026-06-30",
      usageLimits: {
        perUser: 5,
        total: 500
      },
      currentUsage: 120,
      productsApplied: ["All Engines", "Turbos", "Exhaust Systems"],
      categoriesApplied: ["Performance", "Engines"],
      countryRestrictions: ["US", "Canada"],
      createdBy: "Admin",
      createdByName: "John Admin"
    },
    "2": {
      code: "DIESELMIKE15",
      discountType: "Percentage",
      value: "15%",
      startDate: "2025-08-15",
      expiryDate: "2026-05-15",
      usageLimits: {
        perUser: 3,
        total: 300
      },
      currentUsage: 85,
      productsApplied: ["Diesel Engines", "Diesel Turbos"],
      categoriesApplied: ["Diesel Performance"],
      countryRestrictions: ["US", "Canada", "Mexico"],
      createdBy: "Influencer",
      createdByName: "Diesel Mike"
    },
    "SUMMER20": {
      code: "SUMMER20",
      discountType: "Percentage",
      value: "20%",
      startDate: "2024-06-01",
      expiryDate: "2024-08-31",
      usageLimits: {
        perUser: 10,
        total: 1000
      },
      currentUsage: 847,
      productsApplied: ["All Products", "Performance Parts", "Accessories"],
      categoriesApplied: ["Summer Sale", "Seasonal"],
      countryRestrictions: ["US", "Canada", "UK"],
      createdBy: "Admin",
      createdByName: "Summer Campaign"
    },
    "WELCOME15": {
      code: "WELCOME15",
      discountType: "Percentage",
      value: "15%",
      startDate: "2024-01-01",
      expiryDate: "2024-12-31",
      usageLimits: {
        perUser: 1,
        total: 2000
      },
      currentUsage: 623,
      productsApplied: ["New Products", "Starter Kits", "Essential Parts"],
      categoriesApplied: ["Welcome", "New Customer"],
      countryRestrictions: ["US", "Canada", "UK", "Australia"],
      createdBy: "Admin",
      createdByName: "Welcome Program"
    },
    "FLASH25": {
      code: "FLASH25",
      discountType: "Percentage",
      value: "25%",
      startDate: "2024-03-15",
      expiryDate: "2024-03-17",
      usageLimits: {
        perUser: 2,
        total: 500
      },
      currentUsage: 456,
      productsApplied: ["Selected Items", "Flash Sale Items"],
      categoriesApplied: ["Flash Sale", "Limited Time"],
      countryRestrictions: ["US", "Canada"],
      createdBy: "Admin",
      createdByName: "Flash Sale Team"
    },
    "FIRST10": {
      code: "FIRST10",
      discountType: "Percentage",
      value: "10%",
      startDate: "2024-01-01",
      expiryDate: "2024-12-31",
      usageLimits: {
        perUser: 1,
        total: 1000
      },
      currentUsage: 389,
      productsApplied: ["First Purchase Items", "New Customer Specials"],
      categoriesApplied: ["First Time", "New Customer"],
      countryRestrictions: ["US", "Canada", "UK"],
      createdBy: "Admin",
      createdByName: "First Purchase Program"
    },
    "LOYALTY30": {
      code: "LOYALTY30",
      discountType: "Percentage",
      value: "30%",
      startDate: "2024-01-01",
      expiryDate: "2024-12-31",
      usageLimits: {
        perUser: 3,
        total: 300
      },
      currentUsage: 234,
      productsApplied: ["Premium Products", "Loyalty Rewards"],
      categoriesApplied: ["Loyalty Program", "VIP"],
      countryRestrictions: ["US", "Canada"],
      createdBy: "Admin",
      createdByName: "Loyalty Program"
    }
  };

  const coupon = couponData[couponId];

  if (!coupon) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="text-blue-400 hover:text-blue-300 font-medium text-sm mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Analytics
        </button>
        
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-8 bg-black/60 backdrop-blur-xl border rounded-xl text-center" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
              Coupon Not Found
            </h3>
            <p className="text-slate-400">
              The coupon code "{couponId}" was not found in our system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mock order data for the detailed report
  const orders = [
    { id: "ORD-001", customer: "John Doe", amount: 25000, discount: 2500, date: "2024-03-15", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", amount: 18000, discount: 1800, date: "2024-03-14", status: "Completed" },
    { id: "ORD-003", customer: "Bob Johnson", amount: 32000, discount: 3200, date: "2024-03-13", status: "Processing" },
    { id: "ORD-004", customer: "Alice Brown", amount: 15000, discount: 1500, date: "2024-03-12", status: "Completed" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: 45000, discount: 4500, date: "2024-03-11", status: "Completed" }
  ];

  // Mock customer data
  const customers = [
    { id: "CUST-001", name: "John Doe", email: "john@example.com", totalOrders: 5, totalSpent: 125000, lastOrder: "2024-03-15" },
    { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", totalOrders: 3, totalSpent: 54000, lastOrder: "2024-03-14" },
    { id: "CUST-003", name: "Bob Johnson", email: "bob@example.com", totalOrders: 2, totalSpent: 50000, lastOrder: "2024-03-13" },
    { id: "CUST-004", name: "Alice Brown", email: "alice@example.com", totalOrders: 4, totalSpent: 60000, lastOrder: "2024-03-12" },
    { id: "CUST-005", name: "Charlie Wilson", email: "charlie@example.com", totalOrders: 1, totalSpent: 45000, lastOrder: "2024-03-11" }
  ];

  const [activeSection, setActiveSection] = useState<"overview" | "orders" | "customers">("overview");

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-blue-400 hover:text-blue-300 font-medium text-sm mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Analytics
      </button>

      {/* Coupon Overview */}
      <div className="relative group">
        <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
          background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
        }} />
        <div className="relative p-8 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                <Hash className="text-blue-400" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white mb-2">{coupon.code}</h1>
                <p className="text-slate-400">{coupon.discountType} Discount - {coupon.value}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-green-400 mb-1">{coupon.currentUsage}</div>
              <p className="text-slate-400 text-sm">Total Uses</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10">
            {[
              { id: "overview", label: "Overview", icon: <TrendingUp size={16} /> },
              { id: "orders", label: "Orders List", icon: <ShoppingCart size={16} /> },
              { id: "customers", label: "Customer Data", icon: <Users size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                  activeSection === tab.id
                    ? "text-blue-400 border-blue-400"
                    : "text-slate-400 border-transparent hover:text-white hover:border-white/30"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-green-400 mb-1">{coupon.currentUsage}</div>
                <p className="text-slate-400 text-sm">Total Usage</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-orange-400 mb-1">{coupon.usageLimits.total}</div>
                <p className="text-slate-400 text-sm">Usage Limit</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400 mb-1">{coupon.usageLimits.perUser}</div>
                <p className="text-slate-400 text-sm">Per User Limit</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-400 mb-1">{coupon.productsApplied.length}</div>
                <p className="text-slate-400 text-sm">Products Applied</p>
              </div>
            </div>
          )}

          {/* Orders List Section */}
          {activeSection === "orders" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Recent Orders Using {coupon.code}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Order ID</th>
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Customer</th>
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Amount</th>
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Discount</th>
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Date</th>
                      <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 text-white text-sm">{order.id}</td>
                        <td className="py-3 text-white text-sm">{order.customer}</td>
                        <td className="py-3 text-white text-sm">₹{(order.amount / 1000).toFixed(0)}K</td>
                        <td className="py-3 text-green-400 text-sm">₹{(order.discount / 1000).toFixed(0)}K</td>
                        <td className="py-3 text-white text-sm">{order.date}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Completed'
                              ? 'bg-green-500/10 text-green-300 border border-green-400/30'
                              : 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/30'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customer Data Section */}
          {activeSection === "customers" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Customers Using {coupon.code}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="p-4 bg-black/40 rounded-xl border hover:bg-black/60 transition-all" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                          <User className="text-blue-400" size={16} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{customer.name}</h4>
                          <p className="text-slate-400 text-sm">{customer.email}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-yellow-400" size={16} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-white font-bold">{customer.totalOrders}</p>
                        <p className="text-slate-500 text-xs">Orders</p>
                      </div>
                      <div>
                        <p className="text-green-400 font-bold">₹{(customer.totalSpent / 1000).toFixed(0)}K</p>
                        <p className="text-slate-500 text-xs">Spent</p>
                      </div>
                      <div>
                        <p className="text-blue-400 font-bold">{customer.lastOrder}</p>
                        <p className="text-slate-500 text-xs">Last Order</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;
