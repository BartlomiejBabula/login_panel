import React, { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import WelcomePage from "../pages/WelcomePage";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../styles/Theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOperatorProfile } from "../actions/UserActions";
import { selectUser } from "../selectors/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getOperatorProfile());
  }, [dispatch]);

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {user.isLogged ? (
            <Route path='*' exact element={<Dashboard />} />
          ) : (
            <Route path='*' exact element={<WelcomePage />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
