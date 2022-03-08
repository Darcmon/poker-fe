declare interface ICard extends Phaser.GameObjects.Container {
  flip(): void;
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    card(): ICard;
  }
}
