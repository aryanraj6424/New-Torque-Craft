import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, Globe, Zap, Database, 
  Key, Bell, Users, Activity, 
  Save, Loader2, Server, Layout, 
  Lock, Smartphone, Mail, Cloud
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState('Platform Control');
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState('idle');

  const [platformConfig, setPlatformConfig] = useState({
    platformName: "Torque Craft ",
    environment: "Production - Stable",
    apiEndpoint: "https://api.torquecraft.global/v3",
    maintenanceMode: false,
    maxDistributors: "500",
    authMethod: "Multi-Factor Authentication (Required)"
  });

  const handleToggle = () => {
    setPlatformConfig(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  const handleSync = () => {
    setIsSyncing(true);
    setStatus('syncing');
    setTimeout(() => {
      setIsSyncing(false);
      setStatus('synced');
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 px-4">
      
      {/* SUPER ADMIN HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800/50 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Super <span className="text-amber-500">Admin</span> Core
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase font-mono">Kernel v4.2.0 • Global System Configuration</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
            <div className="px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase">System Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> All Nodes Active
                    </span>
                </div>
            </div>
            
            <button 
                onClick={handleSync}
                disabled={isSyncing}
                className={cn(
                    "group px-10 py-5 rounded-2xl text-[11px] font-black text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3",
                    status === 'synced' ? "bg-emerald-600" : "bg-amber-600 hover:bg-amber-500"
                )}
            >
                {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                <span className="tracking-widest">{isSyncing ? "UPLOADING TO CLOUD..." : status === 'synced' ? "CORE UPDATED" : "DEPLOY TO PRODUCTION"}</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* NAV NODES */}
        <div className="lg:col-span-3 space-y-3">
          {[
            { id: 'Platform Control', icon: Layout },
            // { id: 'Security & Auth', icon: Lock },
            // { id: 'Global API Keys', icon: Key },
            // { id: 'System Logs', icon: Database },
          ].map((node) => (
            <button 
              key={node.id}
              onClick={() => setActiveTab(node.id)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300",
                activeTab === node.id 
                    ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                    : "bg-transparent border-slate-800/40 text-slate-500 hover:bg-slate-900"
              )}
            >
              <node.icon size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">{node.id}</span>
            </button>
          ))}
        </div>

        {/* MAIN PANEL */}
        <div className="lg:col-span-9 space-y-10">
          
          {activeTab === 'Platform Control' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              
              {/* SYSTEM HEALTH CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800">
                    <Server className="text-amber-500 mb-4" size={20} />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Server Load</p>
                    <p className="text-2xl font-black text-white italic">24.8%</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800">
                    <Users className="text-blue-500 mb-4" size={20} />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Orgs</p>
                    <p className="text-2xl font-black text-white italic">1,402</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800">
                    <Activity className="text-emerald-500 mb-4" size={20} />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Uptime</p>
                    <p className="text-2xl font-black text-white italic">99.99%</p>
                </div>
              </div>

              {/* CORE CONFIGURATION */}
              <div className="p-10 rounded-[3rem] bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
                <h3 className="text-xl font-black text-white mb-10 uppercase italic tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full" /> Platform Architecture
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Platform Master Name</label>
                    <input 
                      type="text" 
                      value={platformConfig.platformName}
                      className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 text-sm text-white focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Global API Endpoint</label>
                    <div className="relative">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                        type="text" 
                        value={platformConfig.apiEndpoint}
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-sm text-amber-500 font-mono focus:border-amber-500 outline-none transition-all"
                        />
                    </div>
                  </div>
                </div>

                {/* MAINTENANCE MODE TOGGLE */}
                <div className="mt-12 p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                            platformConfig.maintenanceMode ? "bg-amber-500 text-white" : "bg-slate-800 text-slate-500"
                        )}>
                            <Smartphone size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-white uppercase italic">Maintenance Mode</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tight">Lock all distributor and user access for updates</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleToggle}
                        className={cn(
                            "relative w-20 h-10 rounded-full transition-all duration-500 p-1",
                            platformConfig.maintenanceMode ? "bg-amber-500" : "bg-slate-800"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-500 transform",
                            platformConfig.maintenanceMode ? "translate-x-10" : "translate-x-0"
                        )} />
                    </button>
                </div>
              </div>

              {/* DANGER ZONE - SYSTEM RESET */}
              <div className="p-10 rounded-[3rem] bg-red-500/5 border border-red-500/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Global Cache Purge</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Clear all Redis and CDN cached assets across all regions.</p>
                    </div>
                    <button className="px-10 py-4 bg-transparent border-2 border-red-500 text-red-500 text-[9px] font-black uppercase rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        Execute Master Purge
                    </button>
                </div>
              </div>

            </div>
          )}

          {activeTab !== 'Platform Control' && (
            <div className="h-[400px] flex items-center justify-center bg-slate-950/30 border-2 border-dashed border-slate-800 rounded-[3rem]">
                <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 text-slate-800 mx-auto" />
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Module Under Encryption</p>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}