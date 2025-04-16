import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useQuestions from "../hooks/useQuestions";
import useTimer from "../hooks/useTimer";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const location = useLocation();
  const isQuizRoute = location.pathname === "/quiz";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);

  const { data } = useQuestions("http://localhost:3001/data");
  const currentQuestion = data?.[currentIndex];
  const parts = currentQuestion?.question?.split("_____________");
  const blanks = parts?.length - 1;

  useEffect(() => {
    if (currentQuestion?.options?.length) {
      setSelectedOptions(Array(blanks).fill(null));
    }
  }, [currentQuestion]);

  // Only start timer when on the quiz page
  const { timer } = useTimer(currentIndex, handleNext, isQuizRoute);

  function handleSelectOption(option) {
    if (selectedOptions.includes(option)) return;

    const firstEmptyIndex = selectedOptions.findIndex((item) => item === null);
    if (firstEmptyIndex !== -1) {
      const updated = [...selectedOptions];
      updated[firstEmptyIndex] = option;
      setSelectedOptions(updated);
    }
  }

  function handleRemoveSelected(indexToRemove) {
    const updated = [...selectedOptions];
    updated[indexToRemove] = null;
    setSelectedOptions(updated);
  }

  function isAnswerCorrect() {
    const correctAnswers = currentQuestion?.correctAnswer || [];
    return (
      selectedOptions.every((opt, i) => opt === correctAnswers[i]) &&
      selectedOptions.length === correctAnswers.length
    );
  }

  function handleNext(navigate) {
    if (!currentQuestion) return;

    const isCorrect = isAnswerCorrect();
    const userResponse = [...selectedOptions];

    const result = {
      prompt: currentQuestion.question,
      response: userResponse,
      isCorrect,
    };

    const updatedResults = [...results, result];
    setResults(updatedResults);
    setSelectedOptions([]);

    if (currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result", { state: { results: updatedResults } });
    }
  }

  return (
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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
