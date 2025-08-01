import React from "react";
import { Mountain, Bike, Camera, Waves } from "lucide-react";
import hikingImg from "../assets/activities/hiking.jpg";
import waterImg from "../assets/activities/watersports.jpg";
import ziplineImg from "../assets/activities/zipline.jpg";
import photographyImg from "../assets/activities/photography.jpg";

const activities = [
  {
    title: "Mountain Hiking",
    desc: "Embark on breathtaking hikes across scenic trails and towering peaks. Whether you're a seasoned trekker or a nature enthusiast, discover hidden waterfalls, lush greenery, and panoramic mountain views.",
    icon: <Mountain size={28} />,
    image: hikingImg,
  },
  {
    title: "Water Sports",
    desc: "Dive into adventure with thrilling water activities like kayaking, jet skiing, paddleboarding, and snorkeling. Perfect for adrenaline seekers and beach lovers looking to enjoy the waves and soak in the sun.",
    icon: <Waves size={28} />,
    image: waterImg,
  },
  {
    title: "Zip-lining & Adventure",
    desc: "Soar above treetops and valleys with zip-lining, challenge yourself with rope courses, and engage in high-altitude fun. Ideal for thrill-seekers craving an action-packed outdoor experience.",
    icon: <Bike size={28} />,
    image: ziplineImg,
  },
  {
    title: "Photography Spots",
    desc: "Discover stunning photography locations—sunset cliffs, vibrant wildlife areas, and serene landscapes. Whether you're using a DSLR or your phone, capture nature’s magic and create unforgettable memories.",
    icon: <Camera size={28} />,
    image: photographyImg,
  },
];


const ThingsToDo = () => {
  return (
    <section className="py-16 px-6 bg-white text-black">
   <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Things To Do</h2>
       <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
     <div className="space-y-16">
  {activities.map((activity, index) => (
    <div
      key={index}
      className={`flex flex-col md:flex-row items-center ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      } gap-10`}
    >
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-110"
      />

      <div className="md:w-1/2 space-y-4">
        <div className="flex items-center gap-3 text-yellow-600">
          {/* Icon bigger and yellow */}
          <span className="text-yellow-600">{React.cloneElement(activity.icon, { size: 40 })}</span>
          {/* Heading bigger and yellow */}
          <h3 className="text-3xl font-bold text-black">{activity.title}</h3>
        </div>
        <p className="text-gray-700 text-base">{activity.desc}</p>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default ThingsToDo;
