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
import DashboardMainView from "./Components/Dashboard/DashboardMainView";
import PatientPage from "./Components/Patient";
import UserProfile from "./Components/Patient/profile";
import TemplatesList from "./Components/Admin/TemplatesList";
import DoctorDashboard from "./Components/Doctor/DashboardMainView";
import SendTemplates from "./Components/Doctor/SendTemplates";

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
        <Route path="/templates" element={<TemplatesList />} />
        <Route path="/questions" element={<QuestionsListForPatients />} />
        <Route
          path="/template/:templateId/questions"
          element={<QuestionsList />}
        />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/send-template" element={<SendTemplates />} />
        {/* Users who repsonded list */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main" element={<DashboardMainView />} />

        <Route path="/patient" element={<PatientPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/patient/:userId/responses"
          element={<PatientResponsesList />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
