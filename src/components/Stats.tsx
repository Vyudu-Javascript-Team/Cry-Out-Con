import React from 'react';
import { Users, Building2, Globe2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

export const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-12 h-12" />,
      number: "5K+",
      label: "Attendees",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      number: "2",
      label: "Conferences",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <Globe2 className="w-12 h-12" />,
      number: "1",
      label: "Locations",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: <Award className="w-12 h-12" />,
      number: "50+",
      label: "Speakers",
      color: "from-amber-400 to-amber-600"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <SectionTitle 
        title="Event Statistics"
        subtitle="Join the world's largest gathering of spiritual leaders and worshippers"
        gradient="from-blue-400 to-purple-600"
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 text-white`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {stat.number}
                </h3>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};