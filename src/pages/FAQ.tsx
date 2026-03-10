import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      category: 'Product & Fitment',
      questions: [
        { q: 'How do I know if a kit fits my vehicle?', a: 'Use our AI-powered Fitment Search on the homepage or check the compatibility list on each product page. If you\'re still unsure, contact our tech support with your VIN.' },
        { q: 'What material are Torque Craft studs made from?', a: 'Most of our performance kits are manufactured from premium 8740 Chrome Moly steel, heat-treated to 200,000+ psi tensile strength.' },
        { q: 'Do you offer custom stud lengths?', a: 'Yes, we provide custom manufacturing services for specific engine builds. Contact our engineering team for a quote.' }
      ]
    },
    {
      category: 'Warranty & Verification',
      questions: [
        { q: 'How do I verify if my product is genuine?', a: 'Every Torque Craft product comes with a unique QR code on the packaging. Scan it or enter the serial number on our Warranty Verify page.' },
        { q: 'What does the 3-year warranty cover?', a: 'It covers manufacturing defects and material failure under normal operating conditions. It does not cover improper installation or extreme racing use beyond rated specs.' }
      ]
    },
    {
      category: 'Business & Dealer',
      questions: [
        { q: 'How do I become an authorized dealer?', a: 'Submit a Dealer Application through our Business portal. We review applications within 2-3 business days.' },
        { q: 'Do you offer drop-shipping for dealers?', a: 'Yes, we have a drop-ship program for authorized dealers. Details are available in the Dealer Portal after approval.' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-navy-deep min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <HelpCircle className="mx-auto text-brand-red mb-6" size={48} />
          <h1 className="text-5xl font-display font-black italic uppercase mb-4">Frequently Asked <span className="text-brand-red">Questions</span></h1>
          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Find answers to common inquiries</p>
        </div>

        <div className="space-y-12">
          {faqs.map((group, i) => (
            <div key={i} className="space-y-6">
              <h2 className="text-xl font-display font-bold uppercase tracking-wider text-brand-blue border-b border-white/10 pb-4">{group.category}</h2>
              <div className="space-y-4">
                {group.questions.map((faq, j) => (
                  <div key={j} className="metallic-card p-6 hover:border-white/20 transition-all group">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-3 group-hover:text-brand-red transition-colors">
                      <ChevronRight size={14} /> {faq.q}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed pl-6 border-l border-white/10">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 metallic-card p-10 text-center border-brand-blue/20">
          <h3 className="text-lg font-display font-bold uppercase mb-4 tracking-wider">Still have questions?</h3>
          <p className="text-sm text-white/40 mb-8">Our technical support team is ready to assist you with any specific requirements.</p>
          <button onClick={() => window.location.href = '/contact'} className="btn-primary py-3 px-10 text-xs">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
