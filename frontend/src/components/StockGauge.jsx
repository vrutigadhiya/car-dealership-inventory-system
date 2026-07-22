// A signature "fuel gauge" style indicator for stock levels, evoking a
// dashboard gauge rather than a plain number badge. Full width = well
// stocked, low fill in rust-red = nearly sold out, empty = sold out.
export default function StockGauge({ quantity, max = 10 }) {
  const pct = Math.min(100, Math.round((quantity / max) * 100));
  const isEmpty = quantity === 0;
  const isLow = quantity > 0 && quantity <= 2;

  const fillColor = isEmpty ? 'bg-steel/40' : isLow ? 'bg-rust' : 'bg-moss';
  const label = isEmpty ? 'Sold out' : isLow ? `Only ${quantity} left` : `${quantity} in stock`;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-steel">Stock level</span>
        <span
          className={`font-mono text-[11px] font-semibold ${
            isEmpty ? 'text-steel' : isLow ? 'text-rust' : 'text-moss'
          }`}
        >
          {label}
        </span>
      </div>
      <div className="h-2 w-full bg-paper-dim rounded-full overflow-hidden border border-ink/10">
        <div
          className={`h-full ${fillColor} transition-all duration-300`}
          style={{ width: isEmpty ? '100%' : `${Math.max(pct, 6)}%` }}
        />
      </div>
    </div>
  );
}
