// import React, { useState, useMemo } from "react";
// import { 
//   QrCode, ShieldAlert, CheckCircle2, MapPin, 
//   BarChart3, Search, AlertTriangle, Globe, 
//   History, Filter, Download, Zap, X
// } from "lucide-react";
// import { cn } from "../../../lib/utils";

// // --- Types ---
// interface QRLog {
//   id: string;
//   serialNumber: string;
//   status: "Genuine" | "Fraud" | "Inactive";
//   lastScannedAt: string;
//   location: string;
//   scanCount: number;
//   region: "North" | "South" | "East" | "West" | "International";
// }

// const INITIAL_LOGS: QRLog[] = [
//   { id: "QR-101", serialNumber: "TC-9921-X1", status: "Genuine", lastScannedAt: "2026-03-23 10:45 AM", location: "Noida, India", scanCount: 1, region: "North" },
//   { id: "QR-102", serialNumber: "TC-8840-Y2", status: "Fraud", lastScannedAt: "2026-03-23 09:12 AM", location: "Multiple (Delhi & London)", scanCount: 42, region: "International" },
//   { id: "QR-103", serialNumber: "TC-4412-Z5", status: "Inactive", lastScannedAt: "N/A", location: "Warehouse B", scanCount: 0, region: "West" },
// ];

// export default function QRSystem() {
//   const [logs] = useState<QRLog[]>(INITIAL_LOGS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedQR, setSelectedQR] = useState<QRLog | null>(null);

//   // --- Stats Calculation ---
//   const stats = useMemo(() => ({
//     total: logs.length,
//     fraud: logs.filter(l => l.status === "Fraud").length,
//     active: logs.filter(l => l.scanCount > 0).length,
//   }), [logs]);

//   const filteredLogs = logs.filter(l => 
//     l.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     l.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-10 text-slate-200">
      
//       {/* HEADER & ANALYTICS */}
//       <header className="flex flex-col gap-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           <div className="space-y-2">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
//                 <QrCode className="text-indigo-400" size={28} />
//               </div>
//               <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">QR Integrity System</h1>
//             </div>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1">Product Authentication & Fraud Guard</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
//               <Download size={14} /> Export Report
//             </button>
//             <div className="h-10 w-[1px] bg-slate-800 mx-2 hidden lg:block" />
//             <div className="relative group w-full lg:w-72">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//               <input 
//                 type="text" 
//                 placeholder="SEARCH SERIAL NO..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-indigo-500/50 outline-none transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* TOP CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatCard label="Total Generated" value={stats.total} icon={<Zap size={20}/>} color="blue" />
//           <StatCard label="Security Alerts" value={stats.fraud} icon={<ShieldAlert size={20}/>} color="red" isAlert={stats.fraud > 0} />
//           <StatCard label="Live Scan Reports" value={stats.active} icon={<BarChart3 size={20}/>} color="emerald" />
//         </div>
//       </header>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
//         {/* SCAN LOGS TABLE */}
//         <div className="xl:col-span-2 space-y-6">
//           <div className="bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] backdrop-blur-md overflow-hidden">
//             <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
//               <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
//                 <History size={14} /> Scan Validation History
//               </h2>
//               <Filter size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-slate-800/50 text-[9px] font-black text-slate-500 uppercase tracking-widest">
//                     <th className="px-8 py-5">Serial Number</th>
//                     <th className="px-6 py-5">Status</th>
//                     <th className="px-6 py-5 text-center">Scan Count</th>
//                     <th className="px-6 py-5">Last Location</th>
//                     <th className="px-8 py-5 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/30">
//                   {filteredLogs.map((log) => (
//                     <tr key={log.id} className="group hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedQR(log)}>
//                       <td className="px-8 py-5">
//                         <span className="text-sm font-black text-white tracking-tight font-mono">{log.serialNumber}</span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <StatusBadge status={log.status} />
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         <span className={cn(
//                           "text-xs font-bold px-3 py-1 rounded-full",
//                           log.scanCount > 5 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-800 text-slate-400"
//                         )}>{log.scanCount}</span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
//                           <MapPin size={12} className="text-slate-600" /> {log.location}
//                         </div>
//                       </td>
//                       <td className="px-8 py-5 text-right">
//                         <button className="text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-300 transition-colors">Details</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* FRAUD ALERTS & REGIONAL VIEW */}
//         <div className="space-y-8">
//           {/* REGIONAL SCAN REPORT */}
//           <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
//             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2">
//               <Globe size={18} className="text-indigo-400" /> Regional Reports
//             </h3>
//             <div className="space-y-5">
//               <RegionProgress region="North India" count={450} percent={75} color="bg-blue-500" />
//               <RegionProgress region="South India" count={120} percent={30} color="bg-indigo-500" />
//               <RegionProgress region="International" count={42} percent={15} color="bg-red-500" />
//             </div>
//           </div>

//           {/* FRAUD ALERT BOX */}
//           <div className="bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-8 space-y-4">
//             <div className="flex items-center gap-3 text-red-400">
//               <AlertTriangle size={20} />
//               <h3 className="text-sm font-black uppercase tracking-widest">Active Fraud Alerts</h3>
//             </div>
//             <p className="text-[10px] text-red-400/70 font-bold uppercase leading-relaxed">
//               Detection: Serial TC-8840-Y2 scanned 42 times in past 1 hour from distinct IPs. Automated IP blocking initiated.
//             </p>
//             <button className="w-full py-3 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20">
//               Review High-Risk Segments
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- QR DETAIL MODAL --- */}
//       {selectedQR && (
//         <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
//           <div className="bg-[#0f172a] border border-slate-800 rounded-[3rem] w-full max-w-lg overflow-hidden relative shadow-2xl">
//             <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
//               <h3 className="text-xl font-black italic uppercase text-indigo-400">Serial Audit</h3>
//               <button onClick={() => setSelectedQR(null)} className="p-3 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><X /></button>
//             </div>
//             <div className="p-10 space-y-8 text-center">
//               <div className="mx-auto w-32 h-32 bg-white rounded-3xl p-4 flex items-center justify-center border-4 border-indigo-500/20">
//                 <QrCode size={80} className="text-black" />
//               </div>
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-black font-mono text-white">{selectedQR.serialNumber}</h2>
//                 <StatusBadge status={selectedQR.status} />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-left">
//                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Region Origin</p>
//                   <p className="text-sm font-bold text-slate-200 mt-1">{selectedQR.region}</p>
//                 </div>
//                 <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-left">
//                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Scans</p>
//                   <p className="text-sm font-bold text-slate-200 mt-1">{selectedQR.scanCount} Times</p>
//                 </div>
//               </div>
//               <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
//                 Download Scan Certificate
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function StatCard({ label, value, icon, color, isAlert }: any) {
//   const colors: any = {
//     blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
//     red: "text-red-400 bg-red-500/10 border-red-500/20",
//     emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
//   };

//   return (
//     <div className={cn(
//       "p-8 rounded-[2rem] border bg-slate-900/20 backdrop-blur-md transition-all hover:scale-[1.02]",
//       colors[color],
//       isAlert && "animate-pulse shadow-2xl shadow-red-500/10"
//     )}>
//       <div className="flex justify-between items-start mb-4">
//         <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
//         <span className="text-[9px] font-black uppercase tracking-widest opacity-60 italic">Live Update</span>
//       </div>
//       <h4 className="text-4xl font-black italic mb-1">{value}</h4>
//       <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{label}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const config: any = {
//     Genuine: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
//     Fraud: "text-red-400 border-red-500/30 bg-red-500/5 animate-bounce",
//     Inactive: "text-slate-500 border-slate-800 bg-slate-800/20",
//   };

//   return (
//     <span className={cn(
//       "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-fit",
//       config[status]
//     )}>
//       {status === "Genuine" && <CheckCircle2 size={10} />}
//       {status === "Fraud" && <ShieldAlert size={10} />}
//       {status}
//     </span>
//   );
// }

// function RegionProgress({ region, count, percent, color }: any) {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
//         <span className="text-slate-400">{region}</span>
//         <span className="text-white">{count} SCANS</span>
//       </div>
//       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
//         <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percent}%` }} />
//       </div>
//     </div>
//   );
// }







import React, { useState, useMemo } from "react";
import { 
  QrCode, ShieldAlert, CheckCircle2, MapPin, 
  BarChart3, Search, AlertTriangle, Globe, 
  History, Filter, Download, Zap, X, ShieldCheck, 
  Activity, ArrowUpRight, Lock
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
interface ScanHistory {
  timestamp: string;
  location: string;
  ip: string;
  device: string;
}

interface QRLog {
  id: string;
  serialNumber: string;
  status: "Genuine" | "Fraud" | "Inactive";
  lastScannedAt: string;
  location: string;
  scanCount: number;
  region: "North" | "South" | "East" | "West" | "International";
  history?: ScanHistory[];
}

const INITIAL_LOGS: QRLog[] = [
  { 
    id: "QR-101", 
    serialNumber: "TC-9921-X1", 
    status: "Genuine", 
    lastScannedAt: "2026-03-23 10:45 AM", 
    location: "Noida, India", 
    scanCount: 1, 
    region: "North",
    history: [{ timestamp: "2026-03-23 10:45 AM", location: "Noida Hub", ip: "192.168.1.45", device: "iPhone 15 Pro" }]
  },
  { 
    id: "QR-102", 
    serialNumber: "TC-8840-Y2", 
    status: "Fraud", 
    lastScannedAt: "2026-03-23 09:12 AM", 
    location: "Multiple (Delhi & London)", 
    scanCount: 42, 
    region: "International",
    history: [
      { timestamp: "2026-03-23 09:12 AM", location: "London, UK", ip: "82.45.11.02", device: "Chrome Desktop" },
      { timestamp: "2026-03-23 09:10 AM", location: "Delhi, IN", ip: "103.22.11.90", device: "Android Webview" }
    ]
  },
  { id: "QR-103", serialNumber: "TC-4412-Z5", status: "Inactive", lastScannedAt: "N/A", location: "Warehouse B", scanCount: 0, region: "West" },
];

export default function QRSystem() {
  const [logs, setLogs] = useState<QRLog[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQR, setSelectedQR] = useState<QRLog | null>(null);
  const [isValidationMode, setIsValidationMode] = useState(false);

  // --- Stats Calculation ---
  const stats = useMemo(() => ({
    total: logs.length,
    fraud: logs.filter(l => l.status === "Fraud").length,
    active: logs.filter(l => l.scanCount > 0).length,
    verifiedToday: 124, // Mock dynamic data
  }), [logs]);

  const filteredLogs = logs.filter(l => 
    l.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-10 text-slate-200 selection:bg-indigo-500/30">
      
      {/* --- TOP NAVIGATION & HEADER --- */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <QrCode className="text-indigo-400" size={28} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">QR Integrity System</h1>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1">Torque Craft • Security Dashboard</p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={() => setIsValidationMode(true)}
              className="flex-1 lg:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={14} /> Validate Serial
            </button>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <Download size={16} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* --- PERFORMANCE ANALYTICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Inventory" value={stats.total} icon={<Zap size={18}/>} color="blue" />
          <StatCard label="Live Alerts" value={stats.fraud} icon={<ShieldAlert size={18}/>} color="red" isAlert={stats.fraud > 0} />
          <StatCard label="Scan Velocity" value={`${stats.verifiedToday}/hr`} icon={<Activity size={18}/>} color="emerald" />
          <StatCard label="Protection Rate" value="99.9%" icon={<Lock size={18}/>} color="indigo" />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* --- MAIN LOGS & SEARCH --- */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] backdrop-blur-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900/40">
              <div className="flex items-center gap-3">
                <History className="text-indigo-400" size={18} />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Scan Validation Audit</h2>
              </div>
              
              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="FILTER BY SERIAL OR LOCATION..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/50 text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/20">
                    <th className="px-8 py-5">Product Serial</th>
                    <th className="px-6 py-5">Health Status</th>
                    <th className="px-6 py-5 text-center">Velocity</th>
                    <th className="px-6 py-5">Last Activity</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {filteredLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className="group hover:bg-indigo-500/[0.03] transition-colors cursor-pointer" 
                      onClick={() => setSelectedQR(log)}
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white tracking-tight font-mono group-hover:text-indigo-400 transition-colors">{log.serialNumber}</span>
                          <span className="text-[9px] text-slate-600 font-bold uppercase mt-1 tracking-tighter">ID: {log.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                          <span className={cn(
                            "text-xs font-black",
                            log.scanCount > 10 ? "text-red-400" : "text-slate-400"
                          )}>{log.scanCount}</span>
                          <ArrowUpRight size={10} className="text-slate-600" />
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[11px] text-slate-300 font-bold">
                            <MapPin size={12} className="text-indigo-500" /> {log.location}
                          </div>
                          <span className="text-[9px] text-slate-600 uppercase font-black ml-5">{log.lastScannedAt}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black uppercase text-slate-400 group-hover:text-white group-hover:border-indigo-500/50 transition-all">Audit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- REGIONAL INSIGHTS & FRAUD ALERTS --- */}
        <div className="space-y-8">
          
          {/* REGIONAL SCAN REPORT */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2">
                <Globe size={18} className="text-indigo-400" /> Regional Reports
              </h3>
              <span className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-md tracking-tighter uppercase italic">Live</span>
            </div>
            
            <div className="space-y-6">
              <RegionProgress region="North India" count={450} percent={75} color="bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
              <RegionProgress region="South India" count={120} percent={30} color="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
              <RegionProgress region="International Exports" count={42} percent={15} color="bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
            </div>

            <div className="pt-4 border-t border-slate-800/50">
              <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                View Detailed Heatmap <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

          {/* CRITICAL FRAUD VIEW */}
          <div className={cn(
            "rounded-[2.5rem] p-8 space-y-5 border transition-all duration-500",
            stats.fraud > 0 ? "bg-red-500/5 border-red-500/20" : "bg-slate-900/40 border-slate-800"
          )}>
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle size={20} className={cn(stats.fraud > 0 && "animate-pulse")} />
              <h3 className="text-sm font-black uppercase tracking-widest">Fraud Security Alerts</h3>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-4 border border-red-500/10 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">High Risk Detection</span>
                <span className="text-[9px] text-slate-600 font-bold italic">2m ago</span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase leading-relaxed tracking-tight">
                Serial <span className="text-white font-mono">TC-8840-Y2</span> flagged. Multiple concurrent scans detected from <span className="text-red-400">London & Delhi</span>.
              </p>
            </div>

            <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all active:scale-95">
              Blacklist Flagged Serials
            </button>
          </div>
        </div>
      </div>

      {/* --- VALIDATION OVERLAY MODAL --- */}
      {isValidationMode && (
        <div className="fixed inset-0 z-[800] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-slate-800 rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-indigo-400" />
                <h3 className="text-xl font-black italic uppercase text-white">Manual Scan Validation</h3>
              </div>
              <button onClick={() => setIsValidationMode(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><X /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Input Serial Number</label>
                <div className="relative">
                  <input 
                    autoFocus
                    placeholder="E.G. TC-XXXX-XX"
                    className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 text-lg font-black font-mono text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800 uppercase"
                  />
                  <QrCode className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700" size={24} />
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                <div className="p-2 bg-indigo-500/20 rounded-lg h-fit text-indigo-400"><Activity size={16} /></div>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">System will check against regional registry and current IP geofencing to ensure product authenticity.</p>
              </div>
              <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/30">Run Integrity Check</button>
            </div>
          </div>
        </div>
      )}

      {/* --- AUDIT DETAIL SIDEBAR --- */}
      {selectedQR && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0b1224] border-l border-slate-800 z-[900] shadow-2xl p-8 flex flex-col gap-8 animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black italic uppercase text-white">Serial Audit</h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Full Traceability Report</p>
            </div>
            <button onClick={() => setSelectedQR(null)} className="p-3 hover:bg-slate-800 rounded-full text-slate-400"><X /></button>
          </div>

          <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {/* Visual Header */}
            <div className="bg-slate-900/80 p-8 rounded-[2.5rem] border border-slate-800 text-center space-y-4">
              <div className="mx-auto w-24 h-24 bg-white rounded-2xl p-3 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <QrCode size={64} className="text-black" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white font-mono tracking-tighter">{selectedQR.serialNumber}</h4>
                <div className="mt-2 flex justify-center"><StatusBadge status={selectedQR.status} /></div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <AuditStat label="Scan Volume" value={selectedQR.scanCount} />
              <AuditStat label="Risk Level" value={selectedQR.status === "Fraud" ? "CRITICAL" : "LOW"} color={selectedQR.status === "Fraud" ? "text-red-500" : "text-emerald-500"} />
            </div>

            {/* Scan History Timeline */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Live History Trail</h5>
              <div className="space-y-3">
                {selectedQR.history?.map((h, i) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                      <div className="w-[1px] h-full bg-slate-800 mt-2" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-white uppercase">{h.location}</span>
                        <span className="text-[9px] text-slate-600 font-black">{h.timestamp}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">IP: {h.ip}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate">{h.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-auto w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all">
            Generate Integrity PDF
          </button>
        </div>
      )}
    </div>
  );
}

// --- REFINED SUB-COMPONENTS ---

function StatCard({ label, value, icon, color, isAlert }: any) {
  const themes: any = {
    blue: "text-blue-400 bg-blue-500/5 border-blue-500/20",
    red: "text-red-400 bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]",
    emerald: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    indigo: "text-indigo-400 bg-indigo-500/5 border-indigo-500/20",
  };

  return (
    <div className={cn(
      "p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300",
      themes[color],
      isAlert && "animate-[pulse_3s_infinite]"
    )}>
      <div className="flex justify-between items-center mb-6">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">{icon}</div>
        <div className="w-2 h-2 rounded-full bg-current opacity-20 shadow-[0_0_10px_currentColor]" />
      </div>
      <h4 className="text-3xl font-black italic tracking-tighter text-white">{value}</h4>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mt-1">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    Genuine: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    Fraud: "text-red-400 border-red-500/30 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    Inactive: "text-slate-500 border-slate-800 bg-slate-800/20",
  };

  return (
    <span className={cn(
      "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit",
      config[status]
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]", status === "Fraud" && "animate-pulse")} />
      {status}
    </span>
  );
}

function RegionProgress({ region, count, percent, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-white tracking-widest italic">{region}</p>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{count} AUTHENTICATED SCANS</p>
        </div>
        <span className="text-[11px] font-black text-white italic">{percent}%</span>
      </div>
      <div className="h-2 w-full bg-slate-950 rounded-full p-[2px] border border-slate-800/50">
        <div className={cn("h-full rounded-full transition-all duration-[1.5s] ease-out", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function AuditStat({ label, value, color }: any) {
  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
      <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.15em]">{label}</p>
      <p className={cn("text-lg font-black italic mt-1", color || "text-white")}>{value}</p>
    </div>
  );
}