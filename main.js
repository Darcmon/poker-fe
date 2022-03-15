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

  // deal() {}

  create() {
    const twoOfHearts = this.add.card(-200, -200, true, "2", "♥");
    const aceOfClubs = this.add.card(-200, -200, false, "A", "♣");

    // Create a face down card to be the deck.
    // On click,
    // deckOfCards.on("pointerup", this.deal) (i.e. a tween));
    // this.state = "my state"
    // if (this.state === "something") {
    //   "do something"
    // }

    this.tweens.add({
      targets: [twoOfHearts],
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - twoOfHearts.height,
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
