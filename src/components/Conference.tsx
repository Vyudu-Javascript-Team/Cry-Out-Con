import { Suspense, useEffect, useState } from "react";

import LazyImage from "./LazyImage";
import SectionTitle from "./SectionTitle";
import { getConference } from "../lib/sanity";

interface ConferenceOffering {
  _id: string;
  sectionTitle: string;
  content: {
    title: string;
    imageUrl: string;
    imageAlt: string;
    description: string;
    order: number;
  }[];
  isVisible: boolean;
}

const Conference = () => {
  const [offerings, setOfferings] = useState<ConferenceOffering[]>([]);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await getConference();

        if (data) {
          setOfferings(data);
        } else {
          console.error("No conference data available");
        }
      } catch (error) {
        console.error("Error fetching conference offerings:", error);
      }
    };

    fetchOfferings();
  }, []);

  return (
    <section id="conference" className="py-16 h-full bg-primary">
      {offerings && (
        <div className="">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={offerings[0].sectionTitle}
              gradient="from-pink-500 via-purple-500 to-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {offerings[0]?.content
                .sort((a, b) => a.order - b.order)
                .map((offering, index) => (
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
                          src={offering.imageUrl}
                          alt={offering.imageAlt}
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
        </div>
      )}
    </section>
  );
};

export default Conference;
