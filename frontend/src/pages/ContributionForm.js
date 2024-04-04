// ContributionForm.js

import React, { useState } from "react";

function ContributionForm({ onSubmit }) {
  const [category, setCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any validation here before submitting
    onSubmit({ category, numQuestions, questions });
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: "",
        difficultyLevel: "",
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Contribute Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            type="number"
            className="form-control"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
        </div>
        {questions.map((question, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Question {index + 1}</h5>
              <div className="form-group">
                <label htmlFor={`questionTitle${index}`}>Question Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`questionTitle${index}`}
                  value={question.questionTitle}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionTitle", e.target.value)
                  }
                />
              </div>
              {/* Repeat for other fields like options, right answer, difficulty level */}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContributionForm;
