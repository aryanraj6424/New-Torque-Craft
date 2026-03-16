import React, { useState } from 'react';
import { 
  Building2, UserCircle2, Mail, Phone, Globe, 
  Send, Key, RefreshCcw, Eye, EyeOff, ShieldCheck 
} from 'lucide-react';

const AdminDealerForm = ({ onSuccess, applicationData }: { onSuccess: () => void; applicationData?: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  
  // Logic: Use Email from Application as Username
  const username = applicationData?.email || "dealer@company.com";

  const generatePassword = () => {
    const randomPass = Math.random().toString(36).slice(-8).toUpperCase() + "@TC";
    setPassword(randomPass);
  };

  return (
    <div className="space-y-8 bg-[#05070a] p-1 shadow-2xl animate-in fade-in duration-700">
      
      {/* Header Section with Red Accent Line */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="h-12 w-1.5 bg-brand-red shadow-[0_0_15px_rgba(231,31,41,0.6)]" />
        <div>
          <h2 className="text-3xl font-display font-black italic uppercase tracking-tighter text-white">
            Finalize <span className="text-brand-red">Dealer</span> Account
          </h2>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Administrative Registration Portal</p>
        </div>
      </div>

      {/* --- Section 1: Verified Identity (From Application) --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Building2 size={16} className="text-brand-red" />
          <h3 className="text-[11px] font-black uppercase tracking-widest text-white/60 italic">Contact Intelligence</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <AdminInput label="Business Name (Legal Entity)" value={applicationData?.businessName || "Apex Performance"} readOnly />
          </div>
          <AdminInput label="Primary Contact" value={applicationData?.contactName || "John Doe"} readOnly />
          <AdminInput label="Business Email" value={username} readOnly />
        </div>
      </section>

      {/* --- Section 2: System Credentials (The Mapping) --- */}
      <section className="p-8 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden group">
        {/* Large faint background icon for that "Industrial" feel */}
        <ShieldCheck className="absolute -right-8 -bottom-8 text-brand-red opacity-[0.03] rotate-12" size={240} />
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-brand-red/10 border border-brand-red/20 rounded">
            <Key className="text-brand-red" size={18} />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white italic">System Access Credentials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* USERNAME (Locked to Email) */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Assigned Username</label>
            <div className="bg-black/60 border border-white/10 rounded-sm p-4 text-brand-blue font-mono text-sm flex items-center justify-between group-hover:border-white/20 transition-all">
              <span>{username}</span>
              <Mail size={14} className="opacity-20" />
            </div>
            <p className="text-[9px] text-white/20 italic tracking-wider leading-relaxed">
              *User will log in using their verified business email address.
            </p>
          </div>

          {/* PASSWORD GENERATOR */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Temporary Portal Pass</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="w-full bg-black/80 border border-brand-red/30 focus:border-brand-red rounded-sm p-4 text-sm text-white font-mono outline-none transition-all placeholder:text-white/5"
                placeholder="GENERATE PASS →"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            <button 
              type="button"
              onClick={generatePassword}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-red hover:text-white transition-all group/btn"
            >
              <RefreshCcw size={12} className="group-hover/btn:rotate-180 transition-transform duration-500" /> 
              Generate Secure Credentials
            </button>
          </div>
        </div>
      </section>

      {/* --- Section 3: Localization & Status --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Region Assignment</label>
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-red transition-colors" size={16} />
            <select className="w-full bg-black/60 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white text-[11px] font-bold uppercase tracking-widest outline-none focus:border-brand-red appearance-none cursor-pointer">
              <option className="bg-[#05070a]">North America</option>
              <option className="bg-[#05070a]">Europe</option>
              <option className="bg-[#05070a]">Middle East</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Account Activation Status</label>
          <div className="grid grid-cols-3 gap-2">
            {['Pending', 'Authorized', 'Suspended'].map(status => (
              <label key={status} className="relative cursor-pointer group">
                <input type="radio" name="status" className="peer hidden" defaultChecked={status === 'Authorized'} />
                <div className="text-center py-4 rounded-sm border border-white/5 bg-white/[0.01] peer-checked:border-brand-red peer-checked:bg-brand-red/10 transition-all duration-300">
                  <span className="text-[9px] font-black uppercase tracking-tighter text-white/20 peer-checked:text-brand-red group-hover:text-white/40 transition-colors">
                    {status}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Activation Button --- */}
      <button 
        onClick={onSuccess}
        className="w-full py-6 bg-brand-red hover:bg-red-700 text-white font-display font-black italic uppercase tracking-[0.3em] rounded-sm shadow-2xl shadow-brand-red/20 group transition-all flex items-center justify-center gap-6 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 italic text-[40px] opacity-20 whitespace-nowrap pointer-events-none">
          ACTIVATE // ACTIVATE // ACTIVATE
        </div>
        <span className="relative z-10">Execute Authorization</span>
        <Send size={20} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
      </button>

    </div>
  );
};

/* --- Modern Industrial Admin Input --- */
const AdminInput = ({ label, className = "", ...props }: any) => (
  <div className={`space-y-2 group ${className}`}>
    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative">
      <input 
        className="w-full bg-black/40 border border-white/10 rounded-sm p-4 text-sm text-white/80 outline-none group-focus-within:border-brand-red group-hover:border-white/20 transition-all font-medium placeholder:text-white/5" 
        {...props} 
      />
      {props.readOnly && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ShieldCheck size={14} className="text-white/10" />
        </div>
      )}
    </div>
  </div>
);

export default AdminDealerForm;