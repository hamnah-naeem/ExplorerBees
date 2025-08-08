

const QuestionForm = ({
  newQuestion,
  setNewQuestion,
  newQuestionDetails,
  setNewQuestionDetails,
  selectedTopics,
  handleTopicSelect,
  allTopics,
  handleSubmitQuestion,
  setShowQuestionForm,
}) => {
  return (
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
            {allTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicSelect(topic)}
                className={`text-xs px-2 py-1 rounded ${
                  selectedTopics.includes(topic)
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {topic.split("-").join(" ")}
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
  );
};

export default QuestionForm;
