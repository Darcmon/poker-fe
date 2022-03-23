import "phaser";

const RADIUS = 16;
const WIDTH = 150;
const HEIGHT = 230;
const LEFT = -WIDTH / 2;
const TOP = -HEIGHT / 2;
const BOTTOM = HEIGHT / 2;
const RIGHT = WIDTH / 2;
const MARGIN = 4;

const RED: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: "system-ui",
  color: "#e93323",
  align: "center",
  fontSize: "60px",
};

const WHITE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: "system-ui",
  color: "#ffffff",
  align: "center",
  fontSize: "60px",
};

export class Card extends Phaser.GameObjects.Container {
  cardBack: Phaser.GameObjects.Container;
  cardFront: Phaser.GameObjects.Container;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    faceDown: boolean,
    rank?: string,
    suit?: string
  ) {
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

    this.cardFront = this.scene.add.container();
    this.setRankAndSuit(rank || "", suit || "");
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
  }

  setRankAndSuit(rank, suit) {
    this.cardFront.removeAll(true);

    const font: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "system-ui",
      fontSize: "30px",
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

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      card(
        x: number,
        y: number,
        faceDown: boolean,
        rank?: string,
        suit?: string
      ): Card;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "card",
  function (
    x: number,
    y: number,
    faceDown: boolean,
    rank?: string,
    suit?: string
  ) {
    const card = new Card(this.scene, x, y, faceDown, rank, suit);
    this.scene.add.existing(card);
    return card;
  }
);
