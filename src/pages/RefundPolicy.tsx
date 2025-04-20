import { useState, useEffect } from "react";

import { getRefundPolicy } from "../lib/sanity";

type PolicyPageData = {
  heading: string;
  items: [{ title: string; content: string; order: number }];
};

const Policy = () => {
  const [policyPage, setPolicyPage] = useState<PolicyPageData | null>(null);

  useEffect(() => {
    const fetchPolicyPage = async () => {
      try {
        const data = await getRefundPolicy();

        if (data) {
          setPolicyPage(data);
        }
      } catch (error) {
        console.error("Error fetching policy page: ", error);
      }
    };

    fetchPolicyPage();
  }, []);

  return (
    policyPage && (
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold mb-8">{policyPage.heading}</h1>

        <div className="space-y-6">
          {policyPage.items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <section>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p>{item.content}</p>
              </section>
            ))}
        </div>
      </div>
    )
  );
};

export default Policy;
