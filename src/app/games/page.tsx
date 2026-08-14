import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { games } from "@/data/games";

export default function GamesPage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ← 返回首页
        </Link>

        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Game Lobby
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            游戏大厅
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            选择一款桌游开始体验。更多 AI 对手与动态规则玩法正在路上。
          </p>
        </header>

        <section
          className="mt-10 grid gap-5 sm:grid-cols-2"
          aria-label="可选游戏"
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
      </div>
    </main>
  );
}
