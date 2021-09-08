import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth, useUser } from "./AuthContext";

export default function Lobby() {
  const [gameCode, setGameCode] = useState();
  const [nickName, setNickName] = useState("");
  const auth = useAuth();
  const user = useUser();

  const handleChange = (event) => {
    setNickName(event.target.value);
  };

  const createGame = async () => {
    const response = await fetch("/api/game", {
      method: "POST",
      body: JSON.stringify({ nickName: nickName }),
      headers: {
        Authorization: "Bearer " + auth.access_token,
        "Content-Type": "application/json",
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
        {user ? <img src={user.picture} /> : null}
        <h2>Game Code: {gameCode}</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game Lobby</h1>
      {user ? <img src={user.picture} /> : null}
      <h2>Join Game</h2>
      <TextField label="Name" />
      <TextField label="Code" />
      <Button variant="contained">Join Game</Button>
      <h2>Host Game</h2>
      <TextField label="Name" value={nickName} onChange={handleChange} />
      <Button variant="contained" onClick={createGame}>
        Create Game
      </Button>
    </div>
  );
}
