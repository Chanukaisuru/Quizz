// src/App.jsx
import React, { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import Timer from './components/Timer';
import { Questions } from './data/Questions';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (points) => {
    // Add points to score
    setScore(prevScore => prevScore + points);
  };

  const handleNextQuestion = () => {
    // Move to next question
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Quiz is completed
    setQuizCompleted(true);
  };

  const handleTimeUp = () => {
    // Automatically complete the quiz when time is up
    setQuizCompleted(true);
  };

  const calculateSkillsScore = () => {
    const maxPossibleScore = Questions.length * 5;
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
        duration={60}  // 10 minutes = 600 seconds
        onTimeUp={handleTimeUp} 
      />
      <QuizQuestion 
        question={Questions[currentQuestionIndex].question}
        options={Questions[currentQuestionIndex].options}
        onAnswerSelect={handleAnswerSelect}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={Questions.length}
        onNextQuestion={handleNextQuestion}
        onSubmitQuiz={handleSubmitQuiz}
      />
    </div>
  );
}

export default App;