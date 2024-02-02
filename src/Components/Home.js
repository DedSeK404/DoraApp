import React, { useRef } from "react";
import { Link } from "react-router-dom";
import intro from "./Videos/intro.mp4";
import "./Exercice.css";

const Home = () => {
  const handleFullscreen = () => {
    const element = document.documentElement;

    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    } else {
      console.error("Fullscreen not supported by this browser");
    }
  };
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div onClick={handleMouseEnter}>
      <Link to="/exercice">
        <img className="playButton" src="/playButton.svg" alt="0" />
      </Link>
      <img
        onClick={handleFullscreen}
        className="fullscreenButton"
        src="/fullscreen.svg"
        alt="0"
      />
      <video
        ref={videoRef}
        className="introVideo"
        src={intro}
        autoPlay
        loop
       
      />
    </div>
  );
};

export default Home;
