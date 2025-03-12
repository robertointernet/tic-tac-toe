// src/index.ts

export type Board = (null | "X" | "O")[][];

export class TicTacToe {
  private board: Board;
  private currentPlayer: "X" | "O";

  constructor() {
    this.board = this.createBoard();
    this.currentPlayer = "X";
  }

  private createBoard(): Board {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  private botMove(player: "X" | "O"): [number, number] {
    const availableSpots: [number, number][] = this.board.flatMap((row, i) =>
      row.map((cell, j) => (cell === null ? ([i, j] as [number, number]) : null))
    ).filter(spot => spot !== null) as [number, number][];

    if (availableSpots.length === 0) {
      return [-1, -1];
    }

    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    return availableSpots[randomIndex];
  }

  private checkRows(): "X" | "O" | null {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2]) {
        return this.board[i][0];
      }
    }
    return null;
  }

  private checkColumns(): "X" | "O" | null {
    for (let j = 0; j < 3; j++) {
      if (this.board[0][j] && this.board[0][j] === this.board[1][j] && this.board[0][j] === this.board[2][j]) {
        return this.board[0][j];
      }
    }
    return null;
  }

  private checkDiagonals(): "X" | "O" | null {
    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
        return this.board[0][0];
    }
    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
        return this.board[0][2];
    }
    return null;
  }

  private checkTie(): "Tie" | null {
    return this.board.every(row => row.every(cell => cell !== null)) ? "Tie" : null;
  }

  private checkWinner(): "X" | "O" | "Tie" | null {
    return this.checkRows() || this.checkColumns() || this.checkDiagonals() || this.checkTie() || null;
  }

  private printBoard(): void {
    for (let i = 0; i < 3; i++) {
      console.log(
        this.board[i][0] || " ",
        "|",
        this.board[i][1] || " ",
        "|",
        this.board[i][2] || " "
      );
      if (i < 2) {
        console.log("---------");
      }
    }
  }

  public gameLoop(): void {
    let winner: "X" | "O" | "Tie" | null = null;

    while (!winner) {
      console.log("Current board:");
      this.printBoard();
      console.log();

      // Get move from current player (bot)
      const [row, col] = this.botMove(this.currentPlayer);
      this.board[row][col] = this.currentPlayer;

      // Check for winner
      winner = this.checkWinner();

      if (winner === "Tie") {
        console.log("It's a tie!");
        this.printBoard();

        break;
      } else if (winner === "X" || winner === "O") {
        console.log("Player " + winner + " wins!");
        this.printBoard();
        break;
      } else if (winner === null) {
        // Game is not over
      }

      // Switch players
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }

  public start(): void {
    this.gameLoop();
  }
}

// Start the game
const game = new TicTacToe();
game.start();