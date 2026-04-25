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

const BASE_LABEL_SUFFIX = "- Alap";
const CORRIDOR_LABEL_PREFIX = "Folyoso";

export const isBaseRoomLabel = (label: string) =>
  label.includes(BASE_LABEL_SUFFIX);

export const isCorridorLabel = (label: string) =>
  label.startsWith(CORRIDOR_LABEL_PREFIX);

const centerUpperFloorRooms = (
  rooms: RoomDefinition[],
  xOffset: number,
  yOffset: number,
) =>
  rooms.map((room) =>
    isBaseRoomLabel(room.label)
      ? room
      : {
          ...room,
          position: [
            room.position[0] + xOffset,
            room.position[1] + yOffset,
            room.position[2],
          ] as [number, number, number],
        },
  );

const groundFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [28, 16, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ep. foldszint - Alap",
  },
  {
    position: [-5.4, 1.2, -0.01],
    size: [1.0, 10.5, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - Foldszint gerinc",
  },
  {
    position: [-0.7, 0.2, -0.01],
    size: [8.5, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - Foldszint also szarny",
  },
  {
    position: [-3.1, -4.2, -0.01],
    size: [5.6, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - Foldszint irodak",
  },
  {
    position: [-5.5, 7, 0],
    size: [1, 1.5, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A005 Ferfi WC",
    category: "WC",
  },
  {
    position: [-4, 6.2, 0],
    size: [2.3, 3, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A007 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [-4, 4.35, 0],
    size: [2.3, 1, 0.22],
    color: "rgb(248, 232, 191)",
    label: "A008 Elokeszito",
    category: "Elokeszito",
  },
  {
    position: [-4, 3, 0],
    size: [2.1, 2, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A009 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [-4, 1.25, 0],
    size: [2.1, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A010 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, -1.0, 0],
    size: [2, 2, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A014 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [-4, -2.85, 0],
    size: [2, 1.9, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A015 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-5.3, -5.3, 0],
    size: [1.5, 1.5, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A016 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [-4.2, -5.3, 0],
    size: [1, 1.5, 0.22],
    color: "rgb(217, 210, 233)",
    label: "A017 Igazgato helyettes",
    category: "Irodak",
  },
  {
    position: [-2, -5.3, 0],
    size: [3.7, 1.5, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A018 Informatika",
    category: "Informatika",
  },
  {
    position: [1.6, -3.8, 0],
    size: [4, 2.2, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A023 Informatika",
    category: "Informatika",
  },
  {
    position: [-6.3, -1.4, 0],
    size: [1, 1, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A024 Noi WC",
    category: "WC",
  },
  {
    position: [-6.3, -0.5, 0],
    size: [1, 1, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A026 Akadalymentes WC",
    category: "WC",
  },
  {
    position: [2.1, -1.0, 0],
    size: [2.2, 1.6, 0.22],
    color: "rgb(244, 204, 204)",
    label: "A034 Tornatermi oltozo",
    category: "Tornaterem",
  },
  {
    position: [4.8, 0.0, 0],
    size: [3.4, 3.6, 0.22],
    color: "rgb(234, 153, 153)",
    label: "A037 Tornaterem",
    category: "Tornaterem",
  },
];

const firstFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [28, 16, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ep. 1 emelet - Alap",
  },
  {
    position: [1.8, 0.2, -0.01],
    size: [19.8, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 1 emelet fo folyosó",
  },
  {
    position: [10.8, 3.8, -0.01],
    size: [1.0, 7.4, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 1 emelet jobb szarny",
  },
  {
    position: [4.2, 3.0, -0.01],
    size: [6.8, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 1 emelet felso kapcsolat",
  },
  {
    position: [3.2, 1.6, -0.01],
    size: [1.0, 5.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 1 emelet torzs",
  },
  {
    position: [5.8, -3.0, -0.01],
    size: [4.6, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 1 emelet also blokk",
  },
  {
    position: [-8.8, 4.8, 0],
    size: [1.8, 2.2, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A103 Ferfi WC",
    category: "WC",
  },
  {
    position: [-6.0, 4.8, 0],
    size: [2.2, 2.2, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A105 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [-3.6, 4.8, 0],
    size: [2.2, 2.2, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A106 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [-1.2, 4.8, 0],
    size: [2.2, 2.2, 0.22],
    color: "rgb(205, 226, 248)",
    label: "A108 Laboratorium",
    category: "Laboratorium",
  },
  {
    position: [1.6, 3.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(221, 217, 196)",
    label: "A109 Csoport szoba",
    category: "Egyeb",
  },
  {
    position: [3.8, 3.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A110 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [4.2, 0.8, 0],
    size: [2.4, 1.8, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A116 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [6.6, 0.8, 0],
    size: [2.4, 1.8, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A117 Informatika",
    category: "Informatika",
  },
  {
    position: [9.0, 0.8, 0],
    size: [2.4, 1.8, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A118 Informatika",
    category: "Informatika",
  },
  {
    position: [11.4, 0.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A119 Tanterem",
    category: "Tanterem",
  },
  {
    position: [11.4, 2.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A120 Informatika",
    category: "Informatika",
  },
  {
    position: [11.4, 4.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A121 Informatika",
    category: "Informatika",
  },
  {
    position: [11.4, 6.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A123 Tanterem",
    category: "Tanterem",
  },
  {
    position: [4.8, -2.2, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A126 Noi WC",
    category: "WC",
  },
  {
    position: [7.0, -2.2, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A127 Tanari WC",
    category: "WC",
  },
  {
    position: [4.8, -3.8, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A128 Akadalymentes WC",
    category: "WC",
  },
  {
    position: [6.0, 2.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A131 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [3.8, 2.8, 0],
    size: [2.0, 1.2, 0.22],
    color: "rgb(217, 210, 233)",
    label: "A132 Igazgato helyettes",
    category: "Irodak",
  },
  {
    position: [2.0, 2.8, 0],
    size: [1.6, 1.2, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A133 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [6.0, -3.8, 0],
    size: [2.0, 1.4, 0.22],
    color: "rgb(242, 242, 242)",
    label: "A114 Dohanyzo",
    category: "Egyeb",
  },
];

const secondFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [28, 16, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ep. 2 emelet - Alap",
  },
  {
    position: [1.8, 0.2, -0.01],
    size: [19.8, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 2 emelet fo folyosó",
  },
  {
    position: [10.2, 2.8, -0.01],
    size: [1.0, 6.8, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 2 emelet jobb szarny",
  },
  {
    position: [2.8, 3.2, -0.01],
    size: [6.8, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 2 emelet felso kapcsolat",
  },
  {
    position: [3.0, 1.6, -0.01],
    size: [1.0, 5.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 2 emelet torzs",
  },
  {
    position: [6.8, -1.8, -0.01],
    size: [5.0, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyoso - 2 emelet also blokk",
  },
  {
    position: [-8.8, 4.8, 0],
    size: [1.8, 2.2, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A203 Ferfi WC",
    category: "WC",
  },
  {
    position: [-6.0, 4.8, 0],
    size: [2.2, 2.2, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A205 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-3.6, 4.8, 0],
    size: [2.2, 2.2, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A206 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-1.2, 3.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(248, 232, 191)",
    label: "A207 Elokeszito",
    category: "Elokeszito",
  },
  {
    position: [1.6, 3.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A209 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [3.8, 3.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A210 Tanterem",
    category: "Tanterem",
  },
  {
    position: [6.2, 1.8, 0],
    size: [2.4, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A215 Tanterem",
    category: "Tanterem",
  },
  {
    position: [8.6, 1.8, 0],
    size: [2.4, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A216 Tanterem",
    category: "Tanterem",
  },
  {
    position: [10.8, 0.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A217 Tanterem",
    category: "Tanterem",
  },
  {
    position: [10.8, 2.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A218 Tanterem",
    category: "Tanterem",
  },
  {
    position: [13.0, 3.8, 0],
    size: [2.0, 1.8, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A219 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [10.8, 4.8, 0],
    size: [2.2, 1.8, 0.22],
    color: "rgb(184, 227, 180)",
    label: "A220 Tanterem",
    category: "Tanterem",
  },
  {
    position: [8.6, 4.8, 0],
    size: [2.0, 1.8, 0.22],
    color: "rgb(159, 197, 232)",
    label: "A222 Informatika",
    category: "Informatika",
  },
  {
    position: [6.4, -1.0, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A224 Noi WC",
    category: "WC",
  },
  {
    position: [8.6, -1.0, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A225 Tanari WC",
    category: "WC",
  },
  {
    position: [6.4, -2.6, 0],
    size: [1.8, 1.4, 0.22],
    color: "rgb(220, 230, 241)",
    label: "A226 Akadalymentes WC",
    category: "WC",
  },
  {
    position: [4.6, -2.6, 0],
    size: [2.0, 1.4, 0.22],
    color: "rgb(234, 209, 220)",
    label: "A213 Tanari szoba",
    category: "Tanari szoba",
  },
  {
    position: [-0.2, 2.2, 0],
    size: [2.4, 2.2, 0.22],
    color: "rgb(162, 196, 201)",
    label: "A208 Fizika eloado",
    category: "Egyeb",
  },
];

export const floorGroups: FloorGroupDefinition[] = [
  { position: [0, 0, -3], scale: 0.42, rooms: groundFloorRooms, floor: 1 },
  {
    position: [0, 1, 0],
    scale: 0.42,
    rooms: centerUpperFloorRooms(firstFloorRooms, -3.1, -1.5),
    floor: 2,
  },
  {
    position: [0, 1, 3],
    scale: 0.42,
    rooms: centerUpperFloorRooms(secondFloorRooms, -3.1, -1.5),
    floor: 3,
  },
];
