import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
import type { SpurMaterial } from "../types/spur";

type ModelLoaderProps = {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  offset?: [number, number, number];
  material?: SpurMaterial;
};

export default function ModelLoader({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  offset = [0, 0, 0],
  material = {
    color: "#cccccc",
    metalness: 0.8,
    roughness: 0.3,
  },
}: ModelLoaderProps) {
  const { scene } = useGLTF(path);

  const preparedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: material.color,
          metalness: material.metalness,
          roughness: material.roughness,
        });
      }
    });

    cloned.position.set(offset[0], offset[1], offset[2]);

    return cloned;
  }, [scene, offset, material]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={preparedScene} />
    </group>
  );
}