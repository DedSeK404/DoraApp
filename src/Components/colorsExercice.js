import React from "react";
import Colors from "./Colors";
import exerciceBackground from "./Videos/exerciceBackground.mp4";

const ColorsExercice = () => {
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
  return (
    <div>
      <img className="nextButton" src="/next.svg" alt="0" />

      <img className="previousButton" src="/previous.svg" alt="0" />

      <img
        onClick={handleFullscreen}
        className="fullscreenButton"
        src="/fullscreen.svg"
        alt="0"
      />
      <div
        style={{
          position: "absolute",
          marginTop:"20%",
          paddingLeft:"35%",
          zIndex: "1",
        }}
      >
        <Colors />
      </div>

      <video
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          zIndex: "auto",
        }}
        src={exerciceBackground}
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default ColorsExercice;
