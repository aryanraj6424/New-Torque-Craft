import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Globe, ArrowRight, CheckCircle2, Mail, Lock, UserPlus, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';

const Signup = () => {
  const [step, setStep] = useState<'choice' | 'form' | 'success'>('choice');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'dealer') {
      navigate('/dealer-application');
      return;
    }
    if (role === 'distributor') {
      navigate('/distributor-application');
      return;
    }
    setSelectedRole(role);
    setStep('form');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, selectedRole!);
      setStep('success');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter">
                  Join <span className="text-brand-red">Torque Craft</span>
                </h1>
                <p className="text-white/50 max-w-lg mx-auto uppercase text-[10px] font-bold tracking-[0.3em]">
                  Select your path to high-performance precision
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Card */}
                <button
                  onClick={() => handleRoleSelect('customer')}
                  className="metallic-card p-8 group hover:border-brand-blue/50 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <User className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic mb-2">Performance Enthusiast</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-8 flex-grow">
                    Access your private garage, track warranties, and get exclusive early access to new SKU drops.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue">
                    Create Account <ArrowRight size={14} />
                  </div>
                </button>

                {/* Dealer Card */}
                <button
                  onClick={() => handleRoleSelect('dealer')}
                  className="metallic-card p-8 group hover:border-brand-red/50 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="text-brand-red" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic mb-2">Authorized Dealer</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-8 flex-grow">
                    Join our network of elite shops. Get bulk pricing, priority shipping, and dealer-only support.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-red">
                    Apply Now <ArrowRight size={14} />
                  </div>
                </button>

                {/* Distributor Card */}
                <button
                  onClick={() => handleRoleSelect('distributor')}
                  className="metallic-card p-8 group hover:border-white/30 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="text-white/70" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic mb-2">Global Distributor</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-8 flex-grow">
                    Scale Torque Craft in your region. Large-scale logistics, global marketing assets, and direct HQ access.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/70">
                    Partner with Us <ArrowRight size={14} />
                  </div>
                </button>
              </div>

              <p className="text-center text-white/30 text-[10px] font-bold uppercase tracking-widest">
                Already have an account? <Link to="/login" className="text-brand-blue hover:underline">Login here</Link>
              </p>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="metallic-card p-10 space-y-8 border-brand-blue/20">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-display font-black italic uppercase">Create Account</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Enthusiast Access</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        required
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'} <UserPlus size={20} />
                  </button>
                </form>

                <button
                  onClick={() => setStep('choice')}
                  className="w-full text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="metallic-card p-12 space-y-8 border-brand-blue/30">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto border border-brand-blue/20">
                  <CheckCircle2 className="text-brand-blue" size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-black italic uppercase">Welcome Aboard</h2>
                  <p className="text-white/50 text-sm">Your enthusiast account has been created successfully.</p>
                </div>
                <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-xl text-left flex items-start gap-4">
                  <ShieldCheck className="text-brand-blue shrink-0" size={20} />
                  <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-wider">
                    You now have access to the Vehicle Garage and Warranty Registration systems.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-3"
                >
                  Go to Dashboard <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Signup;
