import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { getPrivacyPolicy } from "../lib/sanity";

type PrivacyPolicyData = {
  heading: string;
  sections: [
    {
      title: string;
      groupByTitle?: string;
      paragraphsBeforeList?: [];
      list?: [];
      paragraphsAfterList?: [];
    },
  ];
};

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<PrivacyPolicyData | null>(
    null
  );

  let groupByTitles: string[] = [];

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const data = await getPrivacyPolicy();

        if (data) {
          setPrivacyPolicy(data);
        }
      } catch (error) {
        console.error("Error fetching policy page: ", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    privacyPolicy && (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            {privacyPolicy.heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-gray-200"
          >
            {privacyPolicy.sections.map((policy) => {
              let headings = (
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  {policy.title}
                </h2>
              );

              if (policy.groupByTitle) {
                const inGroupByTitles = groupByTitles.find(
                  (el) => el === policy.groupByTitle
                );

                console.log(inGroupByTitles);

                if (!inGroupByTitles) {
                  groupByTitles.push(policy.groupByTitle);
                  headings = (
                    <>
                      <h2 className="text-2xl font-semibold mb-4 text-white">
                        {policy.groupByTitle}
                      </h2>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {policy.title}
                      </h3>
                    </>
                  );
                } else {
                  headings = (
                    <h3 className="text-xl font-semibold mt-6 mb-2 text-white">
                      {policy.title}
                    </h3>
                  );
                }
              }

              return (
                <section key={policy.title}>
                  {headings}

                  {policy.paragraphsBeforeList?.map((paragraph) => (
                    <p className="mb-4" key={paragraph}>{paragraph}</p>
                  ))}

                  {policy.list && (
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      {policy.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {policy.paragraphsAfterList?.map((paragraph) => (
                    <p className="mt-4" key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              );
            })}
          </motion.div>
        </div>
      </div>
    )
  );
};

export default PrivacyPolicy;
