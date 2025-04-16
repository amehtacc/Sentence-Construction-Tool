// Import necessary dependencies from React
import React from "react"; // React is necessary to define the component and JSX syntax

// Define the ProgressBar component that accepts two props: totalQuestions and currentQuestion
function ProgressBar({ totalQuestions, currentQuestion }) {
  return (
    // Container for the progress bar, using flexbox to align items horizontally and center them
    <div className="w-full flex justify-center items-center gap-2">
      
      {/* Create a series of div elements (representing the progress bar sections) */}
      {/* Array.from creates an array of length 'totalQuestions' to represent each question */}
      {Array.from({ length: totalQuestions }).map((_, index) => (
        // Each individual progress segment, styled to transition and change color based on progress
        <div
          key={index} // The key is needed to uniquely identify each progress segment
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            // Conditionally apply different colors depending on whether the current question index is completed
            index < currentQuestion
              ? "bg-[rgba(242,165,49,1)]" // Highlight completed progress segments with an amber color
              : "bg-neutral-200" // Use a neutral color for uncompleted segments
          }`}
        ></div>
      ))}
    </div>
  );
}

// Export the ProgressBar component so it can be used elsewhere in the application
export default ProgressBar;
