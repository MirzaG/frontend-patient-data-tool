import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getSurveyResponseUsers } from "../../Api/Questions";

const Dashboard = () => {
  const [responseUsers, setResponseUsers] = useState([]);

  useEffect(() => {
    fetchResponseUsers();
  }, []);

  const fetchResponseUsers = async () => {
    try {
      const { data } = await getSurveyResponseUsers();
      setResponseUsers(data);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  return (
    <div>
      <h3>Submitted Responses - Users</h3>
      <ul>
        {responseUsers?.length === 0 && <p>No submissions found.</p>}
        {responseUsers?.map(({ User }) => (
          <li>
            <NavLink to={`/patient/${User.id}/responses`}>
              {User.firstName} {User.lastName} ({User.email})
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
