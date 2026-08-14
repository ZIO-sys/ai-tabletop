import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
};

const cardClassName =
  "group flex min-h-56 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.09]";

function CardContent({ game }: GameCardProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className="grid size-12 place-items-center rounded-xl bg-white/10 text-2xl text-white"
          aria-hidden="true"
        >
          {game.icon}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            game.href
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-slate-400/10 text-slate-400"
          }`}
        >
          {game.status}
        </span>
      </div>
      <h2 className="mt-5 text-2xl font-semibold text-white">{game.name}</h2>
      <p className="mt-2 flex-1 leading-7 text-slate-400">{game.description}</p>
      <span
        className={`mt-5 text-sm font-semibold ${
          game.href
            ? "text-violet-300 transition group-hover:text-violet-200"
            : "text-slate-500"
        }`}
      >
        {game.href ? "开始游戏 →" : "敬请期待"}
      </span>
    </>
  );
}

export function GameCard({ game }: GameCardProps) {
  if (game.href) {
    return (
      <Link href={game.href} className={cardClassName}>
        <CardContent game={game} />
      </Link>
    );
  }

  return (
    <article className={cardClassName}>
      <CardContent game={game} />
    </article>
  );
}
