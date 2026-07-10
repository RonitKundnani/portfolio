import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../state/scroll';
import { waypoints } from '../data/flightPath';

function Propeller({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 14;
  });
  return (
    <group position={position}>
      <mesh>
        <torusGeometry args={[0.32, 0.012, 8, 24]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ref}>
        <boxGeometry args={[0.64, 0.012, 0.04]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

const ARM_ENDS: [number, number, number][] = [
  [1.1, 0, 1.1],
  [-1.1, 0, 1.1],
  [1.1, 0, -1.1],
  [-1.1, 0, -1.1],
];

const UP = new THREE.Vector3(0, 1, 0);
const tmpTarget = new THREE.Vector3();
const tmpMatrix = new THREE.Matrix4();
const tmpQuat = new THREE.Quaternion();

export function useFlightCurve() {
  return useMemo(
    () => new THREE.CatmullRomCurve3(waypoints.map((w) => new THREE.Vector3(...w.position)), false, 'catmullrom', 0.4),
    []
  );
}

export default function DroneRig({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const group = useRef<THREE.Group>(null);
  const bodyMat = useRef<THREE.MeshBasicMaterial>(null);
  const armMats = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const t = THREE.MathUtils.clamp(scrollState.curveT, 0, 0.998);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();

    // gentle hover bob layered on top of the flight path
    const bob = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
    group.current.position.set(point.x, point.y + bob, point.z);

    // orient along the direction of travel and bank into turns
    tmpTarget.copy(point).add(tangent);
    tmpMatrix.lookAt(point, tmpTarget, UP);
    tmpQuat.setFromRotationMatrix(tmpMatrix);
    group.current.quaternion.slerp(tmpQuat, Math.min(delta * 3, 1));

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      THREE.MathUtils.clamp(-tangent.x * 1.6, -0.5, 0.5),
      Math.min(delta * 2, 1)
    );

    const opacity = THREE.MathUtils.clamp(1 - t * 0.35, 0.55, 1);
    if (bodyMat.current) bodyMat.current.opacity = opacity;
    armMats.current.forEach((m) => m && (m.opacity = opacity * 0.85));
  });

  return (
    <group ref={group}>
      {/* central body */}
      <mesh>
        <boxGeometry args={[0.5, 0.18, 0.5]} />
        <meshBasicMaterial ref={bodyMat} color="#5eead4" wireframe transparent opacity={1} />
      </mesh>

      {/* arms */}
      {ARM_ENDS.map((end, i) => {
        const length = Math.hypot(end[0], end[2]);
        const angle = Math.atan2(end[2], end[0]);
        return (
          <mesh key={i} position={[end[0] / 2, 0, end[2] / 2]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[length, 0.05, 0.05]} />
            <meshBasicMaterial
              ref={(m) => m && (armMats.current[i] = m)}
              color="#5eead4"
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {ARM_ENDS.map((end, i) => (
        <Propeller key={i} position={end} />
      ))}
    </group>
  );
}
