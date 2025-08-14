import { VscSearch } from "react-icons/vsc";
import { RiMicAiLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";

export default function LoginLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-600 to-yellow-700 p-12 flex-col justify-center items-start text-white relative">
      <div className="mb-26">
        <h1 className="text-4xl font-bold mb-6">Welcome to Explorer Bees</h1>
        <p className="text-xl mb-10 text-yellow-100">
          Access your personalized travel dashboard and continue planning your next adventure.
        </p>
        
        <div className="space-y-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <VscSearch className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Expert Travel Planning</h3>
              <p className="text-yellow-100 text-sm">Access curated itineraries and destination insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <RiMicAiLine className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Smart Recommendations</h3>
              <p className="text-yellow-100 text-sm">Get AI-powered suggestions based on your preferences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <GoLocation className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Trip Management</h3>
              <p className="text-yellow-100 text-sm">Track your upcoming trips and saved destinations</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-10 text-center">
        <div>
          <div className="text-3xl font-bold">50K+</div>
          <div className="text-yellow-100 text-sm">Destinations</div>
        </div>
        <div>
          <div className="text-3xl font-bold">1M+</div>
          <div className="text-yellow-100 text-sm">Travel Itineraries</div>
        </div>
        <div>
          <div className="text-3xl font-bold">24/7</div>
          <div className="text-yellow-100 text-sm">Support</div>
        </div>
      </div>
    </div>
  );
}