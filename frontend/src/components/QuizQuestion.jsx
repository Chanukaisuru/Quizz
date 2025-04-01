import React from 'react';
import '../styles/QuizQuestion.css';

const QuizQuestion =({
    question,
    options,
    onAnswerSelect,
    currentQuestionIndex,
    totalQuestions,
}) => {
    return(
        <div className='quiz-question-container'>
            <div className='question-header'>
                <h2>Question {currentQuestionIndex + 1} of {totalquestion}</h2>
            </div>
            <div className='question-text'>
                <p>{question}</p>
            </div>
            <div className='answer-options'>
                {options.map((option, index) => (
                  <button
                    key ={index}
                    onClick={() => onAnswerSelect(option.points)}
                    className='option-button'
                 >  
                    {option.text}
                  </button>
                ))}
            </div>    
        </div>
    );
};

export default QuizQuestion;