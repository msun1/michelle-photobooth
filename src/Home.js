import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "./images/backgrounds/home_bg.jpg";
import startButton from "./images/buttons/start-button.png";
import exampleButton from "./images/buttons/photobooth-example-button.jpg";
import exWindowButton from "./images/buttons/ex-window-button.png";
import example1 from "./images/examples/example1.jpg";
import example2 from "./images/examples/example2.jpg";
import example3 from "./images/examples/example3.jpg";

// actual home background dimensions
const HOME_BG_WIDTH = 2016;
const HOME_BG_HEIGHT = 1170;
const WINDOW_WIDTH = 610;
const WINDOW_HEIGHT = 409;

// X button position on your ex-window-button image (measure these!)
// Update these values by opening ex-window-button.png and measuring where the X is
const X_BUTTON_LEFT = 540; // Adjust this - X position from left edge
const X_BUTTON_TOP = 20; // Adjust this - X position from top edge
const X_BUTTON_SIZE = 40; // Size of clickable X area

export default function Home() {
  const navigate = useNavigate();
  const [showExamples, setShowExamples] = useState(false);
  const containerRef = useRef(null);
  const windowRef = useRef(null);

  const handleExWindowClick = (e) => {
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate responsive click area for X button
    const xButtonLeft = (X_BUTTON_LEFT / WINDOW_WIDTH) * rect.width;
    const xButtonRight =
      ((X_BUTTON_LEFT + X_BUTTON_SIZE) / WINDOW_WIDTH) * rect.width;
    const xButtonTop = (X_BUTTON_TOP / WINDOW_HEIGHT) * rect.height;
    const xButtonBottom =
      ((X_BUTTON_TOP + X_BUTTON_SIZE) / WINDOW_HEIGHT) * rect.height;

    console.log("Click at:", x, y);
    console.log("X button bounds:", {
      xButtonLeft,
      xButtonRight,
      xButtonTop,
      xButtonBottom,
    });

    if (
      x >= xButtonLeft &&
      x <= xButtonRight &&
      y >= xButtonTop &&
      y <= xButtonBottom
    ) {
      setShowExamples(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div
        ref={containerRef}
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeBg})`,
          width: "100%",
          maxWidth: `${HOME_BG_WIDTH}px`,
          aspectRatio: `${HOME_BG_WIDTH} / ${HOME_BG_HEIGHT}`,
          maxHeight: "100vh",
        }}
      >
        {/* Start Button */}
        <img
          src={startButton}
          alt="Start Photobooth"
          onClick={() => navigate("/photobooth")}
          className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            right: `${(170 / HOME_BG_WIDTH) * 100}%`,
            top: `${(400 / HOME_BG_HEIGHT) * 100}%`,
            width: "auto",
            height: `${(200 / HOME_BG_HEIGHT) * 100}%`,
            zIndex: 10,
          }}
          draggable="false"
        />

        {/* Example Button */}
        <img
          src={exampleButton}
          alt="View Examples"
          onClick={() => setShowExamples(true)}
          className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            left: `${(385 / HOME_BG_WIDTH) * 100}%`,
            top: `${(382 / HOME_BG_HEIGHT) * 100}%`,
            width: "auto",
            height: `${(280 / HOME_BG_HEIGHT) * 100}%`,
            zIndex: 10,
          }}
          draggable="false"
        />
      </div>

      {/* Examples Modal */}
      {showExamples && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="relative"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          >
            <img
              ref={windowRef}
              src={exWindowButton}
              alt="Examples Window"
              onClick={handleExWindowClick}
              className="cursor-pointer w-full h-auto"
              style={{
                maxWidth: `${WINDOW_WIDTH * 1.5}px`, // (change multiplier here!)
                zIndex: 1,
              }}
              draggable="false"
            />

            {/* Example images positioned on top - with lower z-index so they don't block X */}
            <img
              src={example1}
              alt="Example 1"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl pointer-events-none"
              style={{
                left: `${(145 / WINDOW_WIDTH) * 100}%`,
                top: `${(52 / WINDOW_HEIGHT) * 100}%`,
                width: `${(100 / WINDOW_WIDTH) * 100}%`,
                height: "auto",
                transform: "translateX(-50%) rotate(-11deg)",
                zIndex: 0,
              }}
              draggable="false"
            />

            <img
              src={example2}
              alt="Example 2"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl pointer-events-none"
              style={{
                left: `${(305 / WINDOW_WIDTH) * 100}%`,
                top: `${(71 / WINDOW_HEIGHT) * 100}%`,
                width: `${(100 / WINDOW_WIDTH) * 100}%`,
                height: "auto",
                transform: "translateX(-50%)",
                zIndex: 0,
              }}
              draggable="false"
            />

            <img
              src={example3}
              alt="Example 3"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl pointer-events-none"
              style={{
                left: `${(465 / WINDOW_WIDTH) * 100}%`,
                top: `${(60 / WINDOW_HEIGHT) * 100}%`,
                width: `${(100 / WINDOW_WIDTH) * 100}%`,
                height: "auto",
                transform: "translateX(-50%) rotate(13deg)",
                zIndex: 0,
              }}
              draggable="false"
            />
          </div>
        </div>
      )}
    </div>
  );
}
