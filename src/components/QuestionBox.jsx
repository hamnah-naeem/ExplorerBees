import React, { useState } from "react";

export default function QuestionBox({ onAdd }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onAdd(question);
      setQuestion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={2}
      />
      <button
        type="submit"
        className="self-end px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Post
      </button>
    </form>
  );
}
