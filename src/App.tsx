import { useEffect, useState, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import KioskBoard from "kioskboard";
import { floorGroups, isBaseRoomLabel, isCorridorLabel } from "./data/roomData";
import {
  type Language,
  translations,
  getTranslation,
} from "./i18n/translations";
import HeaderBar from "./components/HeaderBar";
import MapCanvas from "./components/MapCanvas";
import InfoSidebar from "./components/InfoSidebar";
import AppFooter from "./components/AppFooter";
import type { SelectedRoomData, Theme } from "./components/types";

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
          <HeaderBar
            title={t("header.title")}
            subtitle={t("header.subtitle")}
            theme={theme}
          />

          <div className="flex h-full min-h-0 w-full flex-col [@media(min-width:1280px)_and_(orientation:landscape)]:flex-row">
            <MapCanvas
              theme={theme}
              zoomFilter={zoomFilter}
              t={t}
              getOpacity={getOpacity}
              onZoomChange={setZoomFilter}
              onRoomSelect={(room) => {
                handleRoomSelect(room);
                setCategory("");
              }}
              onControlsStart={handleControlsStart}
              onControlsEnd={handleControlsEnd}
              onPointerMissed={() => {
                if (zoomFilter != null) {
                  resetCamera();
                }
              }}
              orbitRef={orbitRef}
            />
            <InfoSidebar
              theme={theme}
              filter={filter}
              setFilter={setFilter}
              category={category}
              setCategory={setCategory}
              isSearchFocused={isSearchFocused}
              setIsSearchFocused={setIsSearchFocused}
              inputRef={inputRef}
              zoomFilter={zoomFilter}
              selectedRoom={selectedRoom}
              selectedFloorRooms={selectedFloorRooms}
              getTranslatedRoomLabel={getTranslatedRoomLabel}
              onRoomSelect={(room) => {
                handleRoomSelect(room);
                setCategory("");
              }}
              t={t}
            />
          </div>

          <AppFooter
            theme={theme}
            language={language}
            setLanguage={setLanguage}
            onResetCamera={resetCamera}
            onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
            t={t}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
