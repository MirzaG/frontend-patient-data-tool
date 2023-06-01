import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.css";

import { getSurveyResponseUsers } from "../../Api/Questions";

const Dashboard = () => {
  const [responseUsers, setResponseUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResponseUsers();
  }, []);

  const fetchResponseUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSurveyResponseUsers();
      setResponseUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  return (
    <div className="UserSubmittedResponsesContainer">
      <h3>Submitted Responses - Users</h3>
      {responseUsers?.length === 0 && (
        <p style={{ marginLeft: "130px" }}>
          {isLoading ? "Loading..." : "No submissions found."}
        </p>
      )}
      {responseUsers?.length > 0 && (
        <table className="PatientResponsesTable">
          <thead>
            <tr>
              <td>
                <b>Contact No.</b>
              </td>
              <td>
                <b>Name</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {responseUsers?.map(({ contactId }) => (
              <tr>
                <td>
                  <NavLink to={`/patient/${contactId}/responses`}>
                    {contactId}
                  </NavLink>
                </td>
                <td>N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
