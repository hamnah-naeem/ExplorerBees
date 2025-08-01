import React, { useState } from 'react';
import { Search } from 'lucide-react';
import herovideo from '../assets/hero-video.mp4';

const Hero = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);

  const countryCityMap = {
    Pakistan: ['Lahore', 'Islamabad', 'Karachi'],
    Turkey: ['Istanbul', 'Ankara', 'Antalya'],
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCities(countryCityMap[country] || []);
  };

  return (
    <div className="overflow-hidden relative">
      {/* Hero Section with Background Video */}
      <div className="h-[550px] lg:h-[600px] relative">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={herovideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto z-20">
          <div className="flex h-[550px] justify-center items-center">
            <div className="flex flex-col space-y-5 justify-center items-center text-center px-4">
              <h1 className="text-white font-bold text-3xl lg:text-6xl">
                Find Next Place To Visit
              </h1>
              <p className="text-white text-base pt-4 lg:text-lg lg:w-[600px]">
                Discover amazing places at exclusive deals
              </p>
              {/* <a href="#explore-cities">
                <button className="bg-[#0b3317] px-4 py-2 text-white rounded-md font-semibold">
                  Start Exploring
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-2xl z-30 absolute hidden lg:block left-1/2 -translate-x-1/2 bottom-[10%] w-[1050px] p-6">
        <div className="flex gap-5 items-center">
          <div className="grid grid-cols-4 gap-6 flex-grow">
            {/* Country */}
            <div className="flex flex-col gap-2">
              <label className="flex font-semibold gap-1 items-center">
                <Search className="w-4 h-4" /> Country
              </label>
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {Object.keys(countryCityMap).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">City</label>
              <select className="border border-gray-300 rounded-md p-2">
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Check In */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Check In</label>
              <input type="date" className="border p-2 border-gray-300 rounded-md" />
            </div>

            {/* Check Out */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Check Out</label>
              <input type="date" className="border p-2 border-gray-300 rounded-md" />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex flex-col mt-6">
            <label className="text-transparent select-none">.</label>
            <button className="bg-black hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
