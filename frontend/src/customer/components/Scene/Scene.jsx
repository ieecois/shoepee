import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import ModelShoe from './models/ModelShoe';
import ModelNike from './models/ModelNike';

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0.5, 0.5] }}>
      <Suspense fallback={<p>Loading...</p>} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <directionalLight intensity={0.1} position={[100, 0, 50]} />
      <ModelNike />
      <Environment files="./img/small.hdr" background />
      <Suspense />
    </Canvas>
  );
}

export default Scene;
