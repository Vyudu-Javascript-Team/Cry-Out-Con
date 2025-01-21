import { motion } from "framer-motion";
import {
  MapPin,
  Star,
} from "lucide-react";
import LazyImage from "./LazyImage";
import { Suspense } from "react";

import {client} from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

<<<<<<< HEAD
function urlFor(source: any) {
	return builder.image(source);
}

interface Hotel {
  name: string;
  image: any;
  price: number;
  rating: number;
  description: string;
  address: string;
  amenities: { label: string; icon: JSX.Element }[];
  features: string[];
  website: string;
}

const HotelDetails = ({ hotel }: { hotel: Hotel }) => {

  return (       
=======
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary py-12 sm:py-20">
      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Accommodations"
          subtitle="Here is a list of Cry Out Con preferred hotels with discounted rates."
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-7xl mx-auto">
          {hotels.map((hotel) => (
>>>>>>> 112943a630dea8e71d18d1e885bd54505f68a4b9
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Hotel Image Section */}
                <div className="relative h-[300px] sm:h-[350px] lg:h-[400px]">
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                    }
                  >
                    <LazyImage
                      src={urlFor(hotel.image).url()}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </Suspense>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="text-base sm:text-lg font-bold text-white">
                      ${hotel.price}
                    </span>
                    <span className="text-sm text-white/80">/night</span>
                  </div>
                </div>

                {/* Hotel Details Section */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {hotel.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <span className="text-white text-lg">{hotel.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6">
                    {hotel.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span>{hotel.address}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-4">
                      Amenities
                    </h3>
<<<<<<< HEAD
                    <div className="grid grid-cols-2 gap-4">
                      {hotel.amenities.map((amenity: any,) => (
=======
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                      {hotel.amenities.map((amenity) => (
>>>>>>> 112943a630dea8e71d18d1e885bd54505f68a4b9
                        <div
                          key={amenity.label}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                          <span>{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-4">
                      Features
                    </h3>
<<<<<<< HEAD
                    <ul className="list-disc list-inside text-gray-300 grid grid-cols-2 gap-2">
                      {hotel.features.map((feature: any) => (
=======
                    <ul className="list-disc list-inside text-gray-300 grid grid-cols-1 xs:grid-cols-2 gap-2">
                      {hotel.features.map((feature) => (
>>>>>>> 112943a630dea8e71d18d1e885bd54505f68a4b9
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <motion.a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
  );
};

export default HotelDetails;
