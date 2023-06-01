import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllTemplates, sendTemplateToPatient } from "../../../Api/Questions";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./index.css";

const SendTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const fetchTemplates = async () => {
    const {
      data: { rows },
    } = await getAllTemplates();
    setTemplates(rows);
  };

  const handleFormSubmit = async (e) => {
    const patientContact = document.getElementById(
      "selected-patient-contact"
    ).value;
    if (selectedTemplate && patientContact) {
      e.preventDefault();
      const payload = {
        templateId: selectedTemplate,
        patientContact,
      };
      try {
        const response = await sendTemplateToPatient(JSON.stringify(payload));
        alert("Template questions sent successfully!");
        navigate("/doctor/dashboard");
      } catch (e) {
        alert("Unable to process the request. Please try again later.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box
        sx={{
          m: 5,
          minWidth: 120,
          border: "2px solid lightgrey",
          borderRadius: "10px 10px",
          pt: 10,
          pb: 10,
          width: "50%",
          display: "inline-block",
        }}
      >
        <h3>Send questions to patient</h3>
        <form>
          <FormControl sx={{ m: 2, mt: 0, width: 300 }}>
            <InputLabel id="tempaltes-multiple-chip-label">
              Question Template*
            </InputLabel>
            <Select
              labelId="tempaltes-simple-select-label"
              id="tempaltes-simple-select"
              value={selectedTemplate}
              label="Question Template"
              required
              onChange={handleTemplateChange}
            >
              {templates.map(({ id, Name, Questions = [] }) => (
                <MenuItem sx={{ mb: 1 }} key={Name} value={id}>
                  {Name}{" "}
                  {Questions?.length
                    ? " - (" + Questions.length + " Questions)"
                    : "No Questions"}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="selected-patient-contact"
              label="Patient Contact"
              variant="outlined"
              required
              style={{ marginTop: "15px" }}
              type="tel"
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 3, width: "35%" }}
                onClick={handleFormSubmit}
              >
                Send
              </Button>
            </div>
          </FormControl>
          <Alert
            sx={{ margin: "0 30%", display: "none" }}
            hidden={true}
            variant="filled"
            severity="success"
            id="template-sent-msg"
          >
            Template questions sent successfully!
          </Alert>
        </form>
      </Box>
    </div>
  );
};

export default SendTemplates;
