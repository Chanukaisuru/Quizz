// src/App.jsx
import React, { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import Timer from './components/Timer';
import { quizQuestions } from './data/quizQuestions';
import './styles/App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (points) => {
    // Add points to score
    setScore(prevScore => prevScore + points);

    // Move to next question
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Quiz is completed
      setQuizCompleted(true);
    }
  };

  const handleTimeUp = () => {
    // Automatically complete the quiz when time is up
    setQuizCompleted(true);
  };

  const calculateSkillsScore = () => {
    const maxPossibleScore = quizQuestions.length * 5;
    return Math.round((score / maxPossibleScore) * 100);
  };

  const getResultPage = () => {
    const skillsScore = calculateSkillsScore();
    
    if (skillsScore < 50) return "Digital Marketing Novice";
    if (skillsScore >= 51 && skillsScore <= 60) return "Digital Marketing Seed";
    if (skillsScore >= 61 && skillsScore <= 70) return "Digital Marketing Rising Star";
    if (skillsScore >= 71 && skillsScore <= 80) return "Digital Marketing Star";
    return "Digital Marketing Rock Star";
  };

  if (quizCompleted) {
    return (
      <div className="result-page">
        <h1>Your Result</h1>
        <p>Skills Score: {calculateSkillsScore()}%</p>
        <h2>{getResultPage()}</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Timer 
        duration={600}  // 10 minutes = 600 seconds
        onTimeUp={handleTimeUp} 
      />
      <QuizQuestion 
        question={quizQuestions[currentQuestionIndex].question}
        options={quizQuestions[currentQuestionIndex].options}
        onAnswerSelect={handleAnswerSelect}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
      />
    </div>
  );
}

export default App;