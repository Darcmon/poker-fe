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

        hostContainer.setX(-200);
        joinContainer.setX(this.game.canvas.width + 200);
        hostContainer.setVisible(true);
        joinContainer.setVisible(true);

        this.tweens.add({
          targets: loginContainer,
          scaleX: 0,
          scaleY: 0,
          duration: 500,
          ease: Phaser.Math.Easing.Cubic.In,
          onComplete: () => {
            loginContainer.setVisible(false);
          }
        });

        this.tweens.add({
          targets: hostContainer,
          x: xCenter,
          ease: Phaser.Math.Easing.Cubic.InOut,
          duration: 500,
        });

        this.tweens.add({
          targets: joinContainer,
          x: xCenter,
          ease: Phaser.Math.Easing.Cubic.InOut,
          duration: 500,
        });
      });
    const loginContainer = this.add
      .container(xCenter, yCenter)
      .setVisible(false)
      .add(loginButton);

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
    let joinButton = this.add
      .button(10, -30, "Join Game")
      .setOrigin(0, 0)
      .on("pointerup", async () => {
        const token = await getToken();
        const response = await fetch("/api/games", {
          method: "PATCH",
          body: JSON.stringify({
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
    let hostButton = this.add
      .button(10, 90, "Host Game")
      .setOrigin(0.5, 0.5)
      .on("pointerup", async () => {
        const token = await getToken();
        const response = await fetch("/api/games", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        const payload = await response.json();
        setGameId(payload["game_id"]);
        this.scene.start(Lobby.name);
      });
    // const hostOrJoinContainer = this.add
    //   .container(xCenter, yCenter)
    //   .setVisible(false)
    //   .add([gameCodeTextField, hostButton, joinButton]);
    const hostContainer = this.add
    .container(xCenter, yCenter)
    .setVisible(false)
    .add([hostButton]);

    const joinContainer = this.add
    .container(xCenter, yCenter)
    .setVisible(false)
    .add([gameCodeTextField, joinButton]);

    if (isSignedIn()) {
      loginContainer.setVisible(false);
      hostContainer.setVisible(true);
      joinContainer.setVisible(true);
    } else {
      loginContainer.setVisible(true);
      joinContainer.setVisible(false);
      hostContainer.setVisible(false);
    }
  }

  update() {}
}
