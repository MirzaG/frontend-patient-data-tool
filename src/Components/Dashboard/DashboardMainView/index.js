import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { NavLink } from "react-router-dom";
import stlyles from "./index.css";

export default function DashboardMainView() {
  return (
    <div className="DashboardMainViewContainer">
      <Card sx={{ width: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://icon-library.com/images/auditing-icon/auditing-icon-9.jpg"
            alt="dashboard image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Details of submitted patient responses
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <NavLink to="/dashboard">Visit Dashboard</NavLink>
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ width: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://cdn-icons-png.flaticon.com/512/4403/4403559.png"
            alt="Questions image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Templates & Questions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Collect information from patients with dynamic questions
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <NavLink to="/templates">Visit Templates</NavLink>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
