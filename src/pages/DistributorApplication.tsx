import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const DistributorApplication = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="metallic-card p-12 max-w-md border-glow-blue">
          <CheckCircle2 size={64} className="mx-auto text-brand-blue mb-8" />
          <h2 className="text-3xl font-display font-black italic uppercase mb-4">Application Received</h2>
          <p className="text-white/60 mb-8">Thank you for your interest in becoming a Torque Craft Distributor. Our corporate team will review your credentials and contact you shortly.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-navy-deep">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black italic uppercase mb-4">Distributor <span className="text-brand-blue">Application</span></h1>
          <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Global Logistics & Distribution Partnership</p>
        </div>

        <div className="metallic-card p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Company Name</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Region / Territory</label>
                <input required type="text" placeholder="e.g. North America, EU, Australia" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Primary Contact</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Corporate Email</label>
                <input required type="email" className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Distribution Capabilities</label>
              <textarea required placeholder="Describe your warehouse capacity, dealer network, and logistics reach..." className="w-full bg-black/50 border border-white/10 rounded p-4 text-sm outline-none focus:border-brand-blue min-h-[150px]" />
            </div>

            <div className="p-6 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-brand-blue" size={20} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Distributor Requirements</h3>
              </div>
              <ul className="space-y-2 text-xs text-white/40">
                <li>• Must maintain significant inventory levels for immediate fulfillment.</li>
                <li>• Proven track record in automotive parts distribution.</li>
                <li>• Ability to provide technical support to sub-dealers in your region.</li>
              </ul>
            </div>

            <button type="submit" className="btn-primary bg-brand-blue hover:bg-blue-700 w-full py-4 flex items-center justify-center gap-3">
              Submit Corporate Application <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DistributorApplication;
