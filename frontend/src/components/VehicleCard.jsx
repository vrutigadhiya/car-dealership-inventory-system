import StockGauge from "./StockGauge";
import { formatIndianCurrency } from "../utils/formatCurrency";

export default function VehicleCard({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  busy,
}) {
  const isAdminView = Boolean(onEdit || onDelete || onRestock);

  return (
    <div className="bg-white rounded-md shadow-sm border border-ink/10 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="bg-ink text-paper px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest text-amber">
          STK #{vehicle._id.slice(-5).toUpperCase()}
        </span>
        <span className="font-mono text-[11px] text-paper/60">
          {vehicle.category}
        </span>
      </div>
      <div className="w-full h-40 bg-paper-dim overflow-hidden">
        {vehicle.imageUrl ? (
          <img
            src={`http://localhost:5000${vehicle.imageUrl}`}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-steel/40 text-xs uppercase tracking-wide">
            No image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-xl uppercase leading-tight">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-xs uppercase tracking-wide text-steel mt-0.5">
            {vehicle.category}
          </p>
        </div>

        <p className="font-mono text-2xl text-ink-light font-semibold">
          {formatIndianCurrency(vehicle.price)}
        </p>

        <StockGauge quantity={vehicle.quantity} />

        <div className="mt-auto pt-2 flex flex-col gap-2">
          {onPurchase && (
            <button
              onClick={() => onPurchase(vehicle._id)}
              disabled={vehicle.quantity === 0 || busy}
              className="w-full bg-amber hover:bg-amber-dark disabled:bg-paper-dim disabled:text-steel/50 disabled:cursor-not-allowed text-ink font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors"
            >
              {vehicle.quantity === 0
                ? "Sold out"
                : busy
                  ? "Processing…"
                  : "Purchase"}
            </button>
          )}

          {isAdminView && (
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => onEdit(vehicle)}
                className="flex-1 border border-ink/20 hover:border-ink text-ink py-1.5 rounded-sm uppercase tracking-wide font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onRestock(vehicle._id)}
                className="flex-1 border border-moss/40 text-moss hover:border-moss py-1.5 rounded-sm uppercase tracking-wide font-medium transition-colors"
              >
                Restock
              </button>
              <button
                onClick={() => onDelete(vehicle._id)}
                className="flex-1 border border-rust/40 text-rust hover:border-rust py-1.5 rounded-sm uppercase tracking-wide font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
