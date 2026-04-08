import { useEffect, useState } from "react";
import Viewer3D from "./viewer3d/Viewer3D";
import type { SpurConfig } from "./types/spur";
import { rowelParts } from "./configurator/rowelParts";
import {
  materialPresets,
  type MaterialPresetKey,
} from "./configurator/materialPresets";

function mapRowelToHostinger(rowelId: string): string {
  const map: Record<string, string> = {
    roseta_a: "Estrela",
    roseta_07_pontas: "7 pontas",
    sfw_sp_015: "Trevo",
    sfw_sp_014: "Trevo",
    sfw_sp_010: "Trevo",
    sfw_sp_009: "Trevo",
    sfw_sp_008: "Trevo",
    sfw_sp_007: "Estrela",
    sfw_sp_006: "Estrela",
    sfw_sp_005: "Estrela",
    sfw_sp_004: "Estrela",
  };

  return map[rowelId] ?? "";
}

function mapMaterialToHostinger(
  selectedPreset: string,
  material: { metalness: number; roughness: number; color: string }
): string {
  if (selectedPreset === "polishedSteel") return "Polished";
  if (selectedPreset === "matteBlack") return "Matte";

  return material.roughness <= 0.3 ? "Polished" : "Matte";
}

function postCustomizerMessage(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const message = {
    source: "spur-customizer-3d",
    type: "SPUR_CONFIG_CHANGE",
    payload,
  };

  window.parent.postMessage(message, "*");
}

function App() {
  const [selectedPreset, setSelectedPreset] =
    useState<MaterialPresetKey>("steel");

  const [backgroundTone, setBackgroundTone] = useState(95);

  const [config, setConfig] = useState<SpurConfig>({
    bow: "model1",
    shank: "model1",
    rowel: rowelParts[0]?.id ?? "",
    material: { ...materialPresets.steel.material },
  });

  function applyMaterialPreset(presetKey: MaterialPresetKey) {
    setSelectedPreset(presetKey);
    setConfig((prev) => ({
      ...prev,
      material: { ...materialPresets[presetKey].material },
    }));
  }

  function updateMaterialField<K extends keyof SpurConfig["material"]>(
    key: K,
    value: SpurConfig["material"][K]
  ) {
    setSelectedPreset("" as MaterialPresetKey);
    setConfig((prev) => ({
      ...prev,
      material: {
        ...prev.material,
        [key]: value,
      },
    }));
  }

  function toGrayHex(value: number) {
    const safeValue = Math.max(0, Math.min(255, value));
    const hex = safeValue.toString(16).padStart(2, "0");
    return `#${hex}${hex}${hex}`;
  }

  const viewerBackgroundColor = toGrayHex(backgroundTone);

  useEffect(() => {
    const finish = mapMaterialToHostinger(selectedPreset, config.material);
    const rowel = mapRowelToHostinger(config.rowel);

    postCustomizerMessage({
      finish,
      rowel,
      bow: config.bow,
      shank: config.shank,
      material: config.material,
      rowelId: config.rowel,
    });
  }, [config, selectedPreset]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        background: "#111",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "340px",
          minWidth: "280px",
          padding: "20px",
          borderRight: "1px solid #333",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          flexShrink: 0,
        }}
      >
        <h2>Spur Customizer 3D</h2>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "15px" }}>Pré-definições de Material</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {(Object.keys(materialPresets) as MaterialPresetKey[]).map((key) => {
              const preset = materialPresets[key];
              const isActive = selectedPreset === key;

              return (
                <button
                  key={key}
                  onClick={() => applyMaterialPreset(key)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: isActive ? "1px solid #fff" : "1px solid #444",
                    background: isActive ? "#2f2f2f" : "#1d1d1d",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              Cor
            </label>
            <input
              type="color"
              value={config.material.color}
              onChange={(e) => updateMaterialField("color", e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                border: "1px solid #444",
                borderRadius: "8px",
                background: "#222",
                cursor: "pointer",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              Metálico: {config.material.metalness.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.material.metalness}
              onChange={(e) =>
                updateMaterialField("metalness", Number(e.target.value))
              }
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              Rugosidade: {config.material.roughness.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.material.roughness}
              onChange={(e) =>
                updateMaterialField("roughness", Number(e.target.value))
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "15px" }}>Fundo do Viewer</h3>

          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
            Intensidade: {backgroundTone}
          </label>

          <input
            type="range"
            min="0"
            max="255"
            step="1"
            value={backgroundTone}
            onChange={(e) => setBackgroundTone(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <div
            style={{
              marginTop: "10px",
              width: "100%",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: viewerBackgroundColor,
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ fontSize: "14px" }}>Tipo de Arco</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, bow: "model1" }))}
              style={{
                width: "48%",
                padding: "10px 12px",
              }}
            >
              Arco 1
            </button>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, bow: "model2" }))}
              style={{
                width: "48%",
                padding: "10px 12px",
              }}
            >
              Arco 2
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "14px" }}>Botão da Alça</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, shank: "model1" }))}
              style={{
                width: "48%",
                padding: "10px 12px",
              }}
            >
              Botão Articulado 1
            </button>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, shank: "model2" }))}
              style={{
                width: "48%",
                padding: "10px 12px",
              }}
            >
              Botão Articulado 2
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "0px" }}>
          <h3 style={{ fontSize: "14px" }}>Roseta</h3>

          <select
            value={config.rowel}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                rowel: e.target.value,
              }))
            }
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "#222",
              color: "#fff",
            }}
          >
            {rowelParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <Viewer3D
          config={config}
          backgroundColor={viewerBackgroundColor}
        />
      </div>
    </div>
  );
}

export default App;