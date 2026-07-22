export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-auto border-t border-paper/10">
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-6
        sm:py-8
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-5
        "
      >
        {/* Brand */}

        <div className="text-center md:text-left">
          <h3
            className="
            font-display
            text-lg
            sm:text-xl
            uppercase
            tracking-wide
            "
          >
            Ironclad Motors
          </h3>

          <p
            className="
            text-xs
            sm:text-sm
            text-paper/70
            mt-1
            "
          >
            Car Dealership Inventory Management System
          </p>
        </div>

        {/* Copyright */}

        <div
          className="
          text-xs
          sm:text-sm
          text-paper/60
          text-center
          md:text-right
          "
        >
          <p>© {new Date().getFullYear()} Ironclad Motors.</p>

          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
