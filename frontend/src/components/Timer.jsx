// src/components/Timer.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // If time reaches 0, call onTimeUp
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    // Set up the interval
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up the interval
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;