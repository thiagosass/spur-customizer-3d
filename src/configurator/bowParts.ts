type BowPart = {
  name: string;
  path: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

export const bowParts: Record<"model1" | "model2", BowPart> = {
  model1: {
    name: "Estrutura padrão",
    path: "/assets/espora/bow/espora_-_estrutura.glb",
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  model2: {
    name: "Estrutura VDR",
    path: "/assets/espora/bow/model1.glb",
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
};