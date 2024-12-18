import React from 'react';
import { Building, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const DiveIn = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="The Lighthouse Church"
            subtitle="A beacon of hope and transformation in our community"
            gradient="from-blue-400 to-purple-600"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Church Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <Building className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Our Church</h3>
              </div>
              <p className="text-gray-300 mb-6">
                The Lighthouse Church is committed to spreading God's word and 
                building a community of believers. We focus on authentic worship, 
                spiritual growth, and community service.
              </p>
              <motion.a
                href="https://lhhouston.church/"
                target='_blank'
                className="inline-flex items-center text-purple-400 hover:text-purple-300"
                whileHover={{ x: 5 }}
              >
                Visit church website
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a>
            </motion.div>

            {/* Conference Affiliation Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Conference Connection</h3>
              </div>
              <p className="text-gray-300 mb-6">
                We're proud to be part of the Cry Out Conference, joining together 
                with other churches to create a powerful movement of worship and 
                spiritual renewal.
              </p>
              {/* <motion.a
                href="/conference"
                className="inline-flex items-center text-purple-400 hover:text-purple-300"
                whileHover={{ x: 5 }}
              >
                Explore the conference
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiveIn;
