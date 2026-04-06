export type BowVariant = "model1" | "model2";

export type Transform3D = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

export const rowelMountsByBow: Record<BowVariant, Transform3D> = {
  model1: {
    position: [0, 0.0082, -0.0936],
    rotation: [Math.PI, 1.56, 0],
    scale: 1,
  },
  model2: {
    position: [0, 0.01, -0.0856],
    rotation: [Math.PI, 1.56, 0],
    scale: 1,
  },
};