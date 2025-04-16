// Importing necessary hooks and components
import { useLocation, useNavigate } from "react-router-dom"; // for accessing navigation and data passed via route
import { ChevronDown } from "lucide-react"; // icon used for scrolling down
import { useQuiz } from "../contexts/QuizContext"; // custom context hook to access quiz data

function ResultPage() {
  // Access the location object to get passed state data (results)
  const location = useLocation();
  const navigate = useNavigate(); // hook to programmatically navigate between routes

  // Destructure the results array from location state, fallback to empty array if not available
  const { results } = location.state || { results: [] };

  // Log results to the console (useful for debugging)
  console.log(results);

  // Access quiz data from context (which contains the questions & correct answers)
  const { data } = useQuiz();

  // Calculate overall score in percentage
  const score =
    Math.round(
      (results.filter((r) => r.isCorrect).length / results.length) * 100
    ) || 0;

  // Convert score percentage to degree (for conic gradient representation)
  const degree = score * 3.6;

  // Get a dynamic color based on score
  const progressColor = getColor(score);

  /**
   * Function to calculate the score color dynamically.
   * Transitions from red → yellow → green depending on the score.
   */
  function getColor(score) {
    if (score === 0) return "rgb(204,0,0)"; // solid red for 0 score

    if (score <= 50) {
      // red → yellow transition
      const red = 204;
      const green = Math.round((score / 50) * 160);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // yellow → green transition
      const red = Math.round(204 - ((score - 50) / 50) * 155);
      const green = 127;
      return `rgb(${red}, ${green}, 57)`;
    }
  }

  /**
   * Fills in the blanks for a given prompt using the user's answers or correct answers.
   * Handles formatting and styling of blanks and answers.
   */
  function fillBlanks(prompt, answers) {
    let splitPrompt = prompt.split("_____________"); // split at blank placeholder
    let filled = "";

    for (let i = 0; i < splitPrompt.length; i++) {
      filled += splitPrompt[i]; // append current prompt part

      // Add answer or placeholder for each blank
      if (i < answers.length) {
        if (answers[i] === null) {
          // No answer provided → show empty blank
          filled += `<span class="text-neutral-400">_____________</span>`;
        } else {
          // Show answer with dotted underline
          filled += `<span class="border-b-2 border-dotted italic font-medium text-neutral-600">${answers[i]}</span>`;
        }
      }
    }

    return filled;
  }

  // Smooth scroll to the detailed results section
  const handleScroll = () => {
    window.scrollTo({
      top: 550,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center mb-80">
      <div className="max-w-3xl flex flex-col items-center gap-16 relative top-[136px]">
        
        {/* --- OVERALL SCORE DISPLAY --- */}
        <div className="flex flex-col items-center gap-20">
          
          {/* Circular Score Progress UI */}
          <div className="w-36 h-36 relative flex items-center justify-center">
            {/* Background circle (grey) */}
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: "#00000011",
              }}
            />

            {/* Progress circle (conic-gradient) */}
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(${progressColor} ${degree}deg, transparent ${degree}deg)`,
                transition: "background 0.5s ease-in-out",
              }}
            />

            {/* Score Value Displayed in Center */}
            <div
              className="w-[120px] h-[120px] rounded-full bg-white flex flex-col items-center justify-center z-10"
              style={{ color: progressColor }}
            >
              <span className="text-[52px] font-semibold leading-none">
                {score}
              </span>
              <p className="text-xs sm:text-sm font-medium">Overall Score</p>
            </div>
          </div>

          {/* Button to go back to dashboard and scroll-down icon */}
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className="w-[270px] font-medium text-xs sm:text-base text-[rgba(69,63,225,1)] rounded-lg border-[1px] border-[rgba(69,63,225,1)] py-2 sm:py-3 lg:py-4 px-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Go to Dashboard
            </button>
            <ChevronDown onClick={handleScroll} className="cursor-pointer" />
          </div>
        </div>

        {/* --- DETAILED QUESTION BREAKDOWN --- */}
        <div className="w-full min-[300px]:max-w-[290px] min-[350px]:max-w-[350px] min-[400px]:max-w-[390px] min-[500px]:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col gap-12 md:gap-24 lg:gap-28">
          {results.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl overflow-hidden flex flex-col justify-center ${
                item.isCorrect
                  ? "shadow-[0px_0px_20px_0px_rgba(66,169,76,0.2)]" // green shadow for correct
                  : "shadow-[0px_0px_20px_0px_rgba(203,53,62,0.2)]" // red shadow for incorrect
              }`}
            >
              {/* Prompt Section */}
              <div className="flex flex-col gap-3 px-4 rounded-t-2xl border-[1px] border-neutral-200 pb-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="rounded-lg py-0.5 px-1 text-xs sm:text-sm font-medium text-neutral-600 bg-[rgba(240,240,240,1)]">
                    Prompt
                  </span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium text-neutral-800">
                      {idx + 1}
                    </span>
                    <span className="font-normal text-neutral-500">
                      /{results.length}
                    </span>
                  </div>
                </div>

                {/* Display the correct answer-filled prompt */}
                <div className="p-2">
                  <p
                    className="font-normal text-sm sm:text-base text-neutral-700"
                    dangerouslySetInnerHTML={{
                      __html: fillBlanks(
                        data?.[idx]?.question || "",
                        data?.[idx]?.correctAnswer || []
                      ),
                    }}
                  ></p>
                </div>
              </div>

              {/* User Response Section */}
              <div className="bg-neutral-50 p-6 flex flex-col justify-center gap-3">
                <div className="font-medium text-sm sm:text-base flex items-center gap-2">
                  <p className="text-neutral-600">Your response</p>
                  <span
                    className={`rounded-2xl py-0.5 px-1 ${
                      item.isCorrect
                        ? "bg-[rgba(238,251,239,1)] text-[rgba(49,127,57,1)]"
                        : "bg-[rgba(252,235,236,1)] text-[rgba(158,41,48,1)]"
                    }`}
                  >
                    {item.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                {/* Display user's actual filled-in answers */}
                <p
                  className="font-normal text-base sm:text-lg text-neutral-800"
                  dangerouslySetInnerHTML={{
                    __html: fillBlanks(item.prompt, item.response || []),
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
