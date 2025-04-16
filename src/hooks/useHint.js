import { useState } from "react";
import { generateHintPrompt } from "../utils/generateHintPromt.js";

/**
 * Custom React hook: useHint
 * ----------------------------------------
 * This hook handles the logic for generating a concise AI-powered hint
 * for fill-in-the-blank style sentence questions using Google's Gemini API.
 * 
 * Responsibilities:
 * - Generate the prompt using `generateHintPrompt(currentQuestion)`
 * - Send it to Gemini API and fetch the response
 * - Manage loading state, hint visibility, and store the hint text
 */

const useHint = () => {
  // Stores the hint text returned from the API
  const [hint, setHint] = useState("");

  // Controls the visibility of the tooltip showing the hint
  const [showTooltip, setShowTooltip] = useState(false);

  // Manages loading state while the hint is being fetched
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  /**
   * getHint: Generates and fetches a hint for the current question
   * ---------------------------------------------------------------
   * @param {Object} currentQuestion - The question object containing the sentence
   * 
   * Steps:
   * 1. Generate a prompt using the question
   * 2. Make a POST request to Gemini API
   * 3. Extract and set the hint text
   * 4. Handle loading and error states
   */
  const getHint = async (currentQuestion) => {
    const prompt = generateHintPrompt(currentQuestion?.question);

    try {
      setIsLoadingHint(true);    // Show loading state
      setShowTooltip(true);      // Reveal the tooltip while fetching

      // Access the Gemini API key from .env file (securely)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // Send POST request to Gemini API to generate content
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

      // If response is not OK, throw error
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      // Extract the hint text safely from nested structure
      setHint(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Failed to generate hint."
      );
    } catch (error) {
      console.error("Hint fetch failed", error);
      setHint("Oops! Couldn't fetch a hint.");
    } finally {
      setIsLoadingHint(false);   // Reset loading state
    }
  };

  // Return all required state and methods for hint usage
  return { hint, setHint, showTooltip, isLoadingHint, getHint, setShowTooltip };
};

export default useHint;
