// Importing necessary libraries and components
import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // Outlet renders matched child routes; useLocation gives access to current route info
import Navbar from "./components/Navbar.jsx"; // Navigation bar component
import { QuizProvider } from "./contexts/QuizContext.jsx"; // Context provider for managing quiz-related state

function App() {
  // Get the current route/path using useLocation hook
  const location = useLocation();

  // Check if the current path is '/quiz'
  // This is used to conditionally hide the Navbar during the quiz
  const isQuiz = location.pathname === "/quiz";

  return (
    <>
      {/* 
        Wrap everything inside QuizProvider so all components inside
        can access the quiz context (e.g., quiz data, functions)
      */}
      <QuizProvider>
        {/* 
          Conditionally render the Navbar:
          - Show Navbar on all routes **except** when user is on "/quiz"
          - Hides distractions during the quiz experience
        */}
        {!isQuiz ? <Navbar /> : ""}

        {/* 
          Render the child route component that matches the current path.
          This is controlled by the <Route> structure in the main router file.
        */}
        <Outlet />
      </QuizProvider>
    </>
  );
}

export default App;
