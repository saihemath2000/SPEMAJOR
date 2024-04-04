import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const backgroundImageUrl = "https://picsum.photos/1200/800";
  const navigate = useNavigate();

  const handleAttemptQuiz = () => {
    // Navigate to the quiz page when the button is clicked
    navigate("/Createquizdetails");
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundImageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Welcome to QuizApp</h1>
            <p>Test your knowledge</p>
            <button
              className="btn btn-primary mr-2"
              onClick={handleAttemptQuiz}>
              Attempt Quiz
            </button>
            <button className="btn btn-primary ml-2">Contribute</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
