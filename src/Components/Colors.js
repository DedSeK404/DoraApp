import React from "react";
import Star from "./Images/star.svg";
import Ball from "./Images/ball.svg";
import Rose from "./Images/rose.svg";
import Table from "./Images/table.svg";
import "./Colors.css"
import SpeechRecognition from "./SpeechRecognition";

const Colors = () => {
  return (
    <div className="colorsHolders">
    <SpeechRecognition/>
      <img className="Star" src={Star} alt="0" />
      <img className="Ball" src={Ball} alt="1" />
      <img className="Rose" src={Rose} alt="2" />
      <img className="Table" src={Table} alt="3" />
    </div>
  );
};

export default Colors;
