import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function ContributionForm({ onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://demo.backend.me/question/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate correct answers
    const errors = [];
    questions.forEach((question, index) => {
      if (!question.options.includes(question.correctAnswer)) {
        errors.push(` Correct answer should be one of the provided options.`);
      }
    });
    // If there are validation errors, display them and prevent form submission
    if (errors.length > 0) {
      //setErrorMessages(errors);
      //alert(errors.join("\n"));
      swal(
        "ERROR!",
        "Correct Answer should be from one of the options provided.",
        "error"
      );
      //window.location.reload(true);
      return;
    }
    // Constructing data object
    const data = questions.map((question, index) => ({
      category:
        question.category === "other"
          ? question.newCategory
          : question.category,
      ques: question.questionTitle,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      rightAnswer: question.correctAnswer,
      difficultyLevel: question.difficultyLevel,
    }));
    const ndata = JSON.stringify(data);
    console.log(ndata);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // Sending data in JSON format
      await axios.post("http://demo.backend.me/contribute/add", ndata, config);
      // If successful, call the onSubmit callback
      //onSubmit(ndata);
      swal("Success", "Questions Contributed Successfully", "success");
      navigate("/");
    } catch (error) {
      console.error("Error adding questions:", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        category: "",
        questionTitle: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        difficultyLevel: "",
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCategoryChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].category = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Contribute Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Question {index + 1}</h5>
              <div className="form-group">
                <label htmlFor={`category${index}`}>Category:</label>
                <select
                  className="form-control"
                  id={`category${index}`}
                  value={question.category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
                {question.category === "other" && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Enter new category"
                    value={question.newCategory || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "newCategory", e.target.value)
                    }
                  />
                )}
              </div>
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
              {question.options.map((option, optionIndex) => (
                <div className="form-group" key={optionIndex}>
                  <label htmlFor={`option${optionIndex + 1}`}>
                    Option {optionIndex + 1}:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`option${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor={`correctAnswer${index}`}>Correct Answer:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`correctAnswer${index}`}
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                />
                {errorMessages[index] && (
                  <p className="text-danger">{errorMessages[index]}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`difficultyLevel${index}`}>
                  Difficulty Level:
                </label>
                <select
                  className="form-control"
                  id={`difficultyLevel${index}`}
                  value={question.difficultyLevel}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "difficultyLevel",
                      e.target.value
                    )
                  }>
                  <option value="">Select Difficulty Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
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
