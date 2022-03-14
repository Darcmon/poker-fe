import "./style.css";

import "phaser";
import "./Card";

class Poker extends Phaser.Scene {
  preload() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.scale.resize(window.innerWidth, window.innerHeight);
  }

  create() {
    const twoOfHearts = this.add.card(-200, -200, "2", "♥");
    const backOfCard2 = this.add.card(-200, -200, "", "" );
    const aceOfClubs = this.add.card(-200, -200, "A", "♣");
    const backOfCard = this.add.card(-200, -200, "", "" );
    // backOfCard2.cardFront.setVisible(false);
    // backOfCard.cardFront.setVisible(false);

    this.tweens.add({
      targets: [twoOfHearts],
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - twoOfHearts.height,
      rotation: -Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });

    this.tweens.add({
      targets: [backOfCard2],
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - backOfCard.height,
      rotation: -Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });

    this.tweens.add({
      targets: [aceOfClubs],
      x: this.game.canvas.width / 2 + 20,
      y: this.game.canvas.height - aceOfClubs.height,
      rotation: Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });
    
    this.tweens.add({
      targets: [backOfCard],
      x: this.game.canvas.width / 2 + 20,
      y: this.game.canvas.height - backOfCard.height,
      rotation: Math.PI / 20,
      ease: "Power1",
      duration: 2000,
    });
  }

  update() {}
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "0x0e5628",
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Poker],
});
