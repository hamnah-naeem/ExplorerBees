import { HiDotsCircleHorizontal } from "react-icons/hi";
import {
  FaRegComment,
  FaShare,
  FaRegHeart,
  FaRegBookmark,
  FaRegShareSquare,
} from "react-icons/fa";
// import {  } from "../utils/helper";

export default function Post({
  name,
  username,
  description,
  time,
  total_likes,
  total_reposts,
  total_comments,
  image,
  poll,
  onReply,
  user_image,
}) {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition duration-200">
      <div className="flex">
        <div className="mr-3">
          <img
            className="rounded-full w-12 h-12"
            src={user_image ? imageURL + user_image : "placeholder_user.png"}
            alt="Avatar"
            onError={(e) => {
              e.target.src = imageURL + "placeholder_user.png";
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold mr-1 text-black">{name}</span>
            <span className="text-gray-500 mr-1">@{username}</span>
            <span className="text-gray-500">· {time}</span>
            <button className="ml-auto text-gray-500 hover:text-yellow-600">
              <HiDotsCircleHorizontal />
            </button>
          </div>
          <div className="mt-1 mb-2 whitespace-pre-wrap text-base text-black">
            {description}
          </div>
          {image && (
            <img
              src={image}
              alt="Post content"
              className="rounded-2xl max-h-80 w-full object-cover mb-2"
            />
          )}
          {poll && (
            <div className="mt-3 mb-3 border border-gray-200 rounded-xl p-3">
              <div className="font-medium mb-2"></div>
              {poll.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                      <div
                        className="bg-yellow-500 h-full rounded-full"
                        style={{ width: `${poll.votes[index] || 0}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center px-3 text-sm">
                        {option}
                      </div>
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {poll.votes[index] || 0}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between text-gray-500 max-w-md mt-2">
            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaRegHeart className="text-sm" />
              <span className="text-sm">{total_likes}</span>
            </button>

            <button
              className="flex items-center space-x-1 hover:text-yellow-600"
              onClick={onReply}
            >
              <FaRegComment className="text-sm" />
              <span className="text-sm">{total_comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaShare className="text-sm" />
              <span className="text-sm">{total_reposts}</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaRegBookmark className="text-sm" />
            </button>
            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaRegShareSquare className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
