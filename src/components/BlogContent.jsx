import React, { useState } from "react";
import BlogSidebar from "./BlogSidebar";
import CommentsSection from "./CommentsSection";
import { FaUser, FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import { FaShareAlt, FaHeart, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const BlogContent = ({ blog, allBlogs }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-3">
                    {/* Blog Meta Info */}
                    <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaUser className=" text-gray-600" />
                            <span>{blog.readTime} read</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-600" />
                            <span>September</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCommentDots className="text-gray-600" />
                            <span>Bangladesh, boshir dostum Bread Nougat, local</span>
                        </div>
                    </div>

                    {/* Social Share Icons */}
                    <div className="flex items-center justify-end gap-4 mb-8">
                        <button className="p-2 text-gray-600 hover:text-yellow-600 transition">
                            <FaShareAlt className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-600 hover:text-yellow-600 transition">
                            <FaHeart className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-600 hover:text-yellow-600 transition">
                            <FaXTwitter className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-600 hover:text-yellow-600 transition">
                            <FaPinterest className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Main Article Content */}
                    <article className="prose prose-lg max-w-none mb-16">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-black">Life is a beautiful journey not a destination</h2>
                            <p className="text-sm text-yellow-600 mb-6">— Entertainment</p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                Sundarbans National Park, a must-visit place in Bangladesh. Part of the Sundarbans on the Ganges Delta and home to the magnificent Bengal Tiger reserves. Sundarbans National Park is one of the most naturally productive biological ecosystems on earth.
                            </p>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-8">
                            <img
                                src={blog.image}
                                alt="Adventure travelers on mountain peak"
                                className="w-full h-80 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Post Details Section */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4 text-black">Post Details</h3>
                            <div className="text-sm text-gray-600 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Posted by:</span>
                                    <span>01-05-2023</span>
                                    <span className="ml-4 font-medium">Author:</span>
                                    <span className="text-yellow-600">Moshiur</span>
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed">
                                Bangladesh offers many tourist attractions, including archaeological sites, historical mosques and monuments, longest natural
                                beach in the world, picturesque landscape, hill forests and wildlife, rolling tea gardens and tribes. Tourist find the rich flora and fauna
                                and colorful tribal life very enchanting.
                            </p>

                            <p className="text-gray-700 leading-relaxed">
                                Bangladesh offers many tourist attractions, including archaeological sites, historical mosques and monuments, longest natural
                                beach in the world, picturesque landscape.
                            </p>

                            <p className="text-gray-700 leading-relaxed">
                                Hill forests and wildlife, rolling tea gardens and tribes. Tourist find the rich flora and fauna and colorful tribal life very enchanting.
                            </p>
                        </div>
                    </article>

                    <CommentsSection />
                </div>

                {/* Right Sidebar */}
                <BlogSidebar blog={blog} allBlogs={allBlogs} />
            </div>
        </div>
    );
};

export default BlogContent;