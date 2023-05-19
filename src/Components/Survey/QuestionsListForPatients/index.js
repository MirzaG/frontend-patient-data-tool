import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions, submitSurveyResponse } from "../../../Api/Questions";
import styles from "./index.css";

const QuestionsListForPatients = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const handleQuestionsSubmit = async (e) => {
    e.preventDefault();
    document
      .getElementById("questionsSubmitBtn")
      .setAttribute("disabled", true);
    document.getElementById("questionsSubmitBtn").value = "Submitting...";
    const formData = new FormData(e.target);
    const formResponse = Object.fromEntries(formData);
    const mappedFormResponse = Object.keys(formResponse)
      .map((key) => {
        const questionId = +key.split("_").pop();
        return {
          questionId,
          response:
            typeof formResponse[key] !== "string"
              ? undefined
              : formResponse[key],
        };
      })
      .filter((obj) => !!obj.response);
    const response = await submitSurveyResponse({
      responses: mappedFormResponse,
    });
    if (response.success === true) {
      alert("Data submitted successfully!");
      document.getElementById("questionsSubmitBtn").removeAttribute("disabled");
      document.getElementById("questionsSubmitBtn").value = "Submit";
      navigate("/patient");
    } else {
      alert("There is some issue in form submission. Please try again later.");
    }
  };

  return (
    <>
      <h2>
        <u>Questions</u>
      </h2>
      <form onSubmit={handleQuestionsSubmit} className="PatientQuestionsList">
        <ol className="QuestionsContainer">
          {questions?.length === 0 && (
            <p>{isLoading ? "Loading..." : "No questions found."}</p>
          )}
          {questions.map((question, index) => (
            <li key={question.id} className="QuestionForPatient">
              <p>{question.question_text}</p>
              {question.question_type === "mcq" && question.options && (
                <fieldset id={`mcq_${question.id}_${index}`}>
                  {question.options.map((option, index) => (
                    <>
                      <input
                        type="radio"
                        value={option}
                        name={"response_" + question.id}
                        id={"radio" + index + "_" + option}
                        key={index + "_" + option}
                      />
                      <label htmlFor={"radio" + index + "_" + option}>
                        {option}
                      </label>
                      <br />
                    </>
                  ))}
                </fieldset>
              )}
              {question.question_type === "text" && (
                <input type="text" name={"response_" + question.id} />
              )}
              {question.question_type === "largetext" && (
                <textarea name={"response_" + question.id} />
              )}
              {question.question_type === "date" && (
                <input type="date" name={"response_" + question.id} />
              )}
              {question.question_type === "number" && (
                <input type="number" name={"response_" + question.id} />
              )}
              {question.question_type === "attachment" && (
                <input type="file" name={"response_" + question.id} />
              )}
            </li>
          ))}
        </ol>
        {questions?.length > 0 && (
          <div>
            <input
              id="questionsSubmitBtn"
              type="submit"
              value="Submit"
              className="submitResponseBtn"
            />
          </div>
        )}
      </form>
    </>
  );
};

export default QuestionsListForPatients;
