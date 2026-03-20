import React, { useState } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Percent,
  Activity,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from "lucide-react";

const Overview: React.FC = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for overview
  const stats = {
    totalRevenue: 2847500,
    totalOrders: 1247,
    totalUsers: 8432,
    conversionRate: 4.2,
    growth: {
      revenue: 12.5,
      orders: 8.3,
      users: 15.2,
      conversion: -2.1
    }
  };

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: 45000, status: "Completed", time: "2 mins ago" },
    { id: "ORD-002", customer: "Jane Smith", amount: 32000, status: "Processing", time: "5 mins ago" },
    { id: "ORD-003", customer: "Bob Johnson", amount: 28000, status: "Completed", time: "12 mins ago" },
    { id: "ORD-004", customer: "Alice Brown", amount: 56000, status: "Completed", time: "25 mins ago" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: 19000, status: "Pending", time: "1 hour ago" }
  ];

  const topProducts = [
    { name: "Turbo Charger X1", sales: 234, revenue: 7020000, growth: 12.5 },
    { name: "Performance Exhaust Pro", sales: 189, revenue: 5670000, growth: 8.3 },
    { name: "ECU Tuner Plus", sales: 156, revenue: 4680000, growth: -3.2 },
    { name: "Cold Air Intake Max", sales: 143, revenue: 4290000, growth: 15.7 },
    { name: "Suspension Kit Sport", sales: 98, revenue: 2940000, growth: 6.8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400">Monitor your business performance and key metrics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-black/40 border rounded-lg px-4 py-2 text-white focus:border-blue-400/50 focus:outline-none transition-all"
            style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-400" size={24} />
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stats.growth.revenue > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stats.growth.revenue > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(stats.growth.revenue)}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-2">₹{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-slate-300 text-sm uppercase tracking-wider">Total Revenue</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="text-blue-400" size={24} />
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stats.growth.orders > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stats.growth.orders > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(stats.growth.orders)}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-2">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-slate-300 text-sm uppercase tracking-wider">Total Orders</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <Users className="text-purple-400" size={24} />
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stats.growth.users > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stats.growth.users > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(stats.growth.users)}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-2">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-slate-300 text-sm uppercase tracking-wider">Total Users</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-orange-400" size={24} />
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stats.growth.conversion > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stats.growth.conversion > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(stats.growth.conversion)}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-2">{stats.conversionRate}%</div>
            <p className="text-slate-300 text-sm uppercase tracking-wider">Conversion Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
              Recent Orders
            </h3>
            
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-black/60 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <ShoppingCart className="text-blue-400" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{order.id}</p>
                      <p className="text-slate-400 text-xs">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{(order.amount / 1000).toFixed(0)}K</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Completed'
                          ? 'bg-green-500/10 text-green-300 border border-green-400/30'
                          : order.status === 'Processing'
                          ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/30'
                          : 'bg-orange-500/10 text-orange-300 border border-orange-400/30'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-slate-500 text-xs">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium">
              View All Orders
            </button>
          </div>
        </div>

        {/* Top Products */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
            background: 'linear-gradient(135deg, rgba(224, 6, 0, 0.2) 0%, rgba(0, 51, 102, 0.2) 100%)'
          }} />
          <div className="relative p-6 bg-black/60 backdrop-blur-xl border rounded-xl" style={{ borderColor: 'rgba(0, 51, 102, 0.3)' }}>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
              Top Products
            </h3>
            
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-black/60 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Package className="text-purple-400" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{product.name}</p>
                      <p className="text-slate-400 text-xs">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{(product.revenue / 1000000).toFixed(1)}M</p>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      product.growth > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.growth > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(product.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all text-sm font-medium">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
