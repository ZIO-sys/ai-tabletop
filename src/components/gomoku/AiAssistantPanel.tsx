export function AiAssistantPanel() {
  return (
    <section className="overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/[0.04] p-5">
      <div className="flex items-start gap-4">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-xl text-violet-200"
          aria-hidden="true"
        >
          ✦
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-white">AI 助手</h2>
            <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-xs font-semibold text-violet-300">
              即将开放
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            AI 助手将在后续版本为你分析局势、推荐走法并解释策略。
          </p>
        </div>
      </div>
    </section>
  );
}
