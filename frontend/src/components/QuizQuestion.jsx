import React, { useState } from 'react';
import '../styles/QuizQuestion.css';

const QuizQuestion = ({
  question,
  options,
  onAnswerSelect,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onSubmitQuiz,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleOptionClick = (index, points) => {
    setSelectedOptionIndex(index);
    onAnswerSelect(points);
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    onNextQuestion();
  };

  return (
    <div className='quiz-question-container'>
      <div className='question-header'>
        <h2>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
      </div>
      <div className='question-text'>
        <p>{question}</p>
      </div>
      <div className='answer-options'>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index, option.points)}
            className={`option-button ${
              selectedOptionIndex === index ? 'selected' : ''
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className='navigation-buttons'>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext} className='next-button'>
            Next
          </button>
        ) : (
          <button onClick={onSubmitQuiz} className='submit-button'>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;