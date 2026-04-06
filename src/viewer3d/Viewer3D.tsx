import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import SpurModel from "./SpurModel";
import type { SpurConfig } from "../types/spur";

type Viewer3DProps = {
  config: SpurConfig;
  backgroundColor?: string;
};

function CameraFollowLight() {
  const { camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useFrame(() => {
    if (!lightRef.current) return;

    // Luz acompanha a câmera
    lightRef.current.position.set(
      camera.position.x + 0,
      camera.position.y + 0,
      camera.position.z + 0
    );

    // Sempre apontando para o centro do objeto
    targetRef.current.position.set(0, 0, 0);
    lightRef.current.target = targetRef.current;
  });

  return (
    <>
      <primitive object={targetRef.current} />
      <directionalLight
        ref={lightRef}
        intensity={2}
      />
    </>
  );
}

export default function Viewer3D({
  config,
  backgroundColor = "#ffffff",
}: Viewer3DProps) {
  return (
    <Canvas camera={{ position: [-2, 1, -1], fov: 50 }}>
      <color attach="background" args={[backgroundColor]} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 0, 2]} intensity={1} />
      <directionalLight position={[-2, 0, 2]} intensity={1} />

      <CameraFollowLight />

      <SpurModel config={config} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        target={[0, 0, 0]}
        minDistance={0.23}
        maxDistance={0.4}
      />
    </Canvas>
  );
}