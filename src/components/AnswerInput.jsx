import React, { useState } from "react";

export default function AnswerInput({ onSubmit }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        rows={2}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        type="submit"
        className="self-end bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm shadow-sm"
      >
        Post Answer
      </button>
    </form>
  );
}
