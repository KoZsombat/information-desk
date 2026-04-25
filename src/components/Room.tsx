import type { ThreeElements, ThreeEvent } from "@react-three/fiber";

type RoomProps = ThreeElements["mesh"] & {
  size?: [number, number, number];
  color?: string;
  opacity?: number;
  label?: string;
  onRoomClick?: (label: string, x: number, y: number) => void;
};

function Room({
  size = [2, 2, 0.2],
  color = "rgb(245, 158, 11)",
  opacity = 1,
  label = "Terem",
  onRoomClick,
  ...props
}: RoomProps) {
  const materialOpacity = Math.max(0, Math.min(1, opacity));

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    onRoomClick?.(label, event.nativeEvent.clientX, event.nativeEvent.clientY);
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
