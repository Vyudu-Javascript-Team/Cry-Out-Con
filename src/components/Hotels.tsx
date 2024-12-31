import { motion} from "framer-motion";
import SectionTitle from "./SectionTitle";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />

      <div className="container mx-auto px-4 relative">
        <SectionTitle
          title={
            <span className="inline-flex flex-col sm:flex-row items-center justify-center gap-x-4 whitespace-nowrap">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Conference
              </span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                Hotels
              </span>
            </span>
          }
          subtitle="Exclusive rates at premier hotels near the venue"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Experience luxury and convenience at our partner hotels, both
              directly connected to the George R. Brown Convention Center.
              Choose between the Marriott Marquis Houston, featuring its iconic
              Texas-shaped rooftop pool, or the Hilton Americas-Houston with
              stunning skyline views. Both hotels offer special conference rates
              starting from $179/night and include premium amenities to enhance
              your stay.
            </p>
            <motion.button
              onClick={() => navigate("/hotel-details")}
              type="button"
              className="flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Hotel Details
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hotels;
