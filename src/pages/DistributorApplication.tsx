// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { Globe, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

// const DistributorApplication = () => {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6 text-center">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="metallic-card p-12 max-w-md border-glow-blue">
//           <CheckCircle2 size={64} className="mx-auto text-brand-blue mb-8" />
//           <h2 className="text-3xl font-display font-black italic uppercase mb-4">Application Received</h2>
//           <p className="text-white/60 mb-8">Thank you for your interest in becoming a Torque Craft Distributor. Our corporate team will review your credentials and contact you shortly.</p>
//           <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Back to Home</button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-32 pb-24 bg-navy-deep">
//       <div className="max-w-4xl mx-auto px-6">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-display font-black italic uppercase mb-4">Distributor <span className="text-brand-blue">Application</span></h1>
//           <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Global Logistics & Distribution Partnership</p>
//         </div>

//         <div className="metallic-card p-10">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Company Name</label>
//                 <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Region / Territory</label>
//                 <input required type="text" placeholder="e.g. North America, EU, Australia" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Primary Contact</label>
//                 <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Corporate Email</label>
//                 <input required type="email" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Distribution Capabilities</label>
//               <textarea required placeholder="Describe your warehouse capacity, dealer network, and logistics reach..." className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue min-h-[150px]" />
//             </div>

//             <div className="p-6 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
//               <div className="flex items-center gap-3 mb-4">
//                 <Globe className="text-brand-blue" size={20} />
//                 <h3 className="text-sm font-bold uppercase tracking-wider">Distributor Requirements</h3>
//               </div>
//               <ul className="space-y-2 text-xs text-white/40">
//                 <li>• Must maintain significant inventory levels for immediate fulfillment.</li>
//                 <li>• Proven track record in automotive parts distribution.</li>
//                 <li>• Ability to provide technical support to sub-dealers in your region.</li>
//               </ul>
//             </div>

//             <button type="submit" className="btn-primary bg-brand-blue hover:bg-blue-700 w-full py-4 flex items-center justify-center gap-3">
//               Submit Corporate Application <Send size={18} />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistributorApplication;

















import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  FileText, Send, CheckCircle2, Upload, 
  Globe, Building2, Package, ShieldCheck, MapPin, Briefcase, Plus, Truck
} from 'lucide-react';

const DistributorApplication = () => {
  const [submitted, setSubmitted] = useState(false);

  // Full list of countries for searchable/dropdown [cite: 63]
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-[#05070a] flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-gradient-to-b from-navy-deep to-black border border-white/10 p-12 rounded-2xl shadow-2xl">
          <CheckCircle2 size={64} className="mx-auto text-brand-blue mb-8" />
          <h2 className="text-3xl font-display font-black italic uppercase mb-4 text-white">Application Received</h2>
          <p className="text-white/60 mb-8 leading-relaxed">Thank you for applying to the Global Distributor program. Our regional managers will review your profile and contact you within 72 business hours.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full py-4 uppercase font-bold tracking-widest bg-brand-red text-white rounded shadow-lg">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#05070a] min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section [cite: 56] */}
        <header className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/5 mb-6">
            <Globe size={14} className="text-brand-red" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">Global Distribution Program</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase mb-6 tracking-tighter">
            Become a Torque Craft <span className="text-brand-red">Global Distributor</span>
          </h1>
          <p className="text-white/60 uppercase tracking-[0.2em] text-[11px] font-bold max-w-2xl mx-auto leading-relaxed">
            Partner with Torque Craft to distribute high-performance engine fasteners in your region.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Contact Information [cite: 57, 58] */}
          <FormSection icon={<FileText size={20} />} title="Primary Contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Contact Name" required type="text" placeholder="e.g. Alex Rivera" />
              <InputField label="Job Title" required type="text" placeholder="e.g. Director of Operations" />
              <InputField label="Business Email" required type="email" placeholder="distributor@company.com" />
              <InputField label="Phone Number" required type="tel" placeholder="+1 (555) 000-0000" />
              <InputField label="WhatsApp Number" required type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </FormSection>

          {/* Company Information [cite: 59, 60, 61] */}
          <FormSection icon={<Building2 size={20} />} title="Company Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <InputField label="Company Name" required placeholder="Registered Business Name" />
                <InputField label="Company Website" required type="url" placeholder="https://www.company.com" />
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Years Active" required type="number" placeholder="0" />
                  <InputField label="Staff Count" required type="number" placeholder="0" />
                  <InputField label="Warehouses" required type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Current Sales Channels </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Wholesale distribution', 'Online store', 'Retail network', 'Export distribution'].map(type => (
                    <label key={type} className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-lg hover:border-brand-red/40 transition-all cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-brand-red" />
                      <span className="text-[10px] font-bold uppercase text-white/50 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Headquarters Address [cite: 62, 63, 64] */}
          <FormSection icon={<MapPin size={20} />} title="Headquarters Address">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3"><InputField label="Street Address" required placeholder="Main Office Address" /></div>
              <InputField label="City" required placeholder="City" />
              <InputField label="State / Province" required placeholder="State" />
              <InputField label="Postal Code" required placeholder="Zip Code" />
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Country</label>
                <select required className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer hover:bg-black/80 transition-all scrollbar-thin scrollbar-thumb-brand-red">
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-[#05070a] text-white">{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          {/* Distribution Territory [cite: 65, 66, 67, 68, 70] */}
          <FormSection icon={<Globe size={20} />} title="Distribution Territory">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1 mb-3 block">Primary Sales Regions</label>
                <div className="flex flex-wrap gap-2">
                  {['North America', 'Europe', 'Middle East', 'Asia', 'Australia / NZ', 'Africa', 'South America'].map(region => (
                    <label key={region} className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full cursor-pointer hover:border-brand-red/40">
                      <input type="checkbox" className="accent-brand-red" />
                      <span className="text-[10px] font-bold uppercase text-white/60">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Countries Served (Specifics) </label>
                <textarea required className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/10 outline-none focus:border-brand-red min-h-[80px]" placeholder="List all countries where you have active distribution..." />
              </div>
            </div>
          </FormSection>

          {/* Warehouse & Logistics [cite: 71, 72] */}
          <FormSection icon={<Truck size={20} />} title="Logistics & Capacity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <InputField label="Warehouse Size (sq ft/m)" placeholder="Total storage capacity" />
                <InputField label="Avg. Monthly Shipment Volume" required placeholder="Number of units or orders" />
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Brands Currently Distributed </label>
                  <textarea className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-brand-red min-h-[100px]" placeholder="e.g. ARP, Mahle, BorgWarner..." />
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Estimated Purchase Volume</label>
                <select required className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer">
                  <option value="">Select Per Order Volume</option>
                  <option>$10k - $50k per order</option>
                  <option>$50k - $100k per order</option>
                  <option>$100k+ per order</option>
                </select>
                <div className="p-5 bg-brand-red/5 border border-brand-red/20 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase text-brand-red mb-2">Notice</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">Distributor status requires maintaining local inventory and meeting minimum annual purchase commitments.</p>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Product Interests [cite: 89, 90, 94, 97, 99, 100, 101, 102, 104, 106, 108, 109, 110] */}
          <FormSection icon={<Package size={20} />} title="Product Interests">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Interest Categories</label>
                {['Head Stud Kits', 'Main Stud Kits', 'Performance Fasteners'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 text-[11px] font-bold uppercase text-white/60 hover:text-white transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-brand-red" /> {cat}
                  </label>
                ))}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Platforms Served</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cummins', 'Duramax', 'Powerstroke', 'Toyota LC', 'Nissan Patrol', 'Subaru'].map(plat => (
                    <label key={plat} className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/40 hover:text-white cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 accent-brand-red" /> {plat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Document Upload [cite: 114, 115] */}
          <FormSection icon={<ShieldCheck size={20} />} title="Verification Documents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FileUpload label="Business Registration" />
              <FileUpload label="Tax Certificate" />
              <FileUpload label="Company Profile" />
              <FileUpload label="Warehouse Photos" />
            </div>
          </FormSection>

          {/* Final Intelligence [cite: 111, 112, 113, 117, 120, 121, 124, 125] */}
          <FormSection icon={<Plus size={20} />} title="Market Strategy">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block ml-1">Market Coverage Capabilities</label>
              <textarea 
                className="w-full bg-black/60 border border-white/10 rounded-xl p-5 text-sm text-white placeholder:text-white/10 outline-none focus:border-brand-red min-h-[120px]"
                placeholder="Describe your distribution network, sales team size, and marketing reach..."
              />
            </div>
            
            <div className="mt-8 space-y-4">
              <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
                <input required type="checkbox" className="mt-1 accent-brand-red" />
                <span className="group-hover:text-white/60 transition-colors">I confirm all information provided is accurate and verifiable.</span>
              </label>
              <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
                <input required type="checkbox" className="mt-1 accent-brand-red" />
                <span className="group-hover:text-white/60 transition-colors">I agree to Torque Craft distributor policies and pricing terms.</span>
              </label>
            </div>

            <button type="submit" className="w-full mt-10 py-6 bg-brand-red hover:bg-brand-red/90 text-white transition-all duration-300 rounded-sm flex items-center justify-center gap-4 text-xl font-display font-black italic uppercase tracking-tighter shadow-xl shadow-brand-red/20 group">
              Execute Distribution Agreement <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </FormSection>

        </form>
      </div>
    </div>
  );
};

/* --- Reusable Helper Components --- */

const FormSection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl group hover:border-white/10 transition-all"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-red to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
    <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
      <div className="p-2.5 bg-brand-red/10 rounded text-brand-red border border-brand-red/20 shadow-lg shadow-brand-red/5">
        {icon}
      </div>
      <h2 className="text-xl md:text-2xl font-display font-black uppercase italic tracking-tight text-white">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const InputField = ({ label, ...props }: { label: string; [key: string]: any }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">{label}</label>
    <input 
      {...props} 
      className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red focus:bg-black transition-all placeholder:text-white/10 font-medium" 
    />
  </div>
);

const FileUpload = ({ label }: { label: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => fileInputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div 
      onClick={handleClick}
      className="border-2 border-dashed border-white/5 rounded-xl p-6 text-center hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all cursor-pointer group relative overflow-hidden"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <Upload size={20} className={`mx-auto mb-2 transition-all ${fileName ? 'text-brand-red scale-110' : 'text-white/10 group-hover:text-brand-red'}`} />
      <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 block truncate px-2">
        {fileName ? fileName : label}
      </span>
      {fileName && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full shadow-[0_0_5px_rgba(231,31,41,0.5)]" />
      )}
    </div>
  );
};

export default DistributorApplication;