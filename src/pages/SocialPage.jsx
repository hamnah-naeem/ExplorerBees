import { useState, useRef, useEffect } from "react";
import {
  HiHome,
  HiMail,
  HiBookmark,
  HiDotsCircleHorizontal,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { FaSearch, FaShare } from "react-icons/fa";
import logo from "../assets/images/home/logo.png";
import twitterdp from "../assets/images/social/twitter-dp.jpg";
import {
  posts as initialPosts,
  trendingItems,
  followSuggestions,
} from "../dummy-data/social";
import Post from "../components/Post";
import PostBox from "../components/PostBox";

export default function Social() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
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

  const handlePost = (postData) => {
    const { content, image, poll } = postData;

    if (
      content.trim() ||
      image ||
      (poll && poll.options.some((opt) => opt.trim() !== ""))
    ) {
      const newPost = {
        id: Date.now(),
        name: "Explorer Bees",
        handle: "explorer_bees",
        avatar: logo,
        content: content,
        time: "Just now",
        likes: "0",
        shares: "0",
        replies: "0",
        image: image,
        poll: poll
          ? {
              options: poll.options,
              votes: poll.options.map(() => 0), // Initialize all votes to 0
              totalVotes: 0,
            }
          : null,
        repliesList: [],
      };

      setPosts([newPost, ...posts]);
      setNewPost("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReply = (postId) => {
    if (replyContent.trim()) {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const newReply = {
            id: Date.now(),
            name: "Explorer Bees",
            handle: "explorer_bees",
            content: replyContent,
            time: "Just now",
          };
          return {
            ...post,
            replies: (parseInt(post.replies) + 1).toString(),
            repliesList: [newReply, ...post.repliesList],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const SidenavLink = ({
    Icon,
    text,
    active = false,
    compact = false,
    ...props
  }) => (
    <div
      className={`flex items-center ${
        compact ? "p-2" : "p-3"
      } hover:bg-gray-100 rounded-full cursor-pointer ${
        active ? "font-bold text-yellow-600" : "text-black"
      }`}
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

  const TrendingItem = ({ category, title, count }) => (
    <div className="py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer">
      <div className="text-xs text-gray-500">{category}</div>
      <div className="font-medium text-sm text-black">{title}</div>
      <div className="text-xs text-gray-500">{count}</div>
    </div>
  );

  const FollowSuggestion = ({ name, username, email }) => {
    return (
      <div className="flex items-center justify-between py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer">
        <div>
          <div className="font-medium text-sm text-black">{name}</div>
          <div className="text-gray-500 text-sm">@{username || "user"}</div>
          <div className="text-gray-500 text-xs">{email}</div>
        </div>
        <button className="bg-yellow-600 text-white font-bold px-3 py-1 rounded-full text-xs hover:bg-yellow-700">
          Follow
        </button>
      </div>
    );
  };

  //Api call timeline
  const fetchTrending = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("type", "0");
    formdata.append("limit", "10");
    formdata.append("offset", "0");

    try {
      const res = await fetch(
        "https://app.explorerbees.com/apiv/api_v10/getTrending.php",
        { method: "POST", body: formdata }
      );
      const text = await res.text();
      const data = JSON.parse(text);

      if (!data.error && data.records) {
        setTrending(data.records);
      } else {
        console.error(data.error_msg);
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchSuggestedUsers = async () => {
    setLoadingUsers(true);
    const formdata = new FormData();
    formdata.append("email", "minhas@gmail.com");
    formdata.append("state_id", "1");
    formdata.append("limit", "10");
    formdata.append("offset", "0");

    try {
      const response = await fetch(
        "https://app.explorerbees.com/apiv/api_v10/getSuggestedUsers.php",
        {
          method: "POST",
          body: formdata,
        }
      );

      const result = await response.json();
      console.log("Suggested Users Response:", result);

      if (!result.error && result.records) {
        setUsers(result.records);
      } else {
        console.error("Error Message:", result.error_msg);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  const fetchTimeline = async () => {
    const formdata = new FormData();
    formdata.append("user_email", "alina@gmail.com");
    formdata.append("limit", "10");
    formdata.append("postOffset", "0");
    formdata.append("hiveOffset", "0");
    formdata.append("sponsoredPostOffset", "0");
    formdata.append("suggestedPostOffset", "0");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://app.explorerbees.com/apiv/api_v10/getTimeline.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((res) => {
        const result = JSON.parse(res);
        if (result.error) {
          console.error("Error Message: ", result.error_msg);
        } else {
          const records = result.records;
          const data = records.data;

          console.log("PostCount", data.length);

          setPosts(data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Sidebar */}
          <div className="lg:col-span-2 xl:col-span-3 px-2 sticky top-0 h-screen hidden md:flex flex-col justify-between py-2">
            <div className="flex flex-col">
              <SidenavLink active Icon={HiHome} text="Home" />
              <SidenavLink Icon={FaSearch} text="Explore" />
              <SidenavLink Icon={HiMail} text="Messages" />
              <SidenavLink Icon={HiBookmark} text="Bookmarks" />
              <SidenavLink Icon={HiDotsCircleHorizontal} text="More" />

              <button
                onClick={handlePost}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-3 rounded-full text-md mt-2 mx-0"
              >
                Share
              </button>
            </div>

            <div className="mb-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer flex items-center">
              <img className="rounded-full w-10 h-10" src={logo} alt="Avatar" />
              <div className="ml-3">
                <div className="font-bold text-black">Explorer Bees</div>
                <div className="text-gray-500">@explorer_bees</div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 md:hidden z-50">
            <SidenavLink active Icon={HiHome} compact />
            <SidenavLink Icon={FaSearch} compact />
            <SidenavLink Icon={HiMail} compact />
          </div>

          {/* Feed */}
          <div className="lg:col-span-7 xl:col-span-6 h-screen overflow-y-auto border-x border-gray-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm z-10">
              <div className="text-2xl font-bold text-black">Social Feed</div>
            </div>

            <PostBox
              value={newPost}
              onChange={setNewPost}
              onPost={handlePost}
              selectedImage={selectedImage}
              onImageUpload={handleImageUpload}
              removeImage={removeImage}
              fileInputRef={fileInputRef}
              avatar={logo}
            />

            <div className="pb-16 md:pb-0">
              {posts.map((post) => (
                <div key={post.id}>
                  <Post {...post} onReply={() => setReplyingTo(post.id)} />

                  {replyingTo === post.id && (
                    <div className="pl-16 pr-4 pb-4 bg-gray-50">
                      <div className="border-t border-gray-200 pt-3">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full bg-transparent text-black text-base outline-none resize-none placeholder-gray-500"
                          placeholder="Post your reply"
                          rows="2"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-4 text-yellow-600">
                            <button
                              onClick={() => fileInputRef.current.click()}
                            >
                              <HiOutlinePhotograph className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100 text-black"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReply(post.id)}
                              disabled={!replyContent.trim()}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-1 rounded-full disabled:opacity-50"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* {post.repliesList.length > 0 && (
                    <div className="pl-16 pr-4 bg-gray-50">
                      {post.repliesList.map((reply) => (
                        <div
                          key={reply.id}
                          className="border-t border-gray-200 py-3"
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
                                <span className="font-bold mr-1 text-black">
                                  {reply.name}
                                </span>
                                <span className="text-gray-500 mr-1">
                                  @{reply.handle}
                                </span>
                                <span className="text-gray-500">
                                  · {reply.time}
                                </span>
                              </div>
                              <div className="mt-1 whitespace-pre-wrap text-black">
                                {reply.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto space-y-4 p-4">
            {/* Trending Now */}
            <div className="bg-gray-100 rounded-2xl p-4 mb-4">
              <h2 className="text-lg font-bold mb-3 text-black">
                Trending Now
              </h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                trending.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer"
                  >
                    <div className="text-xs text-gray-500">
                      @{item.username}
                    </div>
                    <div className="font-medium text-sm text-black flex flex-wrap">
                      {item.description.split("#").map((tag, index) =>
                        tag ? (
                          <span
                            key={index}
                            className="mr-2 mb-1 text-black-600"
                          >
                            #{tag}
                          </span>
                        ) : null
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                ))
              )}
              <button className="text-yellow-600 hover:text-yellow-700 mt-2 text-sm">
                Show more
              </button>
            </div>

            {/* Who to follow */}
            <div className="bg-gray-100 rounded-2xl p-4">
              <h2 className="text-lg font-bold mb-3 text-black">
                Who to follow
              </h2>
              {loadingUsers ? (
                <p>Loading...</p>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-start hover:bg-gray-200 px-2 py-3 rounded-lg cursor-pointer"
                  >
                    <img
                      className="rounded-full w-10 h-10 mr-3 flex-shrink-0"
                      src={user.image || twitterdp}
                      alt={user.name}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-black truncate">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-sm truncate">
                        @{user.email || "email"}
                      </div>
                      <button className="mt-2 bg-yellow-600 text-white font-bold px-3 py-1 rounded-full text-xs hover:bg-yellow-700">
                        Follow
                      </button>
                    </div>
                  </div>
                ))
              )}
              <button className="text-yellow-600 hover:text-yellow-700 mt-2 text-sm">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
