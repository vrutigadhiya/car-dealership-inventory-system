export default function CarLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-40 h-16 overflow-hidden">
        {/* Road line */}
        <div className="absolute bottom-2 left-0 w-full h-[2px] bg-ink/10" />
        <div className="absolute bottom-2 left-0 w-full h-[2px] overflow-hidden">
          <div className="h-full bg-ink/30 animate-[roadDash_1s_linear_infinite]" style={{ width: "200%" }} />
        </div>

        {/* Car */}
        <div className="absolute bottom-3 animate-[driveAcross_1.4s_ease-in-out_infinite]">
          <svg
            width="56"
            height="24"
            viewBox="0 0 56 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 16 L8 8 Q10 5 14 5 L36 5 Q40 5 42 8 L46 16 L52 16 Q54 16 54 18 L54 19 L2 19 L2 18 Q2 16 4 16 Z"
              className="fill-ink"
            />
            <rect x="14" y="7" width="10" height="6" rx="1" className="fill-paper" />
            <rect x="26" y="7" width="10" height="6" rx="1" className="fill-paper" />
            <circle cx="14" cy="19" r="4" className="fill-ink-light" />
            <circle cx="14" cy="19" r="1.6" className="fill-amber" />
            <circle cx="42" cy="19" r="4" className="fill-ink-light" />
            <circle cx="42" cy="19" r="1.6" className="fill-amber" />
          </svg>
        </div>
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-steel mt-3">
        {message}
      </p>
    </div>
  );
}