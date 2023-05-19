import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QuestionsListForPatients from "../Survey/QuestionsListForPatients";
import PatientResponsesList from "../Survey/PatientResponsesList";
import UserProfile from "./profile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function PatientPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.grey", width: "80%", margin: "0 auto" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          centered
        >
          <Tab
            sx={{ fontWeight: "bold", fontSize: "22px" }}
            className="patientTab"
            label="Form History"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontWeight: "bold", fontSize: "22px" }}
            className="patientTab"
            label="Submit Form"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ fontWeight: "bold", fontSize: "22px" }}
            className="patientTab"
            label="Profile"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PatientResponsesList useLoggedInUser={true} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <QuestionsListForPatients />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <UserProfile />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
