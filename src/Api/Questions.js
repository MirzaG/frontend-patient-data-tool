import axios from "axios";
import jwtDecode from "jwt-decode";

const API_BASE_URL =
  (process.env.BACKEND_URL ||
    "https://backend-patient-data-tool-lx2eaom2iq-uc.a.run.app") + "/api";

const PUBLIC_BASE_URL =
  (process.env.BACKEND_URL ||
    "https://backend-patient-data-tool-lx2eaom2iq-uc.a.run.app") + "/pub";

export const getUserDetails = () => {
  const token = localStorage.getItem("token");

  if (token) {
    // Decode the JWT token to get user details
    const decodedToken = jwtDecode(token);

    // Extract user details from the decoded token
    const {
      user: { userId, email, role },
    } = decodedToken;

    return { id: userId, email, role };
  }
  return {};
};

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
    const user = getUserDetails();
    const response = await axios.post(
      `${API_BASE_URL}/patient/${user.id}/responses`,
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

export const loginAPI = async (formData) => {
  try {
    const response = await axios.post(`${PUBLIC_BASE_URL}/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in login:", error);
    throw new Error("Failed to login");
  }
};

export const getSurveyResponses = async (userId) => {
  try {
    const user = getUserDetails();
    const response = await axios.get(
      `${API_BASE_URL}/patient/${userId || user.id}/responses`
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
