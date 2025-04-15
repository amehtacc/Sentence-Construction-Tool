import React from "react";

function ProgressBar({ totalQuestions, currentQuestion }) {
  return (
    <div className="w-full flex justify-center items-center gap-2">
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            index < currentQuestion
              ? "bg-[rgba(242,165,49,1)]"
              : "bg-neutral-200"
          }`}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;