import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Globe,
  Star,
  Coffee,
  Wifi,
  Waves,
  Car,
  Utensils,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import LazyImage from "./LazyImage";
import { Suspense } from "react";

const HotelDetails = () => {
  const hotels = [
    {
      name: "Marriott Marquis Houston",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
      description:
        "Connected to the George R. Brown Convention Center, featuring a rooftop Texas-shaped lazy river and infinity pool.",
      address: "1777 Walker St, Houston, TX 77010",
      phone: "+1 (713) 654-1777",
      website: "https://book.passkey.com/e/50935226",
      rating: 4.5,
      price: 189,
      amenities: [
        { icon: <Waves className="w-5 h-5" />, label: "Rooftop Pool" },
        { icon: <Wifi className="w-5 h-5" />, label: "Free WiFi" },
        { icon: <Coffee className="w-5 h-5" />, label: "Restaurant" },
        { icon: <Car className="w-5 h-5" />, label: "Valet Parking" },
        { icon: <Utensils className="w-5 h-5" />, label: "Room Service" },
      ],
      features: [
        "Connected to Convention Center",
        "Texas-shaped Lazy River",
        "Infinity Pool",
        "Luxury Spa",
        "Multiple Restaurants",
      ],
    },
    {
      name: "Hilton Americas-Houston",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80",
      description:
        "Downtown luxury hotel with skyline views and direct access to the George R. Brown Convention Center.",
      address: "1600 Lamar St, Houston, TX 77010",
      phone: "+1 (713) 739-8000",
      website:
        "https://book.passkey.com/gt/220475741?gtid=a12b4ac2d9c17f6187cd3142d1ce7032",
      rating: 4.4,
      price: 179,
      amenities: [
        { icon: <Waves className="w-5 h-5" />, label: "Indoor Pool" },
        { icon: <Wifi className="w-5 h-5" />, label: "Free WiFi" },
        { icon: <Coffee className="w-5 h-5" />, label: "Restaurant" },
        { icon: <Car className="w-5 h-5" />, label: "Parking" },
        { icon: <Utensils className="w-5 h-5" />, label: "Room Service" },
      ],
      features: [
        "Skyline Views",
        "Convention Center Access",
        "Full-Service Spa",
        "Executive Lounge",
        "Health Club",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary py-20">
      <div className="container relative max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Hotels"
          subtitle="Here is a list of hotels you can get accommodation"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Hotel Image Section */}
                <div className="relative h-[400px]">
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 w-full h-full bg-gray-900 animate-pulse" />
                    }
                  >
                    <LazyImage
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </Suspense>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="text-lg font-bold text-white">
                      ${hotel.price}
                    </span>
                    <span className="text-sm text-white/80">/night</span>
                  </div>
                </div>

                {/* Hotel Details Section */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white">
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
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5" />
                      <span>{hotel.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Globe className="w-5 h-5" />
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Book on Official Website
                      </a>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-4">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {hotel.amenities.map((amenity) => (
                        <div
                          key={amenity.label}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          {amenity.icon}
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
                    <ul className="list-disc list-inside text-gray-300 grid grid-cols-2 gap-2">
                      {hotel.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <motion.a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
