import React from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "./images/backgrounds/home_bg.jpg";
import startButton from "./images/buttons/start-button.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
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
        className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{ width: "auto", height: "150px" }}
        draggable="false"
      />
    </div>
  );
}
