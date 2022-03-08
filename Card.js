import "phaser";

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, rank, suit) {
    super(scene, x, y);

    const RADIUS = 16;
    const WIDTH = 150;
    const HEIGHT = 230;
    const LEFT = -WIDTH / 2;
    const TOP = -HEIGHT / 2;
    const BOTTOM = WIDTH / 2;
    const RIGHT = HEIGHT / 2;
    const MARGIN = 4;

    this.setSize(WIDTH, HEIGHT);

    const font = {
      fontFamily: "system-ui",
      fontSize: 30,
      color: suit === "♥" || suit === "♦" ? "#e93323" : "#000000",
      align: "center",
    };
    const rankAndSuit = `${rank}\n${suit}`;

    const cardFront = this.scene.add.container(0, 0);

    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff, 1);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    background.lineStyle(2, 0x000000);
    background.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    cardFront.add(background);

    const centerText = this.scene.add.text(0, 0, suit, font);
    centerText.setOrigin(0.5, 0.5);
    centerText.setFontSize(60);
    cardFront.add(centerText);

    const topLeftText = this.scene.add.text(
      LEFT + MARGIN,
      TOP + MARGIN,
      rankAndSuit,
      font
    );
    cardFront.add(topLeftText);

    const bottomRightText = this.scene.add.text(
      BOTTOM - MARGIN,
      RIGHT - MARGIN,
      rankAndSuit,
      font
    );
    bottomRightText.setRotation(Math.PI);
    cardFront.add(bottomRightText);

    this.cardFront = cardFront;
    this.add(cardFront);

    this.setInteractive();
    this.on("pointerup", this.flip);
  }

  flip() {
    // this.add
    // this.tweens
    // const timeline = this.scene.tweens.createTimeline();
    this.scene.tweens.add({
      targets: [this],
      x: -200,
      y: -200,
      ease: "Power1",
      duration: 1000,
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
