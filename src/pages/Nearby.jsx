import { useState, useEffect, useRef, useCallback } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import { Map } from "../components/Map";
import { PlacesList } from "../components/PlacesList";

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.006 };

const Nearby = () => {
  const [state, setState] = useState({
    places: [],
    selectedPlace: null,
    center: DEFAULT_CENTER,
    loading: true,
    error: null,
    activeTab: "hotels",
    mapLoaded: false,
    userLocationDenied: false,
  });

  const placesService = useRef(null);
  const mapRef = useRef(null);
  const cardsRef = useRef(null);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    setState((prev) => ({ ...prev, mapLoaded: true }));
  }, []);

  const fetchNearbyPlaces = useCallback(
    async (lat, lng) => {
      if (!placesService.current) return;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const request = {
          location: new window.google.maps.LatLng(lat, lng),
          radius: 5000,
          type: state.activeTab === "hotels" ? "lodging" : "restaurant",
        };

        placesService.current.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setState((prev) => ({
              ...prev,
              places: results,
              loading: false,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              error: `Failed to load places: ${status}`,
              loading: false,
            }));
          }
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err.message,
          loading: false,
        }));
      }
    },
    [state.activeTab]
  );

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState((prev) => ({
            ...prev,
            center: newCenter,
            userLocationDenied: false,
          }));
          fetchNearbyPlaces(newCenter.lat, newCenter.lng);
        },
        () => {
          setState((prev) => ({ ...prev, userLocationDenied: true }));
          fetchNearbyPlaces(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
        }
      );
    } else {
      fetchNearbyPlaces(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    }
  }, [fetchNearbyPlaces]);

  const handleTabChange = (tab) => {
    setState((prev) => ({
      ...prev,
      activeTab: tab,
      loading: true,
      places: [],
      selectedPlace: null,
    }));
  };

  const handlePlaceSelect = (place) => {
    setState((prev) => ({ ...prev, selectedPlace: place }));
    if (mapRef.current) {
      mapRef.current.panTo(place.geometry.location);
    }
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCloseInfoWindow = () => {
    setState((prev) => ({ ...prev, selectedPlace: null }));
  };

  useEffect(() => {
    if (state.mapLoaded) {
      getUserLocation();
    }
  }, [state.mapLoaded, state.activeTab, getUserLocation]);

  const {
    places,
    selectedPlace,
    center,
    loading,
    error,
    activeTab,
    userLocationDenied,
  } = state;

  return (
    <div className="min-h-screen  text-gray-800 p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif">
          Discover Nearby Places
        </h2>
        <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />
        <p className="text-gray-600 text-2xl text-center">
          {activeTab === "hotels"
            ? "Find the best hotels in your area"
            : "Explore delicious dining options nearby"}
        </p>
      </header>

      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`flex items-center py-3 px-6 font-medium text-sm md:text-base transition-colors ${
            activeTab === "hotels"
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("hotels")}
        >
          <FiMapPin className="mr-2" />
          Hotels
        </button>
        <button
          className={`flex items-center py-3 px-6 font-medium text-sm md:text-base transition-colors ${
            activeTab === "restaurants"
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("restaurants")}
        >
          <FiNavigation className="mr-2" />
          Restaurants
        </button>
      </div>

      {userLocationDenied && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-yellow-700">
                Using default location. Enable location services for more
                accurate results.
              </p>
            </div>
          </div>
        </div>
      )}

      <Map
        center={center}
        places={places}
        activeTab={activeTab}
        selectedPlace={selectedPlace}
        onMapLoad={handleMapLoad}
        onPlaceSelect={handlePlaceSelect}
        onCloseInfoWindow={handleCloseInfoWindow}
      />

      <div ref={cardsRef}>
        <PlacesList
          places={places}
          loading={loading}
          error={error}
          activeTab={activeTab}
          selectedPlace={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
        />
      </div>
    </div>
  );
};

export default Nearby;
