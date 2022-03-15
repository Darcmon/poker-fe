import "phaser";

const RADIUS = 16;
const WIDTH = 150;
const HEIGHT = 230;
const LEFT = -WIDTH / 2;
const TOP = -HEIGHT / 2;
const BOTTOM = HEIGHT / 2;
const RIGHT = WIDTH / 2;
const MARGIN = 4;

const RED = {
  fontFamily: "system-ui",
  color: "#e93323",
  align: "center",
  fontSize: 60,
};

const WHITE = {
  fontFamily: "system-ui",
  color: "#ffffff",
  align: "center",
  fontSize: 60,
};

const BLACK = {
  fontFamily: "system-ui",
  color: "#000000",
  align: "center",
  fontSize: 60,
};

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, faceDown, rank, suit) {
    super(scene, x, y);
    this.setSize(WIDTH, HEIGHT);

    this.cardBack = this.scene.add.container();

    const background = this.scene.add.graphics();
    background.fillStyle(0x35363a);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    background.lineStyle(2, 0x000000);
    background.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    this.cardBack.add(background);

    const diamondText = this.scene.add.text(LEFT / 2, TOP / 2, "♦", RED);
    diamondText.setOrigin(0.5, 0.5);
    this.cardBack.add(diamondText);

    const clubText = this.scene.add.text(RIGHT / 2, TOP / 2, "♣", WHITE);
    clubText.setOrigin(0.5, 0.5);
    this.cardBack.add(clubText);

    const heartText = this.scene.add.text(RIGHT / 2, BOTTOM / 2, "♥", RED);
    heartText.setOrigin(0.5, 0.5);
    this.cardBack.add(heartText);

    const spadeText = this.scene.add.text(LEFT / 2, BOTTOM / 2, "♠", WHITE);
    spadeText.setOrigin(0.5, 0.5);
    this.cardBack.add(spadeText);

    this.add(this.cardBack);

    this.cardFront = this.scene.add.container();
    this.setRankAndSuit(rank, suit);
    this.add(this.cardFront);

    this.cardBack.setVisible(faceDown);
    this.cardFront.setVisible(!faceDown);

    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.on("pointerup", this.flip);

    this.dragging = false;
    this.on("drag", (_, dragX, dragY) => {
      this.dragging = true;
      this.setPosition(dragX, dragY);
      this.setDepth(1);
    });
  }

  setRankAndSuit(rank, suit) {
    this.cardFront.removeAll(true);

    const font = suit === "♥" || suit === "♦" ? RED : BLACK;
    const rankAndSuit = `${rank}\n${suit}`;

    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff, 1);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    background.lineStyle(2, 0x000000);
    background.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, RADIUS);
    this.cardFront.add(background);

    const centerText = this.scene.add.text(0, 0, suit, font);
    centerText.setOrigin(0.5, 0.5);
    this.cardFront.add(centerText);

    const topLeftText = this.scene.add.text(
      LEFT + MARGIN,
      TOP + MARGIN,
      rankAndSuit,
      font
    );
    topLeftText.setFontSize(30);
    this.cardFront.add(topLeftText);

    const bottomRightText = this.scene.add.text(
      RIGHT - MARGIN,
      BOTTOM - MARGIN,
      rankAndSuit,
      font
    );
    bottomRightText.setRotation(Math.PI);
    bottomRightText.setFontSize(30);
    this.cardFront.add(bottomRightText);
  }

  flip() {
    if (this.dragging) {
      this.dragging = false;
      this.setDepth(0);
      return;
    }

    this.setDepth(1);

    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this,
      scaleX: 0,
      duration: 100,
      ease: Phaser.Math.Easing.Expo.In,
      onComplete: () => {
        this.cardBack.setVisible(!this.cardBack.visible);
        this.cardFront.setVisible(!this.cardFront.visible);
      },
    });
    timeline.add({
      targets: this,
      scaleX: 1,
      duration: 100,
      ease: Phaser.Math.Easing.Expo.Out,
      onComplete: () => {
        this.setDepth(0);
      },
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
