import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";


function App() {
  const location = useLocation()
  const isQuiz = location.pathname === "/quiz";

  return (
    <>
      {!isQuiz ? <Navbar /> : ''}
      <Outlet />
    </>
  );
}

export default App;
