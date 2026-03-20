import React from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard,
  Save,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">DEALER SETTINGS</h2>
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all group">
          <Save className="w-4 h-4" />
          SAVE ALL CHANGES
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {[
            { label: 'Profile Information', icon: User, active: true },
            // { label: 'Notifications', icon: Bell, active: false },
            // { label: 'Security & Privacy', icon: Shield, active: false },
            // { label: 'Dealer Portal Config', icon: Globe, active: false },
            // { label: 'Billing & Payouts', icon: CreditCard, active: false },
          ].map((item, i) => (
            <button key={i} className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
              item.active 
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                : "bg-[#0f172a] border-slate-800/50 text-slate-400 hover:border-slate-700/50 hover:text-white"
            )}>
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-transform", item.active ? "translate-x-1" : "group-hover:translate-x-1")} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50">
            <h3 className="text-xl font-bold text-white mb-8">Profile Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                  <div className="text-center">
                    <User className="w-8 h-8 text-slate-500 mx-auto mb-1 group-hover:text-cyan-400 transition-colors" />
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Upload</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Dealer Logo</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Recommended size: 512x512px</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors">Change Photo</button>
                    <button className="text-xs font-black text-rose-400 hover:text-rose-300 transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dealer Name</label>
                  <input 
                    type="text" 
                    defaultValue="TorqueCraft Elite"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dealer ID</label>
                  <input 
                    type="text" 
                    defaultValue="TC-DEALER-882"
                    disabled
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="email" 
                      defaultValue="contact@torquecraft.elite"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      defaultValue="+1 (555) 000-8888"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Business Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                    <textarea 
                      rows={3}
                      defaultValue="777 Performance Way, Suite 100&#10;Silicon Valley, CA 94025"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50">
            <h3 className="text-xl font-bold text-white mb-8">Danger Zone</h3>
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Deactivate Dealer Account</h4>
                <p className="text-xs font-medium text-slate-500 mt-1">This will temporarily disable your access to the dealer portal.</p>
              </div>
              <button className="px-6 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-black text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
                DEACTIVATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
