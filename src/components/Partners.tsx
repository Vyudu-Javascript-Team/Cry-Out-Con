import React from 'react';
import SectionTitle from './SectionTitle';

export const Partners = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
      <SectionTitle 
            title="Our Partners"
            subtitle=""
            gradient="from-purple-400 to-purple-600"
          />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Microsoft', 'Apple', 'Google', 'Amazon'].map((partner) => (
            <div key={partner} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <span className="text-xl font-bold text-white">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};