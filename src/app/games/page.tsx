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
