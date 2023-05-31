import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = "https://backend-patient-data-tool-lx2eaom2iq-uc.a.run.app";
//const BASE_URL = "http://localhost:8081"; //<<<<<<< DONT PUSH <<<<<<<<<<<<<<<<

const API_BASE_URL = BASE_URL + "/api";

const PUBLIC_BASE_URL = BASE_URL + "/pub";

axios.defaults.headers.common["x-token"] = localStorage.getItem("token");

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

export const getQuestions = async (templateId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/questions${
        templateId ? "?templateId=" + templateId : ""
      }`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export const getAllTemplates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/templates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates");
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

export const addNewTemplate = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/templates`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new template:", error);
    throw new Error("Failed to add new template");
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
export const getMyProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`);
    return response.data;
  } catch (error) {
    console.error("Error in fetching user details:", error);
    throw new Error("Failed to fetch user details");
  }
};

export const uploadResponseFile = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
  }
};
