import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionTitle from "../components/SectionTitle";

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem = ({ question, children }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-fuchsia-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="relative min-h-screen bg-primary text-white">
      <div className="relative pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="FAQ" 
            subtitle="Frequently Asked Questions" 
            gradient="from-fuchsia-400 via-purple-400 to-blue-400"
          />

          <div className="mt-10 space-y-1 bg-primary/70 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <FAQItem question="When is Cry Out Con 2025?">
              <p className="mb-2">Join us for Cry Out Con 2025!</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>May 1-3</li>
                <li>George R. Brown Convention Center</li>
                <li>1001 Avenida de las Americas</li>
                <li>Houston, TX 77010</li>
              </ul>
            </FAQItem>

            <FAQItem question="What are the available ticket packages?">
              <p className="mb-2">We offer three experience levels:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>VIP</li>
                <li>Premier</li>
                <li>General</li>
              </ul>
              <a 
                href="https://brushfire.com/tlhc/cryout25/578593/register" 
                className="inline-block bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Here
              </a>
            </FAQItem>

            <FAQItem question="Do You have Group Pricing?">
              <p>
                Please click the "Contact Us" link at the bottom of the page for questions involving group purchases of 10 or more registrations.
              </p>
            </FAQItem>

            <FAQItem question="Is Seating Assigned during Main Stage sessions?">
              <p>
                VIP and Premier Experience tickets include reserved seating sections. All other seating will be open, so large groups should plan to arrive early in order to sit together.
              </p>
            </FAQItem>

            <FAQItem question="Conference Policies">
              <p>
                Please <a href="https://cryoutcon.com/refund-policy/" className="text-fuchsia-400 hover:underline" target="_blank" rel="noopener noreferrer">click here</a> to view the Cry Out Con policies involving refunds, age restrictions, and other considerations.
              </p>
            </FAQItem>

            <FAQItem question="Who is Speaking at Cry Out?">
              <p>
                For a complete list of speakers, performers, and special guests, please <a href="https://cryoutcon.com/speakers" className="text-fuchsia-400 hover:underline" target="_blank" rel="noopener noreferrer">click here</a>.
              </p>
            </FAQItem>

            <FAQItem question="Does Cry Out have Official Airline and Hotel Partners?">
              <p>
                Please view the available travel and accommodation discounts <a href="https://cryoutcon.com/travel" className="text-fuchsia-400 hover:underline" target="_blank" rel="noopener noreferrer">here</a>.
              </p>
            </FAQItem>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 