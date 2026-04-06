type PartConfig = {
  name: string;
  path: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

type SpurPartsCatalog = {
  bow: Record<"model1" | "model2", PartConfig>;
  shank: Record<"model1" | "model2", PartConfig>;
};

export const spurParts: SpurPartsCatalog  = {
  bow: {
    model1: {
      name: "Estrutura padrão",
      path: "/assets/espora/bow/espora_-_estrutura.glb",
      scale: 1,
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0],
    },
    model2: {
      name: "Estrutura VDR",
      path: "/assets/espora/bow/model1.glb",
      scale: 1,
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0],
    },
  },

  shank: {
    model1: {
      name: "Shank padrão",
      path: "/assets/espora/shank/alça.glb",
      scale: 1,
      position: [-0.042, 0.01, 0.025] as [number, number, number],
      rotation: [Math.PI / -1.06, 3.18, -1.5] as [number, number, number],
    },
    model2: {
      name: "Alça alternativa",
      path: "/assets/espora/shank/guia_e_fixação_da_alça.glb",
      scale: 1,
      position: [0, 0, 0] as [number, number, number],
      rotation: [Math.PI / 0, 0, 0] as [number, number, number],
    },
  },
};