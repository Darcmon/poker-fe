const GAME_ID = "gameId";

export function getGameId(): string {
  return sessionStorage.getItem(GAME_ID);
}

export function setGameId(gameId: string) {
  sessionStorage.setItem(GAME_ID, gameId);
}

export function removeGameId() {
  sessionStorage.removeItem(GAME_ID);
}
