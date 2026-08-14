export function RulePanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-white">当前规则</h2>
        <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
          默认规则
        </span>
      </div>
      <p className="mt-4 text-lg font-semibold text-violet-200">自由五子棋</p>
      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-400">
        <li>15 × 15 棋盘</li>
        <li>黑棋先行，双方轮流落子</li>
        <li>横、竖、斜线连续 5 颗或以上即可获胜</li>
        <li>当前不启用禁手规则</li>
      </ul>
    </section>
  );
}
