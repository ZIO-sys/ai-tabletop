import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
          AI × 桌游
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          AI桌游宇宙
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
          和 AI 一起玩、一起改、一起创造桌游
        </p>
        <Link
          href="/games"
          className="mt-10 rounded-xl bg-violet-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          进入游戏大厅
        </Link>
      </section>
    </main>
  );
}
