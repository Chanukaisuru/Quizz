import React, { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import Timer from './components/Timer';
import { Questions } from './data/Questions';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState('active'); // 'active', 'timeout', 'completed'
  const [hasCompletedEarly, setHasCompletedEarly] = useState(false);

  const handleAnswerSelect = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setHasCompletedEarly(true);
      setQuizStatus('completed');
    }
  };

  const handleSubmitQuiz = () => {
    setHasCompletedEarly(true);
    setQuizStatus('completed');
  };

  const handleTimeUp = () => {
    setQuizStatus('timeout');
  };

  const handleShowResults = () => {
    setQuizStatus('completed');
  };

  const calculateSkillsScore = () => {
    const answeredQuestions = hasCompletedEarly 
      ? Questions.length 
      : currentQuestionIndex + 1;
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

  if (quizStatus === 'timeout') {
    return (
      <div className="timeup-message">
        <h2>Sorry! Time's up.</h2>
        <p>Time allocated for this test is over.</p>
        <button onClick={handleShowResults} className="action-button">
          Go Forward
        </button>
      </div>
    );
  }

  if (quizStatus === 'completed' && hasCompletedEarly) {
    return (
      <div className="completion-message">
        <h2>Well done! You managed to complete the test on time.</h2>
        <p>Now proceed forward to see your results</p>
        <button onClick={handleShowResults} className="action-button">
          Go Forward
        </button>
      </div>
    );
  }

  if (quizStatus === 'completed') {
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