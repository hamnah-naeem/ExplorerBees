import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png"; 
import dp from "../assets/social/twitter-dp.jpg"; 

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionDetails, setNewQuestionDetails] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [activeTopic, setActiveTopic] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState(["general"]);
  const [mobileView, setMobileView] = useState("questions");

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 600));

      const travelQuestions = [
        {
          id: 1,
          title: "Best places to visit in Northern Pakistan?",
          content: "Planning my first trip to Pakistan's northern areas. Looking for recommendations on scenic spots and cultural experiences.",
          author: "Adventure Seeker",
          votes: 42,
          answers: 8,
          views: 320,
          topics: ["pakistan", "mountains", "adventure"],
          time: "3 hours ago",
          isUpvoted: false,
          isDownvoted: false,
          userImage: dp, 
        },
        {
          id: 4,
          title: "Is Cappadocia worth visiting?",
          content: "Is the trip from Istanbul to Cappadocia worth it? How many days would you recommend?",
          author: "Travel Enthusiast",
          votes: 31,
          answers: 9,
          views: 240,
          topics: ["turkey", "cappadocia", "landscape"],
          time: "1 day ago",
          isUpvoted: false,
          isDownvoted: false,
          userImage: dp,
        },
        {
          id: 5,
          title: "Hidden gems in Pakistan?",
          content: "Looking for underrated places in Pakistan beyond the usual tourist spots.",
          author: "Explorer",
          votes: 19,
          answers: 7,
          views: 175,
          topics: ["pakistan", "hidden-gems", "culture"],
          time: "2 days ago",
          isUpvoted: false,
          isDownvoted: false,
          userImage: dp,
        },
        {
          id: 6,
          title: "Transport between Turkish cities?",
          content: "Best way to travel between Istanbul, Cappadocia, and Antalya?",
          author: "Trip Planner",
          votes: 27,
          answers: 11,
          views: 210,
          topics: ["turkey", "transport", "itinerary"],
          time: "1 day ago",
          isUpvoted: false,
          isDownvoted: false,
          userImage: dp,
        }
      ];

      setQuestions(travelQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleVote = (id, direction) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        let newVotes = q.votes;
        let newUpvoted = q.isUpvoted;
        let newDownvoted = q.isDownvoted;

        if (direction === 'up') {
          if (q.isUpvoted) {
            newVotes -= 1;
            newUpvoted = false;
          } else {
            newVotes += 1;
            newUpvoted = true;
            if (q.isDownvoted) {
              newVotes += 1;
              newDownvoted = false;
            }
          }
        } else if (direction === 'down') {
          if (q.isDownvoted) {
            newVotes += 1;
            newDownvoted = false;
          } else {
            newVotes -= 1;
            newDownvoted = true;
            if (q.isUpvoted) {
              newVotes -= 1;
              newUpvoted = false;
            }
          }
        }

        return { ...q, votes: newVotes, isUpvoted: newUpvoted, isDownvoted: newDownvoted };
      }
      return q;
    }));
  };

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

 const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const newQ = {
        id: questions.length + 1,
        title: newQuestion,
        content: newQuestionDetails,
        author: "Explorer Bees",
        votes: 0,
        answers: 0,
        views: 0,
        topics: selectedTopics,
        time: "Just now",
        isUpvoted: false,
        isDownvoted: false,
        userImage: logo, 
      };
      setQuestions([newQ, ...questions]);
      setNewQuestion("");
      setNewQuestionDetails("");
      setSelectedTopics(["general"]);
      setShowQuestionForm(false);
    }
  };


  const filteredQuestions = activeTopic === "all" 
    ? questions 
    : questions.filter(q => q.topics.includes(activeTopic));

  const allTopics = Array.from(new Set(questions.flatMap(q => q.topics))).sort();

  const popularDestinations = [
    {
      name: "Hunza Valley",
      country: "Pakistan",
      image: "https://images.unsplash.com/photo-1566647387313-9fda80664848?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Cappadocia",
      country: "Turkey",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Istanbul",
      country: "Turkey",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const MobileToggle = () => (
    <div className="lg:hidden flex justify-center space-x-4 mb-6">
      <button 
        onClick={() => setMobileView("topics")}
        className={`px-4 py-2 rounded-full ${mobileView === "topics" ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
      >
        Topics
      </button>
      <button 
        onClick={() => setMobileView("questions")}
        className={`px-4 py-2 rounded-full ${mobileView === "questions" ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
      >
        Questions
      </button>
      <button 
        onClick={() => setMobileView("destinations")}
        className={`px-4 py-2 rounded-full ${mobileView === "destinations" ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
      >
        Destinations
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <MobileToggle />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar (hidden on mobile unless selected*/}
          <div className={`lg:w-1/4 ${mobileView === "topics" ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Explore Topics</h2>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      setActiveTopic("all");
                      if (window.innerWidth < 1024) setMobileView("questions");
                    }}
                    className={`w-full text-left px-3 py-2 rounded ${activeTopic === "all" ? 'bg-yellow-100 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    All Questions
                  </button>
                </li>
                {allTopics.map(topic => (
                  <li key={topic}>
                    <button 
                      onClick={() => {
                        setActiveTopic(topic);
                        if (window.innerWidth < 1024) setMobileView("questions");
                      }}
                      className={`w-full text-left px-3 py-2 rounded ${activeTopic === topic ? 'bg-yellow-100 font-medium' : 'hover:bg-gray-100'}`}
                    >
                      {topic.split('-').join(' ')}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Travel Stats</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between py-1">
                    <span>Questions:</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Answers:</span>
                    <span className="font-medium">{questions.reduce((sum, q) => sum + q.answers, 0)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Active Users:</span>
                    <span className="font-medium">{new Set(questions.map(q => q.author)).size}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content Area */}
          <div className={`lg:w-2/4 ${mobileView === "questions" ? 'block' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {activeTopic === "all" ? "Travel Questions" : `${activeTopic.split('-').join(' ')}`}
              </h2>
              <button 
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="bg-yellow-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ask
              </button>
            </div>

            {showQuestionForm && (
              <div className="bg-white p-4 mb-6 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-3">Ask a Question</h3>
                <form onSubmit={handleSubmitQuestion}>
                  <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Question title..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Add details..."
                    rows="3"
                    value={newQuestionDetails}
                    onChange={(e) => setNewQuestionDetails(e.target.value)}
                  />
                  <div className="mb-3">
                    <p className="text-sm mb-1">Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {allTopics.map(topic => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleTopicSelect(topic)}
                          className={`text-xs px-2 py-1 rounded ${selectedTopics.includes(topic) ? 'bg-yellow-600 text-white' : 'bg-gray-100'}`}
                        >
                          {topic.split('-').join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button 
                      type="button" 
                      onClick={() => setShowQuestionForm(false)}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                    <div className="flex space-x-3">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map(question => (
                    <div key={question.id} className="p-4 border border-gray-200 rounded-lg hover:border-yellow-400">
                      <div className="flex">
                        <div className="flex flex-col items-center mr-3">
                          <button 
                            onClick={() => handleVote(question.id, 'up')}
                            className={`p-1 ${question.isUpvoted ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-500'}`}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className={`text-xs font-medium my-1 ${question.votes > 0 ? 'text-yellow-600' : question.votes < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                            {question.votes}
                          </span>
                          <button 
                            onClick={() => handleVote(question.id, 'down')}
                            className={`p-1 ${question.isDownvoted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Question content */}
                        <div className="flex-1">
                          <div className="flex items-start mb-2">
                            <img 
                              src={question.userImage} 
                              alt={question.author} 
                              className="w-8 h-8 rounded-full mr-2 border border-yellow-400"
                            />
                            <div>
                              <h3 className="font-medium hover:text-yellow-600 cursor-pointer">{question.title}</h3>
                              <p className="text-xs text-gray-500">by {question.author}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3 text-sm">{question.content}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {question.topics.map(topic => (
                              <span 
                                key={topic} 
                                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded hover:bg-yellow-200 cursor-pointer"
                                onClick={() => {
                                  setActiveTopic(topic);
                                  if (window.innerWidth < 1024) setMobileView("topics");
                                }}
                              >
                                {topic.split('-').join(' ')}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                            <span>{question.time}</span>
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                              {question.answers}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center border border-gray-200 rounded-lg">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">No questions found for this topic</p>
                    <button 
                      onClick={() => setActiveTopic("all")}
                      className="mt-3 px-3 py-1 bg-yellow-600 text-white rounded text-sm"
                    >
                      View all questions
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar (hidden on mobile unless selected) */}
          <div className={`lg:w-1/4 ${mobileView === "destinations" ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Popular Destinations</h2>
              
              <div className="space-y-3">
                {popularDestinations.map((destination, index) => (
                  <div key={index} className="relative rounded overflow-hidden h-32 cursor-pointer">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <h3 className="text-white font-medium">{destination.name}</h3>
                      <p className="text-xs text-gray-300">{destination.country}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Travel Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Best time to visit Northern Pakistan</li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Turkish visa requirements</li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Packing list for mountain treks</li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Cultural etiquette in Pakistan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}