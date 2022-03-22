import "./style.css";

import "phaser";
import "./Card";

import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

class Poker extends Phaser.Scene {
  preload() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.scale.resize(window.innerWidth, window.innerHeight);
  }

  deal(players) {
    for (let o = 0; o < 2; o++) {
      for (let i = 0; i < players; i++) {
        const card = this.add.card(this.deck.x, this.deck.y, true);

        this.tweens.add({
          targets: [card],
          x:
            this.game.canvas.width / 2 -
            (this.game.canvas.width *
              Math.sin(
                (2 * Math.PI * i + Math.PI / 20 - (o * Math.PI) / 10) / players
              )) /
              3,
          y:
            this.game.canvas.height / 2 +
            (this.game.canvas.height *
              Math.cos(
                (2 * Math.PI * i + Math.PI / 20 - (o * Math.PI) / 10) / players
              )) /
              3,
          rotation:
            (2 * Math.PI * i) / players - Math.PI / 20 + (o * Math.PI) / 10,
          ease: "Power1",
          delay: 150 * (i + o * players),
          duration: 500,
        });
      }
    }
  }

  create() {
    this.deck = this.add.card(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      true
    );

    this.deck.setInteractive();
    this.deck.on("pointerup", () => this.deal(7));

    // this.tweens.add({
    //   targets: [twoOfHearts],
    //   x: this.game.canvas.width / 2,
    //   y: this.game.canvas.height - twoOfHearts.height,
    //   rotation: -Math.PI / 20,
    //   ease: "Power1",
    //   duration: 2000,
    // });

    // this.tweens.add({
    //   targets: [aceOfClubs],
    //   x: this.game.canvas.width / 2 + 20,
    //   y: this.game.canvas.height - aceOfClubs.height,
    //   rotation: Math.PI / 20,
    //   ease: "Power1",
    //   duration: 2000,
    // });
  }

  update() {}
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: "0x0e5628",
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Poker],
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
  },
});
