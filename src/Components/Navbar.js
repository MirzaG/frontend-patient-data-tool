import { NavLink } from "react-router-dom";

const Navbar = () => (
  <ul>
    <table>
      <th>
        <tr>
          <td>Table of Contents</td>
        </tr>
      </th>
      <tr>
        <td>
          <li>
            <NavLink to="/admin">Add/Edit Questions List (For Admin)</NavLink>
          </li>
        </td>
      </tr>
      <tr>
        <td>
          <li>
            <NavLink to="/dashboard">Dashboard (For Doctor & Staff)</NavLink>
          </li>
        </td>
      </tr>
      <tr>
        <td>
          <li>
            <NavLink to="/patient/2/responses">
              Specific Patient Responses (For Doctor & Staff)
            </NavLink>
          </li>
        </td>
      </tr>
      <tr>
        <td>
          <li>
            <NavLink to="/questions">Questions List (For Patients)</NavLink>
          </li>
        </td>
      </tr>
      <tr>
        <td>
          <li>
            <NavLink to="/thanks">
              Thanks Page (For Patients after submission)
            </NavLink>
          </li>
        </td>
      </tr>
    </table>
  </ul>
);
export default Navbar;
