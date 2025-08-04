import { useState, useRef } from "react";
import {
  HiHome,
  HiHashtag,
  HiBell,
  HiMail,
  HiBookmark,
  HiOutlineUser,
  HiDotsCircleHorizontal,
  HiOutlinePhotograph,
  HiX,
} from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaSearch,
  FaRegComment,
  FaRetweet,
  FaRegHeart,
  FaRegBookmark,
  FaRegShareSquare,
} from "react-icons/fa";
import { RiFileListLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import twitterdp from "../assets/social/twitter-dp.jpg";
import tweetImage from "../assets/social/tweet-image.jpeg";

export default function Social() {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      name: "Elon Musk",
      handle: "@elonmusk",
      content: "Exciting news about Starship!",
      time: "2h",
      likes: "24.5K",
      retweets: "3.2K",
      replies: "1.8K",
      image: tweetImage,
      repliesList: [
        {
          id: 101,
          name: "Space Fan",
          handle: "@spacefan1",
          content: "Can't wait for the launch!",
          time: "1h",
        },
        {
          id: 102,
          name: "Tech Enthusiast",
          handle: "@techie",
          content: "What's the expected payload capacity?",
          time: "45m",
        },
      ],
    },
    {
      id: 2,
      name: "React",
      handle: "@reactjs",
      content: "React 19 is coming! #ReactJS",
      time: "5h",
      likes: "8.2K",
      retweets: "1.5K",
      replies: "432",
      repliesList: [],
    },
    {
      id: 3,
      name: "Travel Enthusiast",
      handle: "@wanderlust",
      content:
        "Just visited the Maldives! The water is crystal clear and the beaches are pristine. #Travel #Maldives",
      time: "3h",
      likes: "5.7K",
      retweets: "1.2K",
      replies: "289",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      repliesList: [
        {
          id: 103,
          name: "Vacation Planner",
          handle: "@travelpro",
          content: "What resort did you stay at? Looking for recommendations!",
          time: "2h",
        },
      ],
    },
  ]);

  const [newTweet, setNewTweet] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTweet = () => {
    if (newTweet.trim() || selectedImage) {
      const tweet = {
        id: Date.now(),
        name: "Explorer Bees",
        handle: "explorer_bees",
        content: newTweet,
        time: "Just now",
        likes: "0",
        retweets: "0",
        replies: "0",
        image: selectedImage,
        repliesList: [],
      };
      setTweets([tweet, ...tweets]);
      setNewTweet("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReply = (tweetId) => {
    if (replyContent.trim()) {
      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const newReply = {
            id: Date.now(),
            name: "Explorer Bees",
            handle: "explorer_bees",
            content: replyContent,
            time: "Just now",
          };
          return {
            ...tweet,
            replies: (parseInt(tweet.replies) + 1).toString(),
            repliesList: [newReply, ...tweet.repliesList],
          };
        }
        return tweet;
      });
      setTweets(updatedTweets);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Sidebar */}
          <div className="lg:col-span-2 xl:col-span-3 px-2 sticky top-0 h-screen hidden md:flex flex-col justify-between py-2">
            <div className="flex flex-col">
              <SidenavLink Icon={FaXTwitter} className=" text-3xl mb-4" />
              <SidenavLink active Icon={HiHome} text="Home" />
              <SidenavLink Icon={HiHashtag} text="Explore" />
              <SidenavLink Icon={HiBell} text="Notifications" />
              <SidenavLink Icon={HiMail} text="Messages" />
              <SidenavLink Icon={RiFileListLine} text="Lists" />
              <SidenavLink Icon={HiBookmark} text="Bookmarks" />
              <SidenavLink Icon={HiOutlineUser} text="Profile" />
              <SidenavLink Icon={HiDotsCircleHorizontal} text="More" />

              <button
                onClick={handleTweet}
                className="bg-white text-black font-semibold py-3 px-3 rounded-full text-md mt-2 mx-0"
              >
                Post
              </button>
            </div>

            <div className="mb-4 p-3 hover:bg-gray-800 rounded-full cursor-pointer flex items-center">
              <img className="rounded-full w-10 h-10" src={logo} alt="Avatar" />
              <div className="ml-3">
                <div className="font-bold">Explorer Bees</div>
                <div className="text-gray-500">explorer_bees</div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3 md:hidden z-50">
            <SidenavLink active Icon={HiHome} />
            <SidenavLink Icon={HiHashtag} />
            <SidenavLink Icon={HiBell} />
            <SidenavLink Icon={HiMail} />
          </div>

          {/* Feed */}
          <div className="lg:col-span-7 xl:col-span-6 h-screen overflow-y-auto border-x border-gray-800">
            <FeedHeader />
            <TweetBox
              value={newTweet}
              onChange={setNewTweet}
              onTweet={handleTweet}
              selectedImage={selectedImage}
              onImageUpload={handleImageUpload}
              removeImage={removeImage}
              fileInputRef={fileInputRef}
            />
            <div className="pb-16 md:pb-0">
              {tweets.map((tweet) => (
                <div key={tweet.id}>
                  <Tweet
                    {...tweet}
                    onReply={() => setReplyingTo(tweet.id)}
                    showReplyForm={replyingTo === tweet.id}
                    replyContent={replyContent}
                    onReplyChange={setReplyContent}
                    onReplySubmit={() => handleReply(tweet.id)}
                    onCancelReply={() => setReplyingTo(null)}
                  />
                  {replyingTo === tweet.id && (
                    <div className="pl-16 pr-4 pb-4 bg-gray-900">
                      <div className="border-t border-gray-700 pt-3">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full bg-transparent text-white text-base outline-none resize-none placeholder-gray-500"
                          placeholder="Tweet your reply"
                          rows="2"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-4 text-blue-400">
                            <button
                              onClick={() => fileInputRef.current.click()}
                            >
                              <HiOutlinePhotograph className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-1 rounded-full border border-gray-600 hover:bg-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReply(tweet.id)}
                              disabled={!replyContent.trim()}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-1 rounded-full disabled:opacity-50"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {tweet.repliesList.length > 0 && (
                    <div className="pl-16 pr-4 bg-gray-900">
                      {tweet.repliesList.map((reply) => (
                        <div
                          key={reply.id}
                          className="border-t border-gray-700 py-3"
                        >
                          <div className="flex">
                            <div className="mr-3">
                              <img
                                className="rounded-full w-10 h-10"
                                src={twitterdp}
                                alt="Avatar"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-bold mr-1">
                                  {reply.name}
                                </span>
                                <span className="text-gray-500 mr-1">
                                  {reply.handle}
                                </span>
                                <span className="text-gray-500">
                                  · {reply.time}
                                </span>
                              </div>
                              <div className="mt-1 whitespace-pre-wrap">
                                {reply.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 hidden lg:block sticky top-0 h-screen overflow-y-auto py-4 pl-4 pr-2">
            <div className="bg-gray-800 rounded-full flex items-center px-4 py-2 mb-4">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Twitter"
                className="bg-transparent border-none outline-none text-white w-full"
              />
            </div>

            <div className="bg-gray-800 rounded-2xl p-4 mb-4">
              <h2 className="text-lg font-bold mb-3">What's happening</h2>
              <TrendingItem
                category="Tech · Trending"
                title="React 19"
                count="5.2K Tweets"
              />
              <TrendingItem
                category="Travel · Trending"
                title="#VisitJapan"
                count="45.3K Tweets"
              />
              <TrendingItem
                category="Tourism"
                title="Bali Reopens"
                count="32.1K Tweets"
              />
              <button className="text-blue-400 hover:text-blue-300 mt-2 text-sm">
                Show more
              </button>
            </div>

            <div className="bg-gray-800 rounded-2xl p-4">
              <h2 className="text-lg font-bold mb-3">Who to follow</h2>
              <FollowSuggestion
                name="Lonely Planet"
                handle="@lonelyplanet"
                avatar={twitterdp}
              />
              <FollowSuggestion
                name="Travel + Leisure"
                handle="@TravelLeisure"
                avatar={twitterdp}
              />
              <button className="text-blue-400 hover:text-blue-300 mt-2 text-sm">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidenavLink({
  Icon,
  text,
  active = false,
  className = "",
  compact = false,
  ...props
}) {
  return (
    <div
      className={`flex items-center ${
        compact ? "p-2" : "p-3"
      } hover:bg-gray-800 rounded-full cursor-pointer ${
        active ? "font-bold" : ""
      } ${className}`}
      {...props}
    >
      <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
      {text && (
        <span className={compact ? "text-sm ml-3" : "text-lg ml-4"}>
          {text}
        </span>
      )}
    </div>
  );
}

function FeedHeader() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black bg-opacity-90 backdrop-blur-sm z-10">
      <div className="text-xl font-bold">Home</div>
    </div>
  );
}

function TweetBox({
  value,
  onChange,
  onTweet,
  selectedImage,
  onImageUpload,
  removeImage,
  fileInputRef,
}) {
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex">
        <div className="mr-3">
          <img className="rounded-full w-12 h-12" src={logo} alt="Avatar" />
        </div>
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-white text-lg outline-none resize-none placeholder-gray-500"
            placeholder="What's happening?"
            rows="3"
          />
          {selectedImage && (
            <div className="relative mt-2 mb-2">
              <img
                src={selectedImage}
                alt="Preview"
                className="rounded-2xl max-h-80 w-full object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 left-2 bg-black bg-opacity-75 rounded-full p-2 hover:bg-opacity-100"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-4 text-blue-400">
              <button onClick={() => fileInputRef.current.click()}>
                <HiOutlinePhotograph className="h-5 w-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <button
              onClick={onTweet}
              disabled={!value.trim() && !selectedImage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-1.5 rounded-full disabled:opacity-50 text-sm"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tweet({
  name,
  handle,
  content,
  time,
  likes,
  retweets,
  replies,
  image,
  onReply,
  showReplyForm,
  replyContent,
  onReplyChange,
  onReplySubmit,
  onCancelReply,
}) {
  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900 transition duration-200">
      <div className="flex">
        <div className="mr-3">
          <img
            className="rounded-full w-12 h-12"
            src={twitterdp}
            alt="Avatar"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold mr-1">{name}</span>
            <span className="text-gray-500 mr-1">{handle}</span>
            <span className="text-gray-500">· {time}</span>
            <button className="ml-auto text-gray-500 hover:text-blue-400">
              <HiDotsCircleHorizontal />
            </button>
          </div>
          <div className="mt-1 mb-2 whitespace-pre-wrap text-base">
            {content}
          </div>
          {image && (
            <img
              src={image}
              alt="Tweet content"
              className="rounded-2xl max-h-80 w-full object-cover mb-2"
            />
          )}
          <div className="flex justify-between text-gray-500 max-w-md mt-2">
            <button
              className="flex items-center space-x-1 hover:text-blue-400"
              onClick={onReply}
            >
              <FaRegComment className="text-sm" />
              <span className="text-sm">{replies}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-400">
              <FaRetweet className="text-sm" />
              <span className="text-sm">{retweets}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-400">
              <FaRegHeart className="text-sm" />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-400">
              <FaRegBookmark className="text-sm" />
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-400">
              <FaRegShareSquare className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingItem({ category, title, count }) {
  return (
    <div className="py-2 hover:bg-gray-700 px-2 rounded-lg cursor-pointer">
      <div className="text-xs text-gray-500">{category}</div>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-gray-500">{count}</div>
    </div>
  );
}

function FollowSuggestion({ name, handle, avatar }) {
  return (
    <div className="flex items-center justify-between py-2 hover:bg-gray-700 px-2 rounded-lg cursor-pointer">
      <div className="flex items-center">
        <img
          className="rounded-full w-10 h-10 mr-2"
          src={avatar}
          alt="Avatar"
        />
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-gray-500 text-sm">{handle}</div>
        </div>
      </div>
      <button className="bg-white text-black font-bold px-3 py-1 rounded-full text-xs hover:bg-gray-200">
        Follow
      </button>
    </div>
  );
}
