import { useEffect, useState } from 'react'

function useTimer(currentIndex, handleNext) {
    const [timer, setTimer] = useState(30)
    
    useEffect(()=> {
        setTimer(30);
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [currentIndex])

    useEffect(() => {
        if(timer === 0) {
            handleNext()
        }
        return
    }, [timer])

  return {timer};
}

export default useTimer;