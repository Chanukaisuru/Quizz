import React, { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import UserInfoForm from './components/UserInfoForm';
import Timer from './components/Timer';
import { Questions } from './data/Questions';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState('section1'); // 'section1', 'timeout', 'completed', 'section2', 'results'
  const [userInfo, setUserInfo] = useState({});

  // Section 1 handlers
  const handleAnswerSelect = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Quiz completed - show completion message
      setQuizStatus('completed');
    }
  };

  const handleSubmitQuiz = () => {
    // Quiz submitted - show completion message
    setQuizStatus('completed');
  };

  const handleTimeUp = () => {
    setQuizStatus('timeout');
  };

  // Navigation handlers
  const handleGoForward = () => {
    // From either timeout or completion, go to user info
    setQuizStatus('section2');
  };

  // Section 2 handlers
  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    // Here you would typically send the data to your backend
    console.log('User info saved:', info);
    setQuizStatus('results');
  };

  const calculateSkillsScore = () => {
    const answeredQuestions = quizStatus === 'timeout' 
      ? currentQuestionIndex + 1 
      : Questions.length;
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

  // Render different sections based on quizStatus
  switch (quizStatus) {
    case 'timeout':
      return (
        <div className="timeup-message">
          <h2>Sorry! Time's up.</h2>
          <p>Time allocated for this test is over.</p>
          <button onClick={handleGoForward} className="action-button">
            Go Forward
          </button>
        </div>
      );
    
    case 'completed':
      return (
        <div className="completion-message">
          <h2>Well done! You managed to complete the test on time.</h2>
          <p>Now proceed forward to see your results</p>
          <button onClick={handleGoForward} className="action-button">
            Go Forward
          </button>
        </div>
      );
    
    case 'section2':
      return (
        <UserInfoForm 
          onSubmit={handleUserInfoSubmit}
          initialValues={userInfo}
        />
      );
    
    case 'results':
      return (
        <div className="result-page">
          <h1>Your Result</h1>
          <p>Skills Score: {calculateSkillsScore()}%</p>
          <h2>{getResultPage()}</h2>
          <div className="user-info-summary">
            <h3>Your Information</h3>
            <p>Name: {userInfo.fullName}</p>
            <p>Email: {userInfo.email}</p>
            <p>Job Role: {userInfo.jobRole}</p>
          </div>
        </div>
      );
    
    case 'section1':
    default:
      return (
        <div className="app-container">
          <Timer 
            duration={60}
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
}

export default App;