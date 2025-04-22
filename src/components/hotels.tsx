import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import { getAllHotels } from "../lib/sanity";
import { getDiscounts } from "../lib/sanity";
import HotelDetails from "./HotelDetails";

interface Hotel {
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  address: string;
  amenities: { label: string; icon: JSX.Element }[];
  features: string[];
  website: string;
}

type DiscountsData = {
  intro: string;
  discounts: [
    {
      title: string;
      intro?: string;
      items: [{ name: string; code: string }];
    },
  ];
};

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [discounts, setDiscounts] = useState<DiscountsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  useEffect(() => {
    const fetchDiscountsPlusHotels = async () => {
      try {
        const data = await getAllHotels();
        const discountsData = await getDiscounts();

        if (!data || !discountsData) {
          throw new Error("No hotels data found");
        }
        setHotels(data);
        setDiscounts(discountsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hotels", error);
      }
    };
    fetchDiscountsPlusHotels();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary py-20 mb-20">
      <div className="container relative max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Travel and Accommodations"
          subtitle="Below, please find Cry Out Con preferred airlines, rental vehicle agencies, and hotels with discounted rates for Cry Out Con attendees!"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {discounts && (
          <div className="max-w-7xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <p className="text-center mb-6 text-white/90">{discounts.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {discounts.discounts.map((discount) => (
                <div key={discount.title}>
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {discount.title}
                  </h3>
                  {discount.intro && (
                    <p className="text-sm mb-3 text-white/80">
                      {discount.intro}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {discount.items.map((item) => (
                      <li
                        key={item.code}
                        className="flex flex-col sm:flex-row sm:items-center justify-between"
                      >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                            Discount Code: {item.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(item.code)}
                            className="bg-blue-500/30 hover:bg-blue-500/50 transition-colors p-1.5 rounded-full"
                            aria-label="Copy United Airlines discount code"
                          >
                            {copiedCode === item.code ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">
            {hotels &&
              hotels.map((hotel) => (
                <HotelDetails key={hotel.name} hotel={hotel} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
