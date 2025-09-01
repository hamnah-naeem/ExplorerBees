import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Clock, Star, Loader2 } from "lucide-react";
import next from "../assets/images/home/next.png";
import back from "../assets/images/home/back.png";
import { endpoints } from "../apis/endpoints";

const SlickArrowLeft = ({ ...props }) => (
  <img src={back} alt="prevArrow" {...props} />
);
const SlickArrowRight = ({ ...props }) => (
  <img src={next} alt="nextArrow" {...props} />
);

const ExploreHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const formData = new FormData();
        formData.append("city_id", "85475"); // Example: Islamabad
        formData.append("state_id", "3169");
        formData.append("email", "test@example.com");
        formData.append("type", "hotel");
        formData.append("maximum_guest", "");
        formData.append("facilities_array", "");
        formData.append("start_date", "");
        formData.append("end_date", "");
        formData.append("start_price", "");
        formData.append("end_price", "");
        formData.append("limit", "10");
        formData.append("offset", "0");
        formData.append("is_interested", "");
        formData.append("search_text", "");
        formData.append("lat", "33.6844");
        formData.append("lng", "73.0479");
        formData.append("id", "");

        const res = await fetch(
          endpoints.getHotels,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        console.log("API response:", data);

        if (!data.error) {
          setHotels(data.records);
        }
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="w-full py-12 md:py-24 lg:pt-5 px-6 md:px-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif">
          Explore Hotels
        </h2>
        <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-yellow-600" />
          </div>
        ) : (
          <Slider {...settings}>
            {hotels.map((hotel, index) => {
             const imageUrl =
               city.image && city.image.length > 0
                 ? `https://app.explorerbees.com/uploads/${city.image[0].image_name}`
                 : `https://placehold.co/600x400?text=${encodeURIComponent(city.name)}`;

              return (
                <div key={index}>
                  <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5">
                    <img
                      src={imageUrl}
                      alt={hotel.name}
                      className="object-cover w-full h-48 hover:scale-110 transition-all"
                    />
                    <div className="p-4">
                      {/* Placeholder since API has no duration */}
                      <p className="text-gray-500 flex items-center gap-1 text-sm mb-1">
                        <Clock width={15} /> {"—"}
                      </p>

                      <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                      <p className="text-gray-600 mb-1">
                        Located in {hotel.city_name || "Unknown"}
                      </p>

                      <p className="flex gap-1 items-center">
                        <Star width={20} fill="yellow" />{" "}
                        {hotel.rating || "N/A"}
                      </p>

                      <div className="flex gap-4 justify-center mt-3">
                        <button className="px-3 py-2 bg-yellow-600 rounded-md text-white">
                          ${hotel.price || "N/A"}
                        </button>
                        <button className="px-3 py-2 bg-black rounded-md text-white">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default ExploreHotels;
