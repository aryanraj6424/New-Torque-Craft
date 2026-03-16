// import React from 'react';
// import { GlassCard, Badge, GlowText } from '../ui/GlassCard';
// import { 
//   UserCircle, 
//   MapPin, 
//   Phone, 
//   Mail, 
//   ShieldCheck, 
//   Package, 
//   Truck, 
//   Network, 
//   History, 
//   RotateCcw, 
//   ArrowRight, 
//   ChevronRight 
// } from 'lucide-react';
// import { motion } from 'motion/react';

// interface ProfileSectionProps {
//   title: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }

// const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => (
//   <div className="space-y-4">
//     <div className="flex items-center gap-2 pb-2 border-b border-white/5">
//       <div className="text-cyan-400">{icon}</div>
//       <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</h5>
//     </div>
//     <div className="space-y-3">
//       {children}
//     </div>
//   </div>
// );

// const InfoRow: React.FC<{ label: string; value: string; icon?: React.ReactNode }> = ({ label, value, icon }) => (
//   <div className="flex items-center justify-between group">
//     <div className="flex items-center gap-2">
//       {icon && <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">{icon}</div>}
//       <span className="text-xs text-slate-400">{label}</span>
//     </div>
//     <span className="text-sm font-semibold text-white">{value}</span>
//   </div>
// );

// export const CustomerProfile: React.FC = () => {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       {/* Platform Hierarchy Visualization */}
//       <GlassCard className="bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 border-cyan-500/20">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
//           <div className="flex flex-col items-center gap-2">
//             <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
//               <ShieldCheck size={24} />
//             </div>
//             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Super Admin</p>
//           </div>
          
//           <ChevronRight className="text-slate-700 hidden md:block" />
          
//           <div className="flex flex-col items-center gap-2">
//             <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
//               <Network size={24} />
//             </div>
//             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Distributor</p>
//           </div>

//           <ChevronRight className="text-slate-700 hidden md:block" />

//           <div className="flex flex-col items-center gap-2">
//             <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
//               <Truck size={24} />
//             </div>
//             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Dealer</p>
//           </div>

//           <ChevronRight className="text-slate-700 hidden md:block" />

//           <div className="flex flex-col items-center gap-2">
//             <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
//               <UserCircle size={24} />
//             </div>
//             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Customer</p>
//           </div>
//         </div>
//       </GlassCard>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column: Customer Info */}
//         <div className="lg:col-span-1 space-y-8">
//           <GlassCard className="text-center">
//             <div className="relative inline-block mb-6">
//               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
//                 <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden border-2 border-slate-900">
//                   <img src="https://picsum.photos/seed/customer1/200/200" alt="Customer" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//               <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
//                 <ShieldCheck size={14} className="text-white" />
//               </div>
//             </div>
//             <h3 className="text-xl font-bold text-white">Alex Rivera</h3>
//             <p className="text-sm text-cyan-400 font-mono mt-1">ID: CUST-8429-X</p>
            
//             <div className="mt-8 space-y-4 text-left">
//               <ProfileSection title="Contact Information" icon={<UserCircle size={16} />}>
//                 <InfoRow label="Phone" value="+1 (555) 012-3456" icon={<Phone size={14} />} />
//                 <InfoRow label="Email" value="alex.rivera@example.com" icon={<Mail size={14} />} />
//                 <InfoRow label="Location" value="New York, NY" icon={<MapPin size={14} />} />
//               </ProfileSection>
              
//               <ProfileSection title="Warranty Status" icon={<ShieldCheck size={16} />}>
//                 <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active</span>
//                     <span className="text-[10px] text-slate-500">Expires: Mar 2027</span>
//                   </div>
//                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                     <div className="h-full bg-emerald-500 w-3/4 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
//                   </div>
//                 </div>
//               </ProfileSection>
//             </div>
//           </GlassCard>
//         </div>

//         {/* Right Column: Supply Chain & History */}
//         <div className="lg:col-span-2 space-y-8">
//           <GlassCard>
//             <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
//               <Network size={20} className="text-cyan-400" />
//               Supply Chain Traceability
//             </h4>
            
//             <div className="relative space-y-8 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-purple-500 before:opacity-20">
//               {/* Distributor */}
//               <div className="relative flex items-start gap-6 pl-1">
//                 <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 z-10 shrink-0">
//                   <Network size={24} />
//                 </div>
//                 <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Distributor</p>
//                       <p className="text-base font-bold text-white">Global Logistics Hub</p>
//                     </div>
//                     <Badge variant="info">HQ Verified</Badge>
//                   </div>
//                   <div className="flex gap-6 mt-4">
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Batch ID</p>
//                       <p className="text-xs font-mono text-white">B-942-X</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Supply Date</p>
//                       <p className="text-xs font-mono text-white">Jan 12, 2026</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dealer */}
//               <div className="relative flex items-start gap-6 pl-1">
//                 <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 z-10 shrink-0">
//                   <Truck size={24} />
//                 </div>
//                 <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Dealer</p>
//                       <p className="text-base font-bold text-white">CyberTech Solutions</p>
//                     </div>
//                     <Badge variant="info">New York Branch</Badge>
//                   </div>
//                   <div className="flex gap-6 mt-4">
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Order ID</p>
//                       <p className="text-xs font-mono text-white">ORD-4281-Z</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Purchase Date</p>
//                       <p className="text-xs font-mono text-white">Feb 04, 2026</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Product */}
//               <div className="relative flex items-start gap-6 pl-1">
//                 <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 z-10 shrink-0">
//                   <Package size={24} />
//                 </div>
//                 <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Product Details</p>
//                       <p className="text-base font-bold text-white">CyberCore X1 Processor</p>
//                     </div>
//                     <Badge variant="success">Authentic</Badge>
//                   </div>
//                   <div className="flex gap-6 mt-4">
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Serial Number</p>
//                       <p className="text-xs font-mono text-cyan-400">SN-4829-1029-X</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Model</p>
//                       <p className="text-xs font-mono text-white">CX1-PRO-2026</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </GlassCard>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <GlassCard>
//               <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
//                 <History size={16} className="text-cyan-400" />
//                 Order History
//               </h4>
//               <div className="space-y-4">
//                 {[
//                   { date: 'Feb 04, 2026', item: 'CyberCore X1', status: 'Delivered' },
//                   { date: 'Jan 15, 2026', item: 'NeoLink v4', status: 'Delivered' },
//                 ].map((order, i) => (
//                   <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
//                     <div>
//                       <p className="text-xs font-bold text-white">{order.item}</p>
//                       <p className="text-[10px] text-slate-500">{order.date}</p>
//                     </div>
//                     <Badge variant="success">{order.status}</Badge>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>

//             <GlassCard>
//               <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
//                 <RotateCcw size={16} className="text-cyan-400" />
//                 Refund History
//               </h4>
//               <div className="space-y-4">
//                 {[
//                   { date: 'Dec 12, 2025', item: 'Old Gen Processor', status: 'Completed', amount: '$420.00' },
//                 ].map((refund, i) => (
//                   <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
//                     <div>
//                       <p className="text-xs font-bold text-white">{refund.item}</p>
//                       <p className="text-[10px] text-slate-500">{refund.date} • {refund.amount}</p>
//                     </div>
//                     <Badge variant="success">{refund.status}</Badge>
//                   </div>
//                 ))}
//                 {/* Empty state if no recent refunds */}
//                 <div className="flex flex-col items-center justify-center py-4 opacity-30">
//                   <RotateCcw size={24} className="text-slate-500 mb-2" />
//                   <p className="text-[10px] font-bold uppercase tracking-widest">No Active Requests</p>
//                 </div>
//               </div>
//             </GlassCard>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
