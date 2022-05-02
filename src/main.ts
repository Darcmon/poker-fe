import "./style.css";

import "phaser";
import "./Button";
import "./Card";

import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin";
import Lobby from "./Lobby";
import Login from "./Login";
import Poker from "./Poker";
import { isSignedIn } from "./auth";
import { getGameId } from "./session";

class Router extends Phaser.Scene {
  constructor() {
    super(Router.name);
  }

  preload() {
    if (!isSignedIn()) {
      this.scene.start(Login.name);
      return;
    }
    if (getGameId()) {
      this.scene.start(Lobby.name);
      return;
    }
    this.scene.start(Login.name);
    this.scene.start(Poker.name);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "root",
  dom: {
    createContainer: true,
  },
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  scene: [Router, Login, Lobby, Poker],
  plugins: {
    global: [
      {
        key: "rexInputText",
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },
});
