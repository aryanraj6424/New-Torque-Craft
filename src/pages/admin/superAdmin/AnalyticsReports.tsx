import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Activity, Map as MapIcon, 
  AlertTriangle, Download, Calendar, ChevronDown, 
  Box, TrendingUp, Search, X, Bell, 
  ShieldAlert, QrCode, ClipboardCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const SKU_DATA = [
  { code: 'T-CRAFT-90', region: 'North', sales: 4500, stock: 120, growth: '+15%', status: 'Optimal' },
  { code: 'T-LUXE-42', region: 'South', sales: 2100, stock: 15, growth: '+22%', status: 'Critical' },
  { code: 'W-CARE-12', region: 'West', sales: 1200, stock: 300, growth: '-5%', status: 'Surplus' },
  { code: 'N-FLOW-01', region: 'East', sales: 800, stock: 45, growth: '+8%', status: 'Optimal' },
];

const INITIAL_ALERTS = [
  { id: 'AL-101', type: 'Multiple QR Scans', location: 'Noida', severity: 'High', time: '2m ago' },
  { id: 'AL-102', type: 'Geo-Fence Breach', location: 'Delhi', severity: 'Medium', time: '15m ago' },
];

export default function AnalyticsReports() {
  // --- States ---
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isExporting, setIsExporting] = useState(false);
  const [skuSearch, setSkuSearch] = useState('');
  const [heatmapType, setHeatmapType] = useState<'QR' | 'Warranty'>('QR');
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  // --- Logic ---
  const filteredSKUs = useMemo(() => {
    return SKU_DATA.filter(sku => 
      (selectedRegion === 'All Regions' || sku.region === selectedRegion) &&
      sku.code.toLowerCase().includes(skuSearch.toLowerCase())
    );
  }, [skuSearch, selectedRegion]);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const data = JSON.stringify({ SKU_DATA, INITIAL_ALERTS, timestamp: new Date() });
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Torque_Analytics_${selectedRegion}.json`;
      link.click();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-[#0B0F18]/50 p-8 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-md">
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
              INTEL <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">COMMAND</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold">Torque Global Analytics & Fraud Mitigation</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-cyan-500 transition-all"
            >
              {['All Regions', 'North', 'South', 'West', 'East'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all disabled:opacity-50 active:scale-95"
            >
              {isExporting ? <Activity className="animate-spin" size={16} /> : <Download size={16} />} 
              {isExporting ? "Processing..." : "Export Intelligence"}
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Main Visuals: Heatmap & SKU */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Heatmap Section */}
            <div className="bg-[#0B0F18] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                    <MapIcon size={24} className="text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Geo-Spatial Heatmap</h3>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tracking Real-time interactions</p>
                  </div>
                </div>

                <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  <button 
                    onClick={() => setHeatmapType('QR')}
                    className={cn("px-6 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all", heatmapType === 'QR' ? "bg-cyan-500 text-white" : "text-slate-500")}
                  >
                    QR Scans
                  </button>
                  <button 
                    onClick={() => setHeatmapType('Warranty')}
                    className={cn("px-6 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all", heatmapType === 'Warranty' ? "bg-emerald-500 text-white" : "text-slate-500")}
                  >
                    Warranty
                  </button>
                </div>
              </div>

              {/* Dynamic Grid Simulation */}
              <div className="h-[450px] w-full bg-slate-950/80 rounded-[2.5rem] border border-slate-800/50 relative overflow-hidden p-6">
                <div className="grid grid-cols-12 grid-rows-8 gap-3 w-full h-full">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        opacity: [0.1, 0.4, 0.1],
                        scale: heatmapType === 'QR' ? (i % 5 === 0 ? 1.2 : 1) : (i % 8 === 0 ? 1.2 : 1)
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.02 }}
                      className={cn(
                        "rounded-sm",
                        heatmapType === 'QR' 
                          ? (i % 5 === 0 ? "bg-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-slate-800/20")
                          : (i % 8 === 0 ? "bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-slate-800/20")
                      )}
                    />
                  ))}
                </div>
                
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0B0F18_90%)]" />
                
                <div className="absolute bottom-10 left-10 flex gap-8">
                  <StatItem icon={<QrCode size={14}/>} label="Total Scans" value="42,891" color="text-cyan-400" />
                  <StatItem icon={<ClipboardCheck size={14}/>} label="Verified Claims" value="3,102" color="text-emerald-400" />
                </div>
              </div>
            </div>

            {/* SKU Leaderboard with Search */}
            <div className="bg-[#0B0F18] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="p-10 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h3 className="text-xl font-black text-white italic uppercase flex items-center gap-4">
                  <Box size={24} className="text-purple-500" /> SKU Performance
                </h3>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text"
                    value={skuSearch}
                    onChange={(e) => setSkuSearch(e.target.value)}
                    placeholder="Search SKU Code..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-800/50">
                      <th className="p-6">Product Identity</th>
                      <th className="p-6">Region</th>
                      <th className="p-6">Movement</th>
                      <th className="p-6">Stock Status</th>
                      <th className="p-6 text-right">Inventory Health</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    <AnimatePresence mode='popLayout'>
                      {filteredSKUs.map((sku) => (
                        <motion.tr 
                          layout
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          key={sku.code} 
                          className="group hover:bg-slate-800/20 transition-all cursor-pointer"
                        >
                          <td className="p-6">
                            <p className="text-sm font-black text-white italic tracking-tighter uppercase">{sku.code}</p>
                            <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">Automotive Series</p>
                          </td>
                          <td className="p-6 text-xs font-bold text-slate-400">{sku.region}</td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <span className={cn("text-xs font-black italic", sku.growth.includes('+') ? "text-emerald-500" : "text-red-500")}>
                                {sku.growth}
                              </span>
                              <TrendingUp size={12} className={sku.growth.includes('+') ? "text-emerald-500" : "text-red-500 rotate-180"} />
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={cn(
                              "text-[9px] font-black uppercase px-3 py-1 rounded-lg border",
                              sku.status === 'Optimal' ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                              sku.status === 'Critical' ? "border-red-500/20 text-red-500 bg-red-500/5 animate-pulse" : "border-orange-500/20 text-orange-500 bg-orange-500/5"
                            )}>
                              {sku.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <p className="text-sm font-black text-white">{sku.stock} <span className="text-[10px] text-slate-600 uppercase font-bold italic">Units</span></p>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Alerts & Receivables */}
          <div className="space-y-8">
            
            {/* Fraud Alerts Card */}
            <div className="bg-[#0B0F18] border-2 border-red-500/20 rounded-[3rem] p-10 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-3">
                  <ShieldAlert size={18} /> Fraud Engine
                </h4>
                <div className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black animate-bounce">{alerts.length}</div>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence>
                  {alerts.map(alert => (
                    <motion.div 
                      key={alert.id}
                      initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                      className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl group relative"
                    >
                      <button 
                        onClick={() => dismissAlert(alert.id)}
                        className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <p className="text-[10px] font-black text-white uppercase mb-1">{alert.type}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{alert.location} • {alert.time}</p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/10 px-2 py-0.5 rounded">Critical</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {alerts.length === 0 && (
                  <div className="py-10 text-center space-y-3">
                    <ShieldAlert size={32} className="mx-auto text-slate-800" />
                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">System Secured</p>
                  </div>
                )}
              </div>
            </div>

            {/* Overdue Reports */}
            <div className="bg-[#0B0F18] border border-slate-800 rounded-[3rem] p-10 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={80} className="text-orange-500" />
              </div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
                <TrendingUp size={18} className="text-orange-500" /> Overdue Debt
              </h4>
              <div className="space-y-8">
                <div>
                  <p className="text-5xl font-black text-white italic tracking-tighter">₹18.2L</p>
                  <p className="text-[10px] font-black text-orange-500 uppercase mt-2 italic flex items-center gap-2">
                    <AlertTriangle size={12} /> High Risk Exposure
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-slate-500">Recovery Rate</span>
                    <span className="text-white">68%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1.5 }}
                      className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => alert("Initiating Automated Recovery Reminders...")}
                  className="w-full py-5 bg-slate-900 border border-slate-800 text-[10px] font-black uppercase text-white rounded-2xl hover:border-orange-500 transition-all active:scale-95"
                >
                  Trigger Reminders
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---
function StatItem({ label, value, color, icon }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
        {icon} {label}
      </p>
      <p className={cn("text-2xl font-black italic tracking-tighter", color)}>{value}</p>
    </div>
  );
}