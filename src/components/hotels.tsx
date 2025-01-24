import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import { getAllHotels } from "../lib/sanity";
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

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getAllHotels();
        if (!data) {
          throw new Error("No hotels data found");
        }
        setHotels(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching hotels',error);
      } 
    };
    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary py-20">
      <div className="container relative max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Accommodations"
          subtitle="Here is a list of Cry Out Con preferred hotels with discounted rates."
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

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
