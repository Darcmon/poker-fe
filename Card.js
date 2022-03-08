import "phaser";

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, rank, suit) {
    super(scene, x, y);

    const WIDTH = 250;
    const HEIGHT = 350;
    const LEFT = -WIDTH / 2;
    const RIGHT = WIDTH / 2;
    const TOP = -HEIGHT / 2;
    const BOTTOM = HEIGHT / 2;
    const MARGIN = 10;

    const font = {
      fontFamily: "system-ui",
      fontSize: "40px",
      color: suit === "♥" || suit === "♦" ? "#e93323" : "#000000",
      align: "center",
    };
    const rankAndSuit = `${rank}\n${suit}`;

    const background = this.scene.add.graphics();
    background.fillStyle(0xffffff);
    background.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, 16);
    background.lineStyle(2, 0x000000);
    background.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, 16);

    const centerText = this.scene.add.text(0, 0, suit, font);
    centerText.setFontSize(100);
    centerText.setOrigin(0.5, 0.5);

    const topText = this.scene.add.text(
      LEFT + MARGIN,
      TOP + MARGIN,
      rankAndSuit,
      font
    );

    const bottomText = this.scene.add.text(
      RIGHT - MARGIN,
      BOTTOM - MARGIN,
      rankAndSuit,
      font
    );
    bottomText.setRotation(Math.PI);

    const cardback = this.scene.add.graphics();
    cardback.fillStyle(0x35363a);
    cardback.fillRoundedRect(LEFT, TOP, WIDTH, HEIGHT, 16);
    cardback.lineStyle(2, 0x000000);
    cardback.strokeRoundedRect(LEFT, TOP, WIDTH, HEIGHT, 16);

    const diamondText = this.scene.add.text(LEFT / 2, TOP / 2, "♦", {
      fontFamily: "system-ui",
      fontSize: "120px",
      color: "#e93323",
      align: "center",
    });
    diamondText.setFontSize(100);
    diamondText.setOrigin(0.5, 0.5);

    const clubText = this.scene.add.text(RIGHT / 2, TOP / 2, "♣", {
      fontFamily: "system-ui",
      fontSize: "120px",
      color: "#ffffff",
      align: "center",
    });
    clubText.setFontSize(100);
    clubText.setOrigin(0.5, 0.5);

    const heartText = this.scene.add.text(RIGHT / 2, BOTTOM / 2, "♥", {
      fontFamily: "system-ui",
      fontSize: "120px",
      color: "#e93323",
      align: "center",
    });
    heartText.setFontSize(100);
    heartText.setOrigin(0.5, 0.5);

    const spadeText = this.scene.add.text(LEFT / 2, BOTTOM / 2, "♠", {
      fontFamily: "system-ui",
      fontSize: "120px",
      color: "#ffffff",
      align: "center",
    });
    spadeText.setFontSize(100);
    spadeText.setOrigin(0.5, 0.5);

    this.front = this.scene.add.container();
    this.front.add([background, centerText, topText, bottomText]);
    this.back = this.scene.add.container();
    this.back.add([cardback, diamondText, clubText, heartText, spadeText]);

    this.add([this.front, this.back]);
    this.front.visible = true;
    this.back.visible = false;
  }

  flip() {
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this,
      scaleX: 0,
      duration: 1000,
      ease: Phaser.Math.Easing.Expo.In,
      onComplete: () => {
        this.front.visible = false;
        this.back.visible = true;
      },
    });
    timeline.add({
      targets: this,
      scaleX: 1,
      duration: 1000,
      ease: Phaser.Math.Easing.Expo.Out,
    });
    timeline.play();
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
