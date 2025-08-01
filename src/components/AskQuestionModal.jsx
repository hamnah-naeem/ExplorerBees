import React, { useState } from "react";

export default function AskQuestionModal({ onClose, onSubmit }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ask a New Question</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            className="w-full p-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
