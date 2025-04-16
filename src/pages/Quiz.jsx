import React, { useState } from "react"; // Importing React library for creating components.
import { ArrowRight, Info } from "lucide-react"; // Importing ArrowRight icon from lucide-react for button use.
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate hook to navigate to different routes.
import ProgressBar from "../components/ProgressBar"; // Importing ProgressBar component for displaying quiz progress.
import { useQuiz } from "../contexts/QuizContext"; // Importing useQuiz context hook to access quiz-related state and methods.
import { useEffect } from "react";
import useHint from "../hooks/useHint";

function Quiz() {
  const navigate = useNavigate(); // Hook to get the navigate function for routing.
  const { hint, setHint, showTooltip, isLoadingHint, getHint, setShowTooltip } = useHint()

  useEffect(() => {
    // Reset quiz state when the component is mounted or quiz restarts
    resetQuizState(); // Add your state reset function here
  }, []);

  // Extracting values and methods from the QuizContext to manage quiz data, options, timer, etc.
  const {
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
    resetQuizState,
  } = useQuiz();

  useEffect(() => {
    if(hint) {
      setHint("")
      setShowTooltip(false);
    }
  }, [currentIndex])
  
  const handleHintClick = async () => {
    if (hint) {
      // Toggle tooltip if hint is already fetched
      setShowTooltip(!showTooltip);
      return;
    }

    await getHint(currentQuestion);
  };
  

  return (
    <div className="w-full min-h-screen flex justify-center items-center max-sm:px-3 max-sm:py-10 sm:p-10">
      {/* The main container to center content on the screen */}
      <div className="min-[300px]:w-[310px] min-[400px]:w-[380px] sm:w-[600px] max-sm:h-full sm:h-[550px] lg:w-[975px] lg:h-[650px] rounded-3xl max-sm:p-5 sm:p-6 lg:p-10 flex flex-col justify-center items-center gap-14 shadow-[0px_4px_50px_0px_rgba(69,69,69,0.07)] bg-white">
        {/* Container for the quiz content, styled with responsive design */}

        <div className="w-full flex flex-col justify-center items-center gap-8">
          {/* Top section with the timer and the 'Quit' button */}
          <div className="w-full flex justify-between items-center">
            {/* Flexbox layout for timer and Quit button */}
            <p className="font-semibold max-sm:text-base sm:text-xl lg:text-2xl text-neutral-600">{`00:${timer}`}</p>
            {/* Displaying the timer */}

            <Link to="/">
              <button className="max-sm:w-[60px] sm:w-[76px] max-sm:h-9 sm:h-11 max-sm:text-sm flex justify-center items-center cursor-pointer rounded-lg border-[1px] border-neutral-200 py-2 px-5">
                {/* 'Quit' button */}
                Quit
              </button>
            </Link>
          </div>
          <ProgressBar
            totalQuestions={data?.length} // Passing the total number of questions to the ProgressBar
            currentQuestion={currentIndex + 1} // Passing the current question number (index + 1 for 1-based count)
          />
        </div>

        <div className="w-full flex flex-col gap-10">
          {/* Main content of the quiz */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col max-sm:gap-10 sm:gap-12 lg:gap-16 max-sm:px-4 sm:px-6 lg:px-10">
              {/* Question container */}
              <p className="font-semibold max-sm:text-xs sm:text-base lg:text-xl text-neutral-600 text-center">
                Select the missing words in the correct order
              </p>
              {/* Instruction text */}

              <div
                id={currentQuestion?.questionId}
                className="font-medium max-sm:text-sm sm:text-lg lg:text-2xl text-neutral-800 max-sm:leading-7 sm:leading-8 lg:leading-12"
              >
                {/* Displaying the parts of the current question */}
                {parts?.map((part, index) => (
                  <React.Fragment key={index}>
                    <span>{part}</span> {/* Displaying part of the sentence */}
                    {index < blanks && (
                      <span
                        onClick={() => handleRemoveSelected(index)} // Handle remove option click
                        className="inline-block min-w-[80px] border-b-2 border-gray-400 text-blue-600 cursor-pointer mx-1"
                      >
                        {selectedOptions[index]}{" "}
                        {/* Displaying the selected option */}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Displaying available options for the current question */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              {currentQuestion?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)} // Handle selecting an option
                  className={`sm:h-[38px] rounded-lg border-[1px] max-sm:text-xs sm:text-sm lg:text-base border-neutral-300 py-2 px-3 flex justify-center items-center cursor-pointer hover:bg-gray-100/60 transition-all duration-200 ${
                    selectedOptions.includes(option) ? "hidden" : "flex" // Hide selected options
                  }`}
                >
                  {option} {/* Displaying the option */}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation section with Next button */}
          <div className="w-full flex justify-between items-center">
            <button
              onClick={handleHintClick}
              className="text-neutral-400 text-xs lg:text-sm flex justify-between items-center gap-2 cursor-pointer relative"
            >
              <Info className="w-4 h-4 lg:w-5 lg:h-5"/>
              Need a Hint?
              {showTooltip && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded text-xs text-gray-700 w-64 z-10">
                  {isLoadingHint ? "Generating hint..." : hint}
                </div>
              )}
            </button>

            <button
              onClick={() => handleNext(navigate)} // Handle moving to the next question
              disabled={selectedOptions.some((opt) => opt === null)} // Disable button if not all options are selected
              className={`max-sm:w-10 sm:w-12 max-sm:h-10 sm:h-12 lg:w-16 lg:h-16 rounded-lg border-[1px] py-[5px] px-0.5 flex justify-center items-center transition-all duration-200
                ${
                  selectedOptions.some((opt) => opt === null)
                    ? "cursor-not-allowed border-neutral-200 bg-gray-100 text-neutral-300"
                    : "cursor-pointer border-neutral-300 hover:bg-gray-100/60 text-neutral-400"
                }`}
            >
              <ArrowRight /> {/* Displaying the ArrowRight icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
