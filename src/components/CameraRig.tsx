import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../state/scroll';

const basePosition = new THREE.Vector3(0, 1.4, 6);

export default function CameraRig() {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    // subtle mouse parallax, layered on a gentle downward drift as the
    // drone descends through the flight path
    const driftY = -scrollState.fraction * 0.6;
    const targetX = basePosition.x + pointer.current.x * 0.45;
    const targetY = basePosition.y + driftY - pointer.current.y * 0.25;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, Math.min(delta * 2, 1));
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, Math.min(delta * 2, 1));
    camera.lookAt(pointer.current.x * 0.6, driftY - pointer.current.y * 0.15, -4);
  });

  return null;
}
