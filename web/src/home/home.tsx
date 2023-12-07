import { Quiz, QuizProps } from "../components/quiz";
import React, { useEffect } from "react";
import "./home.css";

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
  const [quizData, setQuizData] = React.useState<QuizProps[]>([]);
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
      console.log(data);
    })();
  }, []);

  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Left Section (3/5 of the page)</h2>
      </div>
      <div className="right-section">
        <div className="card">
          <Quiz quizData={fakeQuizData} />
        </div>
      </div>
    </div>
  );
};
