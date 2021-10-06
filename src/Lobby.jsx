import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "./AuthContext";

import { useParams } from "react-router";

export default function Lobby() {
  const { gameId } = useParams();
  const auth = useAuth();
  const [gameState, setGameState] = useState({});
  const user = useUser();

  useEffect(() => {
    const host = location.origin.replace(/^http/, "ws");
    let ws = new WebSocket(
      `${host}/ws/games/${gameId}?token=${auth.access_token}`
    );
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      console.log(payload);
      setGameState(payload);
    };
    return () => ws.close();
  }, [gameId]);

  if (gameState["players"] === undefined) {
    return "Loading";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      {user ? <img src={user.picture} /> : null}
      <h2>Game Code: {gameState["game_code"]}</h2>
      <h3>Players</h3>
      {gameState["players"].map((player) => (
        <div key={player}>{player}</div>
      ))}
    </div>
  );
}
