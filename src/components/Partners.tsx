import React from 'react';

export const Partners = () => {
  return (
    <section className="py-8 bg-white/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Partners</h2>
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