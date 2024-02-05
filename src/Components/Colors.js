import React, { useEffect, useState } from "react";
import Star from "./Images/star.svg";
import Ball from "./Images/ball.svg";
import Rose from "./Images/rose.svg";
import Table from "./Images/table.svg";
import "./Colors.css";
import { ReactComponent as CircleIcon } from "./Images/mic.svg";
import { DotLoader } from "react-spinners";
import { css } from "@emotion/react";
import googleAssistantSound from "./Images/speechEffect.mp3";

const Colors = () => {
  const [starColor, setStarColor] = useState(""); // Change this to the color of your star

  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const [audio] = useState(new Audio(googleAssistantSound));
  let recognition;
  const startRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = "fr-FR";

      recognition.onstart = () => {
        setLoading(true);
        playGoogleAssistantSound();
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript.trim().toLowerCase());
      };

      recognition.onend = () => {
        setLoading(false);
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      setLoading(false);
      setIsListening(false);
    }
  };
  const checkTranscription = () => {
    console.log("Transcription:", transcription);
    console.log("Star Color:", starColor);

    if (transcription === starColor) {
      // Transcription matches the color
      setResult("Correcte");
    } else {
      // Transcription does not match the color
      setResult("Incorrecte");
    }
  };

  const playGoogleAssistantSound = () => {
    // Play the Google Assistant sound
    audio.currentTime = 0; // Reset audio to the beginning
    audio.play();
  };

  useEffect(() => {
    if (transcription !== "") {
      checkTranscription();
    }
  }, [transcription, starColor]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const handleRecognition = (color) => {
    if (isListening) {
      stopRecognition();
    } else {
      setStarColor(color);
      startRecognition();
    }
  };
  return (
    <div>
      <div className="result-container">
        <div style={{ display: "flex", gap: "20px" }}>
          <div className="loader-container">
            <DotLoader
              css={override}
              size={50}
              color={"black"}
              loading={loading}
            />
          </div>
          <p style={{ fontSize: "2rem" }}>
            Reponse: <span style={{ fontSize: "3rem" }}>{transcription}</span>
          </p>
        </div>
        <p
          style={{
            fontSize: "3rem",
            color: result === "Correcte" ? "green" : "red",
            fontWeight: 700,
            margin: "auto",
            textAlign: "center",
          }}
        >
          {result}
        </p>
      </div>
      <div className="colorsHolders">
        <div className="button-container">
          <img
            onClick={() => handleRecognition("jaune")}
            className="Star"
            src={Star}
            alt="0"
          />
          <div className="slide-icon">
            <CircleIcon className="svg-icon" />
          </div>
        </div>
        <div className="button-container">
          <img
            onClick={() => handleRecognition("bleu")}
            className="Ball"
            src={Ball}
            alt="1"
          />
          <div className="slide-icon">
            <CircleIcon className="svg-icon" />
          </div>
        </div>
        <div className="button-container">
          <img
            onClick={() => handleRecognition("rouge")}
            className="Rose"
            src={Rose}
            alt="2"
          />
          <div className="slide-icon">
            <CircleIcon className="svg-icon" />
          </div>
        </div>
        <div className="button-container">
          <img
            onClick={() => handleRecognition("marron")}
            className="Table"
            src={Table}
            alt="3"
          />
          <div className="slide-icon">
            <CircleIcon className="svg-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
