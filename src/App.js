import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./App.css";

import QuestionsList from "./Components/Admin/QuestionsList";
import QuestionsListForPatients from "./Components/Survey/QuestionsListForPatients";
import PatientResponsesList from "./Components/Survey/PatientResponsesList";
import Thanks from "./Components/Survey/Thanks";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/Login";
import Logout from "./Components/Logout";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Patient Data Collection Tool</h1>
        <Logout />
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<QuestionsList />} />
        <Route path="/questions" element={<QuestionsListForPatients />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/patient/:userId/responses"
          element={<PatientResponsesList />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
