import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
}

@Component({
  selector: 'app-demineur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demineur.component.html',
  styleUrls: ['./demineur.component.scss'],
})
export class DemineurComponent {
  rows = 8; 
  cols = 8; 
  mineCount = 10;
  grid: Cell[][] = [];
  gameOver = false;
  victory = false;
  @Output() gameResult = new EventEmitter<boolean>();

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.grid = [];
    this.gameOver = false;
    this.victory = false;

    // Créer la grille initiale
    for (let i = 0; i < this.rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push({
          hasMine: false,
          isRevealed: false,
          isFlagged: false,
          neighboringMines: 10,
        });
      }
      this.grid.push(row);
    }

    // Placer les mines aléatoirement
    this.placeMines();

    // Calculer les nombres de mines voisines
    this.calculateNeighboringMines();
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.mineCount) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.grid[row][col].hasMine) {
        this.grid[row][col].hasMine = true;
        minesPlaced++;
      }
    }
  }

  calculateNeighboringMines() {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].hasMine) continue;

        let mineCount = 0;
        for (const [dx, dy] of directions) {
          const newRow = i + dx;
          const newCol = j + dy;

          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newCol >= 0 &&
            newCol < this.cols &&
            this.grid[newRow][newCol].hasMine
          ) {
            mineCount++;
          }
        }

        this.grid[i][j].neighboringMines = mineCount;
      }
    }
  }

  revealCell(row: number, col: number) {
    if (this.gameOver || this.grid[row][col].isRevealed || this.grid[row][col].isFlagged) return;

    const cell = this.grid[row][col];
    cell.isRevealed = true;

    if (cell.hasMine) {
      this.gameOver = true;
      alert('Game Over! You hit a mine!');
      return;
    }

    if (cell.neighboringMines === 0) {
      this.revealNeighbors(row, col);
    }

    this.checkVictory();
  }

  revealNeighbors(row: number, col: number) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < this.rows &&
        newCol >= 0 &&
        newCol < this.cols &&
        !this.grid[newRow][newCol].isRevealed &&
        !this.grid[newRow][newCol].isFlagged
      ) {
        this.revealCell(newRow, newCol);
      }
    }
  }

  flagCell(event: MouseEvent, row: number, col: number) {
    event.preventDefault(); // Empêcher le clic droit par défaut
    if (this.gameOver || this.grid[row][col].isRevealed) return;

    this.grid[row][col].isFlagged = !this.grid[row][col].isFlagged;
  }

  checkVictory() {
    for (const row of this.grid) {
      for (const cell of row) {
        if (!cell.hasMine && !cell.isRevealed) return;
      }
    }
    this.victory = true;
    this.gameResult.emit(this.victory);
    alert('Congratulations! You win!');
  }
}
