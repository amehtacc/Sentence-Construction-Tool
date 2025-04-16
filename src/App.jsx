import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { QuizProvider } from "./contexts/QuizContext.jsx";

function App() {
  const location = useLocation();
  const isQuiz = location.pathname === "/quiz";

  return (
    <>
      <QuizProvider>
        {!isQuiz ? <Navbar /> : ""}
        <Outlet />
      </QuizProvider>
    </>
  );
}

export default App;
