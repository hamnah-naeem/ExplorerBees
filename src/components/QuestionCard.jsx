import React from "react";

const QuestionCard = ({
  question,
  handleVote,
  setActiveTopic,
  setMobileView,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-yellow-400">
      <div className="flex">
        <div className="flex flex-col items-center mr-3">
          <button
            onClick={() => handleVote(question.id, "up")}
            className={`p-1 ${
              question.isUpvoted
                ? "text-yellow-600"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span
            className={`text-xs font-medium my-1 ${
              question.votes > 0
                ? "text-yellow-600"
                : question.votes < 0
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {question.votes}
          </span>
          <button
            onClick={() => handleVote(question.id, "down")}
            className={`p-1 ${
              question.isDownvoted
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-start mb-2">
            <img
              src={question.userImage}
              alt={question.author}
              className="w-8 h-8 rounded-full mr-2 border border-yellow-400"
            />
            <div>
              <h3 className="font-medium hover:text-yellow-600 cursor-pointer">
                {question.title}
              </h3>
              <p className="text-xs text-gray-500">by {question.author}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-3 text-sm">{question.content}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {question.topics.map((topic) => (
              <span
                key={topic}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded hover:bg-yellow-200 cursor-pointer"
                onClick={() => {
                  setActiveTopic(topic);
                  if (window.innerWidth < 1024) setMobileView("topics");
                }}
              >
                {topic.split("-").join(" ")}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
            <span>{question.time}</span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              {question.answers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
