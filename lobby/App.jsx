import React, { useState } from "react";

export default function App() {
  let createGame = () => {
    console.log("Hello");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      <a className="waves-effect waves-light btn" onClick={createGame}>
        Create Game
      </a>
      <a className="waves-effect waves-light btn">Join Game</a>
    </div>
  );
}
