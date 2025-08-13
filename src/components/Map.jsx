import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { DarkModeMap } from "./DarkModeMap";
import { LoadScript } from "@react-google-maps/api";

export const Map = ({
  center,
  places,
  activeTab,
  selectedPlace,
  onMapLoad,
  onPlaceSelect,
  onCloseInfoWindow,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="relative mb-8">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-gray-800 text-yellow-300"
              : "bg-white text-gray-700 shadow-md"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
          loadingElement={
            <div className="h-[400px] bg-gray-200 animate-pulse rounded-xl" />
          }
        >
          <DarkModeMap
            center={center}
            zoom={14}
            darkMode={darkMode}
            onMapLoad={onMapLoad}
            places={places}
            activeTab={activeTab}
            selectedPlace={selectedPlace}
            onPlaceSelect={onPlaceSelect}
            onCloseInfoWindow={onCloseInfoWindow}
          />
        </LoadScript>
      </div>
    </div>
  );
};
