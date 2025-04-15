import React, { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { ArrowRight } from "lucide-react";
import useQuestions from "../hooks/useQuestions.js";
import { useNavigate } from "react-router-dom";
import useTimer from "../hooks/useTimer.js";

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { data } = useQuestions("http://localhost:3001/data");

  const currentQuestion = data?.[currentIndex];
  const parts = currentQuestion?.question?.split("_____________");
  const blanks = parts?.length - 1;

  const { timer } = useTimer(currentIndex, handleNext);
  const navigate = useNavigate();
  function handleNext() {
    if (currentIndex < data?.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  }

  function handleSelectOption(option) {
    // Ignore if already selected
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

  useEffect(() => {
    if (currentQuestion?.options?.length) {
      setSelectedOptions(Array(currentQuestion.options.length).fill(null));
    }
  }, [currentQuestion]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[975px] h-[650px] rounded-3xl p-10 flex flex-col justify-center items-center gap-14 shadow-[0px_4px_50px_0px_rgba(69,69,69,0.07)] bg-white">
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-2xl text-neutral-600">{`00:${timer}`}</p>
            <button className="w-[76px] h-11 rounded-lg border-[1px] border-neutral-200 py-2 px-5">
              Quit
            </button>
          </div>
          <ProgressBar
            totalQuestions={data?.length}
            currentQuestion={currentIndex + 1}
          />
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-16 px-10">
              <p className="font-semibold text-xl text-neutral-600 text-center">
                Select the missing words in the correct order
              </p>
              <div
                id={currentQuestion?.questionId}
                className="font-medium text-2xl text-neutral-800 leading-12"
              >
                {parts?.map((part, index) => (
                  <React.Fragment key={index}>
                    <span>{part}</span>
                    {index < blanks && (
                      <span
                        onClick={() => handleRemoveSelected(index)}
                        className="inline-block min-w-[80px] border-b-2 border-gray-400 text-blue-600 cursor-pointer mx-1"
                      >
                        {selectedOptions[index]}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              {currentQuestion?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className={`h-[38px] rounded-lg border-[1px] border-neutral-300 py-2 px-3 flex justify-center items-center cursor-pointer hover:bg-gray-100/60 transition-all duration-200 ${
                    selectedOptions.includes(option) ? "hidden" : "flex"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOptions
                .slice(0, blanks)
                .some((opt) => opt === null)}
              className={`w-16 h-16 rounded-lg border-[1px] py-[5px] px-0.5 flex justify-center items-center transition-all duration-200
                ${
                  selectedOptions.slice(0, blanks).some((opt) => opt === null)
                    ? "cursor-not-allowed border-neutral-200 bg-gray-100 text-neutral-300"
                    : "cursor-pointer border-neutral-300 hover:bg-gray-100/60 text-neutral-400"
                }`}
              >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
