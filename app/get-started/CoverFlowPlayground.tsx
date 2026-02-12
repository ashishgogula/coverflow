"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CoverFlow, type CoverFlowItem } from "@/registry/coverflow/coverflow";

const playgroundItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Sanemi.jpeg", title: "Sanemi Sanemi" },
  { id: 2, image: "/anime/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 3, image: "/anime/Mitsuri.jpeg", title: "Mitsuri Kanroji" },
  { id: 4, image: "/anime/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/anime/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 6, image: "/anime/kanao.jpeg", title: "Kanao Tsuyuri" },
  { id: 7, image: "/anime/Tanjiro.jpeg", title: "Tanjiro Kamado" },
  { id: 8, image: "/anime/Nezuko.jpeg", title: "Nezuko Kamado" },
  { id: 9, image: "/anime/Zenitsu.jpeg", title: "Zenitsu Agatsuma" },
  { id: 10, image: "/anime/InosukeH.jpeg", title: "Inosuke Hashibira" },
  { id: 11, image: "/anime/tokitou.jpeg", title: "Muichiro Tokito" },
];

const DEFAULT_PLAYGROUND_PROPS = {
  stackSpacing: 100,
  centerGap: 250,
  rotation: 50,
  initialIndex: 3,
  enableReflection: true,
  enableClickToSnap: true,
};

const APPLE_PRESET_PROPS = {
  stackSpacing: 60,
  centerGap: 180,
  rotation: 67,
  initialIndex: 3,
  enableReflection: true,
  enableClickToSnap: true,
};

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

function SliderControl({ label, min, max, step, value, onChange }: SliderProps) {
  const progress = useMotionValue(((value - min) / (max - min)) * 100);
  const smoothProgress = useSpring(progress, {
    stiffness: 280,
    damping: 30,
    mass: 0.25,
  });
  const progressWidth = useTransform(smoothProgress, (v) => `${Math.min(100, Math.max(0, v))}%`);

  useEffect(() => {
    const next = ((value - min) / (max - min)) * 100;
    progress.set(Number.isFinite(next) ? next : 0);
  }, [max, min, progress, value]);

  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-foreground">{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-secondary/70" />
        <motion.div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-foreground/70"
          style={{ width: progressWidth }}
        />
        <motion.div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm"
          style={{ left: progressWidth }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </label>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleControl({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-border accent-foreground"
      />
    </label>
  );
}

type PlaygroundSettings = {
  stackSpacing: number;
  centerGap: number;
  rotation: number;
  initialIndex: number;
  enableReflection: boolean;
  enableClickToSnap: boolean;
};

export default function CoverFlowPlayground() {
  const [stackSpacing, setStackSpacing] = useState(DEFAULT_PLAYGROUND_PROPS.stackSpacing);
  const [centerGap, setCenterGap] = useState(DEFAULT_PLAYGROUND_PROPS.centerGap);
  const [rotation, setRotation] = useState(DEFAULT_PLAYGROUND_PROPS.rotation);
  const [initialIndex, setInitialIndex] = useState(DEFAULT_PLAYGROUND_PROPS.initialIndex);
  const [enableReflection, setEnableReflection] = useState(DEFAULT_PLAYGROUND_PROPS.enableReflection);
  const [enableClickToSnap, setEnableClickToSnap] = useState(DEFAULT_PLAYGROUND_PROPS.enableClickToSnap);

  const matchesSettings = (settings: PlaygroundSettings) =>
    stackSpacing === settings.stackSpacing &&
    centerGap === settings.centerGap &&
    rotation === settings.rotation &&
    initialIndex === settings.initialIndex &&
    enableReflection === settings.enableReflection &&
    enableClickToSnap === settings.enableClickToSnap;

  const applySettings = (settings: PlaygroundSettings) => {
    setStackSpacing(settings.stackSpacing);
    setCenterGap(settings.centerGap);
    setRotation(settings.rotation);
    setInitialIndex(settings.initialIndex);
    setEnableReflection(settings.enableReflection);
    setEnableClickToSnap(settings.enableClickToSnap);
  };

  const activePreset = matchesSettings(APPLE_PRESET_PROPS)
    ? "apple"
    : matchesSettings(DEFAULT_PLAYGROUND_PROPS)
      ? "classic"
      : null;

  const isDefaultState = activePreset === "classic";

  const resetToDefaults = () => {
    applySettings(DEFAULT_PLAYGROUND_PROPS);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
      <div className="h-[450px] w-full border-b border-border/40 bg-background p-6">
        <div className="h-full w-full rounded-xl border border-border/40 bg-secondary/20">
          <CoverFlow
            items={playgroundItems}
            stackSpacing={stackSpacing}
            centerGap={centerGap}
            rotation={rotation}
            initialIndex={initialIndex}
            enableReflection={enableReflection}
            enableClickToSnap={enableClickToSnap}
            itemHeight={250}
            itemWidth={250}
          />
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <ToggleControl
          label="enableReflection"
          checked={enableReflection}
          onChange={setEnableReflection}
        />

        <ToggleControl
          label="enableClickToSnap"
          checked={enableClickToSnap}
          onChange={setEnableClickToSnap}
        />

        <SliderControl
          label="stackSpacing"
          min={60}
          max={220}
          step={5}
          value={stackSpacing}
          onChange={setStackSpacing}
        />

        <SliderControl
          label="centerGap"
          min={180}
          max={420}
          step={10}
          value={centerGap}
          onChange={setCenterGap}
        />

        <SliderControl
          label="rotation"
          min={20}
          max={80}
          step={1}
          value={rotation}
          onChange={setRotation}
        />

        <SliderControl
          label="initialIndex"
          min={0}
          max={playgroundItems.length - 1}
          step={1}
          value={initialIndex}
          onChange={setInitialIndex}
        />

        <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-2 pt-1">
          <div className="inline-flex items-center rounded-md border border-border/60 bg-secondary/20 p-1">
            <button
              type="button"
              onClick={() => applySettings(DEFAULT_PLAYGROUND_PROPS)}
              aria-pressed={activePreset === "classic"}
              className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                activePreset === "classic"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Classic
            </button>
            <button
              type="button"
              onClick={() => applySettings(APPLE_PRESET_PROPS)}
              aria-pressed={activePreset === "apple"}
              className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                activePreset === "apple"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Apple
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetToDefaults}
            disabled={isDefaultState}
            className="rounded-md border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset to defaults
          </motion.button>
        </div>
      </div>
    </div>
  );
}
