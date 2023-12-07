import React, { useState } from "react";
import "./quiz.css";
import { QuizCard } from "./quiz-card";

export interface QuizProps {
  question: string;
  options: boolean[];
  correctAnswer: boolean;
  selectedOption: null;
  isAnswered: boolean;
}

export const Quiz: React.FC<QuizProps[]> = (quizData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleOptionClick = (option: boolean) => {
    if (currentIndex < quizData.length) {
      const isCorrect = option === quizData[currentIndex].correctAnswer;
      setSelectedOptions([...selectedOptions, option]);
      setScore(isCorrect ? score + 1 : score);
    }
    if (currentIndex === quizData.length - 1) {
      setIsQuizCompleted(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="quiz-container">
      {!isQuizCompleted && (
        <>
          <QuizCard
            question={quizData[currentIndex].question}
            options={quizData[currentIndex].options}
            correctAnswer={quizData[currentIndex].correctAnswer}
            selectedOption={null}
            onOptionClick={handleOptionClick}
            isAnswered={currentIndex < selectedOptions.length}
          />
          <button onClick={handleNextQuestion}>Next Question</button>
          <p>Score: {score}</p>
        </>
      )}

      {isQuizCompleted && (
        <div className="quiz-summary">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  );
};
