import React from "react";
import { FaEye, FaCommentDots, FaCalendarAlt } from "react-icons/fa";

const RelatedPosts = ({ relatedBlogs }) => {
    if (!relatedBlogs || relatedBlogs.length === 0) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-black">Related Posts</h2>
                    <p className="text-center text-gray-600">No related posts found.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-black">Related Posts</h2>

                {/* Category Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="flex gap-4 bg-white rounded-lg p-1 shadow-sm">
                        {['All', 'Technology', 'Entertainment', 'Social Media', 'Other', 'Search'].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${tab === 'Entertainment'
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:text-black'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className="p-2 text-gray-600 hover:text-black">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Related Posts Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="group relative rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Category & Date */}
                                <div className="flex items-center gap-4 mb-3 text-xs">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Technology</span>
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            <FaEye className="text-gray-500" />
                                            <span>5163</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <FaCommentDots className="text-gray-500" />
                                            <span>6 min</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt className="text-gray-500" />
                                            <span>Jun 14, 2023</span>
                                        </div>
                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                                    MY REVOLUTIONARY BULLSH!TS About "ATOMIC HABIT"
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    Via identity and approach prospects with your B2B value propositions and help them make buying decisions
                                </p>

                                {/* Author & Read More */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={blog.authorImg}
                                            alt={blog.author}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-xs text-gray-600">{blog.author}</span>
                                    </div>
                                    <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded text-sm hover:bg-yellow-600 transition">
                            &lt;
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-yellow-600 text-white rounded text-sm">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition">
                            3
                        </button>
                        <span className="px-2 text-gray-500">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition">
                            25
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition">
                            26
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition">
                            30
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded text-sm hover:bg-yellow-600 transition">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RelatedPosts;