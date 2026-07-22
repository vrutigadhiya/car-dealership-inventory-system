export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-auto border-t border-paper/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h3 className="font-display text-lg uppercase tracking-wide">
            Ironclad Motors
          </h3>
          <p className="text-xs text-paper/70">
            Car Dealership Inventory Management System
          </p>
        </div>

        <div className="text-xs text-paper/60 text-center md:text-right">
          <p>© {new Date().getFullYear()} Ironclad Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}