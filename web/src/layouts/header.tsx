import React, { useState } from "react";
import "./header.css";

export interface HeaderProps {
  year: number;
  message: string;
}

export const Header: React.FC<HeaderProps> = ({ year, message }) => {
  const [count, setCount] = useState(0);

  return (
    <header className="app-header">
      <h1 className="logo">{message}</h1>
      <div className="right-part-header">
        <button onClick={() => setCount(count + 1)}>Eco-Mode</button>
        <button onClick={() => setCount(count - 1)}>Thème</button>
        <p className="year">{year}</p>
      </div>
    </header>
  );
};
