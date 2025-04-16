// Import necessary hooks and functions from React and other libraries
import { createContext, useContext, useEffect, useState } from "react"; // React hooks for state, context, and effect management
import { useLocation, useNavigate } from "react-router-dom"; // Hook to access the current location (URL) in the app and useNavigate hook to navigate to different routes.
import useQuestions from "../hooks/useQuestions"; // Custom hook for fetching quiz questions
import useTimer from "../hooks/useTimer"; // Custom hook for managing the timer functionality

// Create a Context for managing quiz-related state and logic
const QuizContext = createContext();

// Define the QuizProvider component, which will wrap the part of the app that requires quiz data
export function QuizProvider({ children }) {
  // Get the current location (URL) to determine if the user is on the quiz page
  const location = useLocation();
  const navigate = useNavigate(); // Hook to get the navigate function for routing.
  const isQuizRoute = location.pathname === "/quiz"; // Flag to check if we are on the quiz page

  // State hooks to manage quiz-related data
  const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the current question
  const [selectedOptions, setSelectedOptions] = useState([]); // Store the selected answers/options for each blank in the question
  const [results, setResults] = useState([]); // Store the results (questions, answers, correctness)

  // Reset Quiz function
  const resetQuizState = () => {
    setCurrentIndex(0);
  };

  // Fetch questions data using the custom useQuestions hook
  const { data } = useQuestions("http://localhost:3001/data"); // Fetch quiz data from an API endpoint
  const currentQuestion = data?.[currentIndex]; // Get the current question based on currentIndex
  const parts = currentQuestion?.question?.split("_____________"); // Split the question to identify blanks
  const blanks = parts?.length - 1; // Calculate the number of blanks based on the question format

  // useEffect hook to reset selected options when the current question changes
  useEffect(() => {
    if (currentQuestion?.options?.length) {
      // Initialize selectedOptions with null values for each blank in the question
      setSelectedOptions(Array(blanks).fill(null));
    }
  }, [currentQuestion]); // Re-run this effect when currentQuestion changes

  // Initialize the timer, but only start it when the user is on the quiz page
  const { timer } = useTimer(currentIndex, handleNext, isQuizRoute, navigate);

  // Function to handle option selection for a blank in the question
  function handleSelectOption(option) {
    // Prevent selecting an option that's already been selected
    if (selectedOptions.includes(option)) return;

    // Find the first empty index (null) in selectedOptions and update it with the selected option
    const firstEmptyIndex = selectedOptions.findIndex((item) => item === null);
    if (firstEmptyIndex !== -1) {
      const updated = [...selectedOptions];
      updated[firstEmptyIndex] = option;
      setSelectedOptions(updated);
    }
  }

  // Function to handle removing a selected option (used when the user wants to change their answer)
  function handleRemoveSelected(indexToRemove) {
    // Create a copy of selectedOptions and set the selected option at indexToRemove to null
    const updated = [...selectedOptions];
    updated[indexToRemove] = null;
    setSelectedOptions(updated);
  }

  // Function to check if the user's selected options are correct
  function isAnswerCorrect() {
    const correctAnswers = currentQuestion?.correctAnswer || [];
    // Check if the user's selected options match the correct answers in both order and length
    return (
      selectedOptions.every((opt, i) => opt === correctAnswers[i]) &&
      selectedOptions.length === correctAnswers.length
    );
  }

  // Function to handle the logic for moving to the next question or submitting results
  function handleNext(navigate) {
    if (!currentQuestion) return; // If there is no current question, do nothing

    // Check if the user's answer is correct
    const isCorrect = isAnswerCorrect();
    const userResponse = [...selectedOptions]; // Capture the user's selected answers

    // Create a result object to store the question, user's response, and correctness
    const result = {
      prompt: currentQuestion.question,
      response: userResponse,
      isCorrect,
    };

    // Update the results state with the current result
    const updatedResults = [...results, result];
    setResults(updatedResults);
    setSelectedOptions([]); // Reset selected options for the next question

    // Move to the next question or show the results page if it's the last question
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1); // Increment currentIndex to load the next question
    } else {
      // If it's the last question, navigate to the results page with the updated results
      navigate("/result", { state: { results: updatedResults } });
    }
  }

  return (
    // Provide the quiz-related state and functions to the rest of the app using QuizContext.Provider
    <QuizContext.Provider
      value={{
        data,
        currentIndex,
        currentQuestion,
        blanks,
        parts,
        selectedOptions,
        handleSelectOption,
        handleRemoveSelected,
        handleNext,
        timer,
        resetQuizState ,
      }}
    >
      {children} {/* Render the children components within the QuizContext.Provider */}
    </QuizContext.Provider>
  );
}

// Custom hook to consume the QuizContext and access quiz data and functions
export function useQuiz() {
  return useContext(QuizContext); // Access the context value within any component
}
