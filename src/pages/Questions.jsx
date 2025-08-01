import React, { useState } from "react";
import AskQuestionModal from "../components/AskQuestionModal";
import QuestionCard from "../components/QuestionCard";

export default function Questions() {
  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: "Hamnah",
      time: "2 hours ago",
      text: "What is Explorer Bees?",
      answers: [
        {
          id: 1,
          text: "Explorer Bees is a platform that connects travelers with local guides and unique experiences!",
          user: "Sarah",
          time: "1 hour ago",
        },
      ],
      upvotes: 12,
    },
  ]);

  const handleAddQuestion = (questionText) => {
    const newQuestion = {
      id: Date.now(),
      user: "Hamnah",
      time: "Just now",
      text: questionText,
      answers: [],
      upvotes: 0,
    };
    setQuestions([newQuestion, ...questions]);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Questions & Answers</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg shadow-sm font-medium transition"
          >
            Ask Question
          </button>
        </div>

        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}

        {showModal && (
          <AskQuestionModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddQuestion}
          />
        )}
      </div>
    </div>
  );
}
