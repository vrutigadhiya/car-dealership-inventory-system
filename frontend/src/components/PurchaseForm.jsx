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
      !form.buyerName ||
      !form.buyerPhone ||
      !form.buyerEmail ||
      !form.buyerAddress
    ) {
      setError("All fields are required.");
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
    }
  };


  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-30 p-4">

      <div className="
        bg-paper
        rounded-md
        shadow-xl
        w-full
        max-w-md
        p-6
        border-t-4
        border-amber
      ">

        <h2 className="font-display text-2xl uppercase mb-1">
          Book this vehicle
        </h2>


        <p className="text-sm text-steel mb-4">
          {vehicle.make} {vehicle.model} —{" "}
          {formatIndianCurrency(vehicle.price)}
        </p>



        {error && (
          <div className="
            bg-rust/10
            border
            border-rust/30
            text-rust
            text-sm
            rounded-sm
            px-3
            py-2
            mb-4
          ">
            {error}
          </div>
        )}



        <form onSubmit={submit} className="space-y-3">

          <Field
            label="Full name"
            value={form.buyerName}
            onChange={update("buyerName")}
          />


          <Field
            label="Phone number"
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
              className="
                flex-1
                bg-amber
                hover:bg-amber-dark
                text-ink
                font-semibold
                uppercase
                tracking-wide
                text-xs
                py-2.5
                rounded-sm
                transition-colors
                disabled:opacity-60
              "
            >
              {saving ? "Booking…" : "Confirm Purchase"}
            </button>



            <button
              type="button"
              onClick={onCancel}
              className="
                flex-1
                border
                border-ink/20
                text-ink
                uppercase
                tracking-wide
                text-xs
                py-2.5
                rounded-sm
                hover:border-ink
              "
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

  return (
    <div>

      <label className="
        block
        text-[10px]
        uppercase
        tracking-wider
        text-steel
        mb-1
        font-mono
      ">
        {label}
      </label>


      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="
          w-full
          border
          border-ink/15
          rounded-sm
          px-3
          py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-amber
        "
      />

    </div>
  );
}