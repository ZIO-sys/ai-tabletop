import { FormEvent, useState } from "react";

export function RuleInput() {
  const [idea, setIdea] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!idea.trim()) {
      return;
    }

    setMessage(
      "已收到你的规则想法。AI 规则修改功能将在后续版本开放。",
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
      <h2 className="font-semibold text-white">告诉 AI 你想怎么玩</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        描述你的创意规则，当前不会改变本局玩法。
      </p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label htmlFor="rule-idea" className="sr-only">
          规则想法
        </label>
        <textarea
          id="rule-idea"
          value={idea}
          onChange={(event) => {
            setIdea(event.target.value);
            setMessage(null);
          }}
          rows={3}
          placeholder="例如：连续三颗棋子后可以再下一步"
          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/50 px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15"
        />
        <button
          type="submit"
          disabled={!idea.trim()}
          className="mt-3 w-full rounded-xl border border-violet-400/25 bg-violet-400/10 px-4 py-2.5 text-sm font-semibold text-violet-200 transition hover:bg-violet-400/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          生成规则
        </button>
      </form>
      {message ? (
        <p
          className="message-enter mt-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] px-3.5 py-3 text-sm leading-6 text-emerald-200"
          role="status"
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
