import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { waypoints } from '../data/flightPath';
import { scrollState } from '../state/scroll';

const SEGMENT = 1 / (waypoints.length - 1);

function Beacon({ position, index }: { position: [number, number, number]; index: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ring.current || !mat.current) return;
    const t = scrollState.curveT;
    const dist = Math.abs(t - index * SEGMENT);
    const near = THREE.MathUtils.clamp(1 - dist / (SEGMENT * 0.6), 0, 1);

    ring.current.rotation.z = state.clock.elapsedTime * 0.4;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.06 * near;
    ring.current.scale.setScalar(pulse * (0.7 + near * 0.5));
    mat.current.opacity = 0.15 + near * 0.65;
  });

  return (
    <group position={position}>
      <mesh ref={ring}>
        <torusGeometry args={[0.55, 0.012, 8, 32]} />
        <meshBasicMaterial ref={mat} color="#5eead4" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.09, 16]} />
        <meshBasicMaterial color="#f5a623" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Checkpoints({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const trailPoints = useMemo(() => curve.getPoints(160), [curve]);

  return (
    <group>
      <Line points={trailPoints} color="#5eead4" transparent opacity={0.18} lineWidth={1} />
      {waypoints.map((wp, i) => (
        <Beacon key={wp.id} position={wp.position} index={i} />
      ))}
    </group>
  );
}
