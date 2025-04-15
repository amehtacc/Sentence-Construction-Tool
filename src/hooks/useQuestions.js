import { useEffect, useState } from "react";

function useQuestions(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.questions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

export default useQuestions;