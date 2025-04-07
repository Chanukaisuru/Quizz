//src/components/Timer.jsx
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/Timer.css';

function Timer({ duration = 60 , onTimeUp}) { // Added duration prop with default value
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp(); // Call the callback when time reaches 0
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft , onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const percentage = (secondsLeft / duration) * 100;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="timer-container">
      <CircularProgressbar
        value={percentage}
        text={displayTime}
        styles={buildStyles({
          pathColor: secondsLeft > 10 ? '#3e98c7' : '#ff0000', // Red when time is low
          textColor: '#000',
          trailColor: '#d6d6d6',
          textSize: '16px',
        })}
      />
    </div>
  );
}

export default Timer;