// import React, { useState } from 'react';
// import { 
//   Truck, Send, MapPin, BarChart3, UserCheck, 
//   Key, RefreshCcw, Eye, EyeOff, Globe 
// } from 'lucide-react';

// const AdminDistributorForm = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [credentials, setCredentials] = useState({ username: '', password: '' });

//   // Distributor specific credential generation
//   const generateMasterCredentials = () => {
//     const randomPass = Math.random().toString(36).slice(-10).toUpperCase() + "!DIST";
//     const randomUser = "TC-DIST-" + Math.floor(100 + Math.random() * 900);
//     setCredentials({ username: randomUser, password: randomPass });
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
      
//       {/* --- Section 1: Global Entity Identity --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="md:col-span-2">
//            <AdminInput icon={<Truck size={16}/>} label="Distributor Entity Name" placeholder="Global Logistics Ltd" />
//         </div>
//         <AdminInput icon={<MapPin size={16}/>} label="Primary Warehouse Hub" placeholder="City, Country" />
//         <AdminInput icon={<UserCheck size={16}/>} label="Supply Chain Lead" placeholder="Manager Name" />
//       </div>

//       {/* --- Section 2: Distribution Logistics & Tier --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group">
//           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Authorized Distribution Tier</label>
//           <div className="relative">
//             <BarChart3 className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-500/50" size={16} />
//             <select className="w-full bg-transparent border-b border-white/10 pl-7 py-2 text-white outline-none focus:border-purple-500 appearance-none cursor-pointer">
//               <option className="bg-[#020617]">Tier 1 - Master Distributor</option>
//               <option className="bg-[#020617]">Tier 2 - Regional Partner</option>
//               <option className="bg-[#020617]">Tier 3 - Local Supplier</option>
//             </select>
//           </div>
//         </div>

//         <AdminInput icon={<Globe size={16}/>} label="Monthly Volume Cap (USD)" placeholder="e.g. 100,000" />
//       </div>

//       {/* --- Section 3: Master Access (Credentials) --- */}
//       <div className="p-6 bg-purple-600/[0.03] border border-purple-500/20 rounded-2xl relative overflow-hidden">
//         <div className="flex items-center gap-3 mb-6">
//           <Key className="text-purple-500" size={18} />
//           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic">Master Access Portal</h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//           <div className="space-y-2">
//             <label className="text-[9px] font-bold text-slate-500 uppercase ml-1">Distributor ID</label>
//             <input 
//               value={credentials.username}
//               readOnly
//               className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-purple-400 font-mono outline-none"
//               placeholder="Pending Gen..."
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[9px] font-bold text-slate-500 uppercase ml-1">Access Token / Pass</label>
//             <div className="relative">
//               <input 
//                 type={showPassword ? "text" : "password"}
//                 value={credentials.password}
//                 readOnly
//                 className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-purple-400 font-mono outline-none"
//                 placeholder="••••••••"
//               />
//               <button 
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
//               >
//                 {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
//               </button>
//             </div>
//           </div>
//         </div>

//         <button 
//           onClick={generateMasterCredentials}
//           className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-400 transition-colors"
//         >
//           <RefreshCcw size={12} /> Re-Generate Global Credentials
//         </button>
//       </div>

//       {/* --- Section 4: Validation --- */}
//       <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
//         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Operating Status</label>
//         <div className="flex gap-3">
//           {['Active', 'Under Review', 'Suspended'].map(status => (
//             <label key={status} className="flex-1 relative cursor-pointer group">
//               <input type="radio" name="dist-status" className="peer hidden" defaultChecked={status === 'Under Review'} />
//               <div className="text-center py-2 rounded-lg border border-white/5 bg-white/[0.02] peer-checked:border-purple-500 peer-checked:bg-purple-500/10 transition-all">
//                 <span className="text-[9px] font-bold uppercase text-white/40 peer-checked:text-purple-500">{status}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* --- Action Button --- */}
//       <button 
//         onClick={onSuccess}
//         className="w-full mt-4 py-5 bg-purple-600 hover:bg-purple-500 text-white font-display font-black italic uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-purple-900/40 group"
//       >
//         Authorize & Activate Distributor <Send size={18} className="group-hover:translate-x-1 transition-transform" />
//       </button>

//     </div>
//   );
// };

// /* --- Reusable Admin Input for Consistency --- */
// const AdminInput = ({ label, icon, ...props }: any) => (
//   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-white/10 transition-all text-left">
//     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 block">{label}</label>
//     <div className="flex items-center gap-3 border-b border-white/10 group-focus-within:border-purple-500 transition-all">
//       <span className="text-white/20 group-focus-within:text-purple-500 transition-colors">{icon}</span>
//       <input 
//         className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/5" 
//         {...props} 
//       />
//     </div>
//   </div>
// );

// export default AdminDistributorForm;



import React, { useState } from 'react';
import { 
  Truck, Send, MapPin, BarChart3, UserCheck, 
  Key, RefreshCcw, Eye, EyeOff, Globe, Mail 
} from 'lucide-react';

const AdminDistributorForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  // Hum email distributor se lenge aur password generate karenge
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const generateMasterCredentials = () => {
    // Industrial grade strong password generation
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%";
    let generatedPass = "";
    for (let i = 0; i < 10; i++) {
      generatedPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCredentials({ ...credentials, password: generatedPass + "-TC" });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- Section 1: Global Entity Identity --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
           <AdminInput icon={<Truck size={16}/>} label="Distributor Entity Name" placeholder="e.g. Global Logistics Ltd" />
        </div>
        <AdminInput 
          icon={<Mail size={16}/>} 
          label="Distributor Login Email" 
          placeholder="distributor@company.com"
          value={credentials.email}
          onChange={(e: any) => setCredentials({...credentials, email: e.target.value})}
        />
        <AdminInput icon={<UserCheck size={16}/>} label="Supply Chain Lead" placeholder="Manager Name" />
        <AdminInput icon={<MapPin size={16}/>} label="Primary Warehouse Hub" placeholder="City, Country" className="md:col-span-2" />
      </div>

      {/* --- Section 2: Distribution Logistics & Tier --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-brand-red/20 transition-all">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Authorized Distribution Tier</label>
          <div className="relative">
            <BarChart3 className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-red/50" size={16} />
            <select className="w-full bg-transparent border-b border-white/10 pl-7 py-2 text-white outline-none focus:border-brand-red appearance-none cursor-pointer text-sm">
              <option className="bg-[#05070a]">Tier 1 - Master Distributor</option>
              <option className="bg-[#05070a]">Tier 2 - Regional Partner</option>
              <option className="bg-[#05070a]">Tier 3 - Local Supplier</option>
            </select>
          </div>
        </div>
        <AdminInput icon={<Globe size={16}/>} label="Monthly Volume Cap (USD)" placeholder="e.g. 100,000" />
      </div>

      {/* --- Section 3: Master Access (Security & Credentials) --- */}
      <div className="p-6 bg-brand-red/[0.03] border border-brand-red/20 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
            <Key size={120} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Key className="text-brand-red" size={18} />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic">Security Token Configuration</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left relative z-10">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase ml-1">Login Username (Email Reference)</label>
            <div className="w-full bg-black/60 border border-white/5 rounded-lg p-4 text-sm text-white/40 font-mono">
              {credentials.email || "Enter email above to link..."}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase ml-1">Generated Access Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                readOnly
                className="w-full bg-black/60 border border-brand-red/20 rounded-lg p-4 text-sm text-brand-red font-mono outline-none shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)]"
                placeholder="TOKEN-NOT-GENERATED"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="button"
          onClick={generateMasterCredentials}
          className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-red hover:text-white transition-all group"
        >
          <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" /> 
          Generate Secure Access Token
        </button>
      </div>

      {/* --- Section 4: Validation & Operating Status --- */}
      <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Initial Activation Status</label>
        <div className="flex gap-3">
          {['Active', 'Pending', 'Suspended'].map(status => (
            <label key={status} className="flex-1 relative cursor-pointer group">
              <input type="radio" name="dist-status" className="peer hidden" defaultChecked={status === 'Pending'} />
              <div className="text-center py-3 rounded border border-white/5 bg-white/[0.01] peer-checked:border-brand-red peer-checked:bg-brand-red/10 transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-tighter text-white/20 peer-checked:text-brand-red italic">{status}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* --- Action Button --- */}
      <div className="pt-4">
        <button 
            onClick={onSuccess}
            className="w-full py-6 bg-brand-red hover:bg-red-700 text-white font-display font-black italic uppercase tracking-tighter text-xl rounded-sm flex items-center justify-center gap-4 transition-all shadow-2xl shadow-brand-red/20 group active:scale-[0.98]"
        >
            Finalize Distributor Access <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
        <p className="text-center mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            Upon activation, credentials will be dispatched to the provided email.
        </p>
      </div>

    </div>
  );
};

/* --- Admin Input Styling --- */
const AdminInput = ({ label, icon, className, ...props }: any) => (
  <div className={`p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-white/10 transition-all text-left ${className}`}>
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">{label}</label>
    <div className="flex items-center gap-4 border-b border-white/5 group-focus-within:border-brand-red transition-all pb-1">
      <span className="text-white/20 group-focus-within:text-brand-red transition-colors">{icon}</span>
      <input 
        className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/5 font-medium" 
        {...props} 
      />
    </div>
  </div>
);

export default AdminDistributorForm;