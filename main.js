import "./style.css";

import "phaser";
import "./Card";
import { Card } from "./Card";

class Poker extends Phaser.Scene {
  preload() {
    this.load.image("PokerTable", "assets/pokertable.jpg");
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    let w = window.innerWidth * window.devicePixelRatio;
    let h = window.innerHeight * window.devicePixelRatio;
    this.scale.resize(w, h);
  }

  create() {
    this.cameras.main.setRoundPixels(true);

    const card1 = this.add.card(0, 0, "A", "♣");
    const card2 = this.add.card(0, 0, "10", "♥");
    const card3 = this.add.card(0, 0, "J", "♦");

    const card4 = this.add.card(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "4",
      "♠"
    );
    card4.flip();

    const tween1 = this.tweens.add({
      targets: card1,
      x: this.game.canvas.width / 2 - 50,
      y: this.game.canvas.height - 250,
      rotation: -Math.PI / 20,
      ease: "Power1",
      duration: 1000,
    });

    const tween2 = this.tweens.add({
      targets: card2,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - 250,
      ease: "Power1",
      delay: 100,
      duration: 1000,
    });

    const tween3 = this.tweens.add({
      targets: card3,
      x: this.game.canvas.width / 2 + 50,
      y: this.game.canvas.height - 250,
      rotation: Math.PI / 20,
      ease: "Power1",
      delay: 200,
      duration: 1000,
    });
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
