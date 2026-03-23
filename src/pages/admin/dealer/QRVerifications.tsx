// import React from 'react';
// import { 
//   ShieldCheck, 
//   Search, 
//   Filter, 
//   ChevronRight, 
//   Calendar,
//   User,
//   Package,
//   CheckCircle2,
//   Clock,
//   AlertCircle,
//   MoreVertical
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const warrantyClaims = [
//   { id: 'W-9021', customer: 'Alex Rivera', product: 'CyberCore X1', date: '2025-03-15', status: 'APPROVED', type: 'REPAIR', expiry: '2026-03-15' },
//   { id: 'W-9022', customer: 'Sarah Jenkins', product: 'NeoLink v4', date: '2025-03-16', status: 'PENDING', type: 'REPLACEMENT', expiry: '2027-05-20' },
//   { id: 'W-9023', customer: 'Michael Chen', product: 'FutureVision', date: '2025-03-17', status: 'REJECTED', type: 'REPAIR', expiry: '2025-12-10' },
//   { id: 'W-9024', customer: 'Elena Rodriguez', product: 'TurboBoost Pro', date: '2025-03-18', status: 'IN_PROGRESS', type: 'REPAIR', expiry: '2026-08-05' },
//   { id: 'W-9025', customer: 'David Kim', product: 'MegaDrive Kit', date: '2025-03-18', status: 'PENDING', type: 'REPLACEMENT', expiry: '2027-01-15' },
// ];

// export default function Warranty() {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white tracking-tight uppercase">WARRANTY MANAGEMENT</h2>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-xs font-black text-white transition-all">
//             <Filter className="w-4 h-4" />
//             FILTER CLAIMS
//           </button>
//           <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all">
//             NEW CLAIM
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: 'Total Claims', value: '1,284', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
//           { label: 'Pending Review', value: '42', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
//           { label: 'Approved', value: '1,156', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
//           { label: 'Rejected', value: '86', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
//         ].map((stat, i) => (
//           <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
//             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
//               <stat.icon className={cn("w-6 h-6", stat.color)} />
//             </div>
//             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
//             <h4 className="text-2xl font-black text-white">{stat.value}</h4>
//           </div>
//         ))}
//       </div>

//       <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50">
//         <div className="flex items-center justify-between mb-8">
//           <h3 className="text-xl font-bold text-white">Active Warranty Claims</h3>
//           <div className="relative group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//             <input 
//               type="text" 
//               placeholder="Search claims..." 
//               className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-64"
//             />
//           </div>
//         </div>

//         <div className="space-y-4">
//           {warrantyClaims.map((claim, i) => (
//             <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-4">
//                 <button className="text-slate-500 hover:text-white transition-colors">
//                   <MoreVertical className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-black text-xs">
//                     {claim.id}
//                   </div>
//                   <div>
//                     <h5 className="text-sm font-black text-white tracking-tight">{claim.customer}</h5>
//                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Package className="w-4 h-4 text-slate-500" />
//                   <div>
//                     <p className="text-sm font-bold text-slate-300">{claim.product}</p>
//                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-4 h-4 text-slate-500" />
//                   <div>
//                     <p className="text-sm font-bold text-slate-300">{claim.date}</p>
//                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Claim Date</p>
//                   </div>
//                 </div>

//                 <div>
//                   <div className={cn(
//                     "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
//                     claim.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
//                     claim.status === 'PENDING' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
//                     claim.status === 'IN_PROGRESS' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
//                     "bg-rose-500/10 text-rose-400 border border-rose-500/20"
//                   )}>
//                     {claim.status.replace('_', ' ')}
//                   </div>
//                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-1">{claim.type}</p>
//                 </div>

//                 <div className="text-right">
//                   <button className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 ml-auto group/btn">
//                     View Case
//                     <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
//                   </button>
//                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Expiry: {claim.expiry}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








// import React, { useState } from 'react';
// import { 
//   ShieldCheck, 
//   QrCode, 
//   Search, 
//   AlertTriangle, 
//   CheckCircle2, 
//   Zap, 
//   History,
//   MoreVertical,
//   ChevronRight,
//   Maximize2
// } from 'lucide-react';

// // Sample Data for Verification History
// const verificationLogs = [
//   { id: 'LOG-4412', sku: 'TC-HSK-2000', status: 'AUTHENTIC', date: '2025-03-20 14:30', location: 'Mumbai, IN', type: 'NEW_ACTIVATION' },
//   { id: 'LOG-4413', sku: 'TC-MSK-9921', status: 'DUPLICATE', date: '2025-03-20 15:15', location: 'Delhi, IN', type: 'FAILED_ATTEMPT' },
//   { id: 'LOG-4414', sku: 'TC-HSK-2000', status: 'AUTHENTIC', date: '2025-03-20 16:45', location: 'Bangalore, IN', type: 'WARRANTY_CLAIM' },
// ];

// const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// export default function QRVerifications() {
//   const [isScanning, setIsScanning] = useState(false);

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">QR VERIFICATION CENTER</h2>
//           <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-1">Authenticate Products & Activate Warranties</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setIsScanning(!isScanning)}
//             className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-[10px] font-black text-white shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-widest"
//           >
//             <QrCode className="w-4 h-4" />
//             {isScanning ? "Closing Scanner..." : "Start New Scan"}
//           </button>
//         </div>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: 'Total Scans', value: '8,432', icon: QrCode, color: 'text-blue-400', bg: 'bg-blue-500/10' },
//           { label: 'Authentic', value: '8,210', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
//           { label: 'Duplicate Alerts', value: '22', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
//           { label: 'Warranties Active', value: '4,156', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
//         ].map((stat, i) => (
//           <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
//             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
//               <stat.icon className={cn("w-6 h-6", stat.color)} />
//             </div>
//             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
//             <h4 className="text-2xl font-black text-white">{stat.value}</h4>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* LEFT: SCANNER & ACTIVATION VIEW */}
//         <div className="lg:col-span-1 space-y-6">
//           <div className="p-8 rounded-[40px] bg-slate-900/50 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 transition-all min-h-[400px] relative overflow-hidden">
//             {isScanning ? (
//               <div className="relative w-full h-full flex flex-col items-center">
//                 <div className="w-48 h-48 border-2 border-cyan-500 rounded-3xl relative overflow-hidden">
//                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan-line"></div>
//                    <div className="w-full h-full bg-cyan-500/5 flex items-center justify-center text-cyan-500/20">
//                       <Maximize2 size={64} />
//                    </div>
//                 </div>
//                 <p className="mt-6 text-sm font-bold text-cyan-400 animate-pulse uppercase tracking-widest">Scanning QR Code...</p>
//               </div>
//             ) : (
//               <>
//                 <div className="p-6 bg-slate-800 rounded-full mb-6 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all">
//                   <QrCode size={48} className="text-slate-600 group-hover:text-cyan-400" />
//                 </div>
//                 <h3 className="text-white font-black text-lg uppercase tracking-tight">Camera Ready</h3>
//                 <p className="text-slate-500 text-xs mt-2 leading-relaxed px-4">Point your camera at the Torque Craft security label to verify authenticity instantly.</p>
//               </>
//             )}
//           </div>

//           {/* QUICK ACTIONS */}
//           <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl space-y-3">
//              <button className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition group">
//                 <div className="flex items-center gap-3">
//                    <Zap size={18} className="text-amber-400" />
//                    <span className="text-xs font-black text-white uppercase tracking-widest">Warranty Activation</span>
//                 </div>
//                 <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
//              </button>
//              <button className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition group border border-rose-500/20">
//                 <div className="flex items-center gap-3">
//                    <AlertTriangle size={18} className="text-rose-500" />
//                    <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Report Duplicate</span>
//                 </div>
//                 <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
//              </button>
//           </div>
//         </div>

//         {/* RIGHT: VERIFICATION HISTORY & ALERTS */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="p-8 rounded-[40px] bg-[#0f172a] border border-slate-800/50 shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <History className="text-cyan-400" size={20} />
//                 <h3 className="text-xl font-bold text-white tracking-tight">Verification Logs</h3>
//               </div>
//               <div className="relative group">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//                 <input 
//                   type="text" 
//                   placeholder="Search SKU or Log ID..." 
//                   className="bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all w-64"
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               {verificationLogs.map((log, i) => (
//                 <div key={i} className={cn(
//                   "p-5 rounded-2xl border transition-all relative group overflow-hidden bg-slate-950/40",
//                   log.status === 'DUPLICATE' ? "border-rose-500/20 hover:border-rose-500/50" : "border-slate-800/50 hover:border-cyan-500/30"
//                 )}>
//                   {log.status === 'DUPLICATE' && (
//                     <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
//                   )}
                  
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className={cn(
//                         "w-12 h-12 rounded-xl flex items-center justify-center font-black text-[10px]",
//                         log.status === 'DUPLICATE' ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-cyan-400"
//                       )}>
//                         {log.id.split('-')[1]}
//                       </div>
//                       <div>
//                         <h5 className="text-sm font-black text-white tracking-tight">{log.sku}</h5>
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.location}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-6">
//                       <div className="hidden md:block">
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
//                         <div className={cn(
//                           "inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
//                           log.status === 'AUTHENTIC' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
//                         )}>
//                           {log.status}
//                         </div>
//                       </div>

//                       <div className="hidden md:block">
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time</p>
//                         <p className="text-[11px] font-bold text-slate-300">{log.date}</p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all">
//                             <MoreVertical size={18} />
//                          </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Duplicate Alert View (Conditionally shown in log) */}
//                   {log.status === 'DUPLICATE' && (
//                     <div className="mt-4 pt-4 border-t border-rose-500/10 flex items-start gap-3 bg-rose-500/5 p-3 rounded-xl">
//                        <AlertTriangle className="text-rose-500 shrink-0" size={16} />
//                        <p className="text-[10px] font-bold text-rose-300/80 leading-relaxed uppercase tracking-wider">
//                           WARNING: This QR code was previously activated in a different location. Possible cloning attempt detected.
//                        </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animation for the scan line (Add this to your globals.css or use a style tag) */}
//       <style>{`
//         @keyframes scan {
//           0% { top: 0; }
//           100% { top: 100%; }
//         }
//         .animate-scan-line {
//           animation: scan 2s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }










import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, QrCode, Search, AlertTriangle, CheckCircle2, 
  Zap, History, MoreVertical, ChevronRight, Maximize2, X, RefreshCcw
} from 'lucide-react';

// Sample Data
const INITIAL_LOGS = [
  { id: 'LOG-4412', sku: 'TC-HSK-2000', status: 'AUTHENTIC', date: '2025-03-20 14:30', location: 'Mumbai, IN', type: 'NEW_ACTIVATION' },
  { id: 'LOG-4413', sku: 'TC-MSK-9921', status: 'DUPLICATE', date: '2025-03-20 15:15', location: 'Delhi, IN', type: 'FAILED_ATTEMPT' },
  { id: 'LOG-4414', sku: 'TC-HSK-2000', status: 'AUTHENTIC', date: '2025-03-20 16:45', location: 'Bangalore, IN', type: 'WARRANTY_CLAIM' },
];

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function QRVerifications() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('idle'); // idle | scanning | result
  const [scanResult, setScanResult] = useState(null); // 'AUTHENTIC' | 'DUPLICATE'
  const [searchQuery, setSearchQuery] = useState('');
  const [logs] = useState(INITIAL_LOGS);

  // Search Logic
  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.sku.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, logs]);

  // Scanner Simulator Logic
  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep('scanning');
    
    // Simulate API Call delay
    setTimeout(() => {
      setScanStep('result');
      // Randomly pick result for demo purposes
      setScanResult(Math.random() > 0.3 ? 'AUTHENTIC' : 'DUPLICATE');
    }, 2000);
  };

  const resetScanner = () => {
    setIsScanning(false);
    setScanStep('idle');
    setScanResult(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 md:p-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">QR VERIFICATION CENTER</h2>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-1">Authenticate Products & Activate Warranties</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={isScanning ? resetScanner : handleStartScan}
            className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black text-white shadow-lg transition-all uppercase tracking-widest",
                isScanning ? "bg-slate-800 hover:bg-slate-700" : "bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/20"
            )}
          >
            {isScanning ? <X className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
            {isScanning ? "Stop Scanner" : "Start New Scan"}
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: '8,432', icon: QrCode, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Authentic', value: '8,210', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Duplicate Alerts', value: '22', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
          { label: 'Warranties Active', value: '4,156', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: SCANNER VIEW */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-[40px] bg-slate-900/50 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 transition-all min-h-[420px] relative overflow-hidden">
            
            {scanStep === 'scanning' && (
              <div className="relative w-full h-full flex flex-col items-center animate-in zoom-in duration-300">
                <div className="w-48 h-48 border-2 border-cyan-500 rounded-3xl relative overflow-hidden bg-slate-950">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan-line"></div>
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <Maximize2 size={64} className="text-cyan-500" />
                  </div>
                </div>
                <p className="mt-6 text-sm font-bold text-cyan-400 animate-pulse uppercase tracking-widest">Analyzing Code...</p>
              </div>
            )}

            {scanStep === 'result' && (
              <div className="animate-in fade-in zoom-in duration-500">
                {scanResult === 'AUTHENTIC' ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-emerald-500/10">
                      <ShieldCheck size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="text-white font-black text-lg uppercase tracking-tight">Verified Authentic</h3>
                    <p className="text-slate-500 text-xs mt-2 px-4 italic">SKU: TC-HSK-2000 matched database records.</p>
                    <button onClick={resetScanner} className="mt-6 text-cyan-500 text-[10px] font-bold uppercase tracking-widest hover:underline">Scan Next Item</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-rose-500/10">
                      <AlertTriangle size={40} className="text-rose-500" />
                    </div>
                    <h3 className="text-rose-500 font-black text-lg uppercase tracking-tight">Duplicate Detected</h3>
                    <p className="text-slate-400 text-xs mt-2 px-4 leading-relaxed">This QR code has been flagged. Multiple activations detected in different IPs.</p>
                    <button onClick={resetScanner} className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white">Clear Alert</button>
                  </div>
                )}
              </div>
            )}

            {scanStep === 'idle' && (
              <>
                <div className="p-6 bg-slate-800 rounded-full mb-6 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all ring-1 ring-slate-700">
                  <QrCode size={48} className="text-slate-600 group-hover:text-cyan-400" />
                </div>
                <h3 className="text-white font-black text-lg uppercase tracking-tight">Camera Ready</h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed px-4 italic">Point camera at Torque Craft label to verify product security.</p>
                <button onClick={handleStartScan} className="mt-6 px-8 py-2 border border-slate-700 rounded-full text-[10px] text-slate-400 font-bold uppercase hover:bg-slate-800 transition-colors">Capture View</button>
              </>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
              <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl hover:bg-slate-800 transition-all group border border-transparent hover:border-slate-700">
                <div className="flex items-center gap-3">
                   <Zap size={18} className="text-amber-400" />
                   <span className="text-xs font-black text-white uppercase tracking-widest">Activate Warranty</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl hover:bg-rose-950/20 transition-all group border border-rose-500/10">
                <div className="flex items-center gap-3">
                   <AlertTriangle size={18} className="text-rose-500" />
                   <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Report Counterfeit</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
        </div>

        {/* RIGHT: VERIFICATION HISTORY */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-[40px] bg-[#0f172a] border border-slate-800/50 shadow-2xl flex flex-col h-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <History className="text-cyan-400" size={20} />
                <h3 className="text-xl font-bold text-white tracking-tight">Verification Logs</h3>
              </div>
              <div className="relative group w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SKU or ID..." 
                  className="bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all w-full md:w-64"
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredLogs.length > 0 ? filteredLogs.map((log, i) => (
                <div key={log.id} className={cn(
                  "p-5 rounded-2xl border transition-all relative group overflow-hidden bg-slate-950/40",
                  log.status === 'DUPLICATE' ? "border-rose-500/20 hover:border-rose-500/50" : "border-slate-800/50 hover:border-cyan-500/30"
                )}>
                  {log.status === 'DUPLICATE' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-black text-[10px]",
                        log.status === 'DUPLICATE' ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-cyan-400"
                      )}>
                        {log.id.split('-')[1]}
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-white tracking-tight uppercase">{log.sku}</h5>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                        <div className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                          log.status === 'AUTHENTIC' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                        )}>
                          {log.status}
                        </div>
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time</p>
                        <p className="text-[11px] font-bold text-slate-300">{log.date}</p>
                      </div>

                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  {log.status === 'DUPLICATE' && (
                    <div className="mt-4 pt-4 border-t border-rose-500/10 flex items-start gap-3 bg-rose-500/5 p-3 rounded-xl animate-in fade-in duration-500">
                       <AlertTriangle className="text-rose-500 shrink-0" size={16} />
                       <p className="text-[9px] font-bold text-rose-300/80 leading-relaxed uppercase tracking-wider">
                         Security Alert: System detected previous registration for this ID.
                       </p>
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-10 text-slate-600 uppercase text-[10px] font-black tracking-widest">
                  No matches found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan 2s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}