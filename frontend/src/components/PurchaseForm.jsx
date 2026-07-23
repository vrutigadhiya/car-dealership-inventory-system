import { useState } from "react";
import { formatIndianCurrency } from "../utils/formatCurrency";
import { useAuth } from "../context/AuthContext";

export default function PurchaseForm({ vehicle, onSubmit, onCancel }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    buyerName: user?.name || "",
    buyerPhone: "",
    buyerEmail: user?.email || "",
    buyerAddress: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.buyerName.trim() ||
      !form.buyerPhone.trim() ||
      !form.buyerEmail.trim() ||
      !form.buyerAddress.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    // Validate Indian mobile number
    if (!/^[6-9]\d{9}$/.test(form.buyerPhone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit(form);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Booking failed. Please try again."
      );
      setSaving(false);
      return;
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-30 p-4">
      <div className="bg-paper rounded-md shadow-xl w-full max-w-md p-6 border-t-4 border-amber">
        <h2 className="font-display text-2xl uppercase mb-1">
          Book this Vehicle
        </h2>

        <p className="text-sm text-steel mb-4">
          {vehicle.make} {vehicle.model} —{" "}
          {formatIndianCurrency(vehicle.price)}
        </p>

        {error && (
          <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <Field
            label="Full Name"
            value={form.buyerName}
            onChange={update("buyerName")}
          />

          <Field
            label="Phone Number"
            type="tel"
            value={form.buyerPhone}
            onChange={update("buyerPhone")}
          />

          <Field
            label="Email"
            type="email"
            value={form.buyerEmail}
            onChange={update("buyerEmail")}
          />

          <Field
            label="Address"
            value={form.buyerAddress}
            onChange={update("buyerAddress")}
          />

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-amber hover:bg-amber-dark text-ink font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60"
            >
              {saving ? "Booking..." : "Confirm Purchase"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
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

function Field({ label, value, onChange, type = "text" }) {
  const isPhone = type === "tel";

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        onInput={
          isPhone
            ? (e) => {
                e.target.value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
              }
            : undefined
        }
        required
        maxLength={isPhone ? 10 : undefined}
        pattern={isPhone ? "[6-9][0-9]{9}" : undefined}
        placeholder={
          isPhone
            ? "9876543210"
            : `Enter ${label.toLowerCase()}`
        }
        className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
      />
    </div>
  );
}