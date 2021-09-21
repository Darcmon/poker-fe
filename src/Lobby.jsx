import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "./AuthContext";

import { useParams } from "react-router";

export default function Lobby() {
  const { gameId } = useParams();
  const auth = useAuth();
  const [gameState, setGameState] = useState({});
  const user = useUser();

  useEffect(async () => {
    const response = await fetch(`/api/games/${gameId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.access_token,
        "Content-Type": "application/json",
      },
    });
    const payload = await response.json();
    console.log(payload);
    setGameState(payload);
  }, [gameId]);

  let players = [];
  if (gameState["players"]) {
    players = Object.keys(gameState["players"]);
  }
  console.log(players);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      {user ? <img src={user.picture} /> : null}
      <h2>Game Code: {gameState["game_code"]}</h2>
      <h3>Players</h3>
      {players.map((player) => (
        <div>{player}</div>
      ))}
    </div>
  );
}
