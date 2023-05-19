import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Avatar, Typography, Grid, Paper } from "@mui/material";
import { getMyProfile } from "../../Api/Questions";

const UserProfileContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
}));

const UserProfile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const {
      data: { user },
    } = await getMyProfile();
    setUser(user);
  };
  return (
    <UserProfileContainer
      sx={{
        textAlign: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "400px",
          display: "inline-block",
          width: "100%",
          backgroundColor: "lightgray",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Avatar
              alt="User Avatar"
              src="https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
              sx={{
                width: 150,
                height: 150,
                marginBottom: "20px",
                border: "5px solid white",
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              {user?.firstName}&nbsp;{user?.lastName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ marginBottom: "5px" }}>
              <b>Email:</b>&nbsp;{user?.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "5px" }}>
              <b>Phone:</b>&nbsp;{user?.phone}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "5px" }}>
              <b>Location:</b>&nbsp;N/A
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </UserProfileContainer>
  );
};

export default UserProfile;
