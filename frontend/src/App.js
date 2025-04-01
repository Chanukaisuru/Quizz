import React, { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import { Questions } from './data/Questions';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  
  const handleAnswerSelect = (points) => {
    //add points to score
    setSelectionRange(prevScore => prevScore + points);
    
    // Move to the next question
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }else{
      // Quiz completed
      setQuizCompleted(true);
    }
  };
}  
export default App;
