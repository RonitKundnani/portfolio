export default function HUDChrome() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hud-scanline" />

      <div className="absolute left-7 top-7 h-11 w-11 border-l-2 border-t-2 border-cyan opacity-80" />
      <div className="absolute right-7 top-7 h-11 w-11 border-r-2 border-t-2 border-cyan opacity-80" />
      <div className="absolute bottom-7 left-7 h-11 w-11 border-b-2 border-l-2 border-cyan opacity-80" />
      <div className="absolute bottom-7 right-7 h-11 w-11 border-b-2 border-r-2 border-cyan opacity-80" />

      <style>{`
        .hud-scanline {
          position: absolute;
          inset: 0;
          height: 200px;
          background: linear-gradient(180deg, transparent 0%, rgba(94,234,212,0.06) 50%, transparent 100%);
          animation: sweep 7s linear infinite;
        }
        @keyframes sweep {
          0% { transform: translateY(-200px); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  );
}
