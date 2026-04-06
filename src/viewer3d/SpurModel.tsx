import ModelLoader from "./ModelLoader";
import type { SpurConfig, SpurMaterial } from "../types/spur";
import { spurParts } from "../configurator/spourParts";
import { rowelParts } from "../configurator/rowelParts";
import { rowelMountsByBow } from "../configurator/rowelMounts";

type SpurModelProps = {
  config: SpurConfig;
};

export default function SpurModel({ config }: SpurModelProps) {
  return (
    <group>
      <Bow variant={config.bow} material={config.material} />
      <Shank variant={config.shank} material={config.material} />
      <Rowel
        variant={config.rowel}
        bow={config.bow}
        material={config.material}
      />
    </group>
  );
}

function Bow({
  variant,
  material,
}: {
  variant: "model1" | "model2";
  material: SpurMaterial;
}) {
  const part = spurParts.bow[variant];

  return (
    <ModelLoader
      path={part.path}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      material={material}
    />
  );
}

function Shank({
  variant,
  material,
}: {
  variant: "model1" | "model2";
  material: SpurMaterial;
}) {
  const part = spurParts.shank[variant];

  return (
    <ModelLoader
      path={part.path}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      material={material}
    />
  );
}

function Rowel({
  variant,
  bow,
  material,
}: {
  variant: string;
  bow: "model1" | "model2";
  material: SpurMaterial;
}) {
  const part = rowelParts.find((item) => item.id === variant);
  if (!part) return null;

  const mount = rowelMountsByBow[bow];

  return (
    <ModelLoader
      path={part.path}
      position={mount.position}
      rotation={mount.rotation}
      scale={mount.scale}
      material={material}
    />
  );
}