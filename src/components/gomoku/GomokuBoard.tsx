import { BOARD_SIZE } from "@/lib/gomoku/game";
import type { Board, Position } from "@/lib/gomoku/types";

type GomokuBoardProps = {
  board: Board;
  disabled: boolean;
  lastMove: Position | null;
  winningCells: Position[];
  onCellClick: (position: Position) => void;
};

const STAR_POINTS: Position[] = [
  { row: 3, col: 3 },
  { row: 3, col: 11 },
  { row: 7, col: 7 },
  { row: 11, col: 3 },
  { row: 11, col: 11 },
];

function positionKey({ row, col }: Position) {
  return `${row}-${col}`;
}

function isSamePosition(a: Position | null, b: Position) {
  return a?.row === b.row && a.col === b.col;
}

export function GomokuBoard({
  board,
  disabled,
  lastMove,
  winningCells,
  onCellClick,
}: GomokuBoardProps) {
  const winningKeys = new Set(winningCells.map(positionKey));

  return (
    <div className="mx-auto aspect-square w-full max-w-[680px] rounded-[1.75rem] border border-amber-100/20 bg-[linear-gradient(135deg,#d8a85f,#b97837)] p-[7%] shadow-[0_28px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.28)]">
      <div className="gomoku-board-lines relative size-full border border-stone-800/75 shadow-inner">
        {STAR_POINTS.map((point) => (
          <span
            key={positionKey(point)}
            className="absolute z-0 size-[1.7%] min-h-1.5 min-w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-900/80"
            style={{
              left: `${(point.col / (BOARD_SIZE - 1)) * 100}%`,
              top: `${(point.row / (BOARD_SIZE - 1)) * 100}%`,
            }}
            aria-hidden="true"
          />
        ))}

        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const position = { row: rowIndex, col: colIndex };
            const isLastMove = isSamePosition(lastMove, position);
            const isWinningCell = winningKeys.has(positionKey(position));
            const playerName = cell === "black" ? "黑棋" : "白棋";

            return (
              <button
                key={positionKey(position)}
                type="button"
                className="absolute z-10 grid aspect-square w-[calc(100%/14)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-700 disabled:cursor-default"
                style={{
                  left: `${(colIndex / (BOARD_SIZE - 1)) * 100}%`,
                  top: `${(rowIndex / (BOARD_SIZE - 1)) * 100}%`,
                }}
                onClick={() => onCellClick(position)}
                disabled={disabled || Boolean(cell)}
                aria-label={`第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列，${cell ? playerName : "空位"}`}
              >
                {cell ? (
                  <span
                    className={`relative block size-[78%] rounded-full ${
                      isWinningCell
                        ? "winning-stone ring-[3px] ring-amber-300"
                        : ""
                    }`}
                  >
                    <span
                      className={`stone-enter relative block size-full rounded-full ${
                        cell === "black"
                          ? "bg-[radial-gradient(circle_at_32%_28%,#64748b_0%,#111827_34%,#020617_76%)] shadow-[0_3px_6px_rgba(0,0,0,0.48)]"
                          : "border border-stone-300 bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#f8fafc_42%,#cbd5e1_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.28)]"
                      }`}
                    >
                      {isLastMove ? (
                        <span
                          className={`absolute left-1/2 top-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            cell === "black"
                              ? "bg-amber-300"
                              : "bg-violet-600"
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                  </span>
                ) : null}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
