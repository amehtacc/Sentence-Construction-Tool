import { useEffect, useState } from 'react'

function useTimer(currentIndex, handleNext, isActive) {
    const [timer, setTimer] = useState(30)
    
    useEffect(()=> {
        if (!isActive) return;

        setTimer(30);
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [currentIndex, isActive])

    useEffect(() => {
        if (!isActive) return;
        
        if(timer === 0) {
            handleNext()
        }
        return
    }, [timer, isActive])

  return {timer};
}

export default useTimer;