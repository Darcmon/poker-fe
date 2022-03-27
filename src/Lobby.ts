import "phaser";
import { getToken } from "./auth";
import Login from "./Login";
import Poker from "./Poker";
import { getGameId, removeGameId } from "./session";

const TITLE: Phaser.Types.GameObjects.Text.TextStyle = {
  color: "#ffffff",
  align: "center",
  fontSize: "40px",
};

export default class Lobby extends Phaser.Scene {
  gameCode: Phaser.GameObjects.Text;
  players: Phaser.GameObjects.Text;

  constructor() {
    super(Lobby.name);
  }

  preload() {
    window.addEventListener("resize", this.resize.bind(this));

    (async () => {
      const host = location.origin.replace(/^http/, "ws");
      const gameId = getGameId();
      const token = await getToken();
      let ws = new WebSocket(`${host}/ws/games/${gameId}?token=${token}`);
      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        console.log(payload);
        this.gameCode.setText(`Game Code: ${payload["game_code"]}`);
        this.players.setText(payload["players"].join("\n"));
      };
    })();
  }

  resize() {
    this.scale.resize(window.innerWidth, window.innerHeight);
  }

  create() {
    this.cameras.main.setBackgroundColor("0x0e5628");

    const xCenter = this.game.canvas.width / 2;
    const yCenter = this.game.canvas.height / 2;
    const height = this.game.canvas.height;

    const title = this.add.text(xCenter, 100, "Welcome to the Lobby", TITLE);
    title.setOrigin(0.5, 0.5);

    this.gameCode = this.add.text(xCenter, 160, "", {
      color: "coral",
      fontSize: "30px",
    });
    this.gameCode.setOrigin(0.5, 0.5);

    this.players = this.add.text(xCenter, yCenter, "", {
      color: "white",
      fontSize: "30px",
      align: "center",
    });
    this.players.setOrigin(0.5, 0.5);

    this.add
      .button(xCenter - 10, height - 100, "Cancel")
      .setOrigin(1, 0.5)
      .on("pointerup", () => {
        removeGameId();
        this.scene.start(Login.name);
      });

    this.add
      .button(xCenter + 10, height - 100, "Start Game")
      .setOrigin(0, 0.5)
      .on("pointerup", () => {
        this.scene.start(Poker.name);
      });
  }

  update() {}
}
