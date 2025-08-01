import React from "react";
import {
  Hotel,
  MapPin,
  Utensils,
  Car,
  Ship,
  Plane,
  Mountain,
} from "lucide-react";

const services = [
  { label: "Hotel", icon: <Hotel className="w-8 h-8 text-red-600" /> },
  { label: "Tour", icon: <MapPin className="w-8 h-8 text-red-600" /> },
  { label: "Things to do", icon: <Mountain className="w-8 h-8 text-red-600" /> },
  { label: "Restaurants", icon: <Utensils className="w-8 h-8 text-red-600" /> },
  { label: "Car", icon: <Car className="w-8 h-8 text-red-600" /> },
  { label: "Attractions", icon: <Ship className="w-8 h-8 text-red-600" /> },
  { label: "Flights", icon: <Plane className="w-8 h-8 text-red-600" /> },
];

const ServiceIcons = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
          {services.map((service, index) => (
            <div
              key={index}
className="flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"

>

              
              <div className="mb-3 bg-red-100 rounded-full p-3">
                {service.icon}
              </div>
              <p className="font-semibold text-base sm:text-lg text-neutral-800">{service.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIcons;
