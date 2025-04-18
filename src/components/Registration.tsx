import { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import SectionTitle from "./SectionTitle";
import { getRegistrationData } from "../lib/sanity";

export interface RegistrationFeature {
  feature: string;
  included: boolean;
}

export interface RegistrationPlan {
  title: string;
  price: number;
  features: RegistrationFeature[];
  order: number;
}

export interface RegistrationData {
  sectionTitle: string;
  sectionSubTitle: string;
  plans: RegistrationPlan[];
  regLink: string;
}

const Registration = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegistrationData();
        if (data) {
          setRegistrationData(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleRegistration = () => {
    if (registrationData?.regLink) {
      window.open(registrationData.regLink, "_blank");
    }
  };

  const handlePlanRegistration = (planTitle: string) => {
    if (planTitle === "VIP") {
      return; // Prevent registration for VIP plan
    }
    handleRegistration();
  };

  const getPlanBackground = (planName: string) => {
    switch (planName) {
      case "VIP":
        return "bg-purple-900/40 border-purple-500/30 hover:border-purple-500/50";
      case "PREMIER":
        return "bg-fuchsia-900/40 border-fuchsia-500/30 hover:border-fuchsia-500/50";
      case "GENERAL":
        return "bg-white/95 border-white/30 hover:border-white/50";
      case "Single Day Pass (FRIDAY)":
        return "bg-purple-900/40 border-purple-500/30 hover:border-purple-500/50";
      case "Single Day Pass (SATURDAY)":
        return "bg-purple-900/40 border-purple-500/30 hover:border-purple-500/50";
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
      case "Single Day Pass (FRIDAY)":
        return "0 20px 40px rgba(147, 51, 234, 0.3)";
      case "Single Day Pass (SATURDAY)":
        return "0 20px 40px rgba(147, 51, 234, 0.3)";
      default:
        return "0 20px 40px rgba(124, 58, 237, 0.2)";
    }
  };

  return (
    <motion.section ref={sectionRef} className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

      <SpotlightEffect sectionRef={sectionRef} color="purple" delay={0.4} />

      <div className=" mx-auto md:max-w-6xl px-4 relative z-10">
        <SectionTitle
          title="REGISTRATION"
          subtitle="Choose the perfect plan for your conference experience."
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {registrationData?.plans.map((plan) => (
            <motion.div
              key={plan.title}
              className={`relative p-4 rounded-xl backdrop-blur-sm border transition-all duration-500 ${
                selectedPlan === plan.title
                  ? "bg-white/15 border-white/20 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                  : getPlanBackground(plan.title)
              }`}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: getPlanShadow(plan.title),
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              />

              {plan.title === "VIP" && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <img 
                    src="/assets/cryout24/soldOut.png" 
                    alt="Sold Out" 
                    className="w-full h-auto max-w-[180px] transform scale-150"
                  />
                </div>
              )}

              <div className="text-center mb-4">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.title === "VIP" ||
                    plan.title === "Single Day Pass (FRIDAY)" ||
                    plan.title === "Single Day Pass (SATURDAY)"
                      ? "text-purple-400"
                      : plan.title === "PREMIER"
                        ? "text-fuchsia-400"
                        : "text-gray-800"
                  }`}
                >
                  {plan.title}
                </h3>
                <div
                  className={`text-5xl font-bold bg-clip-text text-transparent ${
                    plan.title === "VIP" ||
                    plan.title === "Single Day Pass (FRIDAY)" ||
                    plan.title === "Single Day Pass (SATURDAY)"
                      ? "bg-gradient-to-r from-purple-400 to-purple-600"
                      : plan.title === "PREMIER"
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
                  onClick={() => handlePlanRegistration(plan.title)}
                  type="button"
                  className={`w-full mb-2 py-4 rounded font-semibold transition-all duration-300 ${
                    plan.title === "VIP"
                      ? "bg-gray-500 cursor-not-allowed opacity-70"
                      : plan.title === "VIP" ||
                        plan.title === "Single Day Pass (FRIDAY)" ||
                        plan.title === "Single Day Pass (SATURDAY)"
                        ? "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 hover:cursor-pointer"
                        : plan.title === "PREMIER"
                          ? "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 hover:from-fuchsia-500 hover:to-fuchsia-700 hover:cursor-pointer"
                          : "bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 hover:cursor-pointer"
                  }`}
                >
                  {plan.title === "VIP" ? "SOLD OUT" : `CHOOSE ${plan.title}`}
                </button>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <motion.div
                    key={feature.feature}
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
                          ? plan.title === "GENERAL"
                            ? "text-gray-800"
                            : "text-white"
                          : "text-gray-500"
                      }
                    >
                      {feature.feature}
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
