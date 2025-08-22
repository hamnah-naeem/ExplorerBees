import React from "react";
import { useParams } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import BlogHero from "./BlogHero";
import BlogContent from "./BlogContent";
import RelatedPosts from "./RelatedPosts";
import blogData from "../dummy-data/blogs";
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

const BlogDetail = () => {
  const { id } = useParams();

  const imageMap = {
    "card1.jpg": card1,
    "card2.jpg": card2,
    "card3.jpg": card3,
    "card4.jpg": card4,
    "card5.jpg": card5,
    "card6.jpg": card6,
    "card7.jpg": card7,
    "card8.jpg": card8,
    "card9.jpeg": card9,
    "card10.jpg": card10,
  };

  const allBlogs = blogData.map((blog) => ({
    ...blog,
    image: imageMap[blog.image],
  }));

  const currentBlog = allBlogs.find((blog) => blog.id === parseInt(id));
  const relatedBlogs = allBlogs.filter(
    (blog) => blog.id !== parseInt(id) && 
    blog.tags.some(tag => currentBlog?.tags.includes(tag))
  ).slice(0, 3);

  if (!currentBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHero blog={currentBlog} />
      <BlogContent blog={currentBlog} allBlogs={allBlogs} />
      <RelatedPosts relatedBlogs={relatedBlogs} />
      <Newsletter />
    </div>
  );
};

export default BlogDetail;