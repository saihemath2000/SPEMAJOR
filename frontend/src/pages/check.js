import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8765/contribute-service/contribute/allQuestions"
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      // Prepare the approved questions array
      const approvedQuestions = questions.map((question) => ({
        ques: question.ques,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        rightAnswer: question.rightAnswer,
        difficultyLevel: question.difficultyLevel,
        category: question.category,
      }));
      const dataTransfer = JSON.stringify(approvedQuestions);
      console.log(dataTransfer);
      // Send a POST request to approve the questions
      await axios.post(
        "http://localhost:8765/contribute-service/contribute/approve",
        dataTransfer,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Display success message

      // Show warning message for deletion
      swal({
        title: "Warning!",
        text: "Once approved, questions cannot be deleted. Are you sure you that the question is correct?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Delete the question
          try {
            await axios.get(
              `http://localhost:8765/contribute-service/contribute/delete/${id}`
            );
            // swal("Poof! Your question has been deleted!", {
            //     icon: "success",
            // });
            swal(
              "Questions Approved",
              `Questions have been approved.`,
              "success"
            );
            // Refresh questions after deletion
            fetchQuestions();
          } catch (error) {
            console.error("Error deleting question:", error);
            swal(
              "Error",
              "Failed to delete the question. Please try again later.",
              "error"
            );
          }
        }
      });
    } catch (error) {
      // Display error message if request fails
      console.error("Error approving questions:", error);
      swal(
        "Error",
        "Failed to approve the questions. Please try again later.",
        "error"
      );
    }
  };

  const handleEdit = (id) => {
    setEditingQuestionId(id);
  };

  const handleSave = () => {
    // Implement save logic
    swal("Changes Saved", "Changes have been saved temporarily.", "success");
    setEditingQuestionId(null);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.get(
            `http://localhost:8765/contribute-service/contribute/delete/${id}`
          );
          swal("Poof! Your question has been deleted!", {
            icon: "success",
          });
          // Refresh questions after deletion
          fetchQuestions();
        } catch (error) {
          console.error("Error deleting question:", error);
          swal(
            "Error",
            "Failed to delete the question. Please try again later.",
            "error"
          );
        }
      } else {
        swal("Your question is safe!");
      }
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <div className="question-details">
            <p>
              <strong>Question:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.ques}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, ques: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.ques
              )}
            </p>
            <p>
              <strong>Option 1:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.option1}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, option1: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.option1
              )}
            </p>
            <p>
              <strong>Option 2:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.option2}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, option2: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.option2
              )}
            </p>
            <p>
              <strong>Option 3:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.option3}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, option3: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.option3
              )}
            </p>
            <p>
              <strong>Option 4:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.option4}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, option4: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.option4
              )}
            </p>
            <p>
              <strong>Right Answer:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.rightAnswer}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, rightAnswer: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.rightAnswer
              )}
            </p>
            <p>
              <strong>Difficulty Level:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.difficultyLevel}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, difficultyLevel: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.difficultyLevel
              )}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {editingQuestionId === question.id ? (
                <input
                  type="text"
                  value={question.category}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, category: e.target.value }
                          : q
                      )
                    )
                  }
                />
              ) : (
                question.category
              )}
            </p>
          </div>
          <div className="actions">
            {editingQuestionId === question.id ? (
              <>
                <button className="btn btn-primary mr-2" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleApprove(question.id)}>
                  Approve
                </button>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(question.id)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(question.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
