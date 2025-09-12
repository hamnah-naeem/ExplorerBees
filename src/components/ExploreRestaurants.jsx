import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Clock, Star, Loader2 } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import next from "../assets/images/home/next.png";
import back from "../assets/images/home/back.png";
import { endpoints } from "../apis/endpoints";
import { getImagefromArray } from "../utils/helper";

const SlickArrowLeft = ({ ...props }) => (
  <img src={next} alt="nextArrow" {...props} />
);
const SlickArrowRight = ({ ...props }) => (
  <img src={back} alt="prevArrow" {...props} />
);

const ExploreRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <SlickArrowLeft />,
    prevArrow: <SlickArrowRight />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const formData = new FormData();
        formData.append("city_id", "85437");
        formData.append("state_id", "3169");
        formData.append("limit", "10");
        formData.append("offset", "0");
        formData.append("user_email", "test@example.com");
        formData.append("is_interested", "0");
        formData.append("search_text", "");
        formData.append("lat", "31.4218");
        formData.append("lng", "73.0836");
        formData.append("id", "0");

        const res = await fetch(endpoints.getRestaurants, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        console.log("Restaurants API response:", data);

        if (!data.error && data.records) {
          setRestaurants(data.records);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:pt-5 px-6 md:px-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif">
          Explore Restaurants
        </h2>
        <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-2">Loading restaurants...</span>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Slider */}
        {!loading && !error && restaurants.length > 0 && (
          <Slider {...settings}>
            {restaurants.map((restaurant, index) => (
              <div key={restaurant.id || index}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5">
                  <img
                    src={
                      restaurant.images?.length > 0
                        ? getImagefromArray(restaurant.images)
                        : "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={restaurant.name}
                    loading="lazy"
                    className="object-cover w-full h-48 hover:scale-110 transition-all"
                  />
                  <div className="p-4">
                    <p className="text-gray-500 flex items-center gap-1 text-sm mb-1">
                      <Clock width={15} />{" "}
                      {restaurant.time_open && restaurant.time_close
                        ? `Open ${restaurant.time_open} - ${restaurant.time_close}`
                        : "Timing not available"}
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      📍 {restaurant.address || "No address"}
                    </p>
                    <p className="flex gap-1 items-center text-yellow-700 font-semibold">
                      <Star width={20} fill="yellow" />{" "}
                      {restaurant.rating || "N/A"} (
                      {restaurant.review_count || 0} reviews)
                    </p>
                    <div className="flex gap-4 justify-center mt-3">
                      <button className="px-3 py-2 bg-black rounded-md text-white">
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default ExploreRestaurants;
