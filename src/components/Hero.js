// src/components/Hero.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import CreatePost from "./CreatePost";

const Hero = ({ onPostCreated }) => {
  const { user } = useAuth();

  return (
    <div className="hero" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/philippines-flag.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white"
    }}>
      <div className="hero-content">
        <h1>Empowering the Filipino Vote: May 2025 Elections</h1>
        {user && <CreatePost onPostCreated={onPostCreated} />}
      </div>
    </div>
  );
};

export default Hero;
