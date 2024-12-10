import React, { useState, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SpotlightEffect from './SpotlightEffect';
import FluidWaveBackground from './FluidWaveBackground';
import SectionTitle from './SectionTitle';

const Registration = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const plans = [
    {
      name: 'VIP',
      price: 349,
      features: [
        { name: 'VIP event w/ Pastor and Lady Henderson', included: true },
        { name: 'Access to VIP Lounge', included: true },
        { name: 'Exclusive Cry Out gift', included: true },
        { name: 'Exclusive conference entrance', included: true },
        { name: 'VIP conference tote', included: true },
        { name: 'Access to conference program', included: true },
        { name: 'VIP registration badge', included: true },
        { name: 'Seating in VIP section', included: true }
      ]
    },
    {
      name: 'PREMIER',
      price: 249,
      features: [
        { name: 'Premier conference tote', included: true },
        { name: 'Access to conference program', included: true },
        { name: 'Premier registration badge', included: true },
        { name: 'Seating in Premier section', included: true },
        { name: 'Exclusive conference entrance', included: false },
        { name: 'Exclusive Cry Out gift', included: false },
        { name: 'Access to VIP Lounge', included: false },
        { name: 'VIP event w/ Pastor and Lady Henderson', included: false }
      ]
    },
    {
      name: 'GENERAL',
      price: 149,
      features: [
        { name: 'Access to conference program', included: true },
        { name: 'General registration badge', included: true },
        { name: 'Seating in General section', included: true },
        { name: 'Conference tote', included: false },
        { name: 'Exclusive event entrance', included: false },
        { name: 'Exclusive Cry Out gift', included: false },
        { name: 'Access to VIP Lounge', included: false },
        { name: 'VIP event w/ Pastor and Lady Henderson', included: false }
      ]
    }
  ];

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    window.open('https://brushfire.com/tlhc/cryout25/578593/register', '_blank');
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />
      <FluidWaveBackground />
      <SpotlightEffect sectionRef={sectionRef} color="purple" delay={0.4} />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="REGISTRATION"
          subtitle="Choose the perfect plan for your conference experience"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          style={{ scale }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                  selectedPlan === plan.name
                    ? 'bg-white/15 border-white/20 shadow-[0_0_30px_rgba(124,58,237,0.3)]'
                    : 'bg-white/10 border-white/10 hover:border-white/20'
                }`}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                    <span className="text-3xl">$</span>
                    {plan.price}
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelection(plan.name)}
                  className={`w-full mt-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPlan === plan.name
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Choose {plan.name}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Registration;