export default class GamePlay {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
  }

  init() {
    this.gamePlay.drawBoard();
    this.gamePlay.drawGoblin();
    this.cellClickHandler();
  }

  cellClickHandler() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    this.gamePlay.drawHit(index);
  }
}
