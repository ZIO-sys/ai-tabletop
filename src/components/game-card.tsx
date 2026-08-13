import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.09]">
      <span className="text-4xl" aria-hidden="true">
        {game.icon}
      </span>
      <h2 className="mt-5 text-2xl font-semibold text-white">{game.name}</h2>
      <p className="mt-2 text-slate-400">{game.description}</p>
    </article>
  );
}
