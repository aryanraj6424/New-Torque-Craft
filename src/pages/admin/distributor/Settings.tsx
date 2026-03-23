import React, { useState, useRef } from 'react';
import { 
  User, Shield, Save, ChevronRight, 
  Mail, Phone, MapPin, Trash2, Camera, 
  Loader2, UploadCloud, Globe, Truck, Building2, Landmark
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Distributor Profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  
  // Profile Image State
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    distributorName: "TorqueCraft Global Logistics",
    distributorId: "TC-DIST-9902",
    gstin: "07AAATC1234F1Z5",
    email: "ops@torquecraft-logistics.com",
    phone: "+91 98765-43210",
    region: "North India (NCR)",
    warehouseAddress: "Plot 42, Industrial Area Phase II, Noida, UP 201305"
  });

  // --- Image Handlers ---
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveStatus('saving');
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 px-4 sm:px-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">
            Distributor Hub
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-indigo-500"></span>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase font-mono">Operations Control Center</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "group relative flex items-center gap-3 px-10 py-4 rounded-2xl text-[11px] font-black text-white transition-all overflow-hidden shadow-2xl active:scale-95",
            saveStatus === 'success' ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 transition-transform group-hover:scale-110" />}
          <span className="tracking-widest">{isSaving ? "SYNCING DATA..." : saveStatus === 'success' ? "CHANGES LIVE" : "PUSH CONFIGURATION"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-4 space-y-4">
          {[
            { label: 'Distributor Profile', icon: Building2 },
            
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden",
                activeTab === item.label 
                  ? "bg-slate-900 border-indigo-500/50 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.1)]" 
                  : "bg-slate-950/50 border-slate-800/50 text-slate-500 hover:border-slate-700 hover:bg-slate-900/50"
              )}
            >
              <div className="flex items-center gap-5 z-10">
                <div className={cn(
                    "p-3 rounded-2xl transition-all duration-500",
                    activeTab === item.label ? "bg-indigo-600 shadow-xl text-white" : "bg-slate-800 group-hover:text-white"
                )}>
                    <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              </div>
              <ChevronRight className={cn("w-5 h-5 transition-all duration-500 z-10", activeTab === item.label ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-8 space-y-10">
          
          {activeTab === 'Distributor Profile' ? (
            <div className="animate-in fade-in zoom-in-95 duration-700 space-y-10">
              
              {/* PROFILE DETAILS CARD */}
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 shadow-3xl relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]"></div>
                
                <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 italic tracking-tight">
                    <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                    Entity Information
                </h3>
                
                <div className="space-y-10">
                  {/* LOGO UPLOAD SECTION */}
                  <div className="p-8 rounded-[2.5rem] bg-slate-950/60 border border-slate-800/50 flex flex-col md:flex-row items-center gap-10 hover:border-slate-700 transition-colors group">
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    
                    <div onClick={handleUploadClick} className="relative w-36 h-36 shrink-0 cursor-pointer group/logo">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
                        <div className="w-full h-full rounded-[2.5rem] bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover/logo:border-indigo-500/50 relative z-10">
                            {profileImage ? (
                                <img src={profileImage} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center">
                                    <Camera className="w-10 h-10 text-slate-600 mx-auto mb-2 group-hover/logo:text-indigo-400 group-hover/logo:scale-110 transition-all" />
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Seal / Logo</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-xl font-bold text-white tracking-tight">Distributor Brand Identity</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2 mb-6">Logo used for digital invoices & QR labels</p>
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <button onClick={handleUploadClick} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-[10px] font-black text-white hover:bg-indigo-600 transition-all uppercase tracking-widest border border-slate-700/50 shadow-lg">
                          <UploadCloud size={14} /> Update Identity
                        </button>
                        <button onClick={handleDeleteImage} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-[10px] font-black text-rose-500 hover:text-white hover:bg-rose-500 transition-all uppercase tracking-widest border border-rose-500/20">
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'Distributor Name', name: 'distributorName', icon: Building2, value: formData.distributorName },
                      { label: 'Distributor ID (Static)', name: 'distributorId', icon: Shield, disabled: true, value: formData.distributorId },
                      { label: 'GSTIN / Tax Identification', name: 'gstin', icon: Landmark, value: formData.gstin },
                      { label: 'Logistics Region', name: 'region', icon: Globe, value: formData.region },
                      { label: 'Operations Email', name: 'email', icon: Mail, value: formData.email },
                      { label: 'Support Hotline', name: 'phone', icon: Phone, value: formData.phone }
                    ].map((field, idx) => (
                      <div key={idx} className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{field.label}</label>
                        <div className="relative group/field">
                          <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within/field:text-indigo-500" />
                          <input 
                            type="text" 
                            name={field.name}
                            value={field.value}
                            onChange={handleInputChange}
                            disabled={field.disabled}
                            className={cn(
                              "w-full bg-slate-950/50 border-2 border-slate-800/80 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm text-white transition-all outline-none",
                              field.disabled ? "cursor-not-allowed opacity-60 font-mono" : "focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 hover:border-slate-700"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Warehouse / Dispatch Address</label>
                      <div className="relative group/field">
                        <MapPin className="absolute left-5 top-6 w-4 h-4 text-slate-600 group-focus-within/field:text-indigo-500" />
                        <textarea 
                          rows={3}
                          name="warehouseAddress"
                          value={formData.warehouseAddress}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950/50 border-2 border-slate-800/80 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm text-white focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DANGER ZONE */}
              <div className="group relative p-10 rounded-[3rem] bg-gradient-to-br from-rose-950/10 to-transparent border border-rose-500/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-rose-500/10 transition-colors"></div>
                <h3 className="text-xl font-black text-rose-500 mb-8 flex items-center gap-3 uppercase italic tracking-tighter">
                    <Trash2 size={20} />
                    Terminal Access
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-[2rem] bg-slate-950/40 border border-rose-500/10">
                  <div className="text-center md:text-left">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Suspend Distribution</h4>
                    <p className="text-xs font-medium text-slate-500 mt-2 max-w-sm">This will lock the distributor dashboard and freeze all pending stock movements.</p>
                  </div>
                  <button className="w-full md:w-auto px-12 py-4 rounded-2xl bg-transparent border-2 border-rose-500 text-rose-500 text-[10px] font-black hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest shadow-lg">
                    Confirm Suspension
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center bg-slate-950/50 border-2 border-dashed border-slate-800 rounded-[3rem]">
                <Loader2 className="w-10 h-10 text-slate-800 animate-spin mb-4" />
                <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">Accessing Encrypted Nodes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}