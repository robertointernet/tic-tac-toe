// tests/index.test.ts

import { Board } from '../src/index';
import { TicTacToe } from '../src/index';

describe('Tic Tac Toe Tests', () => {
  it('should create an empty board', () => {
    const game = new TicTacToe();
    // Access the board using a getter if it's private
    const board = (game as any).board; // Access private member for testing
    expect(board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  it('botMove should return a valid move', () => {
    const game = new TicTacToe();
    // Access the board using a getter if it's private
    const board = (game as any).board; // Access private member for testing
    const [row, col] = (game as any).botMove('X'); // Access private member for testing
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(3);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(3);
  });

  it('checkWinner should return null for an empty board', () => {
    const game = new TicTacToe();
    const winner = (game as any).checkWinner(); // Access private member for testing
    expect(winner).toBeNull();
  });

  it('checkWinner should return the winner if there is one', () => {
    const game = new TicTacToe();
    (game as any).board = [
      ['X', 'X', 'X'],
      [null, null, null],
      [null, null, null],
    ];
    const winner = (game as any).checkWinner(); // Access private member for testing
    expect(winner).toBe('X');
  });

  it('checkWinner should return "Tie" if there is a tie', () => {
    const game = new TicTacToe();
    (game as any).board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    const winner = (game as any).checkWinner(); // Access private member for testing
    expect(winner).toBe("Tie");
  });
});