import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

import { getAllTemplates, addNewTemplate } from "../../../Api/Questions";
import styles from "./index.css";

const TemplatesList = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const {
        data: { rows },
      } = await getAllTemplates();
      setTemplates(rows);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const openModal = async () => {
    const response = prompt("Please enter the template name");
    if (response) {
      await addNewTemplate(JSON.stringify({ name: response }));
      fetchTemplates();
    }
  };

  return (
    <>
      <h2>
        <u>Question Templates</u>
      </h2>
      <div className="AddQuestionContainer">
        <button className="AddQuestionButton" onClick={openModal}>
          <BsPlus /> <span>Add Template</span>
        </button>
      </div>
      <ol className="QuestionsContainer">
        {templates.length === 0 && (
          <p>{isLoading ? "Loading..." : "No templates found."}</p>
        )}
        {templates.map((template, index) => (
          <li key={template.id} className="Question">
            <p>
              <NavLink to={"/template/" + template.id + "/questions"}>
                {template.Name}
              </NavLink>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
};

export default TemplatesList;
