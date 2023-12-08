import React, { useState } from "react";
import "./helper.css"; // Assurez-vous d'importer votre fichier de style ici

export const Helper: React.FC = () => {
  const [isHelperVisible, setIsHelperVisible] = useState(false);

  return (
    <>
      <button
        style={{
          marginRight: "10px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
        }}
        className={`helper-button ${isHelperVisible ? "active" : "non-active"}`}
        onClick={() => setIsHelperVisible(!isHelperVisible)}
      >
        {isHelperVisible && <>X</>}
        {!isHelperVisible && <>?</>}
      </button>

      {isHelperVisible && (
        <div className="popup">
          <h2 className="helper-title">Bienvenue sur la page d'aide</h2>

          <p className="helper-text">
            Cette page vous permet de voir les différentes fonctionnalités
            disponibles sur le site.
          </p>

          <h3 className="helper-subtitle">Quiz</h3>

          <p className="helper-text">
            Le quiz est une fonctionnalité qui vous permet de tester vos
            connaissances sur l'environnement. Attention si vous vous trompez la
            planète <b>se dégrade !</b>
          </p>

          <h3 className="helper-subtitle">Mode éco</h3>

          <p className="helper-text">
            Le mode éco est une fonctionnalité qui vous permet de réduire la
            consommation de ressources de votre appareil.
          </p>

          <h3 className="helper-subtitle">Date</h3>
          <p>
            Les dates défilent automatiquement, vous pouvez cliquer sur une date
            pour afficher les événements qui se sont déroulés cette année la.
          </p>
        </div>
      )}
    </>
  );
};
