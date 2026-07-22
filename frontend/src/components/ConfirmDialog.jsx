export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-40 p-4">
      <div className="bg-paper rounded-md shadow-xl w-full max-w-sm p-6 border-t-4 border-rust">
        <h2 className="font-display text-xl uppercase mb-2">{title}</h2>
        <p className="text-sm text-steel mb-5">{message}</p>

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 bg-rust hover:bg-rust/90 text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-ink/20 text-ink uppercase tracking-wide text-xs py-2.5 rounded-sm hover:border-ink transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}