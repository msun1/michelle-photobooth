import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "./images/backgrounds/home_bg.jpg";
import startButton from "./images/buttons/start-button.png";
import exampleButton from "./images/buttons/photobooth-example-button.jpg";
import exWindowButton from "./images/buttons/ex-window-button.png";
import example1 from "./images/examples/example1.jpg";
import example2 from "./images/examples/example2.jpg";
import example3 from "./images/examples/example3.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [showExamples, setShowExamples] = useState(false);

  const handleExWindowClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is near the X button (at approximately 553, 27)
    // Adding a clickable area of about 40x40 pixels around it
    if (x >= 795 && x <= 855 && y >= 10 && y <= 70) {
      setShowExamples(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img
        src={startButton}
        alt="Start Photobooth"
        onClick={() => navigate("/photobooth")}
        className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{ right: "150px", top: "300px", width: "auto", height: "150px" }}
        draggable="false"
      />

      <img
        src={exampleButton}
        alt="View Examples"
        onClick={() => setShowExamples(true)}
        className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{ left: "297px", top: "260px", width: "auto", height: "185px" }}
        draggable="false"
      />

      {showExamples && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={exWindowButton}
              alt="Examples Window"
              onClick={handleExWindowClick}
              className="cursor-pointer"
              style={{ width: "910px", height: "auto" }}
              draggable="false"
            />

            {/* Example images positioned on top */}
            <img
              src={example1}
              alt="Example 1"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl"
              style={{
                left: "220px",
                top: "80px",
                width: "150px",
                height: "auto",
                transform: "translateX(-50%) rotate(-11deg)",
              }}
              draggable="false"
            />

            <img
              src={example2}
              alt="Example 2"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl"
              style={{
                left: "450px",
                top: "80px",
                width: "150px",
                height: "auto",
                transform: "translateX(-50%)",
              }}
              draggable="false"
            />

            <img
              src={example3}
              alt="Example 3"
              className="absolute transition-all duration-300 hover:rotate-[10deg] hover:drop-shadow-2xl"
              style={{
                left: "640px",
                top: "80px",
                width: "150px",
                height: "auto",
                transform: "translateX(-50%) rotate(13deg)",
              }}
              draggable="false"
            />
          </div>
        </div>
      )}
    </div>
  );
}
