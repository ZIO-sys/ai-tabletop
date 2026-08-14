import type { Board, GameState, Player, Position } from "./types";

export const BOARD_SIZE = 15;

const WIN_LENGTH = 5;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
] as const;

export function createBoard(size = BOARD_SIZE): Board {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null),
  );
}

export function createInitialGameState(): GameState {
  return {
    board: createBoard(),
    currentPlayer: "black",
    history: [],
    lastMove: null,
    winner: null,
    winningCells: [],
  };
}

export function getOtherPlayer(player: Player): Player {
  return player === "black" ? "white" : "black";
}

function isInsideBoard(board: Board, row: number, col: number): boolean {
  return (
    row >= 0 &&
    row < board.length &&
    col >= 0 &&
    col < (board[row]?.length ?? 0)
  );
}

export function getWinningCells(
  board: Board,
  position: Position,
): Position[] {
  const player = board[position.row]?.[position.col];

  if (!player) {
    return [];
  }

  for (const [rowStep, colStep] of DIRECTIONS) {
    const cells: Position[] = [{ ...position }];

    let row = position.row - rowStep;
    let col = position.col - colStep;

    while (isInsideBoard(board, row, col) && board[row][col] === player) {
      cells.unshift({ row, col });
      row -= rowStep;
      col -= colStep;
    }

    row = position.row + rowStep;
    col = position.col + colStep;

    while (isInsideBoard(board, row, col) && board[row][col] === player) {
      cells.push({ row, col });
      row += rowStep;
      col += colStep;
    }

    if (cells.length >= WIN_LENGTH) {
      return cells;
    }
  }

  return [];
}

export function playMove(state: GameState, position: Position): GameState {
  if (
    state.winner ||
    !isInsideBoard(state.board, position.row, position.col) ||
    state.board[position.row][position.col]
  ) {
    return state;
  }

  const board = state.board.map((row) => [...row]);
  board[position.row][position.col] = state.currentPlayer;

  const winningCells = getWinningCells(board, position);
  const winner = winningCells.length >= WIN_LENGTH ? state.currentPlayer : null;

  return {
    board,
    currentPlayer: winner
      ? state.currentPlayer
      : getOtherPlayer(state.currentPlayer),
    history: [
      ...state.history,
      { ...position, player: state.currentPlayer },
    ],
    lastMove: { ...position },
    winner,
    winningCells,
  };
}

export function undoLastMove(state: GameState): GameState {
  const undoneMove = state.history.at(-1);

  if (!undoneMove) {
    return state;
  }

  const board = state.board.map((row) => [...row]);
  board[undoneMove.row][undoneMove.col] = null;

  const history = state.history.slice(0, -1);
  const previousMove = history.at(-1);

  return {
    board,
    currentPlayer: undoneMove.player,
    history,
    lastMove: previousMove
      ? { row: previousMove.row, col: previousMove.col }
      : null,
    winner: null,
    winningCells: [],
  };
}

export function restartGame(): GameState {
  return createInitialGameState();
}
