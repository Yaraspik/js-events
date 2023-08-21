import createPosition from './position';

export default class Game {
  constructor() {
    this.cells = [];
    this.boardSize = 4;
    this.boardEl = null;
    this.goblin = null;
    this.goblinPosition = null;
    this.cellClickListeners = [];
    this.fail = 0;
    this.score = 0;

    this.drawGoblin = this.drawGoblin.bind(this);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawBoard() {
    const board = document.createElement('div');
    board.classList.add('game-board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('game-board-cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.cells.push(cellEl);
      board.append(cellEl);
    }
    this.container.append(board);
    this.boardEl = board;
  }

  drawGoblin() {
    if (this.goblin) {
      this.goblin.remove();
    }

    const goblin = document.createElement('img');
    goblin.classList.add('game-goblin');

    const goblinPosition = createPosition(this.goblinPosition, this.boardSize);
    this.goblinPosition = goblinPosition;
    this.goblin = goblin;
    this.cells[goblinPosition].append(goblin);

    this.timer = setTimeout(() => {
      this.fail += 1;
      if (this.fail >= 5) {
        this.showGameOver();
        this.fail = 0;
        clearTimeout(this.timer);
      } else {
        this.drawGoblin();
      }
    }, 1000);
  }

  drawHit(index) {
    this.container.classList.add('game-container-hit');
    setTimeout(() => {
      this.container.classList.remove('game-container-hit');
    }, 100);

    if (index === this.goblinPosition) {
      this.score += 1;
      clearTimeout(this.timer);
      this.drawGoblin();
    }
  }

  /**
 * Add listener to mouse click for cell
 *
 * @param callback
 */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  showGameOver() {
    const popup = this.container.querySelector('.message-wrapper');
    popup.classList.remove('hide');
  }
}
