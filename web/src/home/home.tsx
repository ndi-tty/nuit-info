import "./home.css";

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        {/* Contenu de la partie gauche */}
        <h2>Left Section (3/5 of the page)</h2>
        {/* Ajoutez ici le contenu de la partie gauche selon vos besoins */}
      </div>
      <div className="right-section">
        {/* Contenu de la partie droite avec une carte */}
        <div className="card">
          <h2>Card Title</h2>
          <p>Card Content goes here</p>
        </div>
      </div>
    </div>
  );
};
