import { useState } from "react";

export default function SearchBar({ onSearch, onReset }) {
  const [filters, setFilters] = useState({
    make: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const update = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== ""),
    );
    onSearch(cleaned);
  };

  const reset = () => {
    setFilters({ make: "", category: "", minPrice: "", maxPrice: "" });
    onReset();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-ink/10 rounded-md p-4 mb-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
            Make
          </label>
          <input
            value={filters.make}
            onChange={update("make")}
            placeholder="Toyota"
            className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
            Category
          </label>
          <input
            value={filters.category}
            onChange={update("category")}
            placeholder="SUV"
            className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
            Min price
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={update("minPrice")}
            placeholder="₹0"
            className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
            Max price
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={update("maxPrice")}
            placeholder="₹1,00,00,000"
            className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="bg-ink text-paper text-xs uppercase tracking-wide font-semibold px-4 py-2 rounded-sm hover:bg-ink-light transition-colors cursor-pointer"
        >
          Search
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-ink/20 text-ink text-xs uppercase tracking-wide font-semibold px-4 py-2 rounded-sm hover:border-ink transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
