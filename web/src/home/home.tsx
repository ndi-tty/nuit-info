import { Quiz, QuizProps } from "../components/quiz";
import "./home.css";

export interface HomeProps {}
export const fakeQuizData: QuizProps[] = [
  {
    question: "Quel est le nom du président de la République française ?",
    options: [true, false],
    correctAnswer: true,
    selectedOption: null,
    isAnswered: false,
  },
];

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Left Section (3/5 of the page)</h2>
      </div>
      <div className="right-section">
        <div className="card">
          <Quiz {...fakeQuizData} />
        </div>
      </div>
    </div>
  );
};
