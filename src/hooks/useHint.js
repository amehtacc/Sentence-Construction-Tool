// src/hooks/useHint.js

import { useState } from "react";
import { generateHintPrompt } from "../utils/generateHintPromt.js";

const useHint = () => {
  const [hint, setHint] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  
  
  const getHint = async (currentQuestion) => {
    const prompt = generateHintPrompt(currentQuestion?.question);

    try {
      setIsLoadingHint(true);
      setShowTooltip(true);

      const apiKey = "AIzaSyAQqFk-Ayw9XGLBSR9gaMuZcJlg3Ib5A7c";

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setHint(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Failed to generate tweet."
      );
    } catch (error) {
      console.error("Hint fetch failed", error);
      setHint("Oops! Couldn't fetch a hint.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  return { hint, setHint, showTooltip, isLoadingHint, getHint, setShowTooltip };
};

export default useHint;
