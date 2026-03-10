import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black italic uppercase mb-8 leading-tight">
            About <span className="text-brand-red">Torque Craft</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            Torque Craft designs and manufactures premium aftermarket automotive solutions with a focus on high-stress engine applications. Our core lineup includes head stud kits and main stud kits engineered for platforms where boost, heat, towing loads, and performance tuning expose weak hardware fast.
          </p>
          <p className="text-lg text-white/50 leading-relaxed">
            Beyond the Torque Craft brand range, we also provide custom manufacturing for aftermarket automotive parts based on client requirements. Whether a customer needs a private-label product, a specific component specification, or a production partner who can deliver consistent batches with clean packaging, we offer a structured process that prioritizes reliability, documentation, and quality control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: ShieldCheck, title: 'Reliability', desc: 'Engineered for the most demanding high-stress applications.' },
            { icon: Target, title: 'Precision', desc: 'Exact tolerances and documentation for every component.' },
            { icon: Users, title: 'Partnership', desc: 'Custom manufacturing and private-label solutions.' },
            { icon: Award, title: 'Quality Control', desc: 'Serialized verification and rigorous testing protocols.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="metallic-card p-8"
            >
              <item.icon className="text-brand-red mb-6" size={32} />
              <h3 className="text-lg font-display font-bold uppercase mb-4 tracking-wider">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="metallic-card p-12 border-brand-blue/20">
          <h2 className="text-3xl font-display font-black italic uppercase mb-8">Our Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-white/60">To protect customers and the brand, Torque Craft products include serialized verification and warranty tracking, supported by clear return and warranty policies and responsive technical support.</p>
              <ul className="space-y-4">
                {[
                  'Consistent manufacturing standards',
                  'Fitment-aware development',
                  'Traceability and anti-counterfeit protection',
                  'Clean packaging and complete kits',
                  'Clear policies + responsive support'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden">
              <img src="https://loremflickr.com/800/600/engine,factory,metal?lock=20" alt="Torque Craft Quality" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
