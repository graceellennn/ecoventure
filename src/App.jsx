import { useEffect, useState } from "react";
import "./App.css";

import sky from "./assets/item/sky.svg";
import sun from "./assets/item/sun.svg";
import cloud1 from "./assets/item/cloud1.svg";
import cloud2 from "./assets/item/cloud2.svg";
import cloud3 from "./assets/item/cloud3.svg";
import cloud4 from "./assets/item/cloud4.svg";
import gunung1 from "./assets/item/gunung1.svg";
import gunung2 from "./assets/item/gunung2.svg";
import gunung3 from "./assets/item/gunung3.svg";
import gunung4 from "./assets/item/gunung4.svg";
import ground1 from "./assets/item/ground1.svg";
import ground2 from "./assets/item/ground2.svg";
import ground3 from "./assets/item/ground3.svg";
import ground4 from "./assets/item/ground4.svg";

const FRAME_WIDTH = 1728;
const FRAME_HEIGHT = 1117;

const mix = (start, end, progress) => start + (end - start) * progress;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const STAGES = {
  intro: 0,
  level1: 0.35,
  level2: 0.68,
  level3: 1,
};

const layers = [
  {
    id: "sky",
    src: sky,
    x: 0,
    y: -180,
    width: 1728,
    z: 1,
    origin: "center center",
    startScale: 1,
    endScale: 1.08,
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
  },
  {
    id: "sun",
    src: sun,
    x: 105,
    y: -100,
    width: 400,
    z: 2,
    origin: "center center",
    startScale: 1,
    endScale: 1.12,
    startX: 0,
    endX: 8,
    startY: 0,
    endY: -10,
  },
  {
    id: "gunung4",
    src: gunung4,
    x: 0,
    y: 230,
    width: 1800,
    z: 3,
    origin: "center center",
    startScale: 1,
    endScale: 1.14,
    startX: 0,
    endX: 22,
    startY: 0,
    endY: -10,
  },
  {
    id: "gunung3",
    src: gunung3,
    x: 0,
    y: 320,
    width: 1800,
    z: 4,
    opacity: 0.88,
    startScale: 1,
    endScale: 1.18,
    startX: 0,
    endX: 18,
    startY: 0,
    endY: -8,
  },
  {
    id: "gunung2",
    src: gunung2,
    x: 0,
    y: 190,
    width: 1800,
    z: 5,
    startScale: 1,
    endScale: 1.22,
    startX: 0,
    endX: 14,
    startY: 0,
    endY: -6,
  },
  {
    id: "gunung1",
    src: gunung1,
    x: 0,
    y: 370,
    width: 1800,
    z: 6,
    startScale: 1,
    endScale: 1.28,
    startX: 0,
    endX: 10,
    startY: 0,
    endY: 0,
  },
  {
  id: "cloud4",
  src: cloud4,
  x: -80,
  y: 250,
  width: 250,
  z: 7,
  origin: "center center",
  startScale: 1,
  endScale: 1.08,
  startX: 0,
  endX: -60,
  startY: 0,
  endY: -30,
},
{
  id: "cloud3",
  src: cloud3,
  x: 40,
  y: 280,
  width: 400,
  z: 8,
  origin: "center center",
  startScale: 1,
  endScale: 1.08,
  startX: 0,
  endX: -35,
  startY: 0,
  endY: -35,
},
{
  id: "cloud2",
  src: cloud2,
  x: 750,
  y: 270,
  width: 250,
  z: 9,
  origin: "center center",
  startScale: 1,
  endScale: 1.08,
  startX: 0,
  endX: 35,
  startY: 0,
  endY: -30,
},
{
  id: "cloud1",
  src: cloud1,
  x: 1000,
  y: 80,
  width: 340,
  z: 10,
  origin: "center center",
  startScale: 1,
  endScale: 1.1,
  startX: 0,
  endX: 60,
  startY: 0,
  endY: -35,
},
  {
    id: "ground1",
    src: ground1,
    x: -65,
    y: 450,
    width: 1900,
    z: 11,
    startScale: 1,
    endScale: 1.36,
    startX: 0,
    endX: -12,
    startY: 0,
    endY: 8,
  },
  {
    id: "ground2",
    src: ground2,
    x: 0,
    y: 550,
    width: 1900,
    z: 12,
    startScale: 1,
    endScale: 1.44,
    startX: 0,
    endX: -18,
    startY: 0,
    endY: 18,
  },
  {
    id: "ground3",
    src: ground3,
    x: -65,
    y: 400,
    width: 1800,
    z: 13,
    startScale: 1,
    endScale: 1.52,
    startX: 0,
    endX: -24,
    startY: 0,
    endY: 28,
    hideAfter: 0.5,
  },
  {
    id: "ground4",
    src: ground4,
    x: 1320,
    y: 430,
    width: 560,
    z: 14,
    startScale: 1,
    endScale: 1.62,
    startX: 0,
    endX: 24,
    startY: 0,
    endY: 30,
    hideAfter: 0.2,
  },
];

function App() {
  const [stage, setStage] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  useEffect(() => {
    setTargetProgress(STAGES[stage]);
  }, [stage]);

  useEffect(() => {
    let frameId;

    const animate = () => {
      setProgress((prev) => {
        const diff = targetProgress - prev;

        if (Math.abs(diff) < 0.001) {
          return targetProgress;
        }

        return prev + diff * 0.08;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [targetProgress]);

  return (
    <main className="page-shell">
      <section className="hero-screen">
        <div className="scene-shell">
          <div className="scene-frame">
            {layers.map((layer) => {
              const currentScale = mix(layer.startScale, layer.endScale, progress);
              const currentX = mix(layer.startX, layer.endX, progress);
              const currentY = mix(layer.startY, layer.endY, progress);

              let dynamicOpacity = layer.opacity ?? 1;
              let extraY = 0;

              if (layer.hideAfter !== undefined) {
                const fadeStart = layer.hideAfter - 0.12;
                const fadeProgress =
                  (progress - fadeStart) / (layer.hideAfter - fadeStart);
                const clampedFade = clamp(fadeProgress, 0, 1);

                dynamicOpacity = (layer.opacity ?? 1) * (1 - clampedFade);
                extraY = clampedFade * 120;
              }

              return (
                <img
                  key={layer.id}
                  className={`scene-layer ${layer.id}`}
                  src={layer.src}
                  alt={layer.id}
                  style={{
                    left: `${(layer.x / FRAME_WIDTH) * 100}%`,
                    top: `${(layer.y / FRAME_HEIGHT) * 100}%`,
                    width: `${(layer.width / FRAME_WIDTH) * 100}%`,
                    zIndex: layer.z,
                    opacity: dynamicOpacity,
                    transformOrigin: layer.origin ?? "center bottom",
                    transform: `translate3d(${currentX}px, ${currentY + extraY}px, 0) scale(${currentScale})`,
                  }}
                />
              );
            })}

            {stage === "intro" && (
              <div className="hero-copy center animate-pop">
                <h1>Eco Adventure</h1>
                <button onClick={() => setStage("level1")}>Start</button>
              </div>
            )}

            {stage === "level1" && (
              <div className="hero-copy bottom animate-fade-up">
                <h2>Level 1</h2>
                <div className="button-group">
                  <button>Play Game</button>
                  <button className="ghost" onClick={() => setStage("level2")}>
                    Dummy Next
                  </button>
                </div>
              </div>
            )}

            {stage === "level2" && (
              <div className="hero-copy bottom animate-fade-up">
                <h2>Level 2</h2>
                <div className="button-group">
                  <button>Play Game</button>
                  <button className="ghost" onClick={() => setStage("level3")}>
                    Dummy Next
                  </button>
                </div>
              </div>
            )}

            {stage === "level3" && (
              <div className="hero-copy bottom animate-fade-up">
                <h2>Level 3</h2>
                <div className="button-group">
                  <button>Play Game</button>
                  <button className="ghost" onClick={() => setStage("intro")}>
                    Back to Intro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;