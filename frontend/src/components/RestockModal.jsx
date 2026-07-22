import { useState } from "react";

export default function RestockModal({ vehicle, onSubmit, onCancel }) {
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const parsed = Number(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid quantity greater than 0.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit(parsed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-40 p-4">
      <div className="bg-paper rounded-md shadow-xl w-full max-w-sm p-6 border-t-4 border-moss">
        <h2 className="font-display text-xl uppercase mb-1">Restock vehicle</h2>
        <p className="text-sm text-steel mb-4">
          {vehicle.make} {vehicle.model} — currently {vehicle.quantity} in stock
        </p>

        {error && (
          <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
              Quantity to add
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-moss hover:bg-moss/90 text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60"
            >
              {saving ? "Restocking…" : "Confirm Restock"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-ink/20 text-ink uppercase tracking-wide text-xs py-2.5 rounded-sm hover:border-ink transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}