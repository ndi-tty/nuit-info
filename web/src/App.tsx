import "./App.css";
import { Home } from "./home/home";
import { Header } from "./layouts/header";

function App() {
  return (
    <>
      <Header year={2021} message="Hello World" />
      <Home />
    </>
  );
}

export default App;
