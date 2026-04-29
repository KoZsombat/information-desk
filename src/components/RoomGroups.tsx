import Room from "./Room";
import { Html } from "@react-three/drei";
import {
  floorGroups,
  isBaseRoomLabel,
  isCorridorLabel,
  type RoomDefinition,
} from "./roomData";
import type { Language } from "../i18n/translations";

type SelectedRoomData = RoomDefinition & { floor: number };
type Theme = "light" | "dark";

type RoomGroupProps = {
  getOpacity: (
    label: string,
    selfCategory: string,
    baseOpacity?: number,
  ) => number;
  zoomFilter: number | null;
  onZoomChange: (filter: number | null) => void;
  onRoomSelect: (room: SelectedRoomData) => void;
  language: Language;
  t: (key: string, defaultValue?: string) => string;
  theme: Theme;
};

function RoomGroups({
  getOpacity,
  zoomFilter,
  onZoomChange,
  onRoomSelect,
  language,
  t,
  theme,
}: RoomGroupProps) {
  const getTranslatedFloorLabel = (floor: number): string => {
    const labels: Record<number, string> = {
      1: t("floors.ground"),
      2: t("floors.first"),
      3: t("floors.second"),
    };
    return (
      labels[floor] ??
      `${Math.max(floor - 1, 0)}. ${language === "hu" ? "emelet" : "floor"}`
    );
  };

  return (
    <group position={[0, 0, 0]} rotation={[-1.2, 0, 0.2]}>
      {zoomFilter == null ? (
        <Html
          position={[-3.8, 0, -3]}
          center
          distanceFactor={14}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`rounded-full border w-max px-3 py-1 text-xs font-semibold tracking-wide shadow-sm ${
              theme === "light"
                ? "border-red-300/80 bg-red-50/95 text-red-800"
                : "border-red-700 bg-red-950/95 text-red-200"
            }`}
          >
            {language === "hu" ? "Itt állsz" : "You are here"}
          </div>
        </Html>
      ) : null}
      {floorGroups
        .filter((e) => (zoomFilter != null ? e.floor == zoomFilter : e))
        .map((floor, floorIndex) => (
          <group
            key={floorIndex}
            position={zoomFilter != null ? [0, 1, 0] : floor.position}
            scale={floor.scale}
            onClick={() =>
              zoomFilter == null ? onZoomChange(floor.floor) : null
            }
          >
            {zoomFilter == null ? (
              <Html
                position={[11.5, -9.2, 0.2]}
                center
                distanceFactor={14}
                style={{ pointerEvents: "none" }}
              >
                <div
                  className={`rounded-full border w-max px-3 py-1 text-xs font-semibold tracking-wide shadow-sm ${
                    theme === "light"
                      ? "border-green-300/80 bg-green-50/95 text-green-800"
                      : "border-green-700 bg-green-950/95 text-green-200"
                  }`}
                >
                  {getTranslatedFloorLabel(floor.floor)}
                </div>
              </Html>
            ) : null}
            {floor.rooms.map((room) => {
              const isBaseRoom = isBaseRoomLabel(room.label);
              const isCorridor = isCorridorLabel(room.label);
              const displaySize: [number, number, number] =
                isBaseRoom || isCorridor
                  ? room.size
                  : [
                      Math.max(room.size[0] - 0.2, 0.6),
                      Math.max(room.size[1] - 0.2, 0.6),
                      room.size[2],
                    ];

              const opacity = room.category
                ? getOpacity(room.label, room.category, room.opacity ?? 1)
                : (room.opacity ?? 1);

              return (
                <Room
                  key={`${room.label}-${room.position.join("-")}`}
                  position={room.position}
                  size={displaySize}
                  color={room.color}
                  opacity={opacity}
                  onRoomClick={
                    isBaseRoom || isCorridor || !zoomFilter
                      ? undefined
                      : () => onRoomSelect({ ...room, floor: floor.floor })
                  }
                />
              );
            })}
          </group>
        ))}
    </group>
  );
}

export default RoomGroups;
