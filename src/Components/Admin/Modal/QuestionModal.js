import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "./index.css";
import { addNewQuestion, updateQuestion } from "../../../Api/Questions";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
  },
};

const QuestionModal = ({
  isModalOpen = false,
  onModalClose: closeModalFn,
  question: selectedQuestion,
  templateId,
}) => {
  const [questionText, setQuestionText] = useState(
    selectedQuestion.question_text || ""
  );
  const [questionType, setQuestionType] = useState(
    selectedQuestion.question_type || "text"
  );
  const [options, setOptions] = useState(selectedQuestion.options || []);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const closeModal = () => {
    setQuestionText("");
    setQuestionType("text");
    setOptions([]);
    setFile(null);
    setUploadProgress(0);
    closeModalFn();
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, ""];
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !questionType) {
      alert("Please provide question text and type");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("templateId", templateId);
      formData.append("question_text", questionText);
      formData.append("question_type", questionType);
      formData.append("options", JSON.stringify(options));
      if (file) {
        formData.append("file", file);
      }
      if (selectedQuestion.id) {
        formData.append("id", selectedQuestion.id);
        await updateQuestion(formData);
      } else {
        await addNewQuestion(formData);
      }

      closeModal();
    } catch (error) {
      console.error("Error in updating question:", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
    >
      <div className="closeModalIcon" onClick={closeModal}>
        <span>x</span>
      </div>
      <h2>{selectedQuestion.id ? "Edit" : "Add"} Question</h2>
      <form onSubmit={handleQuestionSubmit}>
        <div>
          <label htmlFor="question-text">Question Text*:</label>
          <textarea
            id="question-text"
            value={questionText}
            onChange={handleQuestionTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor="question-type">Response Format*:</label>
          <select
            id="question-type"
            value={questionType}
            onChange={handleQuestionTypeChange}
            required
          >
            <option value="text">Text</option>
            <option value="largetext">Large Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="mcq">MCQ</option>
            <option value="attachment">Atachment</option>
          </select>
        </div>
        {questionType === "mcq" && (
          <div>
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="options-text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
      {file && (
        <div>
          <p>Uploading: {uploadProgress}%</p>
        </div>
      )}
    </Modal>
  );
};

export default QuestionModal;
