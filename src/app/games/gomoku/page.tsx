import type { Metadata } from "next";
import Link from "next/link";
import { GomokuGame } from "@/components/gomoku/GomokuGame";

export const metadata: Metadata = {
  title: "五子棋｜AI桌游",
  description: "本地双人自由五子棋",
};

export default function GomokuPage() {
  return (
    <main className="min-h-screen px-4 pb-12 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-b border-white/10 py-5">
        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white transition hover:text-violet-200"
          >
            AI桌游
          </Link>
          <Link
            href="/games"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← 游戏大厅
          </Link>
        </div>
        <span className="rounded-full border border-cyan-300/15 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-semibold text-cyan-200">
          本地双人
        </span>
      </header>

      <div className="mx-auto max-w-7xl py-8 sm:py-10">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Gomoku · Local Match
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            五子棋
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            黑棋先行，在横、竖或斜线方向率先连成五子即可获胜。
          </p>
        </div>

        <GomokuGame />
      </div>
    </main>
  );
}
