import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import "./Colors.css";
import googleAssistantSound from "./Images/speechEffect.mp3";

const SpeechRecognition = () => {
  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [starColor, setStarColor] = useState("jaune"); // Change this to the color of your star
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
      console.log("Correct");
    } else {
      // Transcription does not match the color
      console.log("Incorrect");
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
    border-color: red; // You can customize the color
  `;

  return (
    <div>
      <p>Transcription: {transcription}</p>
      <button
        className={`circle-button ${isListening ? "listening" : ""}`}
        onClick={isListening ? stopRecognition : startRecognition}
      >
        {isListening ? "Stop" : "Start"}
      </button>
      <div className="loader-container">
        <DotLoader
          css={override}
          size={150}
          color={"#36D7B7"}
          loading={loading}
        />
      </div>
    </div>
  );
};
export default SpeechRecognition;
