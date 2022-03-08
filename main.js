import "./style.css";

import "phaser";
import "./Card";
// import { Card } from "./Card";

class Card extends Phaser.GameObjects.Container {}

class Poker extends Phaser.Scene {
  preload() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    let w = window.innerWidth * window.devicePixelRatio;
    let h = window.innerHeight * window.devicePixelRatio;
    this.scale.resize(w, h);
  }

  create() {
    const twoOfHearts = this.add.card(-200, -200, "2", "♥");
    const aceOfClubs = this.add.card(-200, -200, "A", "♣");

    // this.game.canvas.width;
    // this.game.canvas.height;

    this.tweens.add({
      targets: [twoOfHearts],
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2 - twoOfHearts.height,
      rotation: -Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });

    this.tweens.add({
      targets: [aceOfClubs],
      x: this.game.canvas.width / 2 + 20,
      y: this.game.canvas.height / 2 - twoOfHearts.height,
      rotation: Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });

    twoOfHearts.flip();
  }

  update() {}
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "0x0e5628",
  scale: {
    mode: Phaser.Scale.NONE,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    zoom: 1 / window.devicePixelRatio,
  },
  scene: [Poker],
});
