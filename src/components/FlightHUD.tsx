import { useActiveWaypoint } from '../hooks/useActiveWaypoint';

export default function FlightHUD() {
  const { waypoint, scrollPct } = useActiveWaypoint();

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 w-[min(92vw,560px)] -translate-x-1/2">
      <div className="hud-panel flex items-center gap-4 px-4 py-2.5 backdrop-blur-sm">
        <span className="shrink-0 text-[10px] uppercase tracking-[1.5px] text-amber">
          {waypoint.code}
        </span>
        <span className="shrink-0 text-[11px] uppercase tracking-[1.5px] text-cyan">
          {waypoint.label}
        </span>
        <div className="relative h-1 flex-1 overflow-hidden bg-cyan-faint">
          <div
            className="absolute inset-y-0 left-0 bg-cyan transition-[width] duration-150"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
        <span className="shrink-0 text-[10px] tabular-nums text-cyan-dim">{scrollPct}%</span>
      </div>
    </div>
  );
}
