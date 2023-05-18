import React, { useState, useEffect } from "react";
import { getSurveyResponses } from "../../../Api/Questions";
import { useParams } from "react-router-dom";
import styles from "./index.css";

const PatientResponsesList = () => {
  const { userId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchPatientResponses(userId);
  }, []);

  const fetchPatientResponses = async (userId) => {
    try {
      const {
        data: { rows },
      } = await getSurveyResponses(userId);
      setResponses(rows);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  const renderAttachment = (attachment) => {
    const fileType = attachment.split(".").pop().toLowerCase();

    if (
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "png" ||
      fileType === "gif"
    ) {
      return (
        <img src={attachment} alt="Attachment" style={{ maxWidth: "200px" }} />
      );
    } else if (fileType === "pdf") {
      return (
        <embed
          src={attachment}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      );
    } else {
      return (
        <a href={attachment} target="_blank" rel="noopener noreferrer">
          View Attachment
        </a>
      );
    }
  };

  return (
    <>
      <h2>
        <u>
          Patient Responses({responses[0]?.User.firstName}{" "}
          {responses[0]?.User.lastName})[{responses[0]?.createdAt}]
        </u>
      </h2>
      {
        <ol className="QuestionsContainer">
          {responses.length === 0 && <p>No responses found.</p>}
          {responses.map((response) => (
            <li key={response.id} className="Question">
              <p>
                {response.Question.text} [{response.Question.type.toUpperCase()}
                ]
              </p>
              {response.Question.type === "mcq" &&
                response.Question.options && (
                  <ul>
                    {response.Question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                )}
              <p>
                <b>Response: </b>
                {response.response}
              </p>
              {/* {question.attachment && renderAttachment(question.attachment)} */}
            </li>
          ))}
        </ol>
      }
    </>
  );
};

export default PatientResponsesList;
