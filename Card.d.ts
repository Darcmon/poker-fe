declare interface Card extends Phaser.GameObjects.Container {
  flip(): void;
  setRankAndSuit(rank: string, suit: string): void;
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    card(
      x: number,
      y: number,
      faceDown: boolean,
      rank: string,
      suit: string
    ): Card;
  }
}
