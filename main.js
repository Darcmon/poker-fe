import "./style.css";

import "phaser";
import "./Card";
// import { Card } from "./Card";

class Card extends Phaser.GameObjects.Container {}

class Poker extends Phaser.Scene {
  preload() {
    this.load.image("PokerTable", "assets/pokertable.jpg");
    this.load.image("Card", "assets/card.png");
  }

  create() {
    this.add.image(400, 300, "PokerTable");

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

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Poker],
};

const game = new Phaser.Game(config);
