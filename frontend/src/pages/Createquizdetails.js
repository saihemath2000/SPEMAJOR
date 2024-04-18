import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Createquizdetails() {
  // const userName = localStorage.getItem("userName");
  // console.log(userName);

  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const backgroundImage = "https://picsum.photos/1200/800";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8765/question-service/question/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    try {
      const quizData = {
        categoryName: selectedCategory,
        numQ: parseInt(numQuestions),
        difficulty_Level: selectedDifficulty,
        title: title,
      };
      console.log(quizData);
      const response = await axios.post(
        "http://localhost:8765/quiz-service/quiz/create",
        quizData
      );
      const quizId = response.data;
      // alert(quizId);
      navigate(`/Quiz/${quizId}`, {
        state: { category: selectedCategory },
      }); // Navigate to the quiz page with the quiz ID
    } catch (error) {
      console.error("Error creating quiz:", error.response.data);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light p-4 rounded">
            <h2 className="mb-4 text-center">Quiz App Details</h2>
            <form onSubmit={handleQuizCreation}>
              <div className="form-group">
                <label htmlFor="firstName">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">No of Questions</label>
                <input
                  type="number"
                  className="form-control"
                  id="noofquestions"
                  min="1"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  className="form-control"
                  id="difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}>
                  <option value="">Select Difficulty Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createquizdetails;
