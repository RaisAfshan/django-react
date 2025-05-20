import { useState } from "react";
import "./App.css";
// import Home from './components'
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";


function App() {
  const location = useLocation()
  const noNavbar = location.pathname === "/register" || location.pathname ==="/" || location.pathname.includes("password")
  return (
    <>
    {
      noNavbar ? 
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request/password_reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/:uid/:token" element={<PasswordReset />} />
      </Routes>
      :
      <Navbar
        content={
          <Routes>
              <Route element= {<ProtectedRoutes/>}>
                   <Route path="/home" element={<Home />} />
                   <Route path="/about" element={<About />} />
              </Route>
          </Routes>
        }
      />
    }   
    </>
  );
}

export default App;
