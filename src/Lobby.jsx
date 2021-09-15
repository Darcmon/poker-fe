import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth, useUser } from "./AuthContext";

export default function Lobby() {
  const [gameCode, setGameCode] = useState();
  const [joinGameCode, setJoinGameCode] = useState("");
  const [nickName, setNickName] = useState("");
  const auth = useAuth();
  const user = useUser();

  const handleChange = (event) => {
    setNickName(event.target.value);
  };

  const handleJoinCodeChange = (event) => {
    setJoinGameCode(event.target.value);
  };

  const createGame = async () => {
    const response = await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify({ nick_name: nickName }),
      headers: {
        Authorization: "Bearer " + auth.access_token,
        "Content-Type": "application/json",
      },
    });
    const payload = await response.json();
    setGameCode(payload["game_code"]);
    console.log(payload);
  };

  const joinGame = async () => {
    const response = await fetch("/api/games", {
      method: "PATCH",
      body: JSON.stringify({ nick_name: nickName, game_code: joinGameCode }),
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
      <TextField label="Name" value={nickName} onChange={handleChange} />
      <TextField
        label="Code"
        value={joinGameCode}
        onChange={handleJoinCodeChange}
      />
      <Button variant="contained" onClick={joinGame}>
        Join Game
      </Button>
      <h2>Host Game</h2>
      <TextField label="Name" value={nickName} onChange={handleChange} />
      <Button variant="contained" onClick={createGame}>
        Create Game
      </Button>
    </div>
  );
}
