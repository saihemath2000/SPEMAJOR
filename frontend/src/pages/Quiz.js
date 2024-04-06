import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Modal } from "react-bootstrap";
import "../css/Quizcomp.css";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const [quizId, setQuizId] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const navigate = useNavigate();

  useEffect(() => {
    setQuizId(location.pathname.split("/")[2]);
    setCategory(location.state.category);
  }, [location.pathname, location.state.category]);

  const handleSubmitAll = useCallback(async () => {
    try {
      const responses = questions.map((question) => ({
        id: question.id,
        response: selectedOptions[question.id],
      }));
      const response = await axios.post(
        `http://localhost:8765/quiz-service/quiz/submit/${quizId}`,
        responses
      );
      setModalContent(`Your result: ${response.data}`);
      setShowResultModal(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }, [questions, selectedOptions, quizId]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/quiz-service/quiz/get/${quizId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clear timer when time runs out
    if (timeRemaining === 0) {
      clearInterval(timer);
      handleSubmitAll();
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeRemaining, handleSubmitAll]);

  const handleAnswerSubmit = (questionId, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: selectedOption,
    }));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container className="quiz-container">
      <h1 className="text-center mb-4">{category}</h1>
      <div className="text-center mb-3">
        Time Remaining: {formatTime(timeRemaining)}
      </div>
      {questions.map((question) => (
        <Card key={question.id} className="mb-4">
          <Card.Body>
            <Card.Title>{question.ques}</Card.Title>
            <Form>
              {["option1", "option2", "option3", "option4"].map(
                (option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option${index + 1}_${question.id}`}
                    label={question[option]}
                    name={`question_${question.id}`}
                    value={question[option]}
                    onChange={() =>
                      handleAnswerSubmit(question.id, question[option])
                    }
                  />
                )
              )}
            </Form>
          </Card.Body>
        </Card>
      ))}
      <div className="text-center">
        <Button variant="primary" onClick={handleSubmitAll}>
          Submit All
        </Button>
      </div>
      <Modal
        show={showResultModal}
        onHide={() => setShowResultModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowResultModal(false);
              navigate("/");
            }}>
            Back to Home
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Quiz;
