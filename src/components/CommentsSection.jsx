import React, { useState } from "react";
import card1 from "../assets/images/blogs/card1.jpg";
import card2 from "../assets/images/blogs/card2.jpg";
import card3 from "../assets/images/blogs/card3.jpg";

const CommentsSection = () => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Harlie",
      comment: "We tried the most spectacular view, unfortunately it was very sad in the rainy from 7-20/3 pm due to we are overthinking and our picnic",
      rating: 5,
      timeAgo: "about 1 hour ago",
      avatar: card1
    },
    {
      id: 2,
      name: "Smith",
      comment: "Stunning views of Queenstown. Very photogenic and a so main. Definitely gonna come back one visit.",
      rating: 5,
      timeAgo: "1 hour ago",
      avatar: card2
    },
    {
      id: 3,
      name: "Kami",
      comment: "What about respect to all of life? 🤔",
      rating: 5,
      timeAgo: "3 hours ago",
      avatar: card3
    }
  ]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        name: "Guest User",
        comment: newComment,
        rating: rating,
        timeAgo: "just now",
        avatar: card1
      };
      setComments([...comments, comment]);
      setNewComment("");
      setRating(5);
    }
  };

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-8 text-black">Add a Review</h3>
      
      {/* Add Comment Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-sm text-gray-600 mb-4">
          How was this post helpful to you, feedback, what made questions.
        </p>
        
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
            rows="4"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleCommentSubmit}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
            >
              Post review
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold text-black">{comments.length} comments</h4>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Most Popular</option>
          </select>
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-medium text-black">{comment.name}</h5>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${star <= comment.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{comment.timeAgo}</span>
                <button className="hover:text-yellow-600">Like</button>
                <button className="hover:text-yellow-600">Reply</button>
              </div>
            </div>
          </div>
        ))}

        {/* Loading More Comments */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
            <span className="text-sm">Loading comment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;