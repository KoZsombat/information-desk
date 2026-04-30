import { categoryOptions } from "../data/options";
import type { RoomDefinition } from "../data/types";
import type { RefObject } from "react";
import type { SelectedRoomData, Theme } from "./types";

const emojiByCategory = Object.fromEntries(
  categoryOptions.map((option) => [option.value, option.emoji]),
);

type InfoSidebarProps = {
  theme: Theme;
  filter: string;
  setFilter: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (value: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  zoomFilter: number | null;
  selectedRoom: SelectedRoomData | null;
  selectedFloorRooms: RoomDefinition[];
  getTranslatedRoomLabel: (originalLabel: string) => string;
  onRoomSelect: (room: SelectedRoomData) => void;
  t: (key: string, defaultValue?: string) => string;
};

function InfoSidebar({
  theme,
  filter,
  setFilter,
  category,
  setCategory,
  isSearchFocused,
  setIsSearchFocused,
  inputRef,
  zoomFilter,
  selectedRoom,
  selectedFloorRooms,
  getTranslatedRoomLabel,
  onRoomSelect,
  t,
}: InfoSidebarProps) {
  return (
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
                      theme === "light" ? "text-gray-800" : "text-gray-100"
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
                      theme === "light" ? "text-gray-800" : "text-gray-100"
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
              {t(`floors.${["ground", "first", "second"][zoomFilter - 1]}`)}
            </p>
            <div className="themed-scrollbar mt-3 max-h-[min(38vh,22rem)] space-y-2 overflow-y-auto pr-1">
              {selectedFloorRooms.map((room) => (
                <button
                  key={`${room.label}-${room.position.join("-")}`}
                  type="button"
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md text-left ${theme === "light" ? "border border-green-300/60 bg-green-50/60 text-gray-700 hover:bg-green-100/70" : "border border-gray-700 bg-gray-700/60 text-gray-300 hover:bg-gray-600/70"} px-3 py-2 text-sm transition-colors duration-200`}
                  onClick={() => {
                    if (zoomFilter == null) {
                      return;
                    }

                    onRoomSelect({ ...room, floor: zoomFilter });
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
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoSidebar;
