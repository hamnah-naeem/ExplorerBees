import React, { useEffect, useState } from "react";
import { endpoints } from "../apis/endpoints";
import { getImagefromArray } from "../utils/helper";

const ThingsToDo = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const formData = new URLSearchParams();
        formData.append("city_id", "85437"); // Example: City Id for Islamabad
        formData.append("state_id", "3169");
        formData.append("limit", "10");
        formData.append("offset", "0");
        formData.append("user_email", "test@example.com");
        formData.append("is_interested", "0");
        formData.append("search_text", "");
        formData.append("lat", "31.4218");
        formData.append("lng", "73.0836");
        formData.append("id", "0");

        const res = await fetch(endpoints.getThingsToDo, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const data = await res.json();
        if (!data.error && data.records) {
          setActivities(data.records);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold">Loading activities...</h2>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-white text-black">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif">
        Things To Do
      </h2>
      <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />

      <div className="space-y-16">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } gap-10`}
          >
            {/* Use first image if available */}
            <img
              src={
                activity.images?.length > 0
                  ? getImagefromArray(activity.images)
                  : "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt={activity.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-110"
            />

            <div className="md:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold text-black">{activity.name}</h3>
              <p className="text-gray-700 text-base">{activity.description}</p>
              <p className="text-sm text-gray-500">📍 {activity.address}</p>
              <p className="text-sm text-yellow-600 font-semibold">
                ⭐ {activity.rating} ({activity.review_count} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThingsToDo;
