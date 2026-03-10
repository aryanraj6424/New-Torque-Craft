// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { 
//   FileText, Send, CheckCircle2, Upload, 
//   Globe, Building2, Package, ShieldCheck 
// } from 'lucide-react';

// const DealerApplication = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [isOnlineSeller, setIsOnlineSeller] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (submitted) {
//     return (
//       <div className="pt-40 pb-24 min-h-screen bg-[#05070a] flex items-center justify-center px-6">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           className="max-w-md w-full bg-gradient-to-b from-navy-deep to-black border border-white/10 p-12 rounded-2xl text-center shadow-2xl shadow-brand-blue/10"
//         >
//           <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-blue/20">
//             <CheckCircle2 size={40} className="text-brand-blue" />
//           </div>
//           <h2 className="text-3xl font-display font-black italic uppercase mb-4 text-white tracking-tighter">Application Sent</h2>
//           <p className="text-white/50 mb-8 leading-relaxed">
//             Your verification request has been logged into the Torque Craft system. Our team will audit your credentials within 48 business hours.
//           </p>
//           <button 
//             onClick={() => window.location.href = '/'} 
//             className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all duration-300 rounded"
//           >
//             Return to Dashboard
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-32 pb-24 bg-[#05070a] min-h-screen text-white font-sans">
//       <div className="max-w-5xl mx-auto px-6">
        
//         {/* Header Section */}
//         <header className="text-center mb-20">
//           <motion.div 
//             initial={{ opacity: 0, y: -10 }} 
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/5 mb-6"
//           >
//             <ShieldCheck size={14} className="text-brand-red" />
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">Official Dealer Portal</span>
//           </motion.div>
//           <h1 className="text-6xl md:text-7xl font-display font-black italic uppercase mb-6 tracking-tighter">
//             Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">Network</span>
//           </h1>
//           <p className="text-white/40 uppercase tracking-[0.3em] text-[11px] font-bold max-w-xl mx-auto leading-relaxed">
//             High-Performance Hardware for Professional Engine Builders & Retailers
//           </p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-12">
          
//           {/* Section 1: Contact Details */}
//           <FormSection icon={<FileText size={20} />} title="Contact Intelligence">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//               <InputField label="Full Name" required placeholder="John Doe" />
//               <InputField label="Job Title" required placeholder="Shop Owner / Lead Builder" />
//               <InputField label="Business Email" required type="email" placeholder="john@shopname.com" />
//               <InputField label="Direct Phone" required type="tel" placeholder="+1 (555) 000-0000" />
//             </div>
//           </FormSection>

//           {/* Section 2: Business Profile */}
//           <FormSection icon={<Building2 size={20} />} title="Business Profile">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 <InputField label="Legal Business Name" required />
//                 <div className="grid grid-cols-2 gap-4">
//                   <InputField label="Years Active" required type="number" />
//                   <InputField label="Staff Count" required type="number" />
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary Operations</label>
//                 <div className="grid grid-cols-1 gap-2">
//                   {['Performance Shop', 'Engine Builder', 'Online Retailer', 'Wholesale Reseller'].map(type => (
//                     <label key={type} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-lg hover:border-brand-red/40 transition-all cursor-pointer group">
//                       <input type="checkbox" className="w-4 h-4 accent-brand-red" />
//                       <span className="text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2">
//                 <InputField label="Street Address" required />
//               </div>
//               <InputField label="City" required />
//               <InputField label="State / Province" required />
//               <InputField label="Postal Code" required />
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Country</label>
//                 <select className="w-full bg-black border border-white/10 rounded-lg p-4 text-sm outline-none focus:border-brand-red transition-all appearance-none cursor-pointer">
//                   <option>United States</option>
//                   <option>Canada</option>
//                   <option>United Kingdom</option>
//                   <option>Australia</option>
//                 </select>
//               </div>
//             </div>
//           </FormSection>

//           {/* Section 3: Verification & Media */}
//           <FormSection icon={<ShieldCheck size={20} />} title="Verification & Identity">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <InputField label="Tax ID / EIN" required />
//               <InputField label="Business License #" required />
//               <InputField label="Resale Permit" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FileUpload label="Business License (PDF)" />
//               <FileUpload label="Resale Certificate" />
//               <FileUpload label="Shop/Facility Photo" />
//             </div>
//           </FormSection>

//           {/* Section 4: Market Reach */}
//           <FormSection icon={<Globe size={20} />} title="Market Strategy">
//             <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-xl mb-6">
//               <div>
//                 <h4 className="text-sm font-bold uppercase tracking-wider">E-Commerce Presence</h4>
//                 <p className="text-[10px] text-white/40 uppercase mt-1">Do you intend to sell products via a website?</p>
//               </div>
//               <button 
//                 type="button"
//                 onClick={() => setIsOnlineSeller(!isOnlineSeller)}
//                 className={`w-16 h-8 rounded-full flex items-center px-1 transition-all duration-500 ${isOnlineSeller ? 'bg-brand-red' : 'bg-white/10'}`}
//               >
//                 <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${isOnlineSeller ? 'translate-x-8' : 'translate-x-0'}`} />
//               </button>
//             </div>

//             {isOnlineSeller && (
//               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                 <InputField label="Website URL" placeholder="https://www.yourshop.com" />
//                 <div className="flex gap-6 p-4 bg-black/40 rounded-lg border border-white/5">
//                   {['Amazon', 'eBay', 'Direct Site'].map(p => (
//                     <label key={p} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
//                       <input type="checkbox" className="accent-brand-red" /> {p}
//                     </label>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </FormSection>

//           {/* Section 5: Interest & Commitment */}
//           <FormSection icon={<Package size={20} />} title="Product Logistics">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="space-y-4">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 text-brand-red">Core Interest Categories</label>
//                 {['Head Stud Systems', 'Main Stud Kits', 'Connecting Rod Bolts'].map(cat => (
//                   <label key={cat} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tighter opacity-60 hover:opacity-100 cursor-pointer">
//                     <input type="checkbox" className="accent-brand-red" /> {cat}
//                   </label>
//                 ))}
//               </div>
//               <div className="space-y-4">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Anticipated Monthly Volume</label>
//                 <select className="w-full bg-black border border-white/10 rounded-lg p-4 text-sm outline-none focus:border-brand-red appearance-none cursor-pointer">
//                   <option>$2,500 - $7,500</option>
//                   <option>$7,500 - $25,000</option>
//                   <option>$25,000+</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="mt-10">
//               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-3">Additional Intelligence / Shop Specialization</label>
//               <textarea 
//                 className="w-full bg-black border border-white/10 rounded-xl p-5 text-sm outline-none focus:border-brand-red min-h-[140px] transition-all"
//                 placeholder="Tell us about the engines you build or the customers you serve..."
//               />
//             </div>
//           </FormSection>

//           {/* Submission Area */}
//           <div className="flex flex-col items-center gap-8 py-12 border-t border-white/10">
//             <div className="flex flex-col gap-3 w-full max-w-md">
//               <label className="flex items-start gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer hover:text-white/60 transition-colors">
//                 <input required type="checkbox" className="mt-0.5 accent-brand-red" />
//                 <span>Information accuracy certification</span>
//               </label>
//               <label className="flex items-start gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer hover:text-white/60 transition-colors">
//                 <input required type="checkbox" className="mt-0.5 accent-brand-red" />
//                 <span>Agreement to Torque Craft MAP policies</span>
//               </label>
//             </div>
            
//             <button 
//               type="submit" 
//               className="group relative w-full max-w-lg py-6 bg-brand-red hover:bg-brand-red/90 text-white transition-all duration-300 rounded-sm overflow-hidden"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-4 text-xl font-display font-black italic uppercase tracking-tighter">
//                 Execute Application <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// /* --- Helper Components --- */

// const FormSection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
//   <motion.section 
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="bg-white/[0.01] border border-white/5 p-10 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all shadow-xl"
//   >
//     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-red to-transparent opacity-50" />
//     <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
//       <div className="p-3 bg-brand-red/10 rounded-lg text-brand-red border border-brand-red/20 shadow-[0_0_15px_rgba(231,31,41,0.1)]">
//         {icon}
//       </div>
//       <h2 className="text-2xl font-display font-black uppercase italic tracking-tight">{title}</h2>
//     </div>
//     {children}
//   </motion.section>
// );

// const InputField = ({ label, ...props }: { label: string; [key: string]: any }) => (
//   <div className="space-y-2.5">
//     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">{label}</label>
//     <input 
//       {...props} 
//       className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm outline-none focus:border-brand-red focus:bg-black transition-all placeholder:text-white/10 font-medium" 
//     />
//   </div>
// );

// const FileUpload = ({ label }: { label: string }) => (
//   <div className="border-2 border-dashed border-white/5 rounded-xl p-8 text-center hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all cursor-pointer group">
//     <Upload size={20} className="mx-auto mb-3 text-white/10 group-hover:text-brand-red group-hover:scale-110 transition-all" />
//     <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60">{label}</span>
//   </div>
// );

// export default DealerApplication;





// import { motion } from 'framer-motion';
// import { useState, useRef } from 'react';
// import { 
//   FileText, Send, CheckCircle2, Upload, 
//   Globe, Building2, Package, ShieldCheck, MapPin, Briefcase, Plus
// } from 'lucide-react';

// const DealerApplication = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [isOnlineSeller, setIsOnlineSeller] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (submitted) {
//     return (
//       <div className="pt-40 pb-24 min-h-screen bg-[#05070a] flex items-center justify-center px-6 text-center">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-gradient-to-b from-navy-deep to-black border border-white/10 p-12 rounded-2xl shadow-2xl">
//           <CheckCircle2 size={64} className="mx-auto text-brand-blue mb-8" />
//           <h2 className="text-3xl font-display font-black italic uppercase mb-4 text-white">Application Received</h2>
//           <p className="text-white/60 mb-8 leading-relaxed">Thank you for applying. Our team will review your verification documents and contact you within 48 business hours.</p>
//           <button onClick={() => window.location.href = '/'} className="btn-primary w-full py-4 uppercase font-bold tracking-widest bg-brand-red text-white rounded shadow-lg">Back to Home</button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-32 pb-24 bg-[#05070a] min-h-screen text-white font-sans">
//       <div className="max-w-5xl mx-auto px-6">
        
//         {/* Header Section */}
//         <header className="text-center mb-16">
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/5 mb-6">
//             <ShieldCheck size={14} className="text-brand-red" />
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">Authorized Partner Program</span>
//           </motion.div>
//           <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase mb-6 tracking-tighter">
//             Become an Authorized <span className="text-brand-red">Torque Craft Dealer</span>
//           </h1>
//           <p className="text-white/60 uppercase tracking-[0.2em] text-[11px] font-bold max-w-2xl mx-auto leading-relaxed">
//             Apply to join the network and gain access to wholesale pricing, technical support, and performance engine hardware.
//           </p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-10">
          
//           {/* Contact Information */}
//           <FormSection icon={<FileText size={20} />} title="Contact Intelligence">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <InputField label="Contact Name" required type="text" placeholder="e.g. John Doe" />
//               <InputField label="Job Title" required type="text" placeholder="e.g. Shop Manager" />
//               <InputField label="Business Email" required type="email" placeholder="email@business.com" />
//               <InputField label="Phone Number" required type="tel" placeholder="+1 (555) 000-0000" />
//               <InputField label="WhatsApp Number (Optional)" type="tel" placeholder="+1 (555) 000-0000" />
//             </div>
//           </FormSection>

//           {/* Business Profile */}
//           <FormSection icon={<Briefcase size={20} />} title="Business Profile">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 <InputField label="Business Name" required placeholder="Legal Entity Name" />
//                 <div className="grid grid-cols-2 gap-4">
//                   <InputField label="Years Active" required type="number" placeholder="0" />
//                   <InputField label="Staff Count" required type="number" placeholder="0" />
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Primary Operations</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['Performance Shop', 'Engine Builder', 'Automotive Retail', 'Online Store', 'Parts Reseller'].map(type => (
//                     <label key={type} className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-lg hover:border-brand-red/40 transition-all cursor-pointer group">
//                       <input type="checkbox" className="w-4 h-4 accent-brand-red" />
//                       <span className="text-[10px] font-bold uppercase text-white/50 group-hover:text-white transition-colors">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </FormSection>

//           {/* Business Address */}
//           <FormSection icon={<MapPin size={20} />} title="Location Details">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-3"><InputField label="Street Address" required placeholder="123 Performance Way" /></div>
//               <InputField label="City" required placeholder="City Name" />
//               <InputField label="State / Province" required placeholder="State" />
//               <InputField label="Postal Code" required placeholder="Zip Code" />
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Country</label>
//                 <select required className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer hover:bg-black/80 transition-all">
//                   <option value="" className="text-white/20">Select Country</option>
//                   <option value="USA">United States</option>
//                   <option value="Canada">Canada</option>
//                   <option value="Australia">Australia</option>
//                   <option value="UK">United Kingdom</option>
//                 </select>
//               </div>
//             </div>
//           </FormSection>

//           {/* Business Verification (Fixed Upload) */}
//           <FormSection icon={<ShieldCheck size={20} />} title="Verification & Identity">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <InputField label="Registration Number" required placeholder="EIN / Registration #" />
//               <InputField label="Tax ID / VAT" required placeholder="Tax Identifier" />
//               <InputField label="Resale Permit" placeholder="Optional Number" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FileUpload label="Business License (PDF/JPG)" />
//               <FileUpload label="Resale Certificate" />
//               <FileUpload label="Facility Photo" />
//             </div>
//           </FormSection>

//           {/* Sales Channels */}
//           <FormSection icon={<Globe size={20} />} title="Market Strategy">
//             <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-xl mb-6">
//               <div>
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-white">E-Commerce Presence</h4>
//                 <p className="text-[10px] text-white/40 uppercase mt-1">Do you sell products via a digital storefront?</p>
//               </div>
//               <button 
//                 type="button"
//                 onClick={() => setIsOnlineSeller(!isOnlineSeller)}
//                 className={`w-16 h-8 rounded-full flex items-center px-1 transition-all duration-500 ${isOnlineSeller ? 'bg-brand-red' : 'bg-white/10'}`}
//               >
//                 <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${isOnlineSeller ? 'translate-x-8' : 'translate-x-0'}`} />
//               </button>
//             </div>

//             {isOnlineSeller && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 overflow-hidden">
//                 <InputField label="Website URL" placeholder="https://www.yourstore.com" />
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Target Marketplaces</label>
//                   <div className="flex flex-wrap gap-4">
//                     {['Amazon', 'eBay', 'Shopify', 'Direct Site'].map(p => (
//                       <label key={p} className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/50 hover:text-white cursor-pointer transition-colors">
//                         <input type="checkbox" className="w-3.5 h-3.5 accent-brand-red" /> {p}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </FormSection>

//           {/* Interests */}
//           <FormSection icon={<Package size={20} />} title="Product Logistics">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="space-y-6">
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Core Categories</label>
//                   {['Head Stud Kits', 'Main Stud Kits', 'Engine Fasteners'].map(cat => (
//                     <label key={cat} className="flex items-center gap-3 text-[11px] font-bold uppercase text-white/60 hover:text-white transition-colors cursor-pointer">
//                       <input type="checkbox" className="w-4 h-4 accent-brand-red" /> {cat}
//                     </label>
//                   ))}
//                 </div>
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Platforms Served</label>
//                   <div className="grid grid-cols-2 gap-2">
//                     {['Cummins', 'Powerstroke', 'Duramax', 'Toyota LC', 'Nissan Patrol', 'Subaru'].map(plat => (
//                       <label key={plat} className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors cursor-pointer">
//                         <input type="checkbox" className="w-3.5 h-3.5 accent-brand-red" /> {plat}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Anticipated Monthly Volume</label>
//                 <select required className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer hover:bg-black/80 transition-all">
//                   <option value="" className="text-white/20">Select Range</option>
//                   <option>$1,000 - $5,000</option>
//                   <option>$5,000 - $20,000</option>
//                   <option>$20,000+</option>
//                 </select>
//               </div>
//             </div>
//           </FormSection>

//           {/* Final Submission */}
//           <FormSection icon={<Plus size={20} />} title="Final Intelligence">
//             <div className="space-y-4">
//               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block ml-1">Business Description</label>
//               <textarea 
//                 className="w-full bg-black/60 border border-white/10 rounded-xl p-5 text-sm text-white placeholder:text-white/10 outline-none focus:border-brand-red min-h-[120px] transition-all"
//                 placeholder="Briefly describe your specialization and customer base..."
//               />
//             </div>
            
//             <div className="mt-8 space-y-4">
//               <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
//                 <input required type="checkbox" className="mt-1 accent-brand-red" />
//                 <span className="group-hover:text-white/60 transition-colors leading-tight">I certify that all information provided is accurate and verifiable.</span>
//               </label>
//               <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
//                 <input required type="checkbox" className="mt-1 accent-brand-red" />
//                 <span className="group-hover:text-white/60 transition-colors leading-tight">I agree to abide by the Torque Craft Authorized Dealer MAP and Sales policies.</span>
//               </label>
//             </div>

//             <button type="submit" className="w-full mt-10 py-6 bg-brand-red hover:bg-brand-red/90 text-white transition-all duration-300 rounded-sm flex items-center justify-center gap-4 text-xl font-display font-black italic uppercase tracking-tighter shadow-xl shadow-brand-red/20 group">
//               Execute Application <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//             </button>
//           </FormSection>

//         </form>
//       </div>
//     </div>
//   );
// };

// /* --- Reusable Helper Components --- */

// const FormSection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
//   <motion.section 
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl group hover:border-white/10 transition-all"
//   >
//     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-red to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
//     <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
//       <div className="p-2.5 bg-brand-red/10 rounded text-brand-red border border-brand-red/20 shadow-lg shadow-brand-red/5">
//         {icon}
//       </div>
//       <h2 className="text-xl md:text-2xl font-display font-black uppercase italic tracking-tight text-white">{title}</h2>
//     </div>
//     {children}
//   </motion.section>
// );

// const InputField = ({ label, ...props }: { label: string; [key: string]: any }) => (
//   <div className="space-y-2">
//     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">{label}</label>
//     <input 
//       {...props} 
//       className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red focus:bg-black transition-all placeholder:text-white/10 font-medium" 
//     />
//   </div>
// );

// const FileUpload = ({ label }: { label: string }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleClick = () => fileInputRef.current?.click();
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) setFileName(e.target.files[0].name);
//   };

//   return (
//     <div 
//       onClick={handleClick}
//       className="border-2 border-dashed border-white/5 rounded-xl p-6 text-center hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all cursor-pointer group relative overflow-hidden"
//     >
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         onChange={handleChange} 
//         className="hidden" 
//         accept=".pdf,.jpg,.jpeg,.png"
//       />
//       <Upload size={20} className={`mx-auto mb-2 transition-all ${fileName ? 'text-brand-red scale-110' : 'text-white/10 group-hover:text-brand-red'}`} />
//       <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 block truncate px-2">
//         {fileName ? fileName : label}
//       </span>
//       {fileName && (
//         <div className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full shadow-[0_0_5px_rgba(231,31,41,0.5)]" />
//       )}
//     </div>
//   );
// };

// export default DealerApplication;




import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  FileText, Send, CheckCircle2, Upload, 
  Globe, Building2, Package, ShieldCheck, MapPin, Briefcase, Plus
} from 'lucide-react';

const DealerApplication = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isOnlineSeller, setIsOnlineSeller] = useState(false);

  // Full list of 195+ countries for the searchable/dropdown requirement 
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
          <p className="text-white/60 mb-8 leading-relaxed">Thank you for applying. Our team will review your verification documents and contact you within 48 business hours.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full py-4 uppercase font-bold tracking-widest bg-brand-red text-white rounded shadow-lg">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#05070a] min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section [cite: 2] */}
        <header className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/5 mb-6">
            <ShieldCheck size={14} className="text-brand-red" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">Authorized Partner Program</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase mb-6 tracking-tighter">
            Become an Authorized <span className="text-brand-red">Torque Craft Dealer</span>
          </h1>
          <p className="text-white/60 uppercase tracking-[0.2em] text-[11px] font-bold max-w-2xl mx-auto leading-relaxed">
            Apply to join the network and gain access to wholesale pricing, technical support, and performance engine hardware.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Contact Information [cite: 3, 4] */}
          <FormSection icon={<FileText size={20} />} title="Contact Intelligence">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Contact Name" required type="text" placeholder="e.g. John Doe" />
              <InputField label="Job Title" required type="text" placeholder="e.g. Shop Manager" />
              <InputField label="Business Email" required type="email" placeholder="email@business.com" />
              <InputField label="Phone Number" required type="tel" placeholder="+1 (555) 000-0000" />
              <InputField label="WhatsApp Number (Optional)" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </FormSection>

          {/* Business Profile [cite: 5, 6, 8, 9] */}
          <FormSection icon={<Briefcase size={20} />} title="Business Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <InputField label="Business Name" required placeholder="Legal Entity Name" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Years Active" required type="number" placeholder="0" />
                  <InputField label="Staff Count" required type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Primary Operations</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Performance Shop', 'Engine Builder', 'Automotive Retail', 'Online Store', 'Parts Reseller'].map(type => (
                    <label key={type} className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-lg hover:border-brand-red/40 transition-all cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-brand-red" />
                      <span className="text-[10px] font-bold uppercase text-white/50 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Business Address [cite: 10, 11] */}
          <FormSection icon={<MapPin size={20} />} title="Location Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3"><InputField label="Street Address" required placeholder="123 Performance Way" /></div>
              <InputField label="City" required placeholder="City Name" />
              <InputField label="State / Province" required placeholder="State" />
              <InputField label="Postal Code" required placeholder="Zip Code" />
              
              {/* Updated Multi-Country Dropdown  */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Country</label>
                <select 
                  required 
                  className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer hover:bg-black/80 transition-all scrollbar-thin scrollbar-thumb-brand-red"
                >
                  <option value="" className="text-white/20">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-[#05070a] text-white">
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          {/* Business Verification [cite: 12, 13, 15, 16] */}
          <FormSection icon={<ShieldCheck size={20} />} title="Verification & Identity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <InputField label="Registration Number" required placeholder="EIN / Registration #" />
              <InputField label="Tax ID / VAT" required placeholder="Tax Identifier" />
              <InputField label="Resale Permit" placeholder="Optional Number" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUpload label="Business License (PDF/JPG)" />
              <FileUpload label="Resale Certificate" />
              <FileUpload label="Facility Photo" />
            </div>
          </FormSection>

          {/* Sales Channels [cite: 17, 18, 19, 20] */}
          <FormSection icon={<Globe size={20} />} title="Market Strategy">
            <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-xl mb-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">E-Commerce Presence</h4>
                <p className="text-[10px] text-white/40 uppercase mt-1">Do you sell products via a digital storefront?</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOnlineSeller(!isOnlineSeller)}
                className={`w-16 h-8 rounded-full flex items-center px-1 transition-all duration-500 ${isOnlineSeller ? 'bg-brand-red' : 'bg-white/10'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${isOnlineSeller ? 'translate-x-8' : 'translate-x-0'}`} />
              </button>
            </div>

            {isOnlineSeller && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 overflow-hidden">
                <InputField label="Website URL" placeholder="https://www.yourstore.com" />
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Target Marketplaces</label>
                  <div className="flex flex-wrap gap-4">
                    {['Amazon', 'eBay', 'Shopify', 'Direct Site'].map(p => (
                      <label key={p} className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/50 hover:text-white cursor-pointer transition-colors">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-brand-red" /> {p}
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </FormSection>

          {/* Interests [cite: 21, 22, 23, 24, 26, 27, 28, 30, 32, 33, 35, 36, 39, 41, 44, 45] */}
          <FormSection icon={<Package size={20} />} title="Product Logistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Core Categories</label>
                  {['Head Stud Kits', 'Main Stud Kits', 'Engine Fasteners'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 text-[11px] font-bold uppercase text-white/60 hover:text-white transition-colors cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-brand-red" /> {cat}
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red">Platforms Served</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cummins', 'Powerstroke', 'Duramax', 'Toyota LC', 'Nissan Patrol', 'Subaru'].map(plat => (
                      <label key={plat} className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-brand-red" /> {plat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Anticipated Monthly Volume</label>
                <select required className="w-full bg-black/60 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-brand-red appearance-none cursor-pointer hover:bg-black/80 transition-all">
                  <option value="" className="text-white/20">Select Range</option>
                  <option>$1,000 - $5,000</option>
                  <option>$5,000 - $20,000</option>
                  <option>$20,000+</option>
                </select>
              </div>
            </div>
          </FormSection>

          {/* Final Submission [cite: 50, 51, 52, 53, 54] */}
          <FormSection icon={<Plus size={20} />} title="Final Intelligence">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block ml-1">Business Description</label>
              <textarea 
                className="w-full bg-black/60 border border-white/10 rounded-xl p-5 text-sm text-white placeholder:text-white/10 outline-none focus:border-brand-red min-h-[120px] transition-all"
                placeholder="Briefly describe your specialization and customer base..."
              />
            </div>
            
            <div className="mt-8 space-y-4">
              <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
                <input required type="checkbox" className="mt-1 accent-brand-red" />
                <span className="group-hover:text-white/60 transition-colors leading-tight">I certify that all information provided is accurate and verifiable.</span>
              </label>
              <label className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 cursor-pointer group">
                <input required type="checkbox" className="mt-1 accent-brand-red" />
                <span className="group-hover:text-white/60 transition-colors leading-tight">I agree to abide by the Torque Craft Authorized Dealer MAP and Sales policies.</span>
              </label>
            </div>

            <button type="submit" className="w-full mt-10 py-6 bg-brand-red hover:bg-brand-red/90 text-white transition-all duration-300 rounded-sm flex items-center justify-center gap-4 text-xl font-display font-black italic uppercase tracking-tighter shadow-xl shadow-brand-red/20 group">
              Execute Application <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

export default DealerApplication;