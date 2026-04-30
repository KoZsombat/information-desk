const floorLabelByNumber: Record<number, string> = {
  1: "Földszint",
  2: "1. emelet",
  3: "2. emelet",
};

const BASE_LABEL_SUFFIX = "- Alap";
const CORRIDOR_LABEL_PREFIX = "Folyosó";

export const getFloorLabel = (floor: number) =>
  floorLabelByNumber[floor] ?? `${Math.max(floor - 1, 0)}. emelet`;

export const isBaseRoomLabel = (label: string) =>
  label.includes(BASE_LABEL_SUFFIX);

export const isCorridorLabel = (label: string) =>
  label.startsWith(CORRIDOR_LABEL_PREFIX);
