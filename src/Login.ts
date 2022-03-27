import "phaser";
import { isSignedIn, getToken, signIn } from "./auth";
import { setGameId } from "./session";
import Lobby from "./Lobby";

const TITLE: Phaser.Types.GameObjects.Text.TextStyle = {
  // fontFamily: "system-ui",
  color: "#ffffff",
  align: "center",
  fontSize: "40px",
};

export default class Login extends Phaser.Scene {
  gameCode: string;

  constructor() {
    super(Login.name);
  }

  preload() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.scale.resize(window.innerWidth, window.innerHeight);
  }

  create() {
    this.cameras.main.setBackgroundColor("0x0e5628");

    const xCenter = this.game.canvas.width / 2;
    const yCenter = this.game.canvas.height / 2;

    const title = this.add.text(0, 0, "Texas Hold'em", TITLE);
    title.setOrigin(0.5, 0.5);
    title.setPosition(xCenter, 100);

    const loginButton = this.add
      .button(0, 0, "Login with Google")
      .on("pointerup", async () => {
        await signIn();
        loginContainer.setVisible(false);
        hostOrJoinContainer.setVisible(true);
      });
    const loginContainer = this.add
      .container(xCenter, yCenter)
      .setVisible(false)
      .add(loginButton);

    const nickNameTextField = this.add
      .rexInputText(0, -120, 300, 25, {
        type: "text",
        fontSize: "20px",
        align: "center",
      })
      .setPlaceholder("nick name")
      .setStyle("outline", "auto")
      .setStyle("padding", "1em")
      .setOrigin(0.5, 0)
      .setStyle("border", "#ffffff");
    const gameCodeTextField = this.add
      .rexInputText(-10, -28, 140, 25, {
        type: "text",
        fontSize: "20px",
        align: "center",
      })
      .setPlaceholder("game code")
      .setStyle("outline", "auto")
      .setStyle("padding", "1em")
      .setOrigin(1, 0)
      .setStyle("border", "#ffffff");
    const joinButton = this.add
      .button(10, -30, "Join Game")
      .setOrigin(0, 0)
      .on("pointerup", async () => {
        const token = await getToken();
        const response = await fetch("/api/games", {
          method: "PATCH",
          body: JSON.stringify({
            nick_name: nickNameTextField.text,
            game_code: gameCodeTextField.text,
          }),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const payload = await response.json();

        if (response.status == 404) {
          console.log(payload["detail"]);
          return;
        }

        setGameId(payload["game_id"]);
        this.scene.start(Lobby.name);
      });
    const hostButton = this.add
      .button(10, 90, "Host Game")
      .setOrigin(0.5, 0.5)
      .on("pointerup", async () => {
        const token = await getToken();
        const response = await fetch("/api/games", {
          method: "POST",
          body: JSON.stringify({ nick_name: nickNameTextField.text }),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        const payload = await response.json();
        setGameId(payload["game_id"]);
        this.scene.start(Lobby.name);
      });
    const hostOrJoinContainer = this.add
      .container(xCenter, yCenter)
      .setVisible(false)
      .add([nickNameTextField, gameCodeTextField, hostButton, joinButton]);

    if (isSignedIn()) {
      loginContainer.setVisible(false);
      hostOrJoinContainer.setVisible(true);
    } else {
      loginContainer.setVisible(true);
      hostOrJoinContainer.setVisible(false);
    }
  }

  update() {}
}
