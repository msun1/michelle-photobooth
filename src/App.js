import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PhotoboothApp from "./PhotoboothApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photobooth" element={<PhotoboothApp />} />
      </Routes>
    </Router>
  );
}
