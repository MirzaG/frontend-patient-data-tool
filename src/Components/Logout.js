import { useEffect, useState } from "react";
import styles from "./index.css";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../Api/Questions";

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const user = getUserDetails();
    if (user?.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getUserDetails()]);
  const navigate = useNavigate();
  const logoutFn = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    isLoggedIn && (
      <div className="LogoutBtnContainer">
        <button className="LogoutBtn" onClick={logoutFn}>
          Logout
        </button>
      </div>
    )
  );
};

export default Logout;
