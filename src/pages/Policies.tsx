import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Shield, FileText, Lock, Cookie } from 'lucide-react';

const Policies = () => {
  const { type } = useParams();

  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      text: 'At Torque Craft, we take your privacy seriously. We collect only the information necessary to process your orders and provide technical support. Your data is encrypted and never shared with third parties for marketing purposes.'
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      text: 'By using this website and purchasing Torque Craft products, you agree to our terms of service. This includes our MAP pricing policies for dealers and our liability limitations regarding high-performance automotive components.'
    },
    refund: {
      title: 'Refund Policy',
      icon: Shield,
      text: 'We offer a 30-day return policy for unused, unopened products in their original packaging. A restocking fee may apply. Custom manufactured items are non-refundable once production has commenced.'
    },
    cookie: {
      title: 'Cookie Policy',
      icon: Cookie,
      text: 'Our website uses cookies to enhance your browsing experience, remember your cart items, and analyze site traffic. You can manage your cookie preferences through your browser settings.'
    }
  };

  const policy = content[type as keyof typeof content] || content.privacy;

  return (
    <div className="pt-32 pb-24 bg-navy-deep min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metallic-card p-12"
        >
          <policy.icon className="text-brand-red mb-8" size={48} />
          <h1 className="text-4xl font-display font-black italic uppercase mb-8">{policy.title}</h1>
          <div className="space-y-6 text-white/60 leading-relaxed">
            <p>{policy.text}</p>
            <p>Last updated: February 2026</p>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mt-10">Detailed Information</h3>
            <p>For more detailed information regarding our {policy.title.toLowerCase()}, please contact our legal department at legal@torquecraft.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Policies;
