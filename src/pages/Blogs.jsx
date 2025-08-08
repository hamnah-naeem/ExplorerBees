import React, { useState } from "react";
import Newsletter from "../components/Newsletter";
import blogsvideo from "../assets/videos/blogs/blogs-video.mp4";
import card1 from "../assets/images/blogs/card1.jpg";
import card2 from "../assets/images/blogs/card2.jpg";
import card3 from "../assets/images/blogs/card3.jpg";
import card4 from "../assets/images/blogs/card4.jpg";
import card5 from "../assets/images/blogs/card5.jpg";
import card6 from "../assets/images/blogs/card6.jpg";
import card7 from "../assets/images/blogs/card7.jpg";
import card8 from "../assets/images/blogs/card8.jpg";
import card9 from "../assets/images/blogs/card9.jpeg";
import card10 from "../assets/images/blogs/card10.jpg";

const Blogs = () => {
  const allBlogs = [
    {
      id: 1,
      title: "Top 10 Hidden Gems to Explore in Northern Pakistan",
      description:
        "Discover breathtaking spots that most tourists miss. From untouched valleys to serene lakes, this guide covers it all.",
      author: "Hamnah Khan",
      date: "Aug 1, 2025",
      image: card1,
      authorImg: "https://i.pravatar.cc/150?img=15",
      tags: ["Adventure", "Nature", "Pakistan"],
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Food Tourism in Lahore",
      description:
        "Explore the rich flavors of Lahore – from spicy street food to royal Mughlai dishes in the walled city.",
      author: "Ali Raza",
      date: "Jul 18, 2025",
      image: card2,
      authorImg: "https://i.pravatar.cc/150?img=33",
      tags: ["Food", "Culture", "Pakistan"],
      readTime: "10 min read",
    },
    {
      id: 3,
      title: "Istanbul Beyond the Tourist Trail: Hidden Gems",
      description:
        "Discover the authentic side of Istanbul with these lesser-known neighborhoods and local experiences.",
      author: "Aylin Demir",
      date: "Sep 5, 2025",
      image: card5,
      authorImg: "https://i.pravatar.cc/150?img=5",
      tags: ["Culture", "City Guide", "Turkey"],
      readTime: "9 min read",
    },
    {
      id: 5,
      title: "Backpacking Through Balochistan: An Untouched Paradise",
      description:
        "Venture into Pakistan's largest province to discover its raw beauty and welcoming communities.",
      author: "Omar Farooq",
      date: "Jul 10, 2025",
      image: card3,
      authorImg: "https://i.pravatar.cc/150?img=22",
      tags: ["Adventure", "Offbeat", "Pakistan"],
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "Hunza Valley: A Year-Round Travel Guide",
      description:
        "How to experience Hunza's magic in every season, from cherry blossoms to winter snowscapes.",
      author: "Imran Khan",
      date: "Jun 15, 2025",
      image: card4,
      authorImg: "https://i.pravatar.cc/150?img=30",
      tags: ["Nature", "Culture", "Pakistan"],
      readTime: "11 min read",
    },

    {
      id: 6,
      title: "Cappadocia: More Than Just Hot Air Balloons",
      description:
        "Explore the underground cities, hiking trails, and unique geology of this magical Turkish region.",
      author: "Mehmet Yılmaz",
      date: "Aug 22, 2025",
      image: card6,
      authorImg: "https://i.pravatar.cc/150?img=28",
      tags: ["Adventure", "Nature", "Turkey"],
      readTime: "12 min read",
    },
    {
      id: 7,
      title: "Turkish Cuisine: A Regional Food Guide",
      description:
        "From Istanbul's street food to Gaziantep's famous baklava - a complete guide to Turkish culinary delights.",
      author: "Selin Arslan",
      date: "Jul 30, 2025",
      image: card7,
      authorImg: "https://i.pravatar.cc/150?img=19",
      tags: ["Food", "Culture", "Turkey"],
      readTime: "14 min read",
    },
    {
      id: 8,
      title: "The Turquoise Coast: Turkey's Mediterranean Paradise",
      description:
        "Your complete guide to beaches, ancient ruins, and sailing routes along Turkey's stunning southern coast.",
      author: "Deniz Kaya",
      date: "Jun 28, 2025",
      image: card8,
      authorImg: "https://i.pravatar.cc/150?img=42",
      tags: ["Beach", "History", "Turkey"],
      readTime: "10 min read",
    },
    {
      id: 9,
      title: "Ankara Like a Local: Beyond the Government Buildings",
      description:
        "Discover the vibrant arts scene, best cafes, and hidden parks in Turkey's capital city.",
      author: "Can Öztürk",
      date: "Jun 10, 2025",
      image: card9,
      authorImg: "https://i.pravatar.cc/150?img=37",
      tags: ["City Guide", "Culture", "Turkey"],
      readTime: "7 min read",
    },
    {
      id: 10,
      title: "Eastern Turkey: The Undiscovered Frontier",
      description:
        "Journey through the less-visited eastern regions with their stunning landscapes and rich Kurdish culture.",
      author: "Ebru Şahin",
      date: "May 15, 2025",
      image: card10,
      authorImg: "https://i.pravatar.cc/150?img=11",
      tags: ["Adventure", "Offbeat", "Turkey"],
      readTime: "15 min read",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Initially show 6 blogs

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = !activeTag || blog.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    setVisibleBlogs(6); // Reset visible blogs when changing filters
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveTag(null);
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 3); // Load 3 more blogs
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-end px-6">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={blogsvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        <div className="relative z-20 text-right max-w-3xl  text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover <span className="text-yellow-500">Travel Stories</span>
          </h1>
          <p className="text-lg">
            Immerse yourself in unique adventures and expert travel tips from
            passionate explorers.
          </p>
        </div>
      </section>

      {/* Search & Tags */}
      <section className="max-w-7xl mx-auto px-6 mt-16 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search destinations, topics, or authors..."
              className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-sm transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-6 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {[
              "Adventure",
              "Food",
              "Culture",
              "Solo Travel",
              "Safety",
              "Nature",
              "Budget",
              "History",
            ].map((tag) => (
              <span
                key={tag}
                className={`px-4 py-1.5 text-sm rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-sm border ${
                  activeTag === tag
                    ? "bg-yellow-600 text-black border-yellow-600"
                    : "bg-white text-black border-gray-200 hover:border-yellow-600"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-3 font-serif">
          {filteredBlogs.length > 0 ? (
            <>Latest Travel Stories</>
          ) : (
            <>No results found {searchTerm && `for "${searchTerm}"`}</>
          )}
        </h2>
        <hr className="text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10" />

        {filteredBlogs.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
                <div
                  key={blog.id}
                  className="group relative rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-lg font-semibold">
                        {blog.date}
                      </span>
                      <span className="bg-white/90 text-black text-xs px-3 py-1 rounded-lg font-medium">
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`bg-gray-100 text-black text-xs font-medium px-3 py-1 rounded-lg hover:bg-yellow-600 hover:text-white transition ${
                            activeTag === tag ? "bg-yellow-600 text-white" : ""
                          }`}
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {blog.description}
                    </p>

                    {/* Author */}
                    <div className="flex items-center border-t border-gray-100 pt-4">
                      <img
                        src={blog.authorImg}
                        alt={blog.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-black">
                          {blog.author}
                        </p>
                        <p className="text-xs text-gray-500">Travel Writer</p>
                      </div>
                      <button className="ml-auto px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition">
                        Read →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleBlogs < filteredBlogs.length && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMoreBlogs}
                  className="px-8 py-3 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-yellow-600 hover:text-black transition"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Newsletter />
    </div>
  );
};

export default Blogs;
