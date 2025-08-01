import React, { useState } from "react";
import AnswerInput from "./AnswerInput";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";

export default function QuestionCard({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState(question.answers || []);
  const [upvotes, setUpvotes] = useState(question.upvotes || 0);

  const handleAddAnswer = (text) => {
    const newAnswer = {
      id: Date.now(),
      text,
      user: "Hamnah",
      time: "Just now",
    };
    setAnswers([newAnswer, ...answers]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Asked by <span className="font-medium">{question.user}</span> · {question.time}
          </p>
        </div>
        <button
          className="text-gray-500 hover:text-red-500 transition"
          onClick={() => setUpvotes(upvotes + 1)}
        >
          <FaThumbsUp className="inline mr-1" />
          {upvotes}
        </button>
      </div>

      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="text-sm text-black flex items-center gap-1"
      >
        <FaCommentDots />
        {showAnswers ? "Hide Answers" : `View Answers (${answers.length})`}
      </button>

      {showAnswers && (
        <div className="space-y-3">
          {answers.length === 0 && (
            <p className="text-gray-500 text-sm">No answers yet. Be the first to respond!</p>
          )}

          {answers.map((ans) => (
            <div key={ans.id} className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm text-gray-700">{ans.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                Answered by <span className="font-medium">{ans.user}</span> · {ans.time}
              </p>
            </div>
          ))}

          <AnswerInput onSubmit={handleAddAnswer} />
        </div>
      )}
    </div>
  );
}
