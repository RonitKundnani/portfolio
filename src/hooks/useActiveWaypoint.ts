import { useEffect, useState } from 'react';
import { scrollState } from '../state/scroll';
import { waypoints } from '../data/flightPath';

export function useActiveWaypoint() {
  const [index, setIndex] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const nextIndex = Math.round(scrollState.curveT * (waypoints.length - 1));
      setIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      setScrollPct(Math.round(scrollState.fraction * 100));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { waypoint: waypoints[index], index, scrollPct };
}
