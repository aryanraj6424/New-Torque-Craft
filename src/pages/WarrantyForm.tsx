import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWarranty } from '../context/WarrantyContext';
import { ShieldCheck, Calendar, Hash, User, Mail, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const WarrantyForm = () => {
  const { registerWarranty } = useWarranty();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    sku: '',
    purchaseDate: '',
    invoiceNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newWarranty = {
      id: `W-${Date.now()}`,
      ...formData,
      status: 'Pending Verification' as const, // Default status for Admin review
    };

    registerWarranty(newWarranty);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-[#0A0A0A] border border-white/5 p-12 max-w-md rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden"
        >
          {/* Success Glow Effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-[80px]" />
          
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
            <CheckCircle2 className="text-green-500" size={40} />
          </div>
          
          <h2 className="text-3xl font-display font-black italic uppercase text-white mb-4">
            Activation <span className="text-brand-red">Pending</span>
          </h2>
          
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Aapki warranty registration details receive ho gayi hain. Humara team invoice verify karke status "Active" kar dega.
          </p>
          
          <div className="flex flex-col gap-4">
            <Link 
              to="/warranty-dashboard" 
              className="w-full bg-brand-red py-4 rounded-xl font-bold uppercase text-white tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-[0_10px_20px_rgba(227,30,36,0.2)]"
            >
              Go to My Garage
            </Link>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              Register Another Component
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 bg-[#050505] min-h-screen px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="text-brand-red text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Product Authentication</span>
            <h1 className="text-5xl md:text-7xl font-black font-display italic uppercase tracking-tighter text-white mb-6">
              Warranty <span className="text-brand-red">Registration</span>
            </h1>
            <p className="text-white/40 text-xs uppercase tracking-widest">Secure your Torque Craft hardware and track service history</p>
          </motion.div>
        </div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Customer Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                <User size={12} className="text-brand-red" /> Customer Name
              </label>
              <input 
                required 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-brand-red outline-none transition-all placeholder:text-white/10"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                <Mail size={12} className="text-brand-red" /> Email Address
              </label>
              <input 
                required 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-brand-red outline-none transition-all placeholder:text-white/10"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* SKU Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                <Hash size={12} className="text-brand-red" /> Product SKU
              </label>
              <input 
                required 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-brand-red outline-none transition-all font-mono placeholder:text-white/10 uppercase"
                placeholder="TC-HP-001"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
            </div>

            {/* Purchase Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                <Calendar size={12} className="text-brand-red" /> Purchase Date
              </label>
              <input 
                required 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-brand-red outline-none transition-all color-scheme-dark"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
              />
            </div>
          </div>

          {/* Invoice Number */}
          <div className="space-y-2 mb-10">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FileText size={12} className="text-brand-red" /> Invoice Number / Receipt ID
            </label>
            <input 
              required 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-brand-red outline-none transition-all font-mono placeholder:text-white/10"
              placeholder="INV-XXXXX"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-red hover:bg-red-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 group shadow-[0_15px_30px_rgba(227,30,36,0.15)] hover:-translate-y-1"
          >
            Register Warranty <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[9px] text-white/20 text-center mt-6 uppercase tracking-widest">
            By registering, you agree to Torque Craft's warranty terms and conditions.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default WarrantyForm;