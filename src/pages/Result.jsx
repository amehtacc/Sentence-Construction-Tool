import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useQuiz } from "../contexts/quizContext";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };
  console.log(results);
  const { data } = useQuiz();

  const score = Math.round(
    (results.filter((r) => r.isCorrect).length / results.length) * 100
  );
  const degree = score * 3.6;
  const progressColor = getColor(score);

  function getColor(score) {
    if (score === 0) return "rgb(204,0,0)";

    if (score <= 50) {
      const red = 204;
      const green = Math.round((score / 50) * 160);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      const red = Math.round(204 - ((score - 50) / 50) * 155);
      const green = 127;
      return `rgb(${red}, ${green}, 57)`;
    }
  }

  function fillBlanks(prompt, answers) {
    let splitPrompt = prompt.split("_____________");
    let filled = "";

    for (let i = 0; i < splitPrompt.length; i++) {
      filled += splitPrompt[i];
      if (i < answers.length) {
        if (answers[i] === null) {
          filled += `<span class="text-neutral-400">_____________</span>`;
        } else {
          filled += `<span class="border-b-2 border-dotted font-medium text-neutral-600">${answers[i]}</span>`;
        }
      }
    }

    return filled;
  }

  const handleScroll = () => {
    window.scrollTo({
      top: 550,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center mb-80">
      <div className="max-w-3xl flex flex-col items-center gap-16 relative top-[136px]">
        {/* Score Display */}
        <div className="flex flex-col items-center gap-20">
          <div className="w-36 h-36 relative flex items-center justify-center">
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: "#00000011",
              }}
            />
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(${progressColor} ${degree}deg, transparent ${degree}deg)`,
                transition: "background 0.5s ease-in-out",
              }}
            />
            <div
              className="w-[120px] h-[120px] rounded-full bg-white flex flex-col items-center justify-center z-10"
              style={{ color: progressColor }}
            >
              <span className="text-[52px] font-semibold leading-none">
                {score}
              </span>
              <p className="text-sm font-medium">Overall Score</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className="w-[270px] font-medium text-base text-[rgba(69,63,225,1)] rounded-lg border-[1px] border-[rgba(69,63,225,1)] py-4 px-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Go to Dashboard
            </button>
            <ChevronDown onClick={handleScroll} className="cursor-pointer" />
          </div>
        </div>

        {/* Response Breakdown */}
        <div className="w-full max-w-3xl flex flex-col gap-28">
          {results.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl overflow-hidden flex flex-col justify-center gap-6 pt-4 ${
                item.isCorrect
                  ? "shadow-[0px_4px_70px_0px_rgba(66,169,76,0.1)]"
                  : "shadow-[0px_4px_70px_0px_rgba(203,53,62,0.1)]"
              }`}
            >
              <div className="flex flex-col gap-3 px-4 ">
                <div className="flex justify-between items-center">
                  <span className="rounded-lg py-0.5 px-1 text-sm font-medium text-neutral-600 bg-[rgba(240,240,240,1)]">
                    Prompt
                  </span>
                  <div className="text-sm">
                    <span className="font-medium text-neutral-800">
                      {idx + 1}
                    </span>
                    <span className="font-normal text-neutral-500">
                      /{results.length}
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <p
                    className="font-normal text-base text-neutral-700"
                    dangerouslySetInnerHTML={{
                      __html: fillBlanks(
                        data?.[idx]?.question || "",
                        data?.[idx]?.correctAnswer || []
                      ),
                    }}
                  ></p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 flex flex-col justify-center gap-3">
                <div className="font-medium text-base flex items-center gap-2">
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
                <p
                  className="font-normal text-lg text-neutral-800"
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
