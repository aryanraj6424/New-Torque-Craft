// import { useState } from 'react';
// import { useAuth, UserRole } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LogIn, ShieldCheck, Activity, Users, Key, Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

// const Login = () => {
//   const [step, setStep] = useState<'role' | 'credentials' | 'mfa' | 'otp' | 'forgot'>('role');
//   const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [code, setCode] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const { login, verifyMFA, verifyOTP } = useAuth();
//   const navigate = useNavigate();

//   const handleRoleSelect = (role: UserRole) => {
//     setSelectedRole(role);
//     setStep('credentials');
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Simulate credential check
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (selectedRole === 'superadmin' || selectedRole === 'admin') {
//         setStep('mfa');
//       } else if (selectedRole === 'dealer' || selectedRole === 'distributor') {
//         setStep('otp');
//       } else {
//         await login(email, 'customer');
//         navigate('/');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyMFA = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (await verifyMFA(code)) {
//       await login(email, selectedRole);
//       navigate(selectedRole === 'superadmin' ? '/super-admin' : '/admin');
//     } else {
//       setError('Invalid MFA code. Use 123456 for demo.');
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (await verifyOTP(code)) {
//       await login(email, selectedRole);
//       navigate('/admin'); // Business portal
//     } else {
//       setError('Invalid OTP. Use 654321 for demo.');
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate sending reset link or OTP
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setSuccessMessage(selectedRole === 'dealer' || selectedRole === 'distributor' 
//       ? 'A 6-digit OTP has been sent to your registered business email.' 
//       : 'A secure reset link has been sent to your authorized email.');
//     setIsLoading(false);
//   };

//   return (
//     <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="metallic-card p-10 w-full max-w-md relative overflow-hidden"
//       >
//         <AnimatePresence mode="wait">
//           {step === 'role' && (
//             <motion.div 
//               key="role"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-8"
//             >
//               <div className="text-center">
//                 <h1 className="text-3xl font-display font-black italic uppercase mb-2">Access Portal</h1>
//                 <p className="text-white/50 text-sm">Select your account type to continue.</p>
//               </div>
//               <div className="grid grid-cols-1 gap-4">
//                 <button onClick={() => handleRoleSelect('customer')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-blue transition-all group">
//                   <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-navy-deep transition-all">
//                     <Users size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Customer Account</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Shop & Warranty Registration</p>
//                   </div>
//                 </button>
//                 <button onClick={() => handleRoleSelect('dealer')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-red transition-all group">
//                   <div className="p-3 rounded-lg bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
//                     <ShieldCheck size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Business Partner</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Dealers & Distributors</p>
//                   </div>
//                 </button>
//                 <button onClick={() => handleRoleSelect('admin')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/40 transition-all group">
//                   <div className="p-3 rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all">
//                     <Activity size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Internal Control</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin & HQ Management</p>
//                   </div>
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {step === 'credentials' && (
//             <motion.div 
//               key="credentials"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <button onClick={() => setStep('role')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
//                 <ArrowLeft size={14} /> Back
//               </button>
//               <div className="text-center">
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">
//                   {selectedRole === 'customer' ? 'Customer Login' : selectedRole === 'admin' ? 'Admin Access' : 'Partner Portal'}
//                 </h2>
//                 <p className="text-white/50 text-sm">Enter your secure credentials.</p>
//               </div>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</label>
//                   <input 
//                     type="email" 
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Password</label>
//                   <input 
//                     type="password" 
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 {error && <p className="text-brand-red text-xs font-bold uppercase tracking-widest">{error}</p>}
//                 <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                   {isLoading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />} Sign In
//                 </button>
//                 <button type="button" onClick={() => setStep('forgot')} className="w-full text-center text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">
//                   Forgot Password?
//                 </button>
//               </form>
//             </motion.div>
//           )}

//           {(step === 'mfa' || step === 'otp') && (
//             <motion.div 
//               key="verification"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <div className="text-center">
//                 <div className="inline-block p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 mb-6">
//                   <Key size={32} className="text-brand-red" />
//                 </div>
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">
//                   {step === 'mfa' ? 'MFA Verification' : 'OTP Verification'}
//                 </h2>
//                 <p className="text-white/50 text-sm">
//                   {step === 'mfa' 
//                     ? 'Enter the code from your authenticator app.' 
//                     : 'Enter the 6-digit code sent to your business email.'}
//                 </p>
//               </div>
//               <form onSubmit={step === 'mfa' ? handleVerifyMFA : handleVerifyOTP} className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Verification Code</label>
//                   <input 
//                     type="text" 
//                     required
//                     maxLength={6}
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     placeholder="000000"
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-4 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 {error && <p className="text-brand-red text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
//                 <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                   {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
//                 </button>
//               </form>
//             </motion.div>
//           )}

//           {step === 'forgot' && (
//             <motion.div 
//               key="forgot"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <button onClick={() => setStep('credentials')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
//                 <ArrowLeft size={14} /> Back to Login
//               </button>
//               <div className="text-center">
//                 <div className="inline-block p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 mb-6">
//                   <Mail size={32} className="text-brand-blue" />
//                 </div>
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">Reset Password</h2>
//                 <p className="text-white/50 text-sm">Enter your email to receive a reset link or OTP.</p>
//               </div>
//               {successMessage ? (
//                 <div className="p-6 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-center space-y-4">
//                   <CheckCircle2 size={40} className="text-brand-blue mx-auto" />
//                   <p className="text-sm text-white/80">{successMessage}</p>
//                   <button onClick={() => setStep('credentials')} className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">
//                     Back to Login
//                   </button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleForgotPassword} className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</label>
//                     <input 
//                       type="email" 
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                     />
//                   </div>
//                   <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                     {isLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Instructions'}
//                   </button>
//                 </form>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <div className="mt-8 pt-6 border-t border-white/5 text-center">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
//             Don't have an account? <Link to="/signup" className="text-brand-blue hover:underline">Join Torque Craft</Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;















// import { useState } from 'react';
// import { useAuth, UserRole } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LogIn, ShieldCheck, Activity, Users, Key, Mail, ArrowLeft, Loader2, CheckCircle2, Truck } from 'lucide-react';

// const Login = () => {
//   const [step, setStep] = useState<'role' | 'credentials' | 'mfa' | 'otp' | 'forgot'>('role');
//   const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [code, setCode] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const { login, verifyMFA, verifyOTP } = useAuth();
//   const navigate = useNavigate();

//   const handleRoleSelect = (role: UserRole) => {
//     setSelectedRole(role);
//     setStep('credentials');
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Simulate credential check
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (selectedRole === 'superadmin' || selectedRole === 'admin') {
//         setStep('mfa');
//       } else if (selectedRole === 'dealer' || selectedRole === 'distributor') {
//         setStep('otp');
//       } else {
//         await login(email, 'customer');
//         navigate('/');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleVerifyMFA = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setIsLoading(true);
//   //   if (await verifyMFA(code)) {
//   //     await login(email, selectedRole);
//   //     navigate(selectedRole === 'superadmin' ? '/super-admin' : '/admin');
//   //   } else {
//   //     setError('Invalid MFA code. Use 123456 for demo.');
//   //     setIsLoading(false);
//   //   }
//   // };



//   //updated code 
//   const handleVerifyMFA = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError(null); // Purane errors clear karein

//   try {
//     const isValid = await verifyMFA(code);
    
//     if (isValid) {
//       // 1. Login function ko email aur 'super_admin' (with underscore) bhejein
//       await login(email, selectedRole);

//       // 2. Navigation Logic: 
//       // Agar aapka Dashboard component ek hi route '/admin' par hai, 
//       // toh direct wahan bhejein. Dashboard khud role ke hisaab se UI change kar lega.
//       // Agar aapne alag route banaya hai '/super-admin' ke liye, toh use hi rakhein.
      
//       const targetPath = selectedRole === 'super_admin' ? '/admin' : '/admin'; 
//       navigate(targetPath);
      
//     } else {
//       setError('Invalid MFA code. Use 123456 for demo.');
//     }
//   } catch (err) {
//     setError('Verification failed. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (await verifyOTP(code)) {
//       await login(email, selectedRole);
//       navigate('/admin'); // Business portal
//     } else {
//       setError('Invalid OTP. Use 654321 for demo.');
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate sending reset link or OTP
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setSuccessMessage(selectedRole === 'dealer' || selectedRole === 'distributor' 
//       ? 'A 6-digit OTP has been sent to your registered business email.' 
//       : 'A secure reset link has been sent to your authorized email.');
//     setIsLoading(false);
//   };

//   return (
//     <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="metallic-card p-10 w-full max-w-md relative overflow-hidden"
//       >
//         <AnimatePresence mode="wait">
//           {step === 'role' && (
//             <motion.div 
//               key="role"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-8"
//             >
//               <div className="text-center">
//                 <h1 className="text-3xl font-display font-black italic uppercase mb-2">Access Portal</h1>
//                 <p className="text-white/50 text-sm">Select your account type to continue.</p>
//               </div>
//               {/* Added a max-height and scroll for better mobile/small screen view now that there are more buttons */}
//               <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
//                 <button onClick={() => handleRoleSelect('customer')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-blue transition-all group">
//                   <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-navy-deep transition-all">
//                     <Users size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Customer Account</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Shop & Warranty Registration</p>
//                   </div>
//                 </button>

//                 {/* Dealer Button */}
//                 <button onClick={() => handleRoleSelect('dealer')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-red transition-all group">
//                   <div className="p-3 rounded-lg bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
//                     <ShieldCheck size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Authorized Dealer</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Retail & Service Partner</p>
//                   </div>
//                 </button>

//                 {/* Distributor Button (Newly Added) */}
//                 <button onClick={() => handleRoleSelect('distributor')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500 transition-all group">
//                   <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
//                     <Truck size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Regional Distributor</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Wholesale & Bulk Supply</p>
//                   </div>
//                 </button>

//                 <button onClick={() => handleRoleSelect('admin')} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/40 transition-all group">
//                   <div className="p-3 rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all">
//                     <Activity size={24} />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold uppercase text-sm">Internal Control</h3>
//                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin & HQ Management</p>
//                   </div>
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {step === 'credentials' && (
//             <motion.div 
//               key="credentials"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <button onClick={() => setStep('role')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
//                 <ArrowLeft size={14} /> Back
//               </button>
//               <div className="text-center">
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">
//                   {selectedRole === 'customer' ? 'Customer Login' : 
//                    selectedRole === 'admin' ? 'Admin Access' : 
//                    selectedRole === 'distributor' ? 'Distributor Portal' : 'Partner Portal'}
//                 </h2>
//                 <p className="text-white/50 text-sm">Enter your secure credentials.</p>
//               </div>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</label>
//                   <input 
//                     type="email" 
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Password</label>
//                   <input 
//                     type="password" 
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 {error && <p className="text-brand-red text-xs font-bold uppercase tracking-widest">{error}</p>}
//                 <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                   {isLoading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />} Sign In
//                 </button>
//                 <button type="button" onClick={() => setStep('forgot')} className="w-full text-center text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">
//                   Forgot Password?
//                 </button>
//               </form>
//             </motion.div>
//           )}

//           {(step === 'mfa' || step === 'otp') && (
//             <motion.div 
//               key="verification"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <div className="text-center">
//                 <div className="inline-block p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 mb-6">
//                   <Key size={32} className="text-brand-red" />
//                 </div>
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">
//                   {step === 'mfa' ? 'MFA Verification' : 'OTP Verification'}
//                 </h2>
//                 <p className="text-white/50 text-sm">
//                   {step === 'mfa' 
//                     ? 'Enter the code from your authenticator app.' 
//                     : 'Enter the 6-digit code sent to your business email.'}
//                 </p>
//               </div>
//               <form onSubmit={step === 'mfa' ? handleVerifyMFA : handleVerifyOTP} className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Verification Code</label>
//                   <input 
//                     type="text" 
//                     required
//                     maxLength={6}
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     placeholder="000000"
//                     className="w-full bg-black/50 border border-white/10 rounded-lg py-4 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-brand-red transition-all"
//                   />
//                 </div>
//                 {error && <p className="text-brand-red text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
//                 <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                   {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
//                 </button>
//               </form>
//             </motion.div>
//           )}

//           {step === 'forgot' && (
//             <motion.div 
//               key="forgot"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-6"
//             >
//               <button onClick={() => setStep('credentials')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
//                 <ArrowLeft size={14} /> Back to Login
//               </button>
//               <div className="text-center">
//                 <div className="inline-block p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 mb-6">
//                   <Mail size={32} className="text-brand-blue" />
//                 </div>
//                 <h2 className="text-2xl font-display font-black italic uppercase mb-2">Reset Password</h2>
//                 <p className="text-white/50 text-sm">Enter your email to receive a reset link or OTP.</p>
//               </div>
//               {successMessage ? (
//                 <div className="p-6 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-center space-y-4">
//                   <CheckCircle2 size={40} className="text-brand-blue mx-auto" />
//                   <p className="text-sm text-white/80">{successMessage}</p>
//                   <button onClick={() => setStep('credentials')} className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">
//                     Back to Login
//                   </button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleForgotPassword} className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</label>
//                     <input 
//                       type="email" 
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-brand-red transition-all"
//                     />
//                   </div>
//                   <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
//                     {isLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Instructions'}
//                   </button>
//                 </form>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <div className="mt-8 pt-6 border-t border-white/5 text-center">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
//             Don't have an account? <Link to="/signup" className="text-brand-blue hover:underline">Join Torque Craft</Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, ShieldCheck, Activity, Users, Key, 
  Mail, ArrowLeft, Loader2, CheckCircle2, Truck, Lock 
} from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState<'role' | 'credentials' | 'mfa' | 'otp' | 'forgot'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { login, verifyMFA, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('credentials');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin roles require MFA for high-level security
      if (selectedRole === 'super_admin' || selectedRole === 'admin') {
        setStep('mfa');
      } else if (selectedRole === 'dealer' || selectedRole === 'distributor') {
        setStep('otp');
      } else {
        await login(email, 'customer');
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const isValid = await verifyMFA(code);
      
      if (isValid) {
        // Step 1: Login with the correct admin role
        await login(email, selectedRole);

        // Step 2: Route to the Master Dashboard (SuperAdminUI.tsx)
        // Ensure your Route for '/admin' points to SuperAdminUI component
        navigate('/admin');
        
      } else {
        setError('Invalid MFA code. Use 123456 for demo.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (await verifyOTP(code)) {
        await login(email, selectedRole);
        // Dealers/Distributors also go to business dashboard
        navigate('/admin'); 
      } else {
        setError('Invalid OTP. Use 654321 for demo.');
      }
    } catch (err) {
      setError('OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccessMessage(selectedRole === 'dealer' || selectedRole === 'distributor' 
      ? 'A 6-digit OTP has been sent to your registered business email.' 
      : 'A secure reset link has been sent to your authorized email.');
    setIsLoading(false);
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="metallic-card p-10 w-full max-w-md relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {step === 'role' && (
            <motion.div 
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-display font-black italic uppercase mb-2 tracking-tighter text-white">Access Portal</h1>
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Secure Authentication Protocol</p>
              </div>

              <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                <RoleButton 
                  onClick={() => handleRoleSelect('customer')}
                  icon={<Users size={24} />}
                  label="Customer Account"
                  desc="Shop & Warranty Registration"
                  color="brand-blue"
                />
                <RoleButton 
                  onClick={() => handleRoleSelect('dealer')}
                  icon={<ShieldCheck size={24} />}
                  label="Authorized Dealer"
                  desc="Retail & Service Partner"
                  color="brand-red"
                />
                <RoleButton 
                  onClick={() => handleRoleSelect('distributor')}
                  icon={<Truck size={24} />}
                  label="Regional Distributor"
                  desc="Wholesale & Bulk Supply"
                  color="orange-500"
                />
                <RoleButton 
                  onClick={() => handleRoleSelect('super_admin')}
                  icon={<Lock size={24} />}
                  label="Internal Control"
                  desc="Master Admin & HQ Management"
                  color="white"
                />
              </div>
            </motion.div>
          )}

          {step === 'credentials' && (
            <motion.div 
              key="credentials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={() => setStep('role')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors font-bold">
                <ArrowLeft size={14} /> Back
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-display font-black italic uppercase mb-2">
                  {selectedRole === 'customer' ? 'Customer Login' : 
                   selectedRole === 'super_admin' ? 'HQ Master Access' : 
                   selectedRole === 'distributor' ? 'Distributor Portal' : 'Partner Portal'}
                </h2>
                <p className="text-white/50 text-sm">Encrypted Connection Established.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <InputGroup label="Email Address" type="email" value={email} onChange={setEmail} />
                <InputGroup label="Password" type="password" value={password} onChange={setPassword} />
                
                {error && <p className="text-brand-red text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}
                
                <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  {isLoading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />} 
                  <span className="font-bold uppercase tracking-widest">Sign In</span>
                </button>
                <button type="button" onClick={() => setStep('forgot')} className="w-full text-center text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                  Forgot Access Credentials?
                </button>
              </form>
            </motion.div>
          )}

          {(step === 'mfa' || step === 'otp') && (
            <motion.div 
              key="verification"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="inline-block p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 mb-6">
                  <Key size={32} className="text-brand-red" />
                </div>
                <h2 className="text-2xl font-display font-black italic uppercase mb-2">
                  {step === 'mfa' ? 'MFA Authorization' : 'OTP Verification'}
                </h2>
                <p className="text-white/50 text-sm">
                  {step === 'mfa' 
                    ? 'Security check: Enter your authenticator code.' 
                    : 'Enter the 6-digit code sent to your business email.'}
                </p>
              </div>
              <form onSubmit={step === 'mfa' ? handleVerifyMFA : handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Verification Code</label>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-4 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>
                {error && <p className="text-brand-red text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
                <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  {isLoading ? <Loader2 className="animate-spin" /> : <span className="font-bold uppercase tracking-widest">Verify & Grant Access</span>}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'forgot' && (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={() => setStep('credentials')} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors font-bold">
                <ArrowLeft size={14} /> Back to Login
              </button>
              <div className="text-center">
                <div className="inline-block p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 mb-6">
                  <Mail size={32} className="text-brand-blue" />
                </div>
                <h2 className="text-2xl font-display font-black italic uppercase mb-2 tracking-tight">Recovery</h2>
                <p className="text-white/50 text-sm">Enter your email to receive recovery instructions.</p>
              </div>
              {successMessage ? (
                <div className="p-6 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-center space-y-4">
                  <CheckCircle2 size={40} className="text-brand-blue mx-auto" />
                  <p className="text-sm text-white/80">{successMessage}</p>
                  <button onClick={() => setStep('credentials')} className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <InputGroup label="Registered Email" type="email" value={email} onChange={setEmail} />
                  <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 font-bold uppercase tracking-widest">
                    {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Send Reset Link'}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Torque Craft Cloud v2.1 | <Link to="/signup" className="text-brand-blue hover:underline">Register New Node</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Reusable Helper Components ---

const RoleButton = ({ onClick, icon, label, desc, color }: any) => (
  <button onClick={onClick} className={`flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-${color} transition-all group overflow-hidden relative`}>
    <div className={`p-3 rounded-lg bg-${color}/10 text-${color} group-hover:bg-${color} group-hover:text-black transition-all`}>
      {icon}
    </div>
    <div className="text-left">
      <h3 className="font-bold uppercase text-sm tracking-tight">{label}</h3>
      <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-medium">{desc}</p>
    </div>
    <div className={`absolute right-0 top-0 bottom-0 w-1 bg-${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
  </button>
);

const InputGroup = ({ label, type, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">{label}</label>
    <input 
      type={type} 
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 px-4 text-white focus:outline-none focus:border-brand-red focus:bg-black/60 transition-all font-mono text-sm"
    />
  </div>
);

export default Login;