import "./App.css";
import { Home } from "./home/home";
import { Header } from "./layouts/header";

function App() {
  return (
    <>
      <Header message="Welcome to EcoEcho !" />
      <Home />
    </>
  );
}

export default App;
