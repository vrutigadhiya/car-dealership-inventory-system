import { Link } from "react-router-dom";
import { CarFront, TriangleAlert, ArrowLeft, House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-6">
      {/* Background decoration */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber/10 blur-3xl" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 h-24 w-full bg-ink">
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-paper to-transparent bg-[length:60px_2px] bg-repeat-x opacity-70" />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        {/* Car Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber text-ink shadow-xl shadow-amber/30">
          <CarFront size={52} strokeWidth={2.2} />
        </div>

        <p className="mb-3 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-amber">
          <TriangleAlert size={16} />
          Error 404
        </p>

        <h1 className="font-display text-7xl font-black text-ink md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 font-display text-3xl uppercase text-ink md:text-4xl">
          Vehicle Not Found
        </h2>

        <p className="mx-auto mt-5 max-w-md leading-7 text-steel">
          Looks like this road doesn't lead anywhere. The page you're looking
          for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-amber px-6 py-3 font-semibold uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-amber-dark hover:shadow-lg"
          >
            <House size={18} />
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-ink/20 px-6 py-3 font-semibold uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-white"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Decorative Car */}
        <div className="mt-14 flex items-center justify-center">
          <CarFront
            size={90}
            className="animate-bounce text-amber drop-shadow-lg"
            strokeWidth={1.8}
          />
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-steel">
          Ironclad Motors • Drive Back Safely
        </p>
      </div>
    </div>
  );
}