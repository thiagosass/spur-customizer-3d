export type SpurMaterial = {
  color: string;
  metalness: number;
  roughness: number;
};

export type SpurConfig = {
  bow: "model1" | "model2";
  shank: "model1" | "model2";
  rowel: string;
  material: SpurMaterial;
};