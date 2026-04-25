import Room from "./Room";
import { floorGroups, isBaseRoomLabel, isCorridorLabel } from "./roomData";

type RoomGroupProps = {
  getOpacity: (
    label: string,
    selfCategory: string,
    baseOpacity?: number,
  ) => number;
  zoomFilter: number | null;
  onZoomChange: (filter: number | null) => void;
  onTooltipShow: (label: string, x: number, y: number) => void;
};

function RoomGroups({
  getOpacity,
  zoomFilter,
  onZoomChange,
  onTooltipShow,
}: RoomGroupProps) {
  return (
    <group position={[0, 0, 0]} rotation={[-1.2, 0, 0.2]}>
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
                  label={room.label}
                  onRoomClick={
                    isBaseRoom || isCorridor ? undefined : zoomFilter ? onTooltipShow : undefined
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
