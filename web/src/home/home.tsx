import { Quiz, QuizProps } from "../components/quiz";

import React, { useEffect, useState } from "react";
import "./home.css";
import { EarthScene } from "../components/earth-scene";
import { Helper } from "../helper/helper";

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

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/questions/random", {
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
          <div className="home-container">
            <div className="left-section">
              <EarthScene />
            </div>
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
