import React from "react";
import "./quiz.css";
import { QuizProps } from "./quiz";

export interface QuizCardProps extends QuizProps {
  onOptionClick: (option: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  correctAnswer,
  selectedOption,
  onOptionClick,
  isAnswered,
}) => {
  const handleOptionClick = (option: boolean) => {
    onOptionClick(option);
  };

  return (
    <div className="quiz-card">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={
              isAnswered
                ? option === correctAnswer
                  ? "correct"
                  : selectedOption === option
                  ? "incorrect"
                  : ""
                : selectedOption === option
                ? "selected"
                : ""
            }
            onClick={() => handleOptionClick(option)}
          >
            {option ? "Vrai" : "Faux"}
          </li>
        ))}
      </ul>
      {isAnswered && (
        <div
          className={`answer ${
            selectedOption === correctAnswer ? "correct" : "incorrect"
          }`}
        >
          {selectedOption === correctAnswer ? "Correct!" : "Incorrect!"}
        </div>
      )}
    </div>
  );
};
