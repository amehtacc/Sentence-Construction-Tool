// Import necessary hooks from React
import { useEffect, useState } from 'react';

// Custom hook to manage a timer that counts down for each quiz question
function useTimer(currentIndex, handleNext, isActive, navigate) {
    // State to store the remaining time for the current question
    const [timer, setTimer] = useState(30); // Initialize timer to 30 seconds

    // useEffect hook to reset the timer and start counting down whenever the question changes or the timer is active
    useEffect(() => {
        // If the timer is not active, exit early
        if (!isActive) return;

        // Reset timer to 30 seconds whenever the question index changes or when the timer is reactivated
        setTimer(30);

        // Set an interval to decrement the timer every second (1000 milliseconds)
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1); // Decrease timer by 1 each second
        }, 1000);

        // Cleanup the interval when the component is unmounted or dependencies change (i.e., currentIndex or isActive)
        return () => clearInterval(interval);

    }, [currentIndex, isActive]); // Effect runs whenever currentIndex or isActive changes

    // useEffect hook to check if the timer reaches zero and trigger the next question
    useEffect(() => {
        // If the timer is not active, exit early
        if (!isActive) return;

        // When timer reaches zero, call the handleNext function to move to the next question
        if (timer === 0) {
            handleNext(navigate);
        }

        // No cleanup needed for this effect since it's just checking the timer value

    }, [timer, isActive]); // Effect runs whenever the timer or isActive changes

    // Return the current timer value to the component that calls this hook
    return { timer };
}

// Export the custom hook to be used in other parts of the application
export default useTimer;
