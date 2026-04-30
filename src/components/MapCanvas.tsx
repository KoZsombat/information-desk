import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { RefObject } from "react";
import RoomGroups from "./RoomGroups";
import type { SelectedRoomData, Theme } from "./types";

type MapCanvasProps = {
  theme: Theme;
  zoomFilter: number | null;
  t: (key: string, defaultValue?: string) => string;
  getOpacity: (
    label: string,
    selfCategory: string,
    baseOpacity?: number,
  ) => number;
  onZoomChange: (filter: number | null) => void;
  onRoomSelect: (room: SelectedRoomData) => void;
  onControlsStart: () => void;
  onControlsEnd: () => void;
  onPointerMissed: () => void;
  orbitRef: RefObject<OrbitControlsImpl | null>;
};

function MapCanvas({
  theme,
  zoomFilter,
  t,
  getOpacity,
  onZoomChange,
  onRoomSelect,
  onControlsStart,
  onControlsEnd,
  onPointerMissed,
  orbitRef,
}: MapCanvasProps) {
  return (
    <div className="h-3/5 w-full min-w-0 [@media(min-width:1280px)_and_(orientation:portrait)]:h-[56vh] [@media(min-width:1280px)_and_(orientation:portrait)]:flex-none [@media(min-width:1280px)_and_(orientation:landscape)]:h-auto [@media(min-width:1280px)_and_(orientation:landscape)]:flex-1 [@media(min-width:1280px)_and_(orientation:landscape)]:min-h-0">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 34], fov: 20, near: 0.1, far: 120 }}
        onPointerMissed={onPointerMissed}
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
          onZoomChange={onZoomChange}
          onRoomSelect={onRoomSelect}
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
          onStart={onControlsStart}
          onEnd={onControlsEnd}
          ref={orbitRef}
        />
      </Canvas>
    </div>
  );
}

export default MapCanvas;
