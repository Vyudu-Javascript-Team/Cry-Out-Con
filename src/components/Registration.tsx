import { useState, useRef } from "react";
import { Check, X } from "lucide-react";
import {
  motion,
} from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import SectionTitle from "./SectionTitle";

const Registration = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);


  const plans = [
    {
      name: "VIP",
      price: 349,
      features: [
        { name: "VIP event w/ Pastor and Lady Henderson", included: true },
        { name: "Access to VIP Lounge", included: true },
        { name: "Exclusive Cry Out gift", included: true },
        { name: "Exclusive conference entrance", included: true },
        { name: "VIP conference tote", included: true },
        { name: "Access to conference program", included: true },
        { name: "VIP registration badge", included: true },
        { name: "Seating in VIP section", included: true },
      ],
    },
    {
      name: "PREMIER",
      price: 249,
      features: [
        { name: "Premier conference tote", included: true },
        { name: "Access to conference program", included: true },
        { name: "Premier registration badge", included: true },
        { name: "Seating in Premier section", included: true },
        { name: "Exclusive conference entrance", included: false },
        { name: "Exclusive Cry Out gift", included: false },
        { name: "Access to VIP Lounge", included: false },
        { name: "VIP event w/ Pastor and Lady Henderson", included: false },
      ],
    },
    {
      name: "GENERAL",
      price: 149,
      features: [
        { name: "Access to conference program", included: true },
        { name: "General registration badge", included: true },
        { name: "Seating in General section", included: true },
        { name: "Conference tote", included: false },
        { name: "Exclusive event entrance", included: false },
        { name: "Exclusive Cry Out gift", included: false },
        { name: "Access to VIP Lounge", included: false },
        { name: "VIP event w/ Pastor and Lady Henderson", included: false },
      ],
    }
  ];

  const handleRegistration = () => {
    window.open(
      "https://brushfire.com/tlhc/cryout25/578593/register",
      "_blank"
    );
  };

  const getPlanBackground = (planName: string) => {
    switch (planName) {
      case "VIP":
        return "bg-purple-900/40 border-purple-500/30 hover:border-purple-500/50";
      case "PREMIER":
        return "bg-fuchsia-900/40 border-fuchsia-500/30 hover:border-fuchsia-500/50";
      case "GENERAL":
        return "bg-white/95 border-white/30 hover:border-white/50";
      default:
        return "bg-white/10 border-white/10 hover:border-white/20";
    }
  };

  const getPlanShadow = (planName: string) => {
    switch (planName) {
      case "VIP":
        return "0 20px 40px rgba(147, 51, 234, 0.3)";
      case "PREMIER":
        return "0 20px 40px rgba(236, 72, 153, 0.3)";
      case "GENERAL":
        return "0 20px 40px rgba(255, 255, 255, 0.1)";
      default:
        return "0 20px 40px rgba(124, 58, 237, 0.2)";
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />
      
      <SpotlightEffect sectionRef={sectionRef} color="purple" delay={0.4} />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="REGISTRATION"
          subtitle="Choose the perfect plan for your conference experience."
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
              <motion.div
              key={plan.name}
                className={`relative p-4 rounded-xl backdrop-blur-sm border transition-all duration-500 ${
                  selectedPlan === plan.name
                    ? "bg-white/15 border-white/20 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                    : getPlanBackground(plan.name)
                }`}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: getPlanShadow(plan.name),
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />

                <div className="text-center mb-4">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      plan.name === "VIP"
                        ? "text-purple-400"
                        : plan.name === "PREMIER"
                          ? "text-fuchsia-400"
                          : "text-gray-800"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div
                    className={`text-5xl font-bold bg-clip-text text-transparent ${
                      plan.name === "VIP"
                        ? "bg-gradient-to-r from-purple-400 to-purple-600"
                        : plan.name === "PREMIER"
                          ? "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600"
                          : "bg-gradient-to-r from-gray-700 to-gray-900"
                    }`}
                  >
                    <span className="text-5xl">$</span>
                    {plan.price}
                  </div>
                </div>

                <div className="relative z-20">
                  <button
                    onClick={handleRegistration}
                    type="button"
                    className={`w-full mb-2 py-4 rounded font-semibold hover:cursor-pointer transition-all duration-300 ${
                      plan.name === "VIP"
                        ? "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
                        : plan.name === "PREMIER"
                          ? "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 hover:from-fuchsia-500 hover:to-fuchsia-700"
                          : "bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800"
                    }`}
                  >
                    CHOOSE {plan.name}
                  </button>
                </div>

                <div className="space-y-2">
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
                      <span
                        className={
                          feature.included
                            ? plan.name === "GENERAL"
                              ? "text-gray-800"
                              : "text-white"
                            : "text-gray-500"
                        }
                      >
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Registration;
