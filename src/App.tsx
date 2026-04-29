import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useEffect, useState, useRef } from "react";
import RoomGroups from "./components/RoomGroups";
import {
  categoryOptions,
  floorGroups,
  isBaseRoomLabel,
  isCorridorLabel,
  type RoomDefinition,
} from "./components/roomData";
import {
  type Language,
  translations,
  getTranslation,
} from "./i18n/translations";
import KioskBoard from "kioskboard";

type SelectedRoomData = RoomDefinition & { floor: number };
type Theme = "light" | "dark";

const kioskboardOptions = {
  // KioskBoard typings require this property; runtime uses keysJsonUrl when set to null.
  keysArrayOfObjects: null as unknown as { [index: string]: string }[],
  keysJsonUrl: "/kioskboard-keys-hungarian.json",
  language: "hu",
  theme: "material" as const,
  autoScroll: true,
  capsLockActive: false,
  allowRealKeyboard: true,
  allowMobileKeyboard: true,
  cssAnimations: true,
  cssAnimationsDuration: 360,
  cssAnimationsStyle: "slide" as const,
  keysAllowSpacebar: true,
  keysSpacebarText: "Space",
  keysFontFamily: "sans-serif",
  keysFontSize: "22px",
  keysFontWeight: "normal",
  keysIconSize: "25px",
  keysEnterText: "Enter",
  keysEnterCallback: undefined,
  keysEnterCanClose: true,
};

function App() {
  const [language, setLanguage] = useState<Language>("hu");
  const [theme, setTheme] = useState<Theme>("light");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [zoomFilter, setZoomFilter] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomData | null>(
    null,
  );
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const idleResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const t = (key: string, defaultValue: string = "") =>
    getTranslation(language, key, defaultValue);

  const getTranslatedRoomLabel = (originalLabel: string): string => {
    if (language === "hu") return originalLabel;

    const huRooms = translations.hu.rooms as Record<string, string>;
    const enRooms = translations.en.rooms as Record<string, string>;

    for (const [key, huLabel] of Object.entries(huRooms)) {
      if (huLabel === originalLabel) {
        const enLabel = enRooms[key as keyof typeof enRooms];
        return enLabel || originalLabel;
      }
    }

    return originalLabel;
  };

  const clearIdleResetTimer = () => {
    if (idleResetTimeoutRef.current) {
      clearTimeout(idleResetTimeoutRef.current);
      idleResetTimeoutRef.current = null;
    }
  };

  const resetCamera = () => {
    clearIdleResetTimer();
    orbitRef.current?.reset();
    setZoomFilter(null);
    setSelectedRoom(null);
  };

  const handleControlsStart = () => {
    clearIdleResetTimer();
  };

  const handleControlsEnd = () => {
    clearIdleResetTimer();
    idleResetTimeoutRef.current = setTimeout(() => {
      resetCamera();
    }, 15000);
  };

  useEffect(() => {
    const inputEl = inputRef.current;

    if (!inputEl) {
      return;
    }

    const syncFilterFromInput = () => {
      setFilter(inputEl.value);
      setCategory("");
    };

    const handleFocus = () => {
      setIsSearchFocused(true);
    };

    const handleBlur = () => {
      setIsSearchFocused(false);
    };

    inputEl.addEventListener("change", syncFilterFromInput);
    inputEl.addEventListener("input", syncFilterFromInput);
    inputEl.addEventListener("focus", handleFocus);
    inputEl.addEventListener("focusout", handleBlur);

    KioskBoard.run(inputEl, kioskboardOptions);

    return () => {
      inputEl.removeEventListener("change", syncFilterFromInput);
      inputEl.removeEventListener("input", syncFilterFromInput);
      inputEl.removeEventListener("focus", handleFocus);
      inputEl.removeEventListener("focusout", handleBlur);
      clearIdleResetTimer();
    };
  }, []);

  const handleRoomSelect = (room: SelectedRoomData) => {
    setSelectedRoom(room);
    setFilter(getTranslatedRoomLabel(room.label));
  };

  const getOpacity = (
    label: string,
    selfCategory: string,
    baseOpacity: number = 1,
  ) => {
    const normalizedFilter = filter.trim().toLowerCase();
    const translatedLabel = getTranslatedRoomLabel(label).toLowerCase();
    const originalLabel = label.toLowerCase();

    const matchesFilter =
      normalizedFilter.length === 0 ||
      originalLabel.includes(normalizedFilter) ||
      translatedLabel.includes(normalizedFilter);
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
    <main
      data-theme={theme}
      className={`relative h-dvh w-full overflow-hidden ${theme === "light" ? "bg-[#E8FBED]" : "bg-gray-950"}`}
    >
      <div
        className={`absolute inset-0 ${theme === "light" ? "bg-[#E8FBED]/30" : "bg-gray-950/30"}`}
      />
      <div className="relative mx-auto flex h-full w-full items-center justify-center px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-6 2xl:px-12 2xl:py-8">
        <section
          className={`relative flex h-full w-full max-w-550 flex-col overflow-hidden rounded-lg ${theme === "light" ? "border border-green-200/60 bg-green-100/10" : "border border-gray-700 bg-gray-900"} shadow-lg backdrop-blur-sm`}
        >
          <div
            className={`absolute inset-x-0 top-0 z-10 flex items-center justify-between ${theme === "light" ? "border-b border-green-100/50 bg-[#68B59D]" : "border-b border-gray-700 bg-gray-800"} px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white sm:px-6 sm:py-4 sm:text-xs sm:tracking-[0.35em] md:px-8 2xl:px-10`}
          >
            <span>{t("header.title")}</span>
            <span className="hidden text-white md:inline">
              {t("header.subtitle")}
            </span>
          </div>

          <div className="flex h-full min-h-0 w-full flex-col [@media(min-width:1280px)_and_(orientation:landscape)]:flex-row">
            <div className="h-3/5 w-full min-w-0 [@media(min-width:1280px)_and_(orientation:portrait)]:h-[56vh] [@media(min-width:1280px)_and_(orientation:portrait)]:flex-none [@media(min-width:1280px)_and_(orientation:landscape)]:h-auto [@media(min-width:1280px)_and_(orientation:landscape)]:flex-1 [@media(min-width:1280px)_and_(orientation:landscape)]:min-h-0">
              <Canvas
                className="h-full w-full"
                camera={{ position: [0, 0, 34], fov: 20, near: 0.1, far: 120 }}
              >
                <color
                  attach="background"
                  args={[theme === "light" ? "#E8FBED" : "#0f172a"]}
                />
                <ambientLight intensity={theme === "light" ? 1.45 : 1.0} />
                <directionalLight
                  position={[8, 12, 14]}
                  intensity={theme === "light" ? 1.25 : 0.9}
                />
                <directionalLight
                  position={[-10, -4, 12]}
                  intensity={theme === "light" ? 0.5 : 0.3}
                />
                <pointLight
                  position={[0, 0, 28]}
                  intensity={theme === "light" ? 1.8 : 1.2}
                  color={theme === "light" ? "#93c5fd" : "#60a5fa"}
                />

                <RoomGroups
                  getOpacity={getOpacity}
                  zoomFilter={zoomFilter}
                  onZoomChange={setZoomFilter}
                  onRoomSelect={(room) => {
                    handleRoomSelect(room);
                    setCategory("");
                  }}
                  language={language}
                  t={t}
                  theme={theme}
                />
                <OrbitControls
                  enableDamping
                  dampingFactor={0.08}
                  enablePan
                  enableZoom
                  enableRotate
                  minDistance={14}
                  maxDistance={60}
                  onStart={handleControlsStart}
                  onEnd={handleControlsEnd}
                  ref={orbitRef}
                />
              </Canvas>
            </div>
            <div
              className="themed-scrollbar flex h-2/5 w-full flex-col items-stretch gap-4 overflow-y-auto p-3 text-gray-800 sm:gap-5 sm:p-4 [@media(min-width:1280px)_and_(orientation:landscape)]:h-full [@media(min-width:1280px)_and_(orientation:landscape)]:w-104 [@media(min-width:1280px)_and_(orientation:landscape)]:flex-none [@media(min-width:1280px)_and_(orientation:landscape)]:p-5 [@media(min-width:1536px)_and_(orientation:landscape)]:w-136"
              style={{ color: theme === "light" ? "#1f2937" : "#d1d5db" }}
            >
              <div
                className={`w-full rounded-lg ${theme === "light" ? "border border-green-200/60 bg-green-50" : "border border-gray-700 bg-gray-800"} p-4 shadow-sm backdrop-blur-sm sm:p-5 xl:mt-8`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p
                    className={`text-sm font-semibold tracking-wide uppercase ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                  >
                    {t("search.label")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilter("")}
                    disabled={!filter}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${theme === "light" ? "border-green-300/80 text-gray-600 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50" : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"}`}
                  >
                    {t("search.clear")}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    ref={inputRef}
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setCategory("");
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`peer h-11 w-full rounded-lg border ${theme === "light" ? "border-green-300/60 bg-transparent text-gray-900 placeholder-gray-400 focus:ring-green-400/50" : "border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-blue-400/50"} pl-5 pr-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  <label
                    className={`absolute ${filter || isSearchFocused ? "-top-2.5 text-xs font-medium" : "top-2.5"} left-5 z-20 px-1 transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-medium ${theme === "light" ? "bg-green-50 text-gray-600 peer-focus:text-green-600" : "bg-gray-800 text-gray-400 peer-focus:text-blue-400"}`}
                  >
                    {t("search.placeholder")}
                  </label>
                </div>
              </div>
              <div
                className={`w-full rounded-lg ${theme === "light" ? "border border-green-200/60 bg-green-50" : "border border-gray-700 bg-gray-800"} p-4 shadow-sm backdrop-blur-sm sm:p-5`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p
                    className={`text-sm font-semibold tracking-wide uppercase ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                  >
                    {t("category.label")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    disabled={!category}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${theme === "light" ? "border-green-300/80 text-gray-600 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50" : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"}`}
                  >
                    {t("category.clear")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((option) => {
                    const selected = category === option.value;
                    const translatedLabel = t(
                      `category.${option.value.toLowerCase().replace(/\s+/g, "")}`,
                    );

                    return (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={selected}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            setFilter("");
                          }}
                          className="sr-only"
                        />
                        <span
                          className={`inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm ${theme === "light" ? "text-gray-700" : "text-white"} ${selected ? `${option.activeClass} shadow-sm` : option.inactiveClass}`}
                        >
                          <span className="mr-1.5" aria-hidden="true">
                            {option.emoji}
                          </span>
                          {translatedLabel}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div
                className={`w-full rounded-lg ${theme === "light" ? "border border-green-300/50 bg-green-50 text-gray-600" : "border border-gray-700 bg-gray-800 text-gray-300"} px-4 py-4 text-sm backdrop-blur-sm sm:px-5`}
              >
                {zoomFilter == null ? (
                  <div
                    className={`flex min-h-28 flex-col items-center justify-center rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-900"} px-4 py-5 text-center sm:min-h-32`}
                  >
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center text-2xl leading-none"
                      aria-hidden="true"
                    >
                      👆
                    </span>
                    <p
                      className={`text-2xl font-semibold tracking-tight ${theme === "light" ? "text-slate-800" : "text-slate-200"}`}
                    >
                      {t("info.selectFloor")}
                    </p>
                    <p
                      className={`mt-1.5 text-sm ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {t("info.clickMap")}
                    </p>
                  </div>
                ) : (
                  <>
                    {selectedRoom ? (
                      <div
                        className={`mb-4 w-full rounded-lg ${theme === "light" ? "border border-green-200/60 bg-green-50 text-gray-700" : "border border-gray-700 bg-gray-700 text-gray-200"} p-4 text-sm shadow-sm backdrop-blur-sm sm:p-5`}
                      >
                        <p
                          className={`mb-3 text-sm font-semibold tracking-wide uppercase ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                        >
                          {t("info.selectedRoom")}
                        </p>
                        <p>
                          <span
                            className={`font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {t("info.floor")}:
                          </span>{" "}
                          <span
                            className={
                              theme === "light"
                                ? "text-gray-800"
                                : "text-gray-100"
                            }
                          >
                            {t(
                              `floors.${["ground", "first", "second"][selectedRoom.floor - 1]}`,
                            )}
                          </span>
                        </p>
                        <p>
                          <span
                            className={`font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {t("info.name")}:
                          </span>{" "}
                          <span
                            className={
                              theme === "light"
                                ? "text-gray-800"
                                : "text-gray-100"
                            }
                          >
                            {getTranslatedRoomLabel(selectedRoom.label)}
                          </span>
                        </p>
                      </div>
                    ) : null}
                    <p className="text-center text-sm md:text-left">
                      {t("info.clickToSelect")}
                    </p>
                    <p
                      className={`mt-1 text-center text-xs md:text-left ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {t("info.currentFloor")}:{" "}
                      {t(
                        `floors.${["ground", "first", "second"][zoomFilter - 1]}`,
                      )}
                    </p>
                    <div className="themed-scrollbar mt-3 max-h-[min(38vh,22rem)] space-y-2 overflow-y-auto pr-1">
                      {selectedFloorRooms.map((room) => (
                        <div
                          key={`${room.label}-${room.position.join("-")}`}
                          className={`flex cursor-pointer items-center gap-2 rounded-md ${theme === "light" ? "border border-green-300/60 bg-green-50/60 text-gray-700 hover:bg-green-100/70" : "border border-gray-700 bg-gray-700/60 text-gray-300 hover:bg-gray-600/70"} px-3 py-2 text-sm transition-colors duration-200`}
                          onClick={() => {
                            if (zoomFilter == null) {
                              return;
                            }

                            handleRoomSelect({ ...room, floor: zoomFilter });
                          }}
                        >
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-md ${theme === "light" ? "bg-green-100 text-green-700" : "bg-gray-600 text-gray-300"}`}
                          >
                            {room.category
                              ? (emojiByCategory[room.category] ?? "🏫")
                              : "🏫"}
                          </span>
                          <span className="truncate">
                            {getTranslatedRoomLabel(room.label)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={`pointer-events-none z-10 mt-0 flex flex-col items-stretch gap-3 px-6 py-4 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"} md:flex-row md:items-center md:justify-between md:px-8 md:py-2`}
          >
            <button
              className={`pointer-events-auto cursor-pointer w-full rounded-lg px-4 py-3 text-center font-semibold backdrop-blur-sm md:w-auto md:text-left ${theme === "light" ? "border border-green-300/50 bg-green-50 text-gray-600" : "border border-gray-700 bg-gray-800 text-gray-300"}`}
              onClick={resetCamera}
            >
              {t("buttons.resetCamera")}
            </button>
            <div className="pointer-events-auto flex items-center gap-2 justify-center md:justify-end">
              <button
                onClick={() => setLanguage("hu")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  language === "hu"
                    ? theme === "light"
                      ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
                      : "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
                    : theme === "light"
                      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                🇭🇺 HU
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  language === "en"
                    ? theme === "light"
                      ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
                      : "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
                    : theme === "light"
                      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                🇬🇧 EN
              </button>
              <div
                className="w-px h-6 mx-1"
                style={{
                  backgroundColor: theme === "light" ? "#e5e7eb" : "#374151",
                }}
              />
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  theme === "dark"
                    ? "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {theme === "light"
                  ? `🌙 ${t("theme.switchToDark")}`
                  : `☀️ ${t("theme.switchToLight")}`}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
