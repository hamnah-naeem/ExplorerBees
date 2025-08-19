import React from "react";

const BlogSidebar = ({ blog, allBlogs }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 space-y-8">
        {/* Author Info */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={blog.authorImg}
              alt={blog.author}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-black">{blog.author}</h4>
              <p className="text-sm text-gray-600">Travel Writer</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Passionate about exploring new destinations and sharing travel experiences with fellow adventurers.
          </p>
        </div>

        {/* Tags */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-bold text-black mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white text-black text-xs border border-gray-200 rounded-lg hover:bg-yellow-600 hover:text-white transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-bold text-black mb-4">Recent Posts</h4>
          <div className="space-y-4">
            {allBlogs.slice(0, 3).map((recentBlog) => (
              <div key={recentBlog.id} className="flex gap-3">
                <img
                  src={recentBlog.image}
                  alt={recentBlog.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h5 className="text-sm font-medium text-black line-clamp-2 hover:text-yellow-600 cursor-pointer">
                    {recentBlog.title}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">{recentBlog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;