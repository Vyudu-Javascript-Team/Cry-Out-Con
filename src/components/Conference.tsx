import React from "react";

const offerings = [
  {
    title: "Dynamic Keynotes",
    image: "src/assets/sectionimages/6N7A9961.jpg",
    description:
      "Listen to world renowned speakers share empowering messages to transform your life!",
  },
  {
    title: "Powerful Praise",
    image: "src/assets/sectionimages/IMG_6543.jpg",
    description:
      "Nourish your spirit as you connect with God through high praise led by gifted worship leaders, singers & musicians. ",
  },
  {
    title: "Release & Revelation",
    image: "src/assets/sectionimages/IMG_8152.jpg",
    description:
      "Prepare your open heart & mind to be poured into, and leave clear minded and with new revelations about your lifes journey.",
  },
  {
    title: "Captivating Conversations",
    image: "src/assets/sectionimages/IMG_6984.jpg",
    description:
      "Gain wisdom from people we admire who live by faith, who have been tried by fire, and conquered.",
  },
  {
    title: "Transformative Breakouts",
    image: "src/assets/sectionimages/IMG_1392.jpg",
    description:
      "Dedicate time in breakout sessions to get wisdom and tools to improve your mindset, relationships, mental health, finances and more.",
  },
];

const Conference = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Explore Cry Out Con
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg h-full overflow-hidden"
            >
              <div className="relative group">
                <img
                  src={offering.image}
                  alt={offering.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-opacity ease-in duration-50">
                  <p className="text-xl font-semibold text-white text-center px-2">
                    {offering.description}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl space-x-3 font-semibold text-center">
                  {offering.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conference;
