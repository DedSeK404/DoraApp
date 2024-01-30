import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Exercice from "./Components/Exercice";

function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/exercice" element={<Exercice/>} />
      </Routes>
    </div>
  );
}

export default App;
