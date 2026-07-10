import { waypoints } from '../data/flightPath';

// Mutable, module-level scroll state. Read inside useFrame() so the 3D scene
// can react to scroll position without triggering React re-renders every frame.
export const scrollState = {
  progress: 0, // 0..1 across the hero viewport
  fraction: 0, // 0..1 across the full page (raw scroll position)
  curveT: 0, // 0..1 flight-curve parameter, remapped so each waypoint lines
  // up with its section's actual scroll position instead of assuming
  // every section is the same height.
};

// scrollState.fraction at which each waypoint's section top is reached.
let sectionFractions: number[] = waypoints.map((_, i) => i / (waypoints.length - 1));

function measureSections(maxScroll: number) {
  if (maxScroll <= 0) {
    sectionFractions = waypoints.map((_, i) => i / (waypoints.length - 1));
    return;
  }
  sectionFractions = waypoints.map((wp) => {
    const el = document.getElementById(wp.sectionId);
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return Math.min(Math.max(top / maxScroll, 0), 1);
  });
}

function curveTForFraction(f: number) {
  const n = sectionFractions.length;
  if (n < 2) return 0;
  if (f <= sectionFractions[0]) return 0;
  if (f >= sectionFractions[n - 1]) return 1;
  for (let i = 0; i < n - 1; i++) {
    const a = sectionFractions[i];
    const b = sectionFractions[i + 1];
    if (f >= a && f <= b) {
      const local = b > a ? (f - a) / (b - a) : 0;
      return (i + local) / (n - 1);
    }
  }
  return 1;
}

export function initScrollTracking() {
  const update = () => {
    const heroHeight = window.innerHeight;
    scrollState.progress = Math.min(window.scrollY / heroHeight, 1.3);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.fraction = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    scrollState.curveT = curveTForFraction(scrollState.fraction);
  };

  const remeasure = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    measureSections(max);
    update();
  };

  remeasure();
  // sections can shift height after fonts/canvas mount; remeasure once more
  const settleTimer = window.setTimeout(remeasure, 400);

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', remeasure);

  return () => {
    window.clearTimeout(settleTimer);
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', remeasure);
  };
}
