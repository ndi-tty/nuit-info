import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { RootState } from "../store/store";
import { setCounter } from "../store/slices/yearCounter";
import { setEcoMode } from "../store/slices/ecoMode";

export interface HeaderProps {
  message: string;
}
enum TimeManagement {
  START_TIME = 1980,
  END_TIME = 2024,
  DURATION_IN_MINUTES = 1,
}
export const Header: React.FC<HeaderProps> = ({ message }) => {
  const dispatch = useDispatch();

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
  }, []);

  return (
    <>
      <header className="app-header">
        <h1 className="logo">{message}</h1>
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
          <p className="year">{yearCount}</p>
        </div>
      </header>
    </>
  );
};
