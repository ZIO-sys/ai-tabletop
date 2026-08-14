import type { Player } from "@/lib/gomoku/types";

type GameStatusProps = {
  currentPlayer: Player;
  moveCount: number;
  winner: Player | null;
};

function playerLabel(player: Player) {
  return player === "black" ? "黑棋" : "白棋";
}

export function GameStatus({
  currentPlayer,
  moveCount,
  winner,
}: GameStatusProps) {
  const visiblePlayer = winner ?? currentPlayer;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 sm:px-5"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className={`size-4 rounded-full ${
            visiblePlayer === "black"
              ? "bg-slate-950 ring-1 ring-white/30"
              : "bg-white ring-1 ring-slate-300"
          }`}
          aria-hidden="true"
        />
        <p className="font-semibold text-white">
          {winner
            ? `${playerLabel(winner)}获胜`
            : `${playerLabel(currentPlayer)}回合`}
        </p>
      </div>
      <p className="text-sm text-slate-400">已落子 {moveCount} 步</p>
    </div>
  );
}
