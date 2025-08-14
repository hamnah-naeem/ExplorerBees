import { User, MapPin, Bell, Globe, Calendar, Star } from "lucide-react";

export default function RegisterLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-600 to-yellow-700 p-12 flex-col justify-evenly text-white">
      
      {/* Top Section */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Join ExplorerBees Today</h1>
        <p className="text-xl text-yellow-100">
          Unlock personalized travel experiences and start exploring the world's hidden gems.
        </p>
      </div>

      {/* Feature List */}
      <div className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Globe className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Global Destinations</h3>
            <p className="text-yellow-100 text-sm">
              Access thousands of curated travel spots worldwide
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Trip Planning</h3>
            <p className="text-yellow-100 text-sm">
              Create and manage your perfect travel itinerary
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Premium Guides</h3>
            <p className="text-yellow-100 text-sm">
              Expert recommendations for every type of traveler
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex space-x-8 text-center">
        <div>
          <div className="text-3xl font-bold">200+</div>
          <div className="text-yellow-100 text-sm">Countries</div>
        </div>
        <div>
          <div className="text-3xl font-bold">50K+</div>
          <div className="text-yellow-100 text-sm">Local Guides</div>
        </div>
        <div>
          <div className="text-3xl font-bold">24/7</div>
          <div className="text-yellow-100 text-sm">Travel Support</div>
        </div>
      </div>
    </div>
  );
}
