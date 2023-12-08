import { Quiz, QuizProps } from "../components/quiz";

import React, { useEffect, useState } from "react";
import "./home.css";
import { EarthScene } from "../components/earth-scene";
import { Helper } from "../helper/helper";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export interface HomeProps {}
export const fakeQuizData: QuizProps[] = [
  {
    statement: "Quel est le nom du président de la République française ?",
    options: [true, false],
    answer: true,
    explanation: "C'est a commencé à charo brigitte à l'ecole primaire",
  },
  {
    statement: "Quel est le nom du président de la République française ?",
    options: [true, false],
    answer: true,
    explanation: "C'est a commencé à charo brigitte à l'ecole primaire",
  },
];

export const Home: React.FC<HomeProps> = () => {
  const [quizData, setQuizData] = useState<QuizProps[]>([]);

  const isEcoMode = useSelector((state: RootState) => state.ecoMode.isEcoMode);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://ndi.moreiradj.net/questions/random", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setQuizData(data);
    })();
  }, []);

  return (
    <>
      {quizData.length > 0 && (
        <>
          <div
            className={`${
              isEcoMode ? "home-container-dark" : "home-container-light"
            }`}
          >
            {!isEcoMode && (
              <div className="left-section">
                <EarthScene />
              </div>
            )}

            <div className="right-section">
              <div className="card">
                <Quiz quizData={quizData} />
              </div>
            </div>
          </div>
          <footer className="footer">
            <p
              className="footer-text"
              style={{
                marginLeft: "10px",
              }}
            >
              Made with ❤️ by the team TTY
            </p>
            <Helper />
          </footer>
        </>
      )}
    </>
  );
};
