import "./style.css";

import "phaser";

class Card extends Phaser.GameObjects.Container {}

class Poker extends Phaser.Scene {
  preload() {
    this.load.image("PokerTable", "assets/pokertable.jpg");
    this.load.image("Card", "assets/card.png");
  }

  create() {
    this.add.image(400, 300, "PokerTable");
    const card = this.add.graphics();
    card.fillStyle(0xffffff, 1);
    card.fillRoundedRect(200, 200, 250, 350, 16);
    const createCard = this.add.text(200, 200, "2\n\t\t♥\n\t\t♥\n\t\t\t\t2", {
      fontSize: "80px",
      color: "#FF0000",
    });
    createCard.setTextBounds(0, 100, 250, 350);
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
