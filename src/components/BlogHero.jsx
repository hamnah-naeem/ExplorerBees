import React from "react";
import { Link } from "react-router-dom"; 
const BlogHero = ({ blog }) => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm">
          <span className="text-yellow-500">Home</span>
          <span className="mx-2">/</span>
          {/* <span className="text-yellow-500">Blog</span> */}
           <Link to="/blogs" className="text-yellow-500">Blog</Link>
          <span className="mx-2">/</span>
          <span>Single_blog</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl leading-tight">
          {blog.title}
        </h1>
      </div>
    </section>
  );
};

export default BlogHero;