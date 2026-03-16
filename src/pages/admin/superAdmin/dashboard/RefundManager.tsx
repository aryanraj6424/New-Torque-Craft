// import React, { useState } from "react";
// import { GlassCard } from "../../ui/GlassCard";
// import { 
//   FileSearch, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Camera, 
//   ClipboardList, 
//   AlertCircle,
//   Activity,    // Added
//   Package,     // Added
//   RotateCcw
// } from "lucide-react";

// // --- Helper Mini Components ---
// const StatusTab = ({ label, count, active, onClick }: any) => (
//   <button 
//     onClick={onClick}
//     className={`px-4 py-2 rounded-sm whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
//       active 
//         ? "bg-brand-red text-white shadow-[0_0_15px_rgba(231,31,41,0.3)]" 
//         : "bg-white/5 text-slate-500 hover:bg-white/10"
//     }`}
//   >
//     {label} ({count})
//   </button>
// );

// const ValidationItem = ({ label, status, icon }: any) => (
//   <div className="flex items-center justify-between text-[11px] font-bold">
//     <div className="flex items-center gap-2 text-slate-400">
//       {icon} <span>{label}</span>
//     </div>
//     <span className="text-emerald-500 uppercase tracking-tighter">{status}</span>
//   </div>
// );

// // --- Main RefundSection Component ---
// const RefundSection = () => {
//   const [activeTab, setActiveTab] = useState("pending");

//   const refundRequests = [
//     {
//       caseId: "TC-WR-2026-000245",
//       customer: "Rahul Sharma",
//       sku: "ST-V8-PRO",
//       engine: "Audi V8 Bi-Turbo",
//       status: "Technical Validation",
//       date: "2026-03-15"
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Title Section */}
//       <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
//         <FileSearch className="text-brand-red" size={24} /> 
//         Refund & Warranty <span className="text-brand-red">Claims</span>
//       </h3>

//       {/* 1. Workflow Tabs (Client Requirement: Workflow Stages) */}
//       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//         <StatusTab label="Pending" count={12} active={activeTab === "pending"} onClick={() => setActiveTab("pending")} />
//         <StatusTab label="Technical Validation" count={5} active={activeTab === "validation"} onClick={() => setActiveTab("validation")} />
//         <StatusTab label="Approved" count={28} active={activeTab === "approved"} onClick={() => setActiveTab("approved")} />
//         <StatusTab label="Rejected" count={3} active={activeTab === "rejected"} onClick={() => setActiveTab("rejected")} />
//       </div>

//       {/* 2. Refund Requests List */}
//       <div className="space-y-4">
//         {refundRequests.map((request) => (
//           <GlassCard key={request.caseId} className="p-0 overflow-hidden border-white/5 bg-white/[0.01]">
//             {/* Header: Case ID & SKU */}
//             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
//               <div>
//                 <span className="text-[10px] font-black text-brand-red tracking-[0.2em] uppercase">Case ID: {request.caseId}</span>
//                 <h4 className="text-xl font-black text-white italic tracking-tighter">{request.sku} - {request.engine}</h4>
//               </div>
//               <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded text-[10px] font-black text-orange-500 uppercase tracking-widest">
//                 {request.status}
//               </div>
//             </div>

//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {/* Column 1: Technical Validation (Client Req 3) */}
//               <div className="space-y-4">
//                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Validation</h5>
//                 <ValidationItem label="Photo Evidence" status="Uploaded" icon={<Camera size={14}/>} />
//                 <ValidationItem label="Torque Sequence" status="Verified" icon={<ClipboardList size={14}/>} />
//                 <ValidationItem label="Boost Levels" status="1.5 Bar" icon={<Activity size={14}/>} />
//               </div>

//               {/* Column 2: Installation Details (Client Req 5) */}
//               <div className="space-y-4">
//                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Installation Details</h5>
//                 <div className="text-xs text-slate-300 space-y-2 font-bold">
//                   <p className="uppercase tracking-tighter">Workshop: <span className="text-white">Apex Performance Hub</span></p>
//                   <p className="uppercase tracking-tighter">Date: <span className="text-white">Jan 12, 2026</span></p>
//                   <p className="uppercase tracking-tighter">QR Serial: <span className="text-brand-red underline">TC-789-XQ</span></p>
//                 </div>
//               </div>

//               {/* Column 3: Decision Actions (Client Req 4: Outcome Types) */}
//               <div className="flex flex-col justify-center gap-3">
//                 <button className="w-full py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
//                   <CheckCircle2 size={14} /> Approved Refund
//                 </button>
//                 <button className="w-full py-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-red-500 transition-all flex items-center justify-center gap-2">
//                   <Package size={14} /> Replacement Approved
//                 </button>
//                 <button className="w-full py-3 bg-transparent border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
//                   <XCircle size={14} /> Claim Rejected
//                 </button>
//               </div>
//             </div>
//           </GlassCard>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RefundSection;




import React, { useState } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { 
  FileSearch, CheckCircle2, XCircle, Clock, 
  Camera, ClipboardList, AlertCircle,
  Activity, Package, RotateCcw, ShieldCheck, UserCheck, Search
} from "lucide-react";

// --- 1. Workflow Step Indicator Component ---
const WorkflowProgress = ({ currentStatus }: { currentStatus: string }) => {
  const steps = [
    "Customer Request",
    "Dealer Review",
    "Distributor Verification",
    "Technical Validation",
    "Super Admin Decision",
    "Processed"
  ];

  const currentStepIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between w-full mb-8 px-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center relative group">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              index <= currentStepIndex 
                ? "bg-brand-red border-brand-red shadow-[0_0_10px_rgba(231,31,41,0.4)]" 
                : "bg-black/40 border-white/10"
            }`}>
              {index < currentStepIndex ? <CheckCircle2 size={12} className="text-white" /> : <div className={`w-1.5 h-1.5 rounded-full ${index === currentStepIndex ? "bg-white animate-pulse" : "bg-white/20"}`} />}
            </div>
            <span className={`absolute -bottom-6 whitespace-nowrap text-[7px] font-black uppercase tracking-tighter ${
              index <= currentStepIndex ? "text-white" : "text-slate-600"
            }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-[1px] mx-2 transition-all duration-700 ${
              index < currentStepIndex ? "bg-brand-red" : "bg-white/5"
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Helper Components ---
const StatusTab = ({ label, count, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-sm whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
      active ? "bg-brand-red text-white shadow-[0_0_15px_rgba(231,31,41,0.3)]" : "bg-white/5 text-slate-500 hover:bg-white/10"
    }`}
  >
    {label} ({count})
  </button>
);

const ValidationItem = ({ label, status, icon, verified }: any) => (
  <div className="flex items-center justify-between text-[11px] font-bold">
    <div className="flex items-center gap-2 text-slate-400">
      {icon} <span>{label}</span>
    </div>
    <span className={`${verified ? "text-emerald-500" : "text-orange-500"} uppercase tracking-tighter`}>{status}</span>
  </div>
);

// --- Main RefundSection Component ---
const RefundSection = () => {
  const [activeTab, setActiveTab] = useState("Technical Validation");

  const refundRequests = [
    {
      caseId: "TC-WR-2026-000245",
      customer: "Rahul Sharma",
      sku: "ST-V8-PRO",
      engine: "Audi V8 Bi-Turbo",
      status: "Technical Validation", // Matches current workflow step
      date: "2026-03-15",
      workshop: "Apex Performance Hub"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Title */}
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
            <RotateCcw className="text-brand-red" size={24} /> 
            Refund <span className="text-brand-red">Workflow</span>
          </h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Super Admin Approval Interface</p>
        </div>
      </div>

      {/* 1. Workflow Tabs (Filter by Step) */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
        <StatusTab label="All Requests" count={45} active={activeTab === "All"} onClick={() => setActiveTab("All")} />
        <StatusTab label="Dealer Review" count={12} active={activeTab === "Dealer Review"} onClick={() => setActiveTab("Dealer Review")} />
        <StatusTab label="Distributor Verify" count={8} active={activeTab === "Distributor Verification"} onClick={() => setActiveTab("Distributor Verification")} />
        <StatusTab label="Tech Validation" count={5} active={activeTab === "Technical Validation"} onClick={() => setActiveTab("Technical Validation")} />
        <StatusTab label="Final Decision" count={2} active={activeTab === "Super Admin Decision"} onClick={() => setActiveTab("Super Admin Decision")} />
      </div>

      {/* 2. List of Requests */}
      <div className="space-y-6">
        {refundRequests.map((request) => (
          <GlassCard key={request.caseId} className="p-0 overflow-hidden border-white/5 bg-white/[0.01] hover:border-brand-red/20 transition-all duration-500">
            
            {/* Header with Progress Bar */}
            <div className="p-8 pb-12 bg-white/[0.02]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <span className="text-[10px] font-black text-brand-red tracking-[0.3em] uppercase underline underline-offset-4">Case {request.caseId}</span>
                  <h4 className="text-2xl font-black text-white italic tracking-tighter mt-2">{request.sku}</h4>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full">
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{request.status}</span>
                </div>
              </div>
              
              <WorkflowProgress currentStatus={request.status} />
            </div>

            {/* Detailed Info Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5">
              
              {/* Step 4: Technical Validation Details */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} className="text-brand-red" /> Technical Validation
                </h5>
                <div className="space-y-3 bg-white/5 p-4 rounded-sm border border-white/5">
                  <ValidationItem label="Damaged Stud Photos" status="Uploaded" icon={<Camera size={14}/>} verified={true} />
                  <ValidationItem label="Torque Sequence" status="Verified" icon={<ClipboardList size={14}/>} verified={true} />
                  <ValidationItem label="Installation Invoice" status="Verified" icon={<UserCheck size={14}/>} verified={true} />
                  <ValidationItem label="Engine Model (V8)" status="Confirmed" icon={<Activity size={14}/>} verified={true} />
                </div>
              </div>

              {/* Step 3: Distributor/Workshop Details */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Search size={14} className="text-brand-red" /> Verification Info
                </h5>
                <div className="text-[11px] text-slate-300 space-y-3 font-bold bg-white/5 p-4 rounded-sm border border-white/5">
                  <p className="flex justify-between">WORKSHOP: <span className="text-white">{request.workshop}</span></p>
                  <p className="flex justify-between">ENGINE MODEL: <span className="text-white">{request.engine}</span></p>
                  <p className="flex justify-between">QR SERIAL: <span className="text-brand-red">TC-789-XQ-2026</span></p>
                  <p className="flex justify-between">BOOST LEVEL: <span className="text-white">1.8 BAR</span></p>
                </div>
              </div>

              {/* Step 5: Final Decision Actions */}
              <div className="flex flex-col justify-center gap-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 text-center">Final Decision (Super Admin)</h5>
                <button className="w-full py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} /> Refund Money
                </button>
                <button className="w-full py-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2">
                  <Package size={14} /> Send Replacement
                </button>
                <button className="w-full py-3 bg-transparent border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                  <XCircle size={14} /> Reject Claim
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default RefundSection;