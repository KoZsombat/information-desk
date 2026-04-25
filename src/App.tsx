import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useState, useRef } from "react";
import RoomGroups from "./components/RoomGroups";
import {
  categoryOptions,
  floorGroups,
  isBaseRoomLabel,
  isCorridorLabel,
  type RoomDefinition,
} from "./components/roomData";

type SelectedRoomData = RoomDefinition & { floor: number };

function App() {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [zoomFilter, setZoomFilter] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomData | null>(
    null,
  );
  const orbitRef = useRef<OrbitControlsImpl | null>(null);

  const resetCamera = () => {
    orbitRef.current?.reset();
    setZoomFilter(null);
    setSelectedRoom(null);
  };

  const handleRoomSelect = (room: SelectedRoomData) => {
    setSelectedRoom(room);
    setFilter(room.label);
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

  const selectedFloorRooms =
    floorGroups
      .find((floor) => floor.floor === zoomFilter)
      ?.rooms.filter(
        (room) => !isBaseRoomLabel(room.label) && !isCorridorLabel(room.label),
      ) ?? [];

  const emojiByCategory = Object.fromEntries(
    categoryOptions.map((option) => [option.value, option.emoji]),
  );

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#E8FBED]">
      <div className="absolute inset-0 bg-[#E8FBED]/30" />
      <div className="relative mx-auto flex h-full w-full items-center justify-center px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-6 2xl:px-12 2xl:py-8">
        <section className="relative flex h-full w-full max-w-550 flex-col overflow-hidden rounded-lg border border-green-200/60 bg-green-100/10 shadow-lg backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-green-100/50 bg-[#68B59D] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white sm:px-6 sm:py-4 sm:text-xs sm:tracking-[0.35em] md:px-8 2xl:px-10">
            <span>Petrik Lajos - információs pult</span>
            <span className="hidden text-white md:inline">3D szinttérkép</span>
          </div>

          <div className="flex h-full min-h-0 w-full flex-col [@media(min-width:1280px)_and_(orientation:landscape)]:flex-row">
            <div className="min-h-[44vh] w-full min-w-0 flex-1 [@media(min-width:1280px)_and_(orientation:portrait)]:h-[56vh] [@media(min-width:1280px)_and_(orientation:portrait)]:flex-none [@media(min-width:1280px)_and_(orientation:landscape)]:min-h-0">
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
                  zoomFilter={zoomFilter}
                  onZoomChange={setZoomFilter}
                  onRoomSelect={handleRoomSelect}
                />
                <OrbitControls
                  enableDamping
                  dampingFactor={0.08}
                  enablePan
                  enableZoom
                  enableRotate
                  minDistance={14}
                  maxDistance={60}
                  ref={orbitRef}
                />
              </Canvas>
            </div>
            <div className="flex h-full w-full flex-col items-stretch gap-4 overflow-y-auto p-3 text-gray-800 sm:gap-5 sm:p-4 [@media(min-width:1280px)_and_(orientation:landscape)]:w-104 [@media(min-width:1280px)_and_(orientation:landscape)]:flex-none [@media(min-width:1280px)_and_(orientation:landscape)]:p-5 [@media(min-width:1536px)_and_(orientation:landscape)]:w-136">
              <div className="w-full rounded-lg border border-green-200/60 bg-green-50 p-4 shadow-sm backdrop-blur-sm sm:p-5 xl:mt-8">
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
              <div className="w-full rounded-lg border border-green-200/60 bg-green-50 p-4 shadow-sm backdrop-blur-sm sm:p-5">
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
                  {categoryOptions.map((option) => {
                    const selected = category === option.value;

                    return (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={selected}
                          onChange={(e) => setCategory(e.target.value)}
                          className="sr-only"
                        />
                        <span
                          className={`inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-sm ${selected ? `${option.activeClass} shadow-sm` : option.inactiveClass}`}
                        >
                          <span className="mr-1.5" aria-hidden="true">
                            {option.emoji}
                          </span>
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="w-full rounded-lg border border-green-300/50 bg-green-50 px-4 py-4 text-sm text-gray-600 backdrop-blur-sm sm:px-5">
                {zoomFilter == null ? (
                  <div className="flex min-h-28 flex-col items-center justify-center rounded-lg bg-white px-4 py-5 text-center sm:min-h-32">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center text-2xl leading-none"
                      aria-hidden="true"
                    >
                      👆
                    </span>
                    <p className="text-2xl font-semibold tracking-tight text-slate-800">
                      Válassz egy emeletet!
                    </p>
                    <p className="mt-1.5 text-sm text-slate-500">
                      Kattints a térkepre!.
                    </p>
                  </div>
                ) : (
                  <>
                    {selectedRoom ? (
                      <div className="mb-4 w-full rounded-lg border border-green-200/60 bg-green-50 p-4 text-sm text-gray-700 shadow-sm backdrop-blur-sm sm:p-5">
                        <p className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                          Kivalasztott terem
                        </p>
                        <p>
                          <span className="font-medium text-gray-600">
                            Emelet:
                          </span>{" "}
                          <span className="text-gray-800">
                            {selectedRoom.floor - 1}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium text-gray-600">
                            Név:
                          </span>{" "}
                          <span className="text-gray-800">
                            {selectedRoom.label}
                          </span>
                        </p>
                      </div>
                    ) : null}
                    <p className="text-center text-sm md:text-left">
                      Kattints rá egy szintre ha ki szeretnéd jelölni!
                    </p>
                    <div className="mt-3 max-h-[min(38vh,22rem)] space-y-2 overflow-y-auto pr-1">
                      {selectedFloorRooms.map((room) => (
                        <div
                          key={`${room.label}-${room.position.join("-")}`}
                          className="flex cursor-pointer items-center gap-2 rounded-md border border-green-300/60 bg-green-50/60 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-green-100/70"
                          onClick={() => {
                            if (zoomFilter == null) {
                              return;
                            }

                            handleRoomSelect({ ...room, floor: zoomFilter });
                          }}
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-green-100 text-green-700">
                            {room.category
                              ? (emojiByCategory[room.category] ?? "🏫")
                              : "🏫"}
                          </span>
                          <span className="truncate">{room.label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pointer-events-none z-10 mt-0 flex flex-col items-stretch gap-3 px-6 py-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between md:px-8 md:py-2">
            <button
              className="pointer-events-auto cursor-pointer w-full rounded-lg border border-green-300/50 bg-green-50 px-4 py-3 text-center text-gray-600 font-semibold backdrop-blur-sm md:w-auto md:text-left"
              onClick={resetCamera}
            >
              Kamera szög alaphelyeztbe állítása
            </button>
            <div className="w-full rounded-lg border border-green-300/50 bg-green-50 px-4 py-3 text-center text-gray-600 backdrop-blur-sm md:w-auto md:text-left">
              Szűrők használatával jobban látható a terem amit keresel!
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
