import React, { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import SpotlightEffect from "./SpotlightEffect";
import { Instagram, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import latrice from "../assets/images/latrice.png";
import thomas from "../assets/images/thomas.png";
import keion from "../assets/images/PASTOR-KEION.png";
import shana from "../assets/images/Dr.ShanaDLewis.jpg";
import vincent from "../assets/images/Vincent Casey.jpeg";
import blakes from "../assets/images/BishopRCBlakes.jpg";
import jordan from "../assets/images/JordanWelch.jpg";
import john from "../assets/images/JohnHannah.jpg";
import alicia from "../assets/images/IMG_1173.jpeg";

import lacey from "../assets/images/LaceyTezino.jpeg";
import samuel from "../assets/images/Samuel Rodríguez Main Headshot.png";
import shaunie from "../assets/images/LadyShaunieHenderson2.jpg";
import seion from "../assets/images/IMG_9638.jpg";
import stephan from "../assets/images/StephanSpeaks.jpeg";
import choir from "../assets/images/HoustonMassChoir.png";
import todd from "../assets/images/Todd Dulaney.jpeg";
import leandria from "../assets/images/LeAndriaJohnson.jpeg";
import LazyImage from "./LazyImage";

const AllSpeakers = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const keynoteSpeakers = [
    {
      name: "Pastor Keion Henderson",
      title: "Lead Pastor of Lighthouse Church & Ministries",
      image: keion,
      instagram: "https://www.instagram.com/pastorkeion/",
      website: "https://keionhenderson.com/about-us/",
    },
    {
      name: "Eric Thomas",
      title: "Pastor",
      image: thomas,
      instagram:
        "https://www.instagram.com/etthehiphoppreacher?igsh=MTVwbW43am85dHFs",
      website: "https://ericthomas.com/",
    },
    {
      name: "Pastor John F. Hannah",
      title: "Sr. Pastor, New Life Covenant Church Southeast",
      image: john,
      instagram: "https://www.instagram.com/pastorhannah",
      website: "",
    },
    {
      name: "LaTrice Ryan",
      title: "Evangelist",
      image: latrice,
      instagram: "https://www.instagram.com/latriceryan?igsh=bXV5Njd3eXRueGZ6",
      website: "https://latrice-ryan-ministries-82cd.mykajabi.com/KSI22",
    },
    {
      name: "Pastor Samuel Rodriguez",
      title:
        "Lead Pastor of New Season, President of National Hispanic Christian Leadership Conference",
      image: samuel,
      instagram: "https://www.instagram.com/pastorsamuelrodriguez",
      website: "",
    },
  ];

  const thoughtLeaders = [
    {
      name: "Shaunie Henderson",
      title: "First Lady of Lighthouse Church & Ministries",
      image: shaunie,
      instagram: "https://www.instagram.com/iamshaunie/?hl=en",
      website: "",
    },
    {
      name: "Stephan Speaks",
      title: "Certified Dating and Relationship Coach, Author/Speaker",
      image: stephan,
      instagram: "https://www.instagram.com/stephanspeaks/",
      website: "",
    },
    {
      name: "Bishop Seion Roberts, Sr",
      title: "Chief of Ministries, Lighthouse Church & Ministries",
      image: seion,
      instagram: "https://www.instagram.com/bishopsieon/",
      website: "",
    },
    {
      name: "Vincent A. Casey Sr",
      title: "Relationship Mediator",
      image: vincent,
      instagram: "https://www.instagram.com/notyouraverageminister",
      website: "",
    },
  ];

  const workshopLeaders = [
    {
      name: "Alicia Dugar Stephenson, ERYT",
      title: "Lead Teacher Trainer",
      image: alicia,
      instagram: "https://www.instagram.com/afroyogaqueen",
      website: "",
    },
    {
      name: "Jordan G. Welch",
      title: "Artist",
      image: jordan,
      instagram: "https://www.instagram.com/jordan.g.welch",
      website: "",
    },
    {
      name: "Lacey Tezino",
      title: "Founder & CEO of Passport Journeys",
      image: lacey,
      instagram: "https://www.instagram.com/Lacey.tezino",
      website: "",
    },

    {
      name: "RC Blakes",
      title: "Pastor",
      image: blakes,
      instagram: "https://www.instagram.com/rcblakes",
      website: "",
    },

    {
      name: "Dr. Shana D. Lewis",
      title: "Mental Health Expert/Exec Wellness Coach",
      image: shana,
      instagram: "https://www.instagram.com/iamdrshana",
      website: "",
    },
  ];

  const artists = [
    {
      name: "Le'Andria Johnson",
      title: "Grammy Award Winner/Singer",
      image: leandria,
      instagram: "https://www.instagram.com/leandriaj/",
      website: "",
    },
    {
      name: "Houston Mass Choir",
      title: "Choir",
      image: choir,
      instagram: "https://www.instagram.com/houstonmasschoir",
      website: "",
    },
    {
      name: "Jordan G. Welch",
      title: "Artist",
      image: jordan,
      instagram: "https://www.instagram.com/jordan.g.welch",
      website: "",
    },
    {
      name: "Todd Dulaney",
      title: "Artist",
      image: todd,
      instagram: "https://www.instagram.com/todddulaney1",
      website: "",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.1} />

      {/* keynote speakers */}
      <div className="container relative max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Keynote Speakers"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
          {keynoteSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
            >
              <Suspense
                fallback={
                  <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                }
              >
                <LazyImage
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

              {/* Social Icons */}
              <div className="absolute top-3 right-4 flex gap-2 opacity-100">
                {speaker.instagram && (
                  <motion.a
                    href={speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                )}
                {speaker.website && (
                  <motion.a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold mb-2">{speaker.name}</h3>
                <p className="text-gray-300 leading-none">{speaker.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* thought leaders */}
        <div className="mt-20">
          <SectionTitle
            title="Thought Leaders & Speakers"
            gradient="from-purple-400 via-pink-400 to-red-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {thoughtLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
              >
                <Suspense
                  fallback={
                    <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                  }
                >
                  <LazyImage
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

                {/* Social Icons */}
                <div className="absolute top-3 right-4 flex gap-2 opacity-100">
                  {leader.instagram && (
                    <motion.a
                      href={leader.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                  {leader.website && (
                    <motion.a
                      href={leader.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-gray-300 leading-none">{leader.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* workshopLeaders */}
        <div className="mt-20">
          <SectionTitle
            title="Workshop Leaders"
            gradient="from-purple-400 via-pink-400 to-red-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {workshopLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
              >
                <Suspense
                  fallback={
                    <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                  }
                >
                  <LazyImage
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

                {/* Social Icons */}
                <div className="absolute top-3 right-4 flex gap-2 opacity-100">
                  {leader.instagram && (
                    <motion.a
                      href={leader.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                  {leader.website && (
                    <motion.a
                      href={leader.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-gray-300 leading-none">{leader.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Musical Guests Section */}
        <div className="mt-20">
          <SectionTitle
            title="Musical Guests"
            subtitle="Experience amazing performances"
            gradient="from-purple-400 via-pink-400 to-red-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl aspect-[3/4] max-w-[300px] mx-auto"
              >
                <Suspense
                  fallback={
                    <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                  }
                >
                  <LazyImage
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />

                {/* Social Icons */}
                <div className="absolute top-3 right-4 flex gap-2 opacity-100">
                  {artist.instagram && (
                    <motion.a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                  {artist.website && (
                    <motion.a
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-sm rounded-full bg-purple-500/50 transition-colors duration-300 group/icon"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </motion.a>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                  <p className="text-gray-300 leading-none">{artist.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllSpeakers;
