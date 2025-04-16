// Import necessary hooks from React
import { useEffect, useState } from "react";
import QuestionData from "../../db/question_data.json";

// Custom hook to fetch questions data from a given URL
function useQuestions(url) {
  // State to store the fetched questions data
  const [data, setData] = useState(null); // Initially set to null, will be populated with fetched questions
  // State to manage the loading state of the data fetching process
  const [loading, setLoading] = useState(true); // Initially set to true as data is still being fetched

  const isDev = import.meta.env.DEV;

  // useEffect hook to trigger the data fetching when the component mounts or the URL changes
  useEffect(() => {
    // Define an async function to fetch data from the provided URL
    async function fetchData() {
      try {
        if (isDev) {
          // Attempt to fetch data from the URL and parse it as JSON
          const response = await fetch(url);
          const result = await response.json();

          // Set the fetched questions data into state
          setData(result.questions);
          // Set loading to false once data is fetched successfully
          setLoading(false);
        } else {
          // Use mock data in production
          setData(QuestionData?.data?.questions);
        }
      } catch (error) {
        // In case of an error during the fetch process, log it to the console
        console.error("Failed to fetch questions:", error);
        // Set loading to false even if the fetch fails (to stop loading indicator)
        setLoading(false);
        if (!isDev) {
          // Fallback to mock data even if something weird happens
          setData(QuestionData?.data?.questions);
        }
      } finally {
        setLoading(false); // Always stop loading regardless of success or error
      }
    }

    // Call the fetchData function to initiate the fetch
    fetchData();
  }, [url]); // The effect will run every time the URL changes, re-fetching the data

  // Return the fetched data and the loading state to the component that calls this hook
  return { data, loading };
}

// Export the custom hook to be used in other parts of the application
export default useQuestions;
