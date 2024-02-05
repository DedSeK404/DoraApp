import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Exercice from "./Components/Exercice";
import ColorsExercice from "./Components/colorsExercice";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercice" element={<Exercice />} />
        <Route path="/colorsExercice" element={<ColorsExercice />} />
      </Routes>
    </div>
  );
}

export default App;
