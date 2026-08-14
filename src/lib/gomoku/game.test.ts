import assert from "node:assert/strict";
import test from "node:test";
import {
  createBoard,
  createInitialGameState,
  getWinningCells,
  playMove,
  restartGame,
  undoLastMove,
} from "./game.ts";
import type { GameState, Position } from "./types.ts";

function boardWithStones(positions: Position[]) {
  const board = createBoard();

  for (const position of positions) {
    board[position.row][position.col] = "black";
  }

  return board;
}

function playSequence(positions: Position[]): GameState {
  return positions.reduce(playMove, createInitialGameState());
}

test("检测横向五连及以上", () => {
  const positions = Array.from({ length: 6 }, (_, col) => ({ row: 7, col }));
  const cells = getWinningCells(boardWithStones(positions), positions[4]);

  assert.deepEqual(cells, positions);
});

test("检测纵向五连", () => {
  const positions = Array.from({ length: 5 }, (_, row) => ({ row, col: 7 }));

  assert.deepEqual(
    getWinningCells(boardWithStones(positions), positions[4]),
    positions,
  );
});

test("检测左上到右下五连", () => {
  const positions = Array.from({ length: 5 }, (_, index) => ({
    row: index + 2,
    col: index + 3,
  }));

  assert.deepEqual(
    getWinningCells(boardWithStones(positions), positions[2]),
    positions,
  );
});

test("检测右上到左下五连", () => {
  const positions = Array.from({ length: 5 }, (_, index) => ({
    row: index + 2,
    col: 10 - index,
  }));

  assert.deepEqual(
    getWinningCells(boardWithStones(positions), positions[2]),
    positions,
  );
});

test("空位可以落子且黑棋先行", () => {
  const state = playMove(createInitialGameState(), { row: 7, col: 7 });

  assert.equal(state.board[7][7], "black");
  assert.deepEqual(state.lastMove, { row: 7, col: 7 });
  assert.equal(state.history.length, 1);
});

test("已占位置不能重复落子", () => {
  const state = playMove(createInitialGameState(), { row: 7, col: 7 });
  const unchanged = playMove(state, { row: 7, col: 7 });

  assert.strictEqual(unchanged, state);
  assert.equal(unchanged.history.length, 1);
});

test("黑白双方正确轮换", () => {
  const afterBlack = playMove(createInitialGameState(), { row: 7, col: 7 });
  const afterWhite = playMove(afterBlack, { row: 7, col: 8 });

  assert.equal(afterBlack.currentPlayer, "white");
  assert.equal(afterWhite.board[7][8], "white");
  assert.equal(afterWhite.currentPlayer, "black");
});

test("胜利后不能继续落子", () => {
  const wonState = playSequence([
    { row: 7, col: 3 },
    { row: 0, col: 0 },
    { row: 7, col: 4 },
    { row: 0, col: 1 },
    { row: 7, col: 5 },
    { row: 0, col: 2 },
    { row: 7, col: 6 },
    { row: 0, col: 3 },
    { row: 7, col: 7 },
  ]);

  assert.equal(wonState.winner, "black");
  assert.equal(wonState.winningCells.length, 5);
  assert.strictEqual(playMove(wonState, { row: 8, col: 8 }), wonState);
});

test("悔棋恢复棋盘、回合和最后一步", () => {
  const state = playSequence([
    { row: 7, col: 7 },
    { row: 7, col: 8 },
  ]);
  const undone = undoLastMove(state);

  assert.equal(undone.board[7][8], null);
  assert.equal(undone.currentPlayer, "white");
  assert.deepEqual(undone.lastMove, { row: 7, col: 7 });
  assert.equal(undone.history.length, 1);
  assert.equal(undone.winner, null);
});

test("重新开始恢复初始状态", () => {
  const restarted = restartGame();

  assert.equal(restarted.currentPlayer, "black");
  assert.equal(restarted.history.length, 0);
  assert.equal(restarted.lastMove, null);
  assert.equal(restarted.winner, null);
  assert.equal(restarted.board.flat().every((cell) => cell === null), true);
});
