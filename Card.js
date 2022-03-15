import "phaser";

const RADIUS = 16;
const WIDTH = 150;
const HEIGHT = 230;
const LEFT = -WIDTH / 2;
const TOP = -HEIGHT / 2;
const BOTTOM = HEIGHT / 2;
const RIGHT = WIDTH / 2;
const MARGIN = 4;

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, faceDown, rank, suit) {
    super(scene, x, y);

    this.setSize(WIDTH, HEIGHT);

    this.cardBack = this.scene.add.container();

    const backBackground = this.scene.add.graphics();
    backBackground.fillStyle(0x35363a, 1);
    backBackground.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    backBackground.lineStyle(2, 0x000000);
    backBackground.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    this.cardBack.add(backBackground);
    this.add(this.cardBack);

    this.cardFront = this.scene.add.container();
    this.setRankAndSuit(rank, suit);
    this.add(this.cardFront);

    if (faceDown) {
      this.cardBack.setVisible(true);
      this.cardFront.setVisible(false);
    } else {
      this.cardBack.setVisible(false);
      this.cardFront.setVisible(true);
    }
    // this.cardBack.setVisible(faceDown);
    // this.cardFront.setVisible(!faceDown);

    this.setInteractive();
    this.on("pointerup", this.flip);

    this.scene.input.setDraggable(this);
    this.on("drag", (_, dragX, dragY) => {
      this.setPosition(dragX, dragY);
    });
  }

  setRankAndSuit(rank, suit) {
    this.cardFront.removeAll(true);

    const font = {
      fontFamily: "system-ui",
      fontSize: 30,
      color: suit === "♥" || suit === "♦" ? "#e93323" : "#000000",
      align: "center",
    };
    const rankAndSuit = `${rank}\n${suit}`;

    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff, 1);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    background.lineStyle(2, 0x000000);
    background.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    this.cardFront.add(background);

    const centerText = this.scene.add.text(0, 0, suit, font);
    centerText.setOrigin(0.5, 0.5);
    centerText.setFontSize(60);
    this.cardFront.add(centerText);

    const topLeftText = this.scene.add.text(
      LEFT + MARGIN,
      TOP + MARGIN,
      rankAndSuit,
      font
    );
    this.cardFront.add(topLeftText);

    const bottomRightText = this.scene.add.text(
      RIGHT - MARGIN,
      BOTTOM - MARGIN,
      rankAndSuit,
      font
    );
    bottomRightText.setRotation(Math.PI);
    this.cardFront.add(bottomRightText);
  }

  flip() {
    // this.add
    // this.tweens
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this,
      scaleX: 0,
      duration: 500,
      ease: Phaser.Math.Easing.Cubic.In,
      onComplete: () => {
        this.cardBack.setVisible(!this.cardBack.visible);
        this.cardFront.setVisible(!this.cardBack.visible);
      },
    });
    timeline.add({
      targets: this,
      scaleX: 1,
      duration: 500,
      ease: Phaser.Math.Easing.Cubic.Out,
    });
    timeline.play();
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "card",
  function (x, y, faceDown, rank, suit) {
    const card = new Card(this.scene, x, y, faceDown, rank, suit);
    this.scene.add.existing(card);
    return card;
  }
);
