import "phaser";

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, rank, suit) {
    super(scene, x, y);

    const WIDTH = 250;
    const HEIGHT = 350;
    const LEFT = -WIDTH / 2;
    const TOP = -HEIGHT / 2;
    const BOTTOM = WIDTH / 2;
    const RIGHT = HEIGHT / 2;

    const color = suit === "♥" || suit === "♦" ? "#FF0000" : "#000000";
    const cardFront = this.scene.add.container(0, 0);

    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff, 1);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, 16);
    cardFront.add(background);

    const centerText = this.scene.add.text(0, 0, suit, {
      fontFamily: "system-ui",
      fontSize: "80px",
      color,
      align: "center",
    });
    centerText.setOrigin(0.5, 0.5);
    cardFront.add(centerText);

    const topLeftText = this.scene.add.text(LEFT, TOP, `${rank}\n${suit}`, {
      fontFamily: "system-ui",
      fontSize: "40px",
      color,
      align: "center",
    });
    cardFront.add(topLeftText);

    const bottomRightText = this.scene.add.text(
      BOTTOM,
      RIGHT,
      `${rank}\n${suit}`,
      {
        fontFamily: "system-ui",
        fontSize: "40px",
        color,
        align: "center",
      }
    );
    bottomRightText.setRotation(Math.PI);
    cardFront.add(bottomRightText);

    this.cardFront = cardFront;
    this.add(cardFront);
  }

  flip() {
    // this.add
    // this.tweens
    // const timeline = this.scene.tweens.createTimeline();
    this.scene.tweens.add({
      targets: [this],
      x: 0,
      y: 0,
      ease: "Power1",
      delay: 3000,
      duration: 2000,
      onComplete: () => {
        this.cardFront.setVisible(false);
      },
    });
    // timeline.play()
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "card",
  function (x, y, rank, suit) {
    const card = new Card(this.scene, x, y, rank, suit);
    this.scene.add.existing(card);
    return card;
  }
);
