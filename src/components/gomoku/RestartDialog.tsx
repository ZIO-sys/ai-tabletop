type RestartDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function RestartDialog({
  isOpen,
  onCancel,
  onConfirm,
}: RestartDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 px-5 backdrop-blur-sm"
      role="presentation"
    >
      <section
        className="dialog-enter w-full max-w-sm rounded-3xl border border-white/15 bg-[#111529] p-6 shadow-2xl shadow-black/50"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="restart-dialog-title"
        aria-describedby="restart-dialog-description"
      >
        <h2 id="restart-dialog-title" className="text-xl font-bold text-white">
          重新开始对局？
        </h2>
        <p
          id="restart-dialog-description"
          className="mt-3 leading-7 text-slate-400"
        >
          确定要重新开始当前对局吗？当前棋盘与历史步骤将被清空。
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400"
          >
            确认重开
          </button>
        </div>
      </section>
    </div>
  );
}
