export type Player = "black" | "white";

export type Cell = Player | null;

export type Board = Cell[][];

export type Position = {
  row: number;
  col: number;
};

export type Move = Position & {
  player: Player;
};

export type GameState = {
  board: Board;
  currentPlayer: Player;
  history: Move[];
  lastMove: Position | null;
  winner: Player | null;
  winningCells: Position[];
};
