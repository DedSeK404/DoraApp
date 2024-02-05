import React, { useState } from "react";
import loopAnimation from "./Videos/DoraIdleAnimation.mp4";
import doraBonjour from "./Videos/bonjours mes amis.mp4";
import doraCommentCava from "./Videos/Comment ça va.mp4";
import doraAujourdhui from "./Videos/aujourdhui.mp4";
import { Link } from "react-router-dom";
import "react-html5video/dist/styles.css";
import exercice1Button from "./Images/exercice1button.svg";

const Exercice = () => {
  const [segment, setSegment] = useState(0);
  const videoSegments = [
    loopAnimation,
    doraBonjour,
    doraCommentCava,
    doraAujourdhui,
  ];

  const handleSegment = () => {
    setSegment((prevIndex) => (prevIndex + 1) % videoSegments.length);
    setIsVideoFinished(false);
  };
  const handlePreviousSegment = () => {
    setSegment((prevIndex) => (prevIndex - 1) % videoSegments.length);
    setIsVideoFinished(false);
  };

  const [isVideoFinished, setIsVideoFinished] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
  };
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
  const [audio] = useState(new Audio("/Happy Upbeat Background Music.mp3"));
  const [muteAudio, setMuteAudio] = useState(true);
  // useEffect(() => {
  //   audio.loop = true;
  //   audio.volume = 0.1;
  //   audio.play();
  //   return () => audio.pause(); // Cleanup when component unmounts
  // }, [audio]);
  const handleMuteAudio = () => {
    setMuteAudio(!muteAudio);
    muteAudio ? setMuteAudio(audio.pause()) : audio.play();
  };

  return (
    <div>
      <Link to="/colorsExercice">
        <img className="exerciceButton" src={exercice1Button} alt="0" />
      </Link>
      <img
        onClick={handleSegment}
        className="nextButton"
        src="/next.svg"
        alt="0"
      />

      <img
        onClick={handlePreviousSegment}
        className="previousButton"
        src="/previous.svg"
        alt="0"
      />

      <img
        onClick={handleMuteAudio}
        className="audioButton"
        src={!muteAudio ? "/muteAudio.svg" : "/playAudio.svg"}
        alt="0"
      />

      <img
        onClick={handleFullscreen}
        className="fullscreenButton"
        src="/fullscreen.svg"
        alt="0"
      />
      <Link to="/">
        <img className="homeButton" src="/homeButton.svg" alt="0" />
      </Link>
      <div style={{ width: "100%", height: "100vh" }}>
        {!isVideoFinished ? (
          <video
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: "1",
            }}
            src={videoSegments[segment]}
            autoPlay
            muted={videoSegments[segment] === loopAnimation ? true : false}
            onEnded={handleVideoEnd}
          />
        ) : (
          ""
        )}

        <video
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            zIndex: "auto",
          }}
          src={loopAnimation}
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
};

export default Exercice;
