import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import RoomGroups from "./components/RoomGroups";
import Tooltip from "./components/Tooltip";

type HoverState = {
  visible: boolean;
  content: string;
  top: number;
  left: number;
};

function App() {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  const [hover, setHover] = useState<HoverState>({
    visible: false,
    content: "",
    top: 0,
    left: 0,
  });

  const showTooltip = (label: string, x: number, y: number) => {
    setHover({
      visible: true,
      content: label,
      top: y - 6,
      left: x,
    });
  };

  const moveTooltip = (x: number, y: number) => {
    setHover((prev) => ({
      ...prev,
      top: y - 6,
      left: x,
    }));
  };

  const hideTooltip = () => {
    setHover((prev) => ({ ...prev, visible: false }));
  };

  const getOpacity = (
    label: string,
    selfCategory: string,
    baseOpacity: number = 1,
  ) => {
    const normalizedFilter = filter.trim().toLowerCase();
    const matchesFilter =
      normalizedFilter.length === 0 ||
      label.toLowerCase().includes(normalizedFilter);
    const matchesCategory = !category || category === selfCategory;

    return matchesFilter && matchesCategory ? baseOpacity : 0.4;
  };

  return (
    <main className="relative h-screen w-screen overflow-x-hidden bg-[#E8FBED]">
      <div className="absolute inset-0 bg-[#E8FBED]/30" />
      <div className="relative flex h-full items-center justify-center p-4 md:p-6">
        <section className="relative flex h-[min(94vh,980px)] w-full max-w-380 flex-col overflow-hidden rounded-lg border border-green-200/60 bg-green-100/10 shadow-lg backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-green-100/50 bg-[#68B59D] px-6 py-4 text-xs uppercase tracking-[0.35em] text-white md:px-8">
            <span>Petrik Lajos - információs pult teszt2</span>
            <span className="hidden text-white md:inline">3D szinttérkép</span>
          </div>

          <div className="flex h-full w-full flex-col xl:flex-row">
            <div className="min-h-[56vh] w-full min-w-0 flex-1 xl:min-h-0">
              <Canvas
                className="h-full w-full"
                camera={{ position: [0, 0, 34], fov: 20, near: 0.1, far: 120 }}
              >
                <color attach="background" args={["#E8FBED"]} />
                <ambientLight intensity={1.45} />
                <directionalLight position={[8, 12, 14]} intensity={1.25} />
                <directionalLight position={[-10, -4, 12]} intensity={0.5} />
                <pointLight
                  position={[0, 0, 28]}
                  intensity={1.8}
                  color="#93c5fd"
                />

                <RoomGroups
                  getOpacity={getOpacity}
                  onHoverStart={showTooltip}
                  onHoverMove={moveTooltip}
                  onHoverEnd={hideTooltip}
                />
                <OrbitControls
                  enableDamping
                  dampingFactor={0.08}
                  enablePan
                  enableZoom
                  enableRotate
                  minDistance={14}
                  maxDistance={60}
                />
              </Canvas>
            </div>
            <div className="flex h-full w-full flex-col items-stretch gap-6 p-4 text-gray-800 xl:w-[24rem] xl:flex-none md:items-center xl:p-5 2xl:w-md">
              <div className="w-full rounded-lg border border-green-300/50 bg-green-50 px-5 py-4 text-center text-sm text-gray-600 backdrop-blur-sm md:w-auto md:text-left hidden md:block xl:mt-10">
                Kattints rá egy szintre ha ki szeretnéd jelölni majd megint ha
                alap állapotba szeretnéd állítani!
              </div>
              <div className="w-full rounded-lg border border-green-200/60 bg-green-50 p-5 shadow-sm backdrop-blur-sm md:max-w-md">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
                    Keresés
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilter("")}
                    disabled={!filter}
                    className="rounded-full border border-green-300/80 px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Törlés
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="peer h-11 w-full rounded-lg border border-green-300/60 bg-transparent pl-5 pr-4 text-gray-900 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                  />
                  <label
                    className={`absolute ${filter ? "-top-2.5 text-green-600 text-xs font-medium" : "top-2.5"} left-5 z-20 bg-green-50 px-1 text-gray-600 transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-medium peer-focus:text-green-600`}
                  >
                    Keress egy teremre
                  </label>
                </div>
              </div>
              <div className="w-full rounded-lg border border-green-200/60 bg-green-50 p-5 shadow-sm backdrop-blur-sm md:max-w-md">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
                    Kategória
                  </p>
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    disabled={!category}
                    className="rounded-full border border-green-300/80 px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Törlés
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="Informatika"
                      checked={category === "Informatika"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center rounded-full border border-green-300/80 bg-green-50/50 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-green-400 hover:bg-green-100/60 peer-checked:border-green-500 peer-checked:bg-green-100/80 peer-checked:text-green-700 peer-checked:shadow-sm">
                      Informatika
                    </span>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="Biológia"
                      checked={category === "Biológia"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center rounded-full border border-green-300/80 bg-green-50/50 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-green-400 hover:bg-green-100/60 peer-checked:border-green-500 peer-checked:bg-green-100/80 peer-checked:text-green-700 peer-checked:shadow-sm">
                      Biológia
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none z-10 mt-0 flex flex-col items-stretch gap-3 px-6 py-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between md:px-8 md:py-2">
            <div className="w-full rounded-lg border border-green-300/50 bg-green-50 px-4 py-3 text-center text-gray-600 backdrop-blur-sm md:w-auto md:text-left hidden md:block">
              Szűrők használatával jobban látható a terem amit keresel!
            </div>
            <div className="w-full rounded-lg border border-green-700/60 bg-green-50 px-4 py-3 text-center text-green-700 backdrop-blur-sm md:w-auto md:text-left font-medium">
              Készítette: Kovács Zsombor
            </div>
          </div>
        </section>
      </div>
      <Tooltip
        visible={hover.visible}
        content={hover.content}
        top={hover.top}
        left={hover.left}
      />
    </main>
  );
}

export default App;
