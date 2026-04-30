import Room from "./Room";
import { Html } from "@react-three/drei";
import {
  floorGroups,
  isBaseRoomLabel,
  isCorridorLabel,
  type RoomDefinition,
} from "../data/roomData";

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
  t: (key: string, defaultValue?: string) => string;
  theme: Theme;
};

function RoomGroups({
  getOpacity,
  zoomFilter,
  onZoomChange,
  onRoomSelect,
  t,
  theme,
}: RoomGroupProps) {
  const getTranslatedFloorLabel = (floor: number): string => {
    const labels: Record<number, string> = {
      1: t("floors.ground"),
      2: t("floors.first"),
      3: t("floors.second"),
    };
    return labels[floor] ?? `${Math.max(floor - 1, 0)}. ${t("floors.generic")}`;
  };

  return (
    <group position={[0, 0, 0]} rotation={[-1.2, 0, 0.2]}>
      {zoomFilter == null ? (
        <Html
          position={[-3.1, 0.8, -2.5]}
          center
          distanceFactor={14}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center ${
              theme === "light" ? "text-red-700" : "text-red-300"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
              <circle
                cx="12"
                cy="12"
                r="2.2"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </div>
        </Html>
      ) : zoomFilter == 1 ? (
        <Html
          position={[-3.1, 0.8, 0.5]}
          center
          distanceFactor={14}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center ${
              theme === "light" ? "text-red-700" : "text-red-300"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
              <circle
                cx="12"
                cy="12"
                r="2.2"
                fill="currentColor"
                stroke="none"
              />
            </svg>
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
