import axios from "axios";

const API_BASE_URL =
  (process.env.BACKEND_URL ||
    "https://backend-patient-data-tool-lx2eaom2iq-uc.a.run.app") + "/api";

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export const addNewQuestion = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/questions`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new question:", error);
    throw new Error("Failed to add new question");
  }
};

export const updateQuestion = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/questions`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updating question:", error);
    throw new Error("Failed to update question");
  }
};

export const submitSurveyResponse = async (formData) => {
  try {
    const LOGGED_IN_USER_ID = 3;
    const response = await axios.post(
      `${API_BASE_URL}/patient/${LOGGED_IN_USER_ID}/responses`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in submitting responses:", error);
    throw new Error("Failed to submitting responses");
  }
};

export const getSurveyResponses = async (userId) => {
  try {
    const LOGGED_IN_USER_ID = 2; // need to be replaced with logged in user
    const response = await axios.get(
      `${API_BASE_URL}/patient/${userId || LOGGED_IN_USER_ID}/responses`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching responses:", error);
    throw new Error("Failed to update responses");
  }
};

export const getSurveyResponseUsers = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/patient/responses/summary`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching users who responded:", error);
    throw new Error("Failed to fetch users who responded");
  }
};
