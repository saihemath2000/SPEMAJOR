import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Home() {
  const backgroundImageUrl = "https://picsum.photos/1200/800";
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleAttemptQuiz = () => {
    // Show the modal to ask for user's name
    setShowModal(true);
  };

  const handleModalClose = () => {
    // Hide the modal
    setShowModal(false);
  };

  const handleUserNameSubmit = () => {
    // Store the user's name in localStorage
    localStorage.setItem("userName", userName);
    // Navigate to the quiz page
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
      {/* Modal for inputting user's name */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered // Center the modal vertically and horizontally
      >
        <Modal.Header closeButton>
          <Modal.Title>Please enter your name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUserNameSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
