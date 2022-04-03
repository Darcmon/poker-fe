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
  lastUpdate: number;
  gameCode: Phaser.GameObjects.Text;
  players: Phaser.GameObjects.Text;
  countDown: Phaser.GameObjects.Text;
  nextStatus?: number;

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
        this.lastUpdate = Date.now() / 1000;
        this.gameCode.setText(`Game Code: ${payload["game_code"]}`);
        this.players.setText(payload["players"].join("\n"));
        this.nextStatus = payload["next_status"];
        if (payload["status"] !== "LOBBY") {
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.time.delayedCall(500, () => {
            this.scene.start(Poker.name);
          });
        }
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

    this.countDown = this.add.text(xCenter, 220, "", {
      color: "coral",
      fontSize: "30px",
    });
    this.countDown.setOrigin(0.5, 0.5);

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
      .on("pointerup", async () => {
        const token = await getToken();
        const response = await fetch(`/api/games/${getGameId()}/start`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const payload = await response.json();
        console.log(payload);
      });
  }

  update() {
    const nextLastUpdate = Date.now() / 1000;
    if (!!this.nextStatus) {
      this.nextStatus = this.nextStatus - (nextLastUpdate - this.lastUpdate);
      this.lastUpdate = nextLastUpdate;
      if (this.nextStatus > 0) {
        this.countDown.setText(`Starting in: ${this.nextStatus.toFixed(2)}s`);
      } else {
        this.countDown.setText(`Starting now...`);
      }
    } else {
      this.countDown.setText("");
    }
  }
}
