import twitterdp from "../assets/images/social/twitter-dp.jpg";
import tweetImage from "../assets/images/social/tweet-image.jpeg";


export const posts = [
  {
    id: 1,
    name: "Elon Musk",
    handle: "@elonmusk",
    avatar: twitterdp,
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
        avatar: twitterdp,
        content: "Can't wait for the launch!",
        time: "1h",
      },
      {
        id: 102,
        name: "Tech Enthusiast",
        handle: "@techie",
        avatar: twitterdp,
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
    avatar: twitterdp,
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
    avatar: twitterdp,
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
        avatar: twitterdp,
        content: "What resort did you stay at? Looking for recommendations!",
        time: "2h",
      },
    ],
  },
];

export const trendingItems = [
  {
    category: "Tech · Trending",
    title: "React 19",
    count: "5.2K Tweets",
  },
  {
    category: "Travel · Trending",
    title: "#VisitJapan",
    count: "45.3K Tweets",
  },
  {
    category: "Tourism",
    title: "Bali Reopens",
    count: "32.1K Tweets",
  },
];

export const followSuggestions = [
  {
    name: "Lonely Planet",
    handle: "@lonelyplanet",
    avatar: twitterdp, 
  },
  {
    name: "Travel + Leisure",
    handle: "@TravelLeisure",
    avatar: twitterdp,
  },
];