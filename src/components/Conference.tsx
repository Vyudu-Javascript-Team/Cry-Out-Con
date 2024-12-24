import React from 'react';

const offerings = [
  { title: 'Dynamic Keynotes', image: 'src/assets/sectionimages/6N7A9961.jpg' },
  { title: 'Powerful Praise', image: 'src/assets/sectionimages/IMG_6543.jpg' },
  { title: 'Transformative Breakouts', image: 'src/assets/sectionimages/IMG_1392.jpg' },
  { title: 'Release & Revelation', image: 'src/assets/sectionimages/IMG_8152.jpg' },
  { title: 'Captivating Conversations', image: 'src/assets/sectionimages/IMG_6984.jpg' },
];

const Conference = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">Explore Cry Out Con</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {offerings.map((offering, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              <div className="relative group">
                <img 
                  src={offering.image} 
                  alt={offering.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white text-center px-2">
                    {offering.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conference;
