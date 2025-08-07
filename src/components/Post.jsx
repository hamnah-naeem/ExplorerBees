import { HiDotsCircleHorizontal } from "react-icons/hi";
import {
  FaRegComment,
  FaShare,
  FaRegHeart,
  FaRegBookmark,
  FaRegShareSquare,
} from "react-icons/fa";

export default function Post({
  name,
  handle,
  content,
  time,
  likes,
  shares,
  replies,
  image,
  onReply,
  avatar,
}) {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition duration-200">
      <div className="flex">
        <div className="mr-3">
          <img className="rounded-full w-12 h-12" src={avatar} alt="Avatar" />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold mr-1 text-black">{name}</span>
            <span className="text-gray-500 mr-1">@{handle}</span>
            <span className="text-gray-500">· {time}</span>
            <button className="ml-auto text-gray-500 hover:text-yellow-600">
              <HiDotsCircleHorizontal />
            </button>
          </div>
          <div className="mt-1 mb-2 whitespace-pre-wrap text-base text-black">
            {content}
          </div>
          {image && (
            <img
              src={image}
              alt="Post content"
              className="rounded-2xl max-h-80 w-full object-cover mb-2"
            />
          )}
          <div className="flex justify-between text-gray-500 max-w-md mt-2">
            <button
              className="flex items-center space-x-1 hover:text-yellow-600"
              onClick={onReply}
            >
              <FaRegComment className="text-sm" />
              <span className="text-sm">{replies}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaShare className="text-sm" />
              <span className="text-sm">{shares}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-yellow-600">
              <FaRegHeart className="text-sm" />
              <span className="text-sm">{likes}</span>
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