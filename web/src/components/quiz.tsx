import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./quiz.css";
import { RootState } from "../store/store";
import { setCounter } from "../store/slices/yearCounter";

export interface QuizProps {
  statement: string;
  options: boolean[];
  answer: boolean;
  explanation: string;
}

export interface QuizFormProps {
  quizData: QuizProps[];
}

const triggerAnimationSuivant = () => {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "s",
      keyCode: 69,
      code: "KeyE",
      which: 69,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
    })
  );
};

const triggerAnimationBack = () => {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "b",
      keyCode: 69,
      code: "KeyE",
      which: 69,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
    })
  );
};

export const Quiz: React.FC<QuizFormProps> = ({ quizData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setselectedAnswers] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const options = [true, false];
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");

  const handleChangementNom = (e: any) => {
    console.log(e.target.value);
    setNom(e.target.value);
  };

  const yearCount = useSelector(
    (state: RootState) => state.yearCounter.yearsCounter
  );

  const isEcoMode = useSelector((state: RootState) => state.ecoMode.isEcoMode);
  const handleOptionClick = (option: boolean) => {
    setIsAnswerSelected(true);

    if (currentIndex < quizData.length) {
      const isCorrect = option === quizData[currentIndex].answer;
      setselectedAnswers([...selectedAnswers, option]);
      dispatch(setCounter(isCorrect ? yearCount + 3 : yearCount - 10));
      setScore(isCorrect ? score + 1 : score);
      if (isCorrect) {
        triggerAnimationBack();
      } else {
        triggerAnimationSuivant();
      }
    }
    if (currentIndex + 1 === quizData.length) {
      setIsQuizCompleted(true);
    }
  };

  const startNewQuiz = () => {
    setIsQuizCompleted(false);
    setselectedAnswers([]);
    setNom("");
    setScore(0);
    setCurrentIndex(0);
  };

  const postScore = async () => {
    if (nom === "") {
      alert("Veuillez entrer votre nom");
      return;
    }
    console.log("post score");
    console.log(nom);
    console.log(score);
    fetch("https://ndi.moreiradj.net/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nom, longest_streak: score }),
    }).then((res) => res.json());
  };

  const handleNextQuestion = () => {
    if (!isAnswerSelected) return;
    if (currentIndex < quizData.length - 1) {
      setIsAnswerSelected(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleScoreResponse = (totalQuestions: number, score: number) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) {
      return "Excellent vous avez plus de 80% de bonnes réponses";
    } else if (percentage >= 60) {
      return "Bien vous avez plus de 60% de bonnes réponses";
    } else if (percentage >= 40) {
      return "Moyen vous avez plus de 40% de bonnes réponses";
    } else {
      return "Il serait peut-être temps de réviser vos classiques";
    }
  };

  return (
    <div className={`quiz-container ${isAnswerSelected && !quizData[currentIndex].answer ? 'horizontal-shake' : ''}`}>      {!isQuizCompleted && (
        <>
          <div className="quiz-card">
            <h3>{quizData[currentIndex].statement}</h3>
            <ul>
              {options.map((option: boolean, index: React.Key) => (
                <li
                  key={index}
                  className={
                    currentIndex < selectedAnswers.length
                      ? option === quizData[currentIndex].answer
                        ? "correct"
                        : selectedAnswers[currentIndex] === option
                        ? "incorrect"
                        : ""
                      : selectedAnswers[currentIndex] === option
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleOptionClick(option)}
                >
                  {option ? "Vrai" : "Faux"}
                </li>
              ))}
            </ul>
            {currentIndex < selectedAnswers.length && (
              <p>Explication : {quizData[currentIndex].explanation}</p>
            )}

            <button className="next-button-quiz" onClick={handleNextQuestion}>
              Suivant
            </button>
          </div>
        </>
      )}

      {isQuizCompleted && (
        <div className={`quiz-summary-container ${quizData[currentIndex].answer ? 'horizontal-shake' : ''}`}>          <div className="quiz-summary">
            <h2>Quiz terminé</h2>
            <p>{handleScoreResponse(quizData.length, score)}</p>
            <h2>Liste des résultats</h2>
            <div className="result-list-container">
              <ul>
                {quizData.map((quiz, index) => (
                  <li
                    style={{ cursor: "text" }}
                    key={index}
                    className={
                      quiz.answer === selectedAnswers[index]
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {index + 1} : {quiz.statement}
                  </li>
                ))}
              </ul>
              {isEcoMode && (
                <div className="eco-mode" style={{ marginRight: "10px" }}>
                  <p>Merci d'avoir joué en mode éco</p>
                </div>
              )}
              {!isEcoMode && (
                <div className="eco-mode" style={{ marginRight: "10px" }}>
                  <p>Reduisez votre impact en activant le mode éco</p>
                  <input
                    className="name-quiz"
                    type="text"
                    placeholder="Entrez votre nom"
                    value={nom}
                    onChange={handleChangementNom}
                  />
                  <button
                    className="next-button-quiz"
                    onClick={() => postScore()}
                  >
                    Soumettre le resultat
                  </button>
                </div>
              )}
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
                className="next-button-quiz"
                onClick={() => startNewQuiz()}
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
