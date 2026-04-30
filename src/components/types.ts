import type { RoomDefinition } from "../data/types";

export type SelectedRoomData = RoomDefinition & { floor: number };
export type Theme = "light" | "dark";
