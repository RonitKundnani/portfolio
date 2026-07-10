export interface Waypoint {
  id: string;
  code: string;
  label: string;
  sectionId: string;
  position: [number, number, number];
}

// One waypoint per section. The drone's flight curve is built from these
// positions; the HUD reads sectionId to know which one is "current".
export const waypoints: Waypoint[] = [
  { id: 'wp0', code: 'WP 00', label: 'LAUNCH', sectionId: 'home', position: [0, 0.6, -1.5] },
  { id: 'wp1', code: 'WP 01', label: 'PROJECT LOG', sectionId: 'projects', position: [3.4, -1.1, -6] },
  { id: 'wp2', code: 'WP 02', label: 'TOPIC MAP', sectionId: 'skills', position: [-3.6, -2.4, -10.5] },
  { id: 'wp3', code: 'WP 03', label: 'MISSION LOG', sectionId: 'achievements', position: [3.2, -3.6, -15] },
  { id: 'wp4', code: 'WP 04', label: 'TOUCHDOWN', sectionId: 'contact', position: [0, -4.8, -19.5] },
];
