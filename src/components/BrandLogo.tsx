export default function BrandLogo({
  descriptorClassName = "text-current",
  sunClassName = "text-current",
  size = "md",
}: {
  descriptorClassName?: string;
  sunClassName?: string;
  size?: "md" | "lg";
}) {
  const isLg = size === "lg";

  return (
    <div className="flex items-center">
      {/* Isotipo — Sol */}
      <svg
        className={`shrink-0 h-auto ${sunClassName} ${isLg ? "mr-5 w-20 sm:w-24" : "mr-3 w-10"}`}
        viewBox="0 0 52 35"
        fill="none"
        stroke="currentColor"
      >
        <line
          x1="0" y1="30" x2="52" y2="30"
          strokeWidth="2" strokeLinecap="round"
        />
        <path
          d="M 5,30 A 21,21 0 0,1 47,30"
          strokeWidth="2" strokeLinecap="round" fill="none"
        />
        <line
          x1="12" y1="22" x2="40" y2="22"
          strokeWidth="1.7" strokeLinecap="round"
        />
        <line
          x1="18" y1="15" x2="34" y2="15"
          strokeWidth="1.7" strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-sans font-black uppercase leading-none tracking-[0.15em] ${isLg ? "text-5xl sm:text-6xl" : "text-2xl"}`}>
          EAST
        </span>
        <span className={`font-serif font-normal leading-none ${isLg ? "text-5xl sm:text-6xl" : "text-2xl"}`}>
          Living
        </span>
      </div>

      {/* Línea vertical separadora */}
      <div className={`bg-current opacity-30 ${isLg ? "mx-5 h-14 sm:h-16 w-px" : "mx-3 h-7 w-px"}`} />

      {/* Descriptor */}
      <div
        className={`font-sans font-light uppercase leading-tight ${isLg ? "text-[11px] sm:text-xs tracking-[0.25em]" : "text-[9px] tracking-[0.2em]"} ${descriptorClassName}`}
      >
        Arquitectura
        <br />
        &amp; Desarrollo
      </div>
    </div>
  );
}
