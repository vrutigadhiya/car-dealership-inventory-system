import { useState } from 'react';

const empty = { make: '', model: '', category: '', price: '', quantity: '' };

export default function VehicleForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? { ...empty, ...initial } : empty);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.make || !form.model || !form.category || form.price === '' || form.quantity === '') {
      setError('Make, model, category, price and quantity are required.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        make: form.make,
        model: form.model,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-30 p-4">
      <div className="bg-paper rounded-md shadow-xl w-full max-w-md p-6 border-t-4 border-amber">
        <h2 className="font-display text-2xl uppercase mb-4">
          {initial ? 'Update vehicle' : 'Add vehicle to lot'}
        </h2>

        {error && (
          <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Make" value={form.make} onChange={update('make')} />
            <Field label="Model" value={form.model} onChange={update('model')} />
          </div>
          <Field label="Category" value={form.category} onChange={update('category')} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (USD)" type="number" value={form.price} onChange={update('price')} />
            <Field label="Quantity" type="number" value={form.quantity} onChange={update('quantity')} />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-amber hover:bg-amber-dark text-ink font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : initial ? 'Save changes' : 'Add vehicle'}
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

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
      />
    </div>
  );
}