import type { SpurMaterial } from "../types/spur";

export type MaterialPresetKey =
  | "steel"
  | "polishedSteel"
  | "gold"
  | "matteBlack"
  | "bronze";

export type MaterialPreset = {
  label: string;
  material: SpurMaterial;
};

export const materialPresets: Record<MaterialPresetKey, MaterialPreset> = {
  steel: {
    label: "Steel",
    material: {
      color: "#bfc3c7",
      metalness: 0.85,
      roughness: 0.40,
    },
  },
  polishedSteel: {
    label: "Polished Steel",
    material: {
      color: "#d7dbdf",
      metalness: 0.95,
      roughness: 0.15,
    },
  },
  gold: {
    label: "Gold",
    material: {
      color: "#d4af37",
      metalness: 0.9,
      roughness: 0.38,
    },
  },
  matteBlack: {
    label: "Matte Black",
    material: {
      color: "#2b2b2b",
      metalness: 0.49,
      roughness: 0.68,
    },
  },
  bronze: {
    label: "Bronze",
    material: {
      color: "#a56a43",
      metalness: 0.82,
      roughness: 0.4,
    },
  },
};