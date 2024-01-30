import React, { useEffect, useState } from "react";
import loopAnimation from "./Videos/DoraIdleAnimation.mp4";
import doraBonjour from "./Videos/bonjours mes amis.mp4";
import doraCommentCava from "./Videos/Comment ça va.mp4";
import doraAujourdhui from "./Videos/aujourdhui.mp4";
import doraReviser from "./Videos/nous allons reviser.mp4";
import "react-html5video/dist/styles.css";

const Exercice = () => {
  const [segment, setSegment] = useState(0);
  const videoSegments = [
    loopAnimation,
    doraBonjour,
    doraCommentCava,
    doraAujourdhui,
    doraReviser,
  ];

  const handleSegment = () => {
    console.log(videoSegments[segment]);
    setSegment((prevIndex) => (prevIndex + 1) % videoSegments.length);
    setIsVideoFinished(false);
  };
  console.log(segment);

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
  return (
    <div>
      <button
        style={{
          position: "absolute",
          zIndex: "2",
        }}
        onClick={handleSegment}
      >
        Next slide
      </button>
      <button
        style={{
          position: "absolute",
          zIndex: "2",
          marginLeft: "50%",
        }}
        onClick={handleFullscreen}
      >
        Toggle Fullscreen
      </button>
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
