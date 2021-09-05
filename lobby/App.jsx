import React, { useState } from "react";

export default function App() {
  const [gameCode, setGameCode] = useState();

  const createGame = async () => {
    console.log("Hello");
    const response = await fetch("/api/game", {
      method: "POST",
    });
    const payload = await response.json();
    setGameCode(payload["game_code"]);
    console.log(payload);
  };

  if (gameCode) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Game Lobby</h1>
        <h2>Game Code: {gameCode}</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      <h2>Join Game</h2>
      <div>
        <div class="input-field inline">
          <input id="join-game-name" type="text" class="validate"></input>
          <label for="join-game-name">Name</label>
        </div>
        <div class="input-field inline">
          <input id="join-game-code" type="text" class="validate"></input>
          <label for="join-game-code">Code</label>
        </div>
      </div>
      <a className="waves-effect waves-light btn">Join Game</a>
      <h2>Host Game</h2>
      <div>
        <div class="input-field inline">
          <input id="host-game-name" type="text" class="validate"></input>
          <label for="host-game-name">Name</label>
        </div>
      </div>
      <a className="waves-effect waves-light btn" onClick={createGame}>
        Create Game
      </a>
    </div>
  );
}
