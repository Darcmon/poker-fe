import "phaser";

const BUTTON: Phaser.Types.GameObjects.Text.TextStyle = {
  // fontFamily: "system-ui",
  color: "#ffffff",
  align: "center",
  fontSize: "20px",
};

export default class Button extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
    super(scene, x, y, text, BUTTON);

    this.setOrigin(0.5, 0.5)
      .setPadding(12)
      .setBackgroundColor("#3673d3")
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.setBackgroundColor("#4683e3"))
      .on("pointerout", () => this.setBackgroundColor("#3673d3"));
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      button(x: number, y: number, text: string): Button;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "button",
  function (x: number, y: number, text: string) {
    const button = new Button(this.scene, x, y, text);
    this.scene.add.existing(button);
    return button;
  }
);
