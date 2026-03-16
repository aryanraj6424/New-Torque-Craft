
// import React, { useState } from "react";
// import { GlassCard, Badge } from "../ui/GlassCard";
// import {
//   Users,
//   ShieldCheck,
//   RotateCcw,
//   TrendingUp,
//   QrCode,
//   Package,
//   BarChart3,
//   LayoutDashboard,
//   Settings,
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   Globe,
//   Percent,
//   Link,
//   Store
// } from "lucide-react";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// const performanceData = [
//   { name: "Jan", value: 400 },
//   { name: "Feb", value: 600 },
//   { name: "Mar", value: 500 },
//   { name: "Apr", value: 800 },
//   { name: "May", value: 900 },
//   { name: "Jun", value: 1200 }
// ];

// interface SuperAdminProps {
//   activeTab: string;
// }

// const SuperAdminContent: React.FC<SuperAdminProps> = ({ activeTab }) => {

//   /* ------------------------ OVERVIEW ----------------------- */

//   if (activeTab === "overview") {
//     return (
//       <div className="space-y-6">

//         {/* Top stats */}

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//           <GlassCard className="border-cyan-500/20 bg-cyan-950/10">
//             <p className="text-cyan-400 text-xs uppercase">Total Users</p>
//             <h3 className="text-4xl font-bold text-white mt-2">1,245</h3>
//             <p className="text-green-400 text-sm mt-1">+15% Growth</p>
//           </GlassCard>

//           <GlassCard className="border-blue-500/20 bg-blue-950/10">
//             <p className="text-blue-400 text-xs uppercase">Active Warranties</p>
//             <h3 className="text-4xl font-bold text-white mt-2">342</h3>
//             <p className="text-slate-400 text-sm">98.8% Valid</p>
//           </GlassCard>

//           <GlassCard className="border-purple-500/20 bg-purple-950/10">
//             <p className="text-purple-400 text-xs uppercase">Active Coupons</p>
//             <h3 className="text-4xl font-bold text-white mt-2">86</h3>
//             <p className="text-slate-400 text-sm">Campaign Codes</p>
//           </GlassCard>

//           <GlassCard className="border-pink-500/20 bg-pink-950/10">
//             <p className="text-pink-400 text-xs uppercase">Influencer Revenue</p>
//             <h3 className="text-4xl font-bold text-white mt-2">₹12.5L</h3>
//             <p className="text-green-400 text-sm">+8% This Month</p>
//           </GlassCard>

//         </div>

//         {/* Analytics Chart */}

//         <GlassCard className="h-[350px]">
//           <p className="text-xs text-slate-400 uppercase mb-6">Sales Performance</p>

//           <ResponsiveContainer width="100%" height="85%">
//             <AreaChart data={performanceData}>
//               <defs>
//                 <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
//                   <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid stroke="#ffffff10" />
//               <XAxis dataKey="name" stroke="#ffffff40" />
//               <YAxis stroke="#ffffff40" />
//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#06b6d4"
//                 strokeWidth={3}
//                 fill="url(#colorMain)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>

//         </GlassCard>
//       </div>
//     );
//   }

//   /* ------------------------ USERS ----------------------- */

//   if (activeTab === "users") {
//     return (
//       <GlassCard>
//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl text-white font-bold">User Management</h2>
//           <button className="bg-cyan-500 px-4 py-2 text-xs rounded-lg flex items-center gap-2">
//             <Plus size={14} /> Add User
//           </button>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-slate-400">
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody className="text-white">
//             {["Dealer One", "Distributor X", "Retail Client"].map((u, i) => (
//               <tr key={i} className="border-t border-white/10">
//                 <td className="py-3">{u}</td>
//                 <td>Dealer</td>
//                 <td>
//                   <Badge variant="success">Active</Badge>
//                 </td>
//                 <td className="flex gap-2">
//                   <Edit size={16} />
//                   <Trash2 size={16} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </GlassCard>
//     );
//   }

//   /* ------------------------ COUPON SYSTEM ----------------------- */

//   if (activeTab === "coupons") {
//     return (
//       <GlassCard>
//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl text-white font-bold">Coupon System</h2>

//           <button className="bg-blue-600 px-4 py-2 text-xs rounded-lg flex gap-2 items-center">
//             <Plus size={14} /> Create Coupon
//           </button>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-slate-400">
//             <tr>
//               <th>Code</th>
//               <th>Type</th>
//               <th>Discount</th>
//               <th>Usage</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody className="text-white">

//             {[
//               { code: "TORQUE10", discount: "10%" },
//               { code: "LAUNCH20", discount: "20%" },
//               { code: "DIESELMIKE15", discount: "15%" }
//             ].map((c, i) => (

//               <tr key={i} className="border-t border-white/10">

//                 <td>{c.code}</td>
//                 <td>Percentage</td>
//                 <td>{c.discount}</td>
//                 <td>123 Uses</td>

//                 <td className="flex gap-2">
//                   <Edit size={16} />
//                   <Trash2 size={16} />
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </GlassCard>
//     );
//   }

//   /* ------------------------ INFLUENCERS ----------------------- */

//   if (activeTab === "influencers") {
//     return (
//       <GlassCard>

//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl text-white font-bold">Influencer System</h2>

//           <button className="bg-purple-600 px-4 py-2 text-xs rounded-lg flex items-center gap-2">
//             <Plus size={14} /> Add Influencer
//           </button>
//         </div>

//         <table className="w-full text-sm">

//           <thead className="text-slate-400">
//             <tr>
//               <th>Name</th>
//               <th>Code</th>
//               <th>Orders</th>
//               <th>Revenue</th>
//             </tr>
//           </thead>

//           <tbody className="text-white">

//             <tr className="border-t border-white/10">
//               <td>Cummins Mike</td>
//               <td>DIESELMIKE15</td>
//               <td>124</td>
//               <td>₹3,25,000</td>
//             </tr>

//             <tr className="border-t border-white/10">
//               <td>Duramax Dan</td>
//               <td>DAN10</td>
//               <td>98</td>
//               <td>₹2,10,000</td>
//             </tr>

//           </tbody>
//         </table>

//       </GlassCard>
//     );
//   }

//   /* ------------------------ DEALER SYSTEM ----------------------- */

//   if (activeTab === "dealers") {
//     return (
//       <GlassCard>

//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl text-white font-bold">Dealer / Distributor Pricing</h2>
//         </div>

//         <div className="grid grid-cols-3 gap-6">

//           <GlassCard>
//             <p className="text-xs text-slate-400">Retail Price</p>
//             <h3 className="text-xl text-white font-bold">₹4500</h3>
//           </GlassCard>

//           <GlassCard>
//             <p className="text-xs text-slate-400">Dealer Price</p>
//             <h3 className="text-xl text-cyan-400 font-bold">₹3500</h3>
//           </GlassCard>

//           <GlassCard>
//             <p className="text-xs text-slate-400">Distributor Price</p>
//             <h3 className="text-xl text-green-400 font-bold">₹3000</h3>
//           </GlassCard>

//         </div>

//       </GlassCard>
//     );
//   }

//   /* ------------------------ ANALYTICS ----------------------- */

//   if (activeTab === "analytics") {
//     return (
//       <GlassCard>

//         <h2 className="text-xl text-white font-bold mb-6">Sales Analytics</h2>

//         <ResponsiveContainer width="100%" height={350}>
//           <AreaChart data={performanceData}>
//             <XAxis dataKey="name" stroke="#ffffff40" />
//             <YAxis stroke="#ffffff40" />
//             <Tooltip />
//             <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d430" />
//           </AreaChart>
//         </ResponsiveContainer>

//       </GlassCard>
//     );
//   }

//   return null;
// };

// /* ------------------------ MAIN DASHBOARD ----------------------- */


// const SuperAdminDashboard: React.FC = () => {

//   const [activeTab, setActiveTab] = useState("overview");

//   const menuItems = [
//     { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
//     { id: "users", label: "Manage Users", icon: <Users size={18} /> },
//     { id: "products", label: "Products", icon: <Package size={18} /> },
//     { id: "coupons", label: "Coupons", icon: <Percent size={18} /> },
//     { id: "influencers", label: "Influencers", icon: <Link size={18} /> },
//     { id: "dealers", label: "Dealers", icon: <Store size={18} /> },
//     { id: "qr", label: "QR Codes", icon: <QrCode size={18} /> },
//     { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
//     { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} /> },
//     { id: "settings", label: "Settings", icon: <Settings size={18} /> }
//   ];

//   return (
//     <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

//       {/* SIDEBAR */}

//       <aside className="w-72 bg-[#020617] border-r border-white/10 flex flex-col">

//         <div className="px-6 py-8 border-b border-white/10">

//           <h2 className="text-xl font-bold tracking-wide">
//             TORQUE <span className="text-red-500">CRAFT</span>
//           </h2>

//           <p className="text-xs text-blue-400 mt-1">
//             Global Oversight
//           </p>

//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

//           {menuItems.map((item) => (

//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition ${
//                 activeTab === item.id
//                   ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
//                   : "text-slate-400 hover:bg-white/5"
//               }`}
//             >

//               {item.icon}
//               {item.label}

//             </button>

//           ))}

//         </nav>

//       </aside>


//       {/* MAIN AREA */}

//       <div className="flex-1 flex flex-col overflow-hidden">


//         {/* TOP BAR */}

//         <header className="h-20 border-b border-white/10 flex items-center justify-between px-10">

//           <h1 className="text-xl font-semibold tracking-wide">
//             Super Admin Dashboard
//           </h1>

//           <div className="flex items-center gap-6">

//             {/* Search */}

//             <div className="relative">

//               <Search
//                 className="absolute left-3 top-2.5 text-slate-500"
//                 size={16}
//               />

//               <input
//                 className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
//                 placeholder="Search system..."
//               />

//             </div>


//             {/* Profile */}

//             <div className="flex items-center gap-3">

//               <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
//                 SA
//               </div>

//               <span className="text-sm text-slate-400">
//                 Super Admin
//               </span>

//             </div>

//           </div>

//         </header>


//         {/* CONTENT */}

//         <main className="flex-1 p-10 overflow-y-auto">


//           {/* STATS */}

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

//             <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 shadow-lg">
//               <p className="text-xs text-cyan-400 uppercase">Total Users</p>
//               <h3 className="text-4xl font-bold mt-2">1,245</h3>
//               <p className="text-green-400 text-sm mt-1">+15% Growth</p>
//             </div>

//             <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6 shadow-lg">
//               <p className="text-xs text-blue-400 uppercase">Active Warranties</p>
//               <h3 className="text-4xl font-bold mt-2">342</h3>
//               <p className="text-slate-400 text-sm">98.8% Valid</p>
//             </div>

//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 shadow-lg">
//               <p className="text-xs text-purple-400 uppercase">Active Coupons</p>
//               <h3 className="text-4xl font-bold mt-2">86</h3>
//               <p className="text-slate-400 text-sm">Campaign Codes</p>
//             </div>

//             <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl p-6 shadow-lg">
//               <p className="text-xs text-pink-400 uppercase">Influencer Revenue</p>
//               <h3 className="text-4xl font-bold mt-2">$152,400</h3>
//               <p className="text-green-400 text-sm">+8% This Month</p>
//             </div>

//           </div>


//           {/* OVERVIEW SECTIONS */}

//           {activeTab === "overview" && (

//             <div className="grid xl:grid-cols-3 gap-8">

//               {/* USER & WARRANTY ACTIVITY */}

//               <div className="xl:col-span-2 bg-[#020617] border border-white/10 rounded-xl p-6">

//                 <h3 className="text-lg font-semibold mb-6">
//                   User & Warranty Activity
//                 </h3>

//                 <div className="space-y-4">

//                   <div className="flex justify-between bg-white/5 p-4 rounded-lg">

//                     <div>
//                       <p className="font-semibold">Alpha Dealers</p>
//                       <p className="text-xs text-slate-400">Delhi</p>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-bold">340</p>
//                       <p className="text-xs text-green-400">+32</p>
//                     </div>

//                   </div>

//                   <div className="flex justify-between bg-white/5 p-4 rounded-lg">

//                     <div>
//                       <p className="font-semibold">Prime Autos</p>
//                       <p className="text-xs text-slate-400">Bangalore</p>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-bold">275</p>
//                       <p className="text-xs text-slate-400">Orders 40</p>
//                     </div>

//                   </div>

//                 </div>

//               </div>


//               {/* REFUND STATUS */}

//               <div className="bg-[#020617] border border-white/10 rounded-xl p-6">

//                 <h3 className="text-lg font-semibold mb-6">
//                   Refund Requests
//                 </h3>

//                 <div className="space-y-4 text-sm">

//                   <div className="flex justify-between">
//                     <span>Dealer Pending</span>
//                     <span className="text-yellow-400">12</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span>Distributor Pending</span>
//                     <span className="text-orange-400">7</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span>Completed</span>
//                     <span className="text-green-400">9</span>
//                   </div>

//                   <div className="pt-4 border-t border-white/10 font-semibold">

//                     Total Value  
//                     <span className="float-right text-green-400">
//                       $78,250
//                     </span>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           )}


//           {/* OTHER TABS */}

//           {activeTab !== "overview" && (
//             <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
//               <SuperAdminContent activeTab={activeTab} />
//             </div>
//           )}

//         </main>

//       </div>

//     </div>
//   );
// };

// export default SuperAdminDashboard;


// import React, { useState } from "react";
// // Sahi path se components import karein
// import Overview from "./dashboard/Overview";
// import UsersPage from "./dashboard/Users";
// import DealersPage from "./dashboard/Dealers";
// import CouponsPage from "./dashboard/Coupons";
// import InfluencersPage from "./dashboard/Influencers";
// import AnalyticsPage from "./dashboard/Analytics";

// // Note: Agar aapne niche wale components abhi tak nahi banaye hain, 
// // toh aap temporarily Overview hi render karwa sakte hain (Switch case mein handle kiya gaya hai).

// import {
//   Users,
//   RotateCcw,
//   QrCode,
//   Package,
//   BarChart3,
//   LayoutDashboard,
//   Settings,
//   Search,
//   Percent,
//   Link,
//   Store,
//   ShieldAlert
// } from "lucide-react";

// const SuperAdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("overview");

//   const menuItems = [
//     { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
//     { id: "users", label: "Customers", icon: <Users size={18} /> },
//     { id: "dealers", label: "Dealers", icon: <Store size={18} /> },
//     { id: "products", label: "Products", icon: <Package size={18} /> },
//     { id: "coupons", label: "Coupons", icon: <Percent size={18} /> },
//     { id: "influencers", label: "Influencers", icon: <Link size={18} /> },
//     { id: "qr", label: "QR Codes", icon: <QrCode size={18} /> },
//     { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
//     { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} /> },
//     { id: "settings", label: "Settings", icon: <Settings size={18} /> }
//   ];

//   // FIX: Saare Switch Cases handle kiye gaye hain taaki koi button blank na rahe
//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <Overview />;
//       case "users":
//         return <UsersPage />;
//       case "dealers":
//         return <DealersPage />;
//       case "coupons":
//         return <CouponsPage />;
//       case "influencers":
//         return <InfluencersPage />;
//       case "analytics":
//         return <AnalyticsPage />;
      
//       // Missing sections ke liye placeholders (Under Construction effect)
//       case "products":
//       case "qr":
//       case "refunds":
//       case "settings":
//         return (
//           <div className="flex flex-col items-center justify-center py-32 opacity-30 animate-pulse">
//             <ShieldAlert size={64} className="mb-4 text-blue-500" />
//             <h3 className="text-xl font-bold uppercase tracking-widest">
//               {activeTab.toUpperCase()} Module Under Construction
//             </h3>
//             <p className="text-sm mt-2 italic">Linking system files for Torque Craft...</p>
//           </div>
//         );

//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      
//       {/* SIDEBAR - Fixed Width and Glassmorphism effect */}
//       <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
//         <div className="px-6 py-8 border-b border-white/10 mt-12">
//           {/* <h2 className="text-xl font-extrabold tracking-tighter">
//             TORQUE <span className="text-red-600">CRAFT</span>
//           </h2> */}
//           <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">
//             Dashboard
//           </p>
//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar ">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
//                 activeTab === item.id
//                   ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10"
//                   : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
//               }`}
//             >
//               <span className={activeTab === item.id ? "text-blue-400" : "text-slate-500"}>
//                 {item.icon}
//               </span>
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         {/* User Badge at Bottom */}
//         {/* <div className="p-6 border-t border-white/10 flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] font-bold">
//             AD
//           </div>
//           <div className="flex flex-col">
//             <span className="text-xs font-bold text-slate-300">Admin User</span>
//             <span className="text-[9px] text-emerald-500 font-mono">System Online</span>
//           </div>
//         </div> */}
//       </aside>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
//         {/* TOP BAR - Sahi padding aur alignment */}
//         <header className="h-20 min-h-[80px] border-b border-white/10 flex items-center justify-between px-10 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-20">
//     <div className="flex items-center gap-4">
//       <div className="h-6 w-1 bg-red-600 rounded-full"></div>
//       <h1 className="text-lg font-bold uppercase tracking-widest text-slate-200">
//         {activeTab.replace('-', ' ')}
//       </h1>
//     </div>

//           <div className="flex items-center gap-6">
//             <div className="relative group hidden lg:block">
//               <Search className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
//               <input
//                 className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500/50 w-64 transition-all focus:bg-white/10"
//                 placeholder="Search system records..."
//               />
//             </div>

//             <button className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-all">
//               <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617] animate-pulse"></div>
//               <Settings size={18} className="text-slate-400" />
//             </button>
//           </div>
//         </header>

//         {/* CONTENT AREA - Scrolling enabled for long lists */}
//         <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#020617] to-[#010413] p-10 pt-12 custom-scrollbar">
//     <div className="max-w-7xl mx-auto pb-20"> 
//       {/* pb-20 ensures last element niche se chipka na rahe */}
//       {renderContent()}
//     </div>
//   </main>

//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;




// import React, { useState } from "react";
// // Sahi path se components import karein
// import Overview from "./dashboard/Overview";
// import UsersPage from "./dashboard/Users";
// import DealersPage from "./dashboard/Dealers";
// import CouponsPage from "./dashboard/Coupons";
// import InfluencersPage from "./dashboard/Influencers";
// import AnalyticsPage from "./dashboard/Analytics";

// // Note: Agar aapne niche wale components abhi tak nahi banaye hain, 
// // toh aap temporarily Overview hi render karwa sakte hain (Switch case mein handle kiya gaya hai).

// import {
//   Users,
//   RotateCcw,
//   QrCode,
//   Package,
//   BarChart3,
//   LayoutDashboard,
//   Settings,
//   Search,
//   Percent,
//   Link,
//   Store,
//   ShieldAlert
// } from "lucide-react";

// const SuperAdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("overview");

//   const menuItems = [
//     { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
//     { id: "users", label: "Customers", icon: <Users size={18} /> },
//     { id: "dealers", label: "Dealers", icon: <Store size={18} /> },
//     { id: "products", label: "Products", icon: <Package size={18} /> },
//     { id: "coupons", label: "Coupons", icon: <Percent size={18} /> },
//     { id: "influencers", label: "Influencers", icon: <Link size={18} /> },
//     { id: "qr", label: "QR Codes", icon: <QrCode size={18} /> },
//     { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
//     { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} /> },
//     { id: "settings", label: "Settings", icon: <Settings size={18} /> }
//   ];

//   // FIX: Saare Switch Cases handle kiye gaye hain taaki koi button blank na rahe
//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <Overview />;
//       case "users":
//         return <UsersPage />;
//       case "dealers":
//         return <DealersPage />;
//       case "coupons":
//         return <CouponsPage />;
//       case "influencers":
//         return <InfluencersPage />;
//       case "analytics":
//         return <AnalyticsPage />;
      
//       // Missing sections ke liye placeholders (Under Construction effect)
//       case "products":
//       case "qr":
//       case "refunds":
//       case "settings":
//         return (
//           <div className="flex flex-col items-center justify-center py-32 opacity-30 animate-pulse">
//             <ShieldAlert size={64} className="mb-4 text-blue-500" />
//             <h3 className="text-xl font-bold uppercase tracking-widest">
//               {activeTab.toUpperCase()} Module Under Construction
//             </h3>
//             <p className="text-sm mt-2 italic">Linking system files for Torque Craft...</p>
//           </div>
//         );

//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      
//       {/* SIDEBAR - Fixed Width and Glassmorphism effect */}
//       <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
//         <div className="px-6 py-8 border-b border-white/10 mt-12">
//           {/* <h2 className="text-xl font-extrabold tracking-tighter">
//             TORQUE <span className="text-red-600">CRAFT</span>
//           </h2> */}
//           <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">
//             Dashboard
//           </p>
//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar ">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
//                 activeTab === item.id
//                   ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10"
//                   : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
//               }`}
//             >
//               <span className={activeTab === item.id ? "text-blue-400" : "text-slate-500"}>
//                 {item.icon}
//               </span>
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         {/* User Badge at Bottom */}
//         {/* <div className="p-6 border-t border-white/10 flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] font-bold">
//             AD
//           </div>
//           <div className="flex flex-col">
//             <span className="text-xs font-bold text-slate-300">Admin User</span>
//             <span className="text-[9px] text-emerald-500 font-mono">System Online</span>
//           </div>
//         </div> */}
//       </aside>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
//         {/* TOP BAR - Sahi padding aur alignment */}
//         {/* TOP BAR - Fix for Overlap and Watermark */}
// <header className="h-20 min-h-[80px] border-b border-white/10 flex items-center justify-between px-10 bg-[#020617] sticky top-0 z-50">
//   <div className="flex items-center gap-4 relative">
//     {/* Red Indicator Line */}
//     <div className="h-6 w-1 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
    
//     {/* Page Title: Sirf ek baar render karein aur z-index ensure karein */}
//     <h1 className="text-sm font-black uppercase tracking-[0.2em] text-slate-100 relative z-10">
//       {activeTab.replace('-', ' ')}
//     </h1>

//     {/* ALERT: Agar yahan koi doosra <span> ya <h1> hai jisme {activeTab} likha hai, 
//         toh usey DELETE kar dein. Wahi overlap paida kar raha hai. */}
//   </div>

//   <div className="flex items-center gap-6">
//     {/* Search Box */}
//     <div className="relative group hidden lg:block">
//       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={14} />
//       <input
//         className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500/50 w-64 transition-all focus:bg-white/10"
//         placeholder="Search system records..."
//       />
//     </div>

//     {/* Settings Button */}
//     <button className="p-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 transition-all">
//       <Settings size={18} />
//     </button>
//   </div>
// </header>

//         {/* CONTENT AREA - Scrolling enabled for long lists */}
//         <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#020617] to-[#010413] p-10 pt-12 custom-scrollbar">
//     <div className="max-w-7xl mx-auto pb-20"> 
//       {/* pb-20 ensures last element niche se chipka na rahe */}
//       {renderContent()}
//     </div>
//   </main>

//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;









import React, { useState } from "react";
import Overview from "./dashboard/Overview";
import UsersPage from "./dashboard/Users";
import DealersPage from "./dashboard/Dealers";
import CouponsPage from "./dashboard/Coupons";
import InfluencersPage from "./dashboard/Influencers";
import AnalyticsPage from "./dashboard/Analytics";
import Reports from "./dashboard/reports/Reports";
import RefundManager from "./dashboard/RefundManager";
import {
  Users, RotateCcw, QrCode, Package, BarChart3, 
  LayoutDashboard, Settings, Percent, ClipboardList,
  Link, Store, ShieldAlert
} from "lucide-react";

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "reports", label: "Partner Reports", icon: <ClipboardList size={18} /> },
    { id: "users", label: "Customers", icon: <Users size={18} /> },
    { id: "dealers", label: "Dealers", icon: <Store size={18} /> },
    { id: "products", label: "Products", icon: <Package size={18} /> },
    { id: "coupons", label: "Coupons", icon: <Percent size={18} /> },
    { id: "influencers", label: "Influencers", icon: <Link size={18} /> },
    { id: "qr", label: "QR Codes", icon: <QrCode size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview />;
      case "users": return <UsersPage />;
      case "dealers": return <DealersPage />;
      case "coupons": return <CouponsPage />;
      case "influencers": return <InfluencersPage />;
      case "analytics": return <AnalyticsPage />;
      case "reports": return <Reports />;
      case "refunds": return <RefundManager />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-32 opacity-30 text-center">
            <ShieldAlert size={64} className="mb-4 text-blue-500 mx-auto" />
            <h3 className="text-xl font-bold uppercase tracking-widest">{activeTab} Module</h3>
          </div>
        );
    }
  };

  return (
    // 'relative' aur 'z-0' ensure karta hai ki ye main navbar ke niche rahe
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden relative z-0">
      
      {/* SIDEBAR - z-40 taaki ye navbar (z-50) ke niche rahe */}
      <aside className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col h-full shrink-0 relative z-40">
        {/* Top spacing add ki hai taaki sidebar ka header navbar se na takraye */}
        {/* <div className="px-8 py-10 border-b border-white/5 mt-20">
          <h2 className="text-xl font-black tracking-tighter text-white">
            TORQUE <span className="text-red-600">CRAFT</span>
          </h2>
          <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.3em] mt-1 opacity-70">
            Global Oversight HQ
          </p>
        </div> */} 
        <br /> <br /> <br />

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* pt-32: Navbar ke liye space chhorne ke liye.
            overflow-y-auto: Sirf content scroll hoga, navbar apni jagah rahega.
        */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617] p-8 pt-32 relative z-0">
  <div className="max-w-[1400px] mx-auto min-h-screen">
     {renderContent()}
  </div>
</main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;