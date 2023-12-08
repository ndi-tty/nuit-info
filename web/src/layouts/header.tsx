import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCounter } from "../store/slices/yearCounter";
import { setEcoMode } from "../store/slices/ecoMode";
import earthImage from "../assets/earth.svg"; // Adjust the path accordingly
import "./header.css";

export interface HeaderProps {
  message: string;
}

enum TimeManagement {
  START_TIME = 1980,
  END_TIME = 2024,
  DURATION_IN_MINUTES = 1,
}
export const anecdotesEcolo = [
  "En 2020, l'horloge de l'apocalypse a été créée par des scientifiques de l'université de Chicago. Cette horloge représente la probabilité d'une catastrophe planétaire. Plus l'horloge est proche de minuit, plus la probabilité d'une catastrophe est élevée.",
  "2005 : L'ouragan Katrina frappe la côte sud-est des États-Unis, provoquant d'importantes inondations à La Nouvelle-Orléans. Les experts suggèrent que l'intensité accrue des ouragans est liée au réchauffement des océans.",
  "2013 : Typhon Haiyan, l'un des plus puissants typhons jamais enregistrés, frappe les Philippines, entraînant des milliers de décès et des dégâts considérables. Les scientifiques soulignent la possible corrélation entre l'intensité des typhons et le changement climatique.",
  "2017 : Les incendies de forêt dévastateurs en Californie détruisent des milliers de maisons et entraînent des pertes humaines importantes. Les conditions météorologiques extrêmes et les périodes de sécheresse prolongées sont liées au changement climatique.",
  "2018 : Les inondations meurtrières dans l'État du Kerala, en Inde, sont amplifiées par des précipitations extrêmes, attribuées en partie aux changements climatiques.",
  "2019-2020 : Les feux de brousse en Australie, qui ont brûlé des millions d'acres, sont associés à des températures record et à des conditions météorologiques extrêmes amplifiées par le changement climatique.",
  "2020 : L'ouragan Laura devient l'un des ouragans les plus puissants à toucher terre en Louisiane, soulignant la tendance à des ouragans plus forts dans certaines régions.",
  "2021 : Les inondations dévastatrices en Allemagne et en Belgique, avec des précipitations exceptionnelles, mettent en évidence le lien potentiel entre le changement climatique et l'augmentation des événements météorologiques extrêmes.",
];

export const Header: React.FC<HeaderProps> = ({ message }) => {
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);
  const [importantInformation, setimportantInformation] = useState(
    "En 1947, l'horloge de l'apocalypse a été créée par des scientifiques de l'université de Chicago. Cette horloge représente la probabilité d'une catastrophe planétaire. Plus l'horloge est proche de minuit, plus la probabilité d'une catastrophe est élevée. En 2020, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été. En 2021, l'horloge a été avancée à 100 secondes de minuit, ce qui est le plus proche de minuit que l'horloge ait jamais été."
  );

  const handleYearClick = () => {
    setimportantInformation(
      anecdotesEcolo[Math.floor(Math.random() * anecdotesEcolo.length)]
    );
    setIsPopupVisible(!isPopupVisible);
  };

  const yearCount = useSelector(
    (state: RootState) => state.yearCounter.yearsCounter
  );
  const isEcoMode = useSelector((state: RootState) => state.ecoMode.isEcoMode);

  useEffect(() => {
    const endTime = TimeManagement.END_TIME;
    const startTime = yearCount;
    const totalTimeInYears = endTime - startTime;
    const durationInMinutes = 1;
    const totalIntervals = totalTimeInYears * 12;

    let currentInterval = 0;

    const interval = setInterval(() => {
      const currentYear =
        startTime +
        Math.floor((currentInterval / totalIntervals) * totalTimeInYears);
      dispatch(setCounter(currentYear));
      currentInterval += 1;

      if (currentInterval >= totalIntervals) {
        clearInterval(interval);
      }
    }, (durationInMinutes * 60 * 1000) / totalIntervals);

    return () => clearInterval(interval);
  }, [dispatch, yearCount]);

  return (
    <>
      <header className="app-header">
        <div style={{ display: "flex" }}>
          <img src={earthImage} alt="Earth" className="earth-image" />
          <h1 className="logo">Bienvenue sur Eco-Echo !</h1>

          <h2 className="logo" style={{}}>{message}</h2>
        </div>
        <div className="right-part-header">
          <input className="tgl tgl-skewed" id="cb3" type="checkbox" />

          <label
            onClick={() => dispatch(setEcoMode(!isEcoMode))}
            className="tgl-btn"
            data-tg-off="OFF"
            data-tg-on="ON"
            htmlFor="cb3"
          ></label>
          {isEcoMode ? (
            <div className="eco-mode" style={{ marginRight: "10px" }}>
              <p>Mode éco</p>
            </div>
          ) : null}
          <p
            className="year"
            onClick={handleYearClick}
            style={{
              cursor: "pointer",
            }}
          >
            {yearCount}
          </p>
        </div>
        {isPopupVisible && (
          <div className="popup" ref={popupRef}>
            <p
              onClick={() => setIsPopupVisible(false)}
              style={{ cursor: "pointer" }}
            >
              X
            </p>
            <h2 className="helper-title">Le saviez-vous ?</h2>
            <p>{importantInformation}</p>
          </div>
        )}
      </header>
    </>
  );
};
