import Link from "next/link";
import type { Player } from "@/lib/gomoku/types";

type WinDialogProps = {
  isOpen: boolean;
  winner: Player | null;
  onClose: () => void;
  onPlayAgain: () => void;
  onUndo: () => void;
};

export function WinDialog({
  isOpen,
  winner,
  onClose,
  onPlayAgain,
  onUndo,
}: WinDialogProps) {
  if (!isOpen || !winner) {
    return null;
  }

  const winnerName = winner === "black" ? "黑棋" : "白棋";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 px-5 backdrop-blur-sm"
      role="presentation"
    >
      <section
        className="dialog-enter w-full max-w-md rounded-3xl border border-white/15 bg-[#111529] p-6 shadow-2xl shadow-black/50 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="win-dialog-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-300">对局结束</p>
            <h2
              id="win-dialog-title"
              className="mt-2 text-3xl font-bold text-white"
            >
              {winnerName}获胜 🎉
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="关闭胜利弹窗"
          >
            ×
          </button>
        </div>
        <p className="mt-4 leading-7 text-slate-300">
          恭喜{winnerName}完成五连！胜利棋子已在棋盘上高亮。
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onPlayAgain}
            className="rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400"
          >
            再来一局
          </button>
          <Link
            href="/games"
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
          >
            返回大厅
          </Link>
        </div>
        <button
          type="button"
          onClick={onUndo}
          className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          撤销最后一步并继续
        </button>
      </section>
    </div>
  );
}
