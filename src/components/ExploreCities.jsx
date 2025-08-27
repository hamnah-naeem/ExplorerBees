import React, { useEffect, useState } from "react";
import next from "../assets/images/home/next.png";
import back from "../assets/images/home/back.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Clock, Star, Loader2 } from "lucide-react";

const SlickArrowLeft = ({ ...props }) => (
  <img src={next} alt="prevArrow" {...props} />
);
const SlickArrowRight = ({ ...props }) => (
  <img src={back} alt="nextArrow" {...props} />
);

const ExploreCities = () => {
  const [cities, setCities] = useState([]);
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const formData = new FormData();
       formData.append("country_id", "167");
        formData.append("limit", "10");
        formData.append("zero_page", "2");
        

        const response = await fetch(
          "https://app.explorerbees.com/apiv/api_v10/getCities.php",
          {
            method: "POST",
            body: formData, // sending as form data
          }
        );

        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        console.log("API response:", data);
setCities((data?.records || []).slice(0, 50));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

 

  return (
    <section
      id="explore-cities"
      className="w-full py-12 md:py-24 lg:pt-16 px-6 md:px-0"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif">
          Explore Cities
        </h2>
        <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-2">Loading cities...</span>
          </div>
        )}

        {/* Error State */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Data Slider */}
        {!loading && !error && cities.length > 0 && (
          <div className="slider-container">
            <Slider {...settings}>
              {cities.map((city) => (
                <div key={city.id}>
                  <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5">
                    <img
                      src={`https://via.placeholder.com/600x400?text=${city.name}`}
                      alt={city.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 hover:scale-110 transition-all"
                    />

                    <div className="p-4">
                      <p className="text-gray-500 flex items-center gap-1 text-sm mb-1">
                        {/* <Clock width={15} /> {city.climate || "N/A"} */}
                      </p>
                      <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                      {/* <p className="flex gap-1 items-center">
                        <Star width={20} fill="yellow" /> {"3 (12 reviews)"}
                      </p> */}
                      <p className="text-gray-600 mb-4 mt-2 line-clamp-3">
                        {city.description !== "0"
                          ? city.description.replace(/<[^>]+>/g, "")
                          : "No description available"}
                      </p>

                      <div className="flex gap-4 justify-center">
                        <button className="px-3 py-2 bg-yellow-600 rounded-md text-white">
                          {city.state_code || "PK"}
                        </button>
                        <button className="px-3 py-2 bg-black rounded-md text-white">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreCities;
