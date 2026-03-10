import { motion } from 'framer-motion';
import { Package, Settings, CheckCircle2, Truck, FileText } from 'lucide-react';

const OurWork = () => {
  return (
    <div className="pt-32 pb-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black italic uppercase mb-8 leading-tight">
            Our <span className="text-brand-blue">Work</span>
          </h1>
          <h2 className="text-2xl font-display font-bold italic uppercase mb-6 text-white/80">What We Build</h2>
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            Torque Craft manufactures and supplies aftermarket automotive products designed for high-demand use cases. Our primary focus is:
          </p>
          <ul className="space-y-4 mb-12">
            {[
              'Head Stud Kits for popular diesel and performance platforms',
              'Main Stud Kits to strengthen bottom-end clamping under load',
              'Supporting hardware and installation essentials (where applicable)',
              'Other automotive parts transmission parts as per client requirement'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        <section className="mb-24">
          <h2 className="text-3xl font-display font-black italic uppercase mb-12">Custom Manufacturing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-white/60 leading-relaxed">In addition to our Torque Craft catalog, we provide manufacturing and supply services for a wide range of aftermarket automotive parts based on client requirements, including:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Package, title: 'Private-label', desc: 'OEM-style production runs.' },
                  { icon: Settings, title: 'Component Mfg', desc: 'Manufacturing to provided drawings/specs.' },
                  { icon: Target, title: 'Fitment-based', desc: 'Product development for targeted platforms.' },
                  { icon: FileText, title: 'Kitting', desc: 'Packaging and kitting services.' }
                ].map((item, i) => (
                  <div key={i} className="metallic-card p-6">
                    <h4 className="text-sm font-bold uppercase mb-2 text-brand-blue">{item.title}</h4>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40 italic">We work with clients who value consistency and accountability — not one-off shortcuts. Each project is handled with a clear scope, controlled production steps, and documented outputs.</p>
            </div>
            <div className="metallic-card p-10 border-brand-blue/20">
              <h3 className="text-xl font-display font-bold italic uppercase mb-8">Process Overview</h3>
              <div className="space-y-8">
                {[
                  { step: 1, title: 'Requirement Intake', desc: 'Platform, use case, target durability, volume, and packaging needs.' },
                  { step: 2, title: 'Engineering Alignment', desc: 'Finalizing what will be built and what defines "pass/fail".' },
                  { step: 3, title: 'Production Discipline', desc: 'Controlled machining steps supported by inspections.' },
                  { step: 4, title: 'Quality Verification', desc: 'Batch traceability and record maintenance.' },
                  { step: 5, title: 'Packaging Integrity', desc: 'Complete kits to reduce mistakes and transit damage.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-bold text-navy-deep flex-shrink-0">{item.step}</div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="metallic-card p-12">
          <h2 className="text-3xl font-display font-black italic uppercase mb-12 text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Performance and diesel shops',
              'Engine builders',
              'Serious DIY enthusiasts',
              'Distributors and retailers',
              'Businesses needing contract manufacturing'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle2 className="text-brand-blue" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">{text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Mock icon for Target since it was missing in imports
const Target = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default OurWork;
