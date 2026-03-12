export default function BrandLogo({
  descriptorClassName = "text-current",
}: {
  descriptorClassName?: string;
}) {
  return (
    <div className="flex items-center">
      {/* Isotipo — Sol */}
      <svg
        className="mr-3 h-auto w-10 shrink-0"
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
        <span className="font-sans text-2xl font-black uppercase leading-none tracking-[0.15em]">
          EAST
        </span>
        <span className="font-serif text-2xl font-normal leading-none">
          Living
        </span>
      </div>

      {/* Línea vertical separadora */}
      <div className="mx-3 h-7 w-px bg-current opacity-30" />

      {/* Descriptor */}
      <div
        className={`font-sans text-[9px] font-light uppercase leading-tight tracking-[0.2em] ${descriptorClassName}`}
      >
        Arquitectura
        <br />
        &amp; Desarrollo
      </div>
    </div>
  );
}
