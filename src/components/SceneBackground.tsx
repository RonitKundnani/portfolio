import { Canvas } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import PointField from './PointField';
import DroneRig, { useFlightCurve } from './DroneRig';
import Checkpoints from './Checkpoints';
import CameraRig from './CameraRig';

function Scene() {
  const curve = useFlightCurve();
  return (
    <>
      <CameraRig />
      <Grid
        position={[0, -1.6, -4]}
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor="#0e2f2a"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#5eead4"
        fadeDistance={20}
        fadeStrength={1.5}
        infiniteGrid
      />
      <PointField />
      <Checkpoints curve={curve} />
      <DroneRig curve={curve} />
    </>
  );
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1.4, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={['#05080a']} />
        <fog attach="fog" args={['#05080a', 8, 22]} />
        <ambientLight intensity={0.4} />
        <Scene />
      </Canvas>
    </div>
  );
}
