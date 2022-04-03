import "./style.css";
import "phaser";
import { Card } from "./Card";

export default class Poker extends Phaser.Scene {
  deck: Card;

  constructor() {
    super(Poker.name);
  }

  preload() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.scale.resize(window.innerWidth, window.innerHeight);
  }

  deal(players: number) {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;
    const xCenter = width / 2;
    const yCenter = height / 2;

    for (let o = 0; o < 2; o++) {
      for (let i = 0; i < players; i++) {
        const slice = (2 * Math.PI * i) / players;
        const offset = (2 * Math.PI * o * 10) / Math.sqrt(width * height);
        const card = this.add.card(this.deck.x, this.deck.y, true);

        this.tweens.add({
          targets: [card],
          x: xCenter - (width / 3) * Math.sin(slice - offset),
          y: yCenter + (height / 3) * Math.cos(slice - offset),
          rotation: slice - Math.PI / 16 + (o * Math.PI) / 8,
          ease: "Power1",
          delay: 150 * (i + o * players),
          duration: 500,
        });
      }
    }
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.cameras.main.setBackgroundColor("0x0e5628");

    this.deck = this.add.card(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      true
    );

    this.deck.setInteractive();
    this.deck.on("pointerup", () => this.deal(7));
  }

  update() {}
}
