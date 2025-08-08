import React, { useState, useEffect } from "react";
import logo from "../assets/images/home/logo.png";
import dp from "../assets/images/social/twitter-dp.jpg";
import { questionsData, popularDestinations } from "../dummy-data/questions";
import QuestionCard from "../components/QuestionCard";
import QuestionForm from "../components/QuestionForm";

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
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mappedQuestions = questionsData.map((q) => ({
        ...q,
        userImage: q.userImage === "twitter-dp.jpg" ? dp : q.userImage,
      }));

      setQuestions(mappedQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleVote = (id, direction) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          let newVotes = q.votes;
          let newUpvoted = q.isUpvoted;
          let newDownvoted = q.isDownvoted;

          if (direction === "up") {
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
          } else if (direction === "down") {
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

          return {
            ...q,
            votes: newVotes,
            isUpvoted: newUpvoted,
            isDownvoted: newDownvoted,
          };
        }
        return q;
      })
    );
  };

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
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

  const filteredQuestions =
    activeTopic === "all"
      ? questions
      : questions.filter((q) => q.topics.includes(activeTopic));

  const allTopics = Array.from(
    new Set(questions.flatMap((q) => q.topics))
  ).sort();

  const MobileToggle = () => (
    <div className="lg:hidden flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setMobileView("topics")}
        className={`px-4 py-2 rounded-full ${
          mobileView === "topics" ? "bg-yellow-600 text-white" : "bg-gray-200"
        }`}
      >
        Topics
      </button>
      <button
        onClick={() => setMobileView("questions")}
        className={`px-4 py-2 rounded-full ${
          mobileView === "questions"
            ? "bg-yellow-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Questions
      </button>
      <button
        onClick={() => setMobileView("destinations")}
        className={`px-4 py-2 rounded-full ${
          mobileView === "destinations"
            ? "bg-yellow-600 text-white"
            : "bg-gray-200"
        }`}
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
          {/* Left Sidebar - Topics */}
          <div
            className={`lg:w-1/4 ${
              mobileView === "topics" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Explore Topics
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTopic("all");
                      if (window.innerWidth < 1024) setMobileView("questions");
                    }}
                    className={`w-full text-left px-3 py-2 rounded ${
                      activeTopic === "all"
                        ? "bg-yellow-100 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Questions
                  </button>
                </li>
                {allTopics.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => {
                        setActiveTopic(topic);
                        if (window.innerWidth < 1024)
                          setMobileView("questions");
                      }}
                      className={`w-full text-left px-3 py-2 rounded ${
                        activeTopic === topic
                          ? "bg-yellow-100 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {topic.split("-").join(" ")}
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
                    <span className="font-medium">
                      {questions.reduce((sum, q) => sum + q.answers, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Active Users:</span>
                    <span className="font-medium">
                      {new Set(questions.map((q) => q.author)).size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content - Questions */}
          <div
            className={`lg:w-2/4 ${
              mobileView === "questions" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl text-center mb-3 font-serif">
                {activeTopic === "all"
                  ? "Travel Questions"
                  : `${activeTopic.split("-").join(" ")}`}
              </h2>
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="bg-yellow-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Ask
              </button>
            </div>

            {showQuestionForm && (
              <QuestionForm
                newQuestion={newQuestion}
                setNewQuestion={setNewQuestion}
                newQuestionDetails={newQuestionDetails}
                setNewQuestionDetails={setNewQuestionDetails}
                selectedTopics={selectedTopics}
                handleTopicSelect={handleTopicSelect}
                allTopics={allTopics}
                handleSubmitQuestion={handleSubmitQuestion}
                setShowQuestionForm={setShowQuestionForm}
              />
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border border-gray-200 rounded-lg animate-pulse"
                  >
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
                  filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      handleVote={handleVote}
                      setActiveTopic={setActiveTopic}
                      setMobileView={setMobileView}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center border border-gray-200 rounded-lg">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="mt-2 text-gray-600">
                      No questions found for this topic
                    </p>
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

          {/* Right Sidebar - Destinations */}
          <div
            className={`lg:w-1/4 ${
              mobileView === "destinations" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                Popular Destinations
              </h2>

              <div className="space-y-3">
                {popularDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="relative rounded overflow-hidden h-32 cursor-pointer"
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <h3 className="text-white font-medium">
                        {destination.name}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {destination.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Travel Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    Best time to visit Northern Pakistan
                  </li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    Turkish visa requirements
                  </li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    Packing list for mountain treks
                  </li>
                  <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    Cultural etiquette in Pakistan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
