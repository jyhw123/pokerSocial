import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

// This is the reason for our jsconfig.json file, easier file naming 
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

function App() {
  // These are redux hooks. We are LIFTING UP these states up so that they can be shared between all components.
  // If we were to set up these hooks within the react components, the state would only be shared w that component

    // grab the current mode (light or dark?) from our state management redux store. mode is a part of the state that we declared in state/index.js
  const mode = useSelector((state) => state.mode); // this is a selector function within the useSelector() hook
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  // BrowserRouter is how we connect our page to other pages based on URL
  // the second theme in theme ={theme} refers to the theme instantiated above
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route 
            path="/" 
            element={<LoginPage />} 
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
              // element={<HomePage />} 
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              // element={<ProfilePage />} 
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
