import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { getQuestions } from "../../../Api/Questions";
import styles from "./index.css";
import QuestionModal from "../Modal/QuestionModal";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const {
        data: { rows },
      } = await getQuestions();
      const mappedResponse = rows.map((row) => ({
        question_text: row.text,
        question_type: row.type,
        options: row.options,
        id: row.id,
      }));
      setQuestions(mappedResponse);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const openModal = () => {
    clearEditQuestion();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchQuestions();
  };

  const setEditQuestion = (index) => {
    setSelectedQuestion(questions[index]);
    setModalIsOpen(true);
  };

  const clearEditQuestion = () => {
    setSelectedQuestion({});
  };

  return (
    <>
      <h2>
        <u>Questions</u>
      </h2>
      <div className="AddQuestionContainer">
        <button className="AddQuestionButton" onClick={openModal}>
          <BsPlus /> <span>Add Question</span>
        </button>
      </div>
      <ol className="QuestionsContainer">
        {questions.length === 0 && <p>No questions found.</p>}
        {questions.map((question, index) => (
          <li
            key={question.id}
            className="Question"
            onClick={() => setEditQuestion(index)}
          >
            <p>
              {question.question_text} [{question.question_type.toUpperCase()}]
            </p>
            {question.question_type === "mcq" && question.options && (
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {modalIsOpen && (
        <QuestionModal
          isModalOpen={modalIsOpen}
          onModalClose={closeModal}
          question={selectedQuestion}
        />
      )}
    </>
  );
};

export default QuestionsList;
