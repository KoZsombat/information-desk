import type { ThreeElements, ThreeEvent } from "@react-three/fiber";

type RoomProps = ThreeElements["mesh"] & {
  size?: [number, number, number];
  color?: string;
  opacity?: number;
  onRoomClick?: () => void;
};

function Room({
  size = [2, 2, 0.2],
  color = "rgb(245, 158, 11)",
  opacity = 1,
  onRoomClick,
  ...props
}: RoomProps) {
  const materialOpacity = Math.max(0, Math.min(1, opacity));

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (onRoomClick) {
      event.stopPropagation();
      onRoomClick();
    }
  };

  return (
    <mesh {...props} onClick={handleClick}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        opacity={materialOpacity}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default Room;
