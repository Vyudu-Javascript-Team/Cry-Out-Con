import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../lib/sanity";

interface SponsorsData {
  title: string;
  description: string;
  audienceImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  isVisible: boolean;
}

export const Sponsors = () => {
  const [sponsorsData, setSponsorsData] = useState<SponsorsData | null>(null);

  useEffect(() => {
    const fetchSponsorsData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "sponsors" && isVisible == true][0] {
            title,
            description,
            audienceImage {
              asset->{
                url
              },
              alt
            },
            isVisible
          }
        `);

        if (data) {
          setSponsorsData(data);
        }
      } catch (error) {
        console.error("Error fetching sponsors data:", error);
      }
    };

    fetchSponsorsData();
  }, []);

  if (!sponsorsData) return null;

  return (
    <section id="sponsors" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            {sponsorsData.title}
          </h2>
          
          {sponsorsData.audienceImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <img
                src={sponsorsData.audienceImage.asset.url}
                alt={sponsorsData.audienceImage.alt || "Cry Out Con Audience"}
                className="w-full rounded-lg shadow-xl"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg md:prose-xl mx-auto text-white"
          >
            <p className="whitespace-pre-line">
              {sponsorsData.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
