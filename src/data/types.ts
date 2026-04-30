export type RoomDefinition = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label: string;
  category?: string;
  opacity?: number;
};

export type FloorGroupDefinition = {
  position: [number, number, number];
  scale: number;
  rooms: RoomDefinition[];
  floor: number;
};

export type CategoryOption = {
  value: string;
  label: string;
  emoji: string;
  inactiveClass: string;
  activeClass: string;
};
