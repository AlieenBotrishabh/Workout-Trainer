// Feedback.js
import React, { useState } from 'react';

const Feedback = ({ exercise, onSubmitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      onSubmitFeedback(exercise, feedbackText);
      setFeedbackText('');
    }
  };

  return (
    <div className="feedback-container p-4 bg-gray-800 rounded">
      <h3 className="text-lg font-semibold mb-2">Provide Feedback for {exercise}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-24 p-2 text-sm bg-gray-700 text-white border border-blue-600 rounded mb-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
