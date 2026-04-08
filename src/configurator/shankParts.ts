type ShankPart = {
  name: string;
  path: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

export const shankParts: Record<"model1" | "model2", ShankPart> = {
  model1: {
    name: "Shank padrão",
    path: "/assets/espora/shank/alça.glb",
    scale: 1,
    position: [-0.042, 0.01, 0.025],
    rotation: [Math.PI / -1.06, 3.18, -1.5],
  },
  model2: {
    name: "Alça alternativa",
    path: "/assets/espora/shank/guia_e_fixação_da_alça.glb",
    scale: 1,
    position: [-0.042, 0.01, 0.025],
    rotation: [Math.PI / -1.06, 3.18, -1.5],
  },
};