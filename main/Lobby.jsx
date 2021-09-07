import React, { useState } from "react";
import { useAuth, useUser } from "./AuthContext";

export default function Lobby() {
  const [gameCode, setGameCode] = useState();
  const auth = useAuth();
  const user = useUser();

  const createGame = async () => {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.access_token,
      },
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
      <img src={user.picture} />
      <h2>Join Game</h2>
      <div>
        <div className="input-field inline">
          <input id="join-game-name" type="text" className="validate"></input>
          <label htmlFor="join-game-name">Name</label>
        </div>
        <div className="input-field inline">
          <input id="join-game-code" type="text" className="validate"></input>
          <label htmlFor="join-game-code">Code</label>
        </div>
      </div>
      <a className="waves-effect waves-light btn">Join Game</a>
      <h2>Host Game</h2>
      <div>
        <div className="input-field inline">
          <input id="host-game-name" type="text" className="validate"></input>
          <label htmlFor="host-game-name">Name</label>
        </div>
      </div>
      <a className="waves-effect waves-light btn" onClick={createGame}>
        Create Game
      </a>
    </div>
  );
}
