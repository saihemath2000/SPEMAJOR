import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Modal } from "react-bootstrap";
import "../css/Quizcomp.css";
import { useLocation } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const [quizId, setQuizId] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  // const [result, setResult] = useState(null);

  useEffect(() => {
    setQuizId(location.pathname.split("/")[2]);
    setCategory(location.state.category);
  }, [location.pathname, location.state.category]);

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

  const handleAnswerSubmit = (questionId, selectedOption) => {
    // console.log("Question ID:", questionId);
    // console.log("Selected Option:", selectedOption);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: selectedOption,
    }));
  };
  const handleSubmitAll = async () => {
    try {
      const responses = questions.map((question) => ({
        id : question.id,
        response: selectedOptions[question.id], // Assuming you have stored selectedOption for each question in state
      }));
      console.log(responses);
      const response = await axios.post(
        `http://localhost:8765/quiz-service/quiz/submit/${quizId}`, // Assuming quizId is available
        responses
      );
      setModalContent(`Your result: ${response.data}`);
      setShowResultModal(true);
      // setResult(response.data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  // useEffect(() => {
  //   if (result !== null) {
  //     alert(`Your result: ${result}`);
  //   }
  // }, [result]);

  return (
    <Container className="quiz-container">
      <h1 className="text-center mb-4">{category}</h1>
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
      <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResultModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/")}>
            Back to Home
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Quiz;
