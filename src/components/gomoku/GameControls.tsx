type GameControlsProps = {
  canUndo: boolean;
  onUndo: () => void;
  onRequestRestart: () => void;
};

export function GameControls({
  canUndo,
  onUndo,
  onRequestRestart,
}: GameControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className="rounded-xl border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        悔棋
      </button>
      <button
        type="button"
        onClick={onRequestRestart}
        className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
      >
        重新开始
      </button>
    </div>
  );
}
