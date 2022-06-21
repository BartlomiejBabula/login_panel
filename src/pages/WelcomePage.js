import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoginPanelPage from "./LoginPanelPage";
import SignupPanelPage from "./SignupPanelPage";
import { Routes, Route } from "react-router-dom";

function WelcomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        bgcolor: "#F9FAFC",
      }}
    >
      <Paper
        elevation={4}
        sx={{ height: "600px", width: "1000px", display: "flex", mt: 17 }}
      >
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to bottom right, #1976d2, #42a5f5)",
            height: "100%",
            width: "40%",
            color: "white",
          }}
        >
          <Typography
            variant='h5'
            align='center'
            sx={{ letterSpacing: 3, mt: 20, mb: 4 }}
          >
            WELCOME TO
          </Typography>
          <Typography
            variant='h3'
            align='center'
            sx={{ letterSpacing: 3, mb: 8 }}
          >
            CARRIERLINK
          </Typography>
          <Typography
            variant='body1'
            align='center'
            sx={{ letterSpacing: 1, padding: "0px 60px" }}
          >
            The first application that connects drivers and carriers
          </Typography>
        </Box>
        <Box
          sx={{
            padding: 2,
            pl: 11,
            pr: 11,
            width: "60%",
            height: "100%",
            position: "relative",
          }}
        >
          <Routes>
            <Route path='/' exact element={<LoginPanelPage />} />
            <Route path='/signup' exact element={<SignupPanelPage />} />
          </Routes>
        </Box>
      </Paper>
    </Box>
  );
}

export default WelcomePage;
