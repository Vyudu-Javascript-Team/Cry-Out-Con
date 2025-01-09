import { Suspense } from "react";

import dynamicKeynotes from "/assets/sectionimages/6N7A9961.jpg";
import powerfulPraise from "/assets/sectionimages/IMG_6543.jpg";
import releaseRevelation from "/assets/sectionimages/IMG_8152.jpg";
import captivatingConversations from "/assets/sectionimages/IMG_6984.jpg";
import transformativeBreakouts from "/assets/cryout24/IMG_6947.jpg";
import LazyImage from "./LazyImage";
import SectionTitle from "./SectionTitle";

const offerings = [
  {
    title: "Dynamic Keynotes",
    image: dynamicKeynotes,
    description:
      "Listen to world renowned speakers share empowering messages to transform your life!",
  },
  {
    title: "Powerful Praise",
    image: powerfulPraise,
    description:
      "Nourish your spirit as you connect with God through high praise led by gifted worship leaders, singers & musicians. ",
  },
  {
    title: "Release & Revelation",
    image: releaseRevelation,
    description:
      "Prepare your open heart & mind to be poured into, and leave clear minded and with new revelations about your lifes journey.",
  },
  {
    title: "Captivating Conversations",
    image: captivatingConversations,
    description:
      "Gain wisdom from people we admire who live by faith, who have been tried by fire, and conquered.",
  },
  {
    title: "Transformative Breakouts",
    image: transformativeBreakouts,
    description:
      "Dedicate time in breakout sessions to get wisdom and tools to improve your mindset, relationships, mental health, finances and more.",
  },
];

const Conference = () => {
  return (
    <section id="conference" className="py-16 h-full bg-primary">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="EXPLORE CRY OUT CON"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg h-full overflow-hidden"
            >
              <div className="relative group">
                <Suspense
                  fallback={
                    <div className="w-full h-64 bg-gray-200 animate-pulse" />
                  }
                >
                  <LazyImage
                    src={offering.image}
                    alt={offering.title}
                    className="w-full h-64 object-cover"
                  />
                </Suspense>

                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-opacity ease-in-out duration-50">
                  <p className="text-xl font-semibold text-white text-center px-2">
                    {offering.description}
                  </p>
                </div>
              </div>
              <div className="py-3">
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
