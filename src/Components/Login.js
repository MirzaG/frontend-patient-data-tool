import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserDetails, loginAPI } from "../Api/Questions";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  useEffect(() => {
    const user = getUserDetails();
    if (user?.id) {
      if (user?.role === "patient") {
        navigate("/questions");
      } else if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "staff") {
        navigate("/dashboard");
      } else if (user?.role === "doctor") {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await loginAPI({ email, password, role });
      // Save JWT token in local storage
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "patient") {
          navigate("/questions");
        } else if (response.data.user.role === "admin") {
          navigate("/admin");
        } else if (response.data.user.role === "staff") {
          navigate("/dashboard");
        } else if (response.data.user.role === "doctor") {
          navigate("/dashboard");
        }
      } else {
        alert("Login Failed." + response.errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to Login. Incorrect Email/Password.");
    }
    // Reset form fields
    setEmail("");
    setPassword("");
    setRole("patient");
  };

  return (
    <div
      className="login-page"
      style={{
        background: "grey",
        padding: "20px",
        maxWidth: "650px",
        borderRadius: "10px 10px",
        margin: "0 auto",
        marginTop: "150px",
      }}
    >
      <h2 style={{ color: "white" }}>Welcome</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <div
          className="form-group"
          style={{ maxWidth: "400px", marginTop: "20px" }}
        >
          <label style={{ color: "white" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ width: "89%", padding: "10px", fontSize: "16px" }}
          />
        </div>
        <div
          className="form-group"
          style={{ maxWidth: "400px", marginTop: "20px" }}
        >
          <label style={{ color: "white" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{ width: "89%", padding: "10px", fontSize: "16px" }}
          />
        </div>
        <div
          className="form-group"
          style={{ maxWidth: "400px", marginTop: "20px" }}
        >
          <label style={{ color: "white" }}>Role:</label>
          <select
            value={role}
            onChange={handleRoleChange}
            style={{ width: "95%", padding: "10px", fontSize: "16px" }}
          >
            <option value="admin">Admin</option>
            <option value="patient">Patient</option>
            <option value="staff">Staff</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              background: "white",
              color: "black",
              padding: "10px 30px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
              borderRadius: "10px 10px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
