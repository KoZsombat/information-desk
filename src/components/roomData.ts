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

const floorLabelByNumber: Record<number, string> = {
  1: "Földszint",
  2: "1. emelet",
  3: "2. emelet",
};

export const getFloorLabel = (floor: number) =>
  floorLabelByNumber[floor] ?? `${Math.max(floor - 1, 0)}. emelet`;

const BASE_LABEL_SUFFIX = "- Alap";
const CORRIDOR_LABEL_PREFIX = "Folyosó";

export const isBaseRoomLabel = (label: string) =>
  label.includes(BASE_LABEL_SUFFIX);

export const isCorridorLabel = (label: string) =>
  label.startsWith(CORRIDOR_LABEL_PREFIX);

export const categoryOptions: CategoryOption[] = [
  {
    value: "Informatika",
    label: "Informatika",
    emoji: "💻",
    inactiveClass:
      "border-[#9fc5e8]/80 bg-[#9fc5e8]/20 hover:border-[#9fc5e8]/80 hover:bg-[#9fc5e8]/60",
    activeClass: "border-[#9fc5e8] bg-[#9fc5e8]/80",
  },
  {
    value: "Laboratórium",
    label: "Laboratórium",
    emoji: "🧪",
    inactiveClass:
      "border-[#cde2f8]/80 bg-[#cde2f8]/20 hover:border-[#cde2f8]/80 hover:bg-[#cde2f8]/60",
    activeClass: "border-[#cde2f8] bg-[#cde2f8]/80",
  },
  {
    value: "Tanterem",
    label: "Tanterem",
    emoji: "📚",
    inactiveClass:
      "border-[#b8e3b0]/80 bg-[#b8e3b0]/20 hover:border-[#b8e3b0]/80 hover:bg-[#b8e3b0]/60",
    activeClass: "border-[#b8e3b0] bg-[#b8e3b0]/80",
  },
  {
    value: "Tanári szoba",
    label: "Tanári szoba",
    emoji: "👩‍🏫",
    inactiveClass:
      "border-[#ead1dc]/80 bg-[#ead1dc]/20 hover:border-[#ead1dc]/80 hover:bg-[#ead1dc]/60",
    activeClass: "border-[#ead1dc] bg-[#ead1dc]/80",
  },
  {
    value: "Irodák",
    label: "Irodák",
    emoji: "📁",
    inactiveClass:
      "border-[#d9d2e9]/80 bg-[#d9d2e9]/20 hover:border-[#d9d2e9]/80 hover:bg-[#d9d2e9]/60",
    activeClass: "border-[#d9d2e9] bg-[#d9d2e9]/80",
  },
  {
    value: "Tornaterem",
    label: "Tornaterem",
    emoji: "🏀",
    inactiveClass:
      "border-[#f4cccc]/80 bg-[#f4cccc]/20 hover:border-[#f4cccc]/80 hover:bg-[#f4cccc]/60",
    activeClass: "border-[#e69999] bg-[#e69999]/80",
  },
  {
    value: "WC",
    label: "WC",
    emoji: "🚻",
    inactiveClass:
      "border-[#dce6f1]/80 bg-[#dce6f1]/20 hover:border-[#dce6f1]/80 hover:bg-[#dce6f1]/60",
    activeClass: "border-[#dce6f1] bg-[#dce6f1]/80",
  },
  {
    value: "Előkészítő",
    label: "Előkészítő",
    emoji: "🧰",
    inactiveClass:
      "border-[#f8e8bf]/80 bg-[#f8e8bf]/20 hover:border-[#f8e8bf]/80 hover:bg-[#f8e8bf]/60",
    activeClass: "border-[#f8e8bf] bg-[#f8e8bf]/80",
  },
  {
    value: "Egyéb",
    label: "Egyéb",
    emoji: "🧭",
    inactiveClass:
      "border-[#ddd7c4]/80 bg-[#ddd7c4]/20 hover:border-[#ddd7c4]/80 hover:bg-[#ddd7c4]/60",
    activeClass: "border-[#ddd7c4] bg-[#ddd7c4]/80",
  },
];

const groundFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [20, 20, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.2,
    label: "A ép. földszint - Alap",
  },
  {
    position: [-5.4, 2.3, -0.01],
    size: [1.0, 12, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Földszint gerinc",
  },
  {
    position: [-8.4, -1, -0.01],
    size: [1, 2, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Földszint Bejárat",
  }, 
  {
    position: [-0.7, 0.2, -1],
    size: [8.5, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Földszint alsó szárny",
  },  
  {
    position: [-3.1, -4.2, -0.01],
    size: [5.6, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Földszint irodák",
  },
  //lépcső Lefele
  {
    position: [-4.79, 0.2, -0.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.58, 0.2, -0.3],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.37, 0.2, -0.5],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.16, 0.2, -0.7],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
    {
    position: [-3.95, 0.2, -0.9],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
 //lépcső Felfele
  {
    position: [-4.79, 1.5, 0.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.68, 1.5, 0.3],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.47, 1.5, 0.5],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.26, 1.5, 0.7],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.05, 1.5, 0.9],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-3.84, 1.5, 1.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  //termek
  {
    position: [-5.5, 9, 0.4],
    size: [1, 1.5, 1],
    color: "rgb(179, 191, 204)",
    label: "A005 Férfi WC",
    category: "WC",
  },
  {
    position: [-4, 8, 0.3],
    size: [2.3, 3, 1],
    color: "rgb(205, 226, 248)",
    label: "A007 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, 6.2, 0.3],
    size: [2.3, 1, 1],
    color: "rgb(248, 232, 191)",
    label: "A008 Előkészítő",
    category: "Előkészítő",
  },
  {
    position: [-4, 4.8, 0.8],
    size: [2.1, 2, 2],
    color: "rgb(205, 226, 248)",
    label: "A009 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, 3, 0.8],
    size: [2.1, 1.8, 2],
    color: "rgb(184, 227, 180)",
    label: "A010 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, -1.0, 0.8],
    size: [2, 2, 2],
    color: "rgb(205, 226, 248)",
    label: "A014 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, -2.85, 0.8],
    size: [2, 1.9, 2],
    color: "rgb(184, 227, 180)",
    label: "A015 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-5.3, -5.3, 0.5],
    size: [1.5, 1.5, 1],
    color: "rgb(234, 209, 220)",
    label: "A016 (tesi) Tanári szoba",
    category: "Tanári szoba",
  },
  {
    position: [-4.2, -5.3, 0.5],
    size: [1, 1.5, 1],
    color: "rgb(217, 210, 233)",
    label: "A017 Igazgató helyettes",
    category: "Irodák",
  },
  {
    position: [-2, -6.2, 0.9],
    size: [3.7, 3, 2],
    color: "rgb(159, 197, 232)",
    label: "A018 Informatika",
    category: "Informatika",
  },
  {
    position: [1.8, -4.5, 0.9],
    size: [4, 2.5, 2],
    color: "rgb(159, 197, 232)",
    label: "A023 Informatika",
    category: "Informatika",
  },
  {
    position: [-6.3, -1.4, 0.4],
    size: [1, 1, 1],
    color: "rgb(229, 192, 240)",
    label: "A024 Női WC",
    category: "WC",
  },
  {
    position: [-6.3, -0.5, 0.4],
    size: [1, 1, 1],
    color: "rgb(220, 230, 241)",
    label: "A026 Akadálymentes WC",
    category: "WC",
  },
  {
    position: [-7.3, -0.5, 0.4],
    size: [1, 1, 1],
    color: "rgb(236, 224, 155)",
    label: "A027 Porta",
    category: "Egyéb",
  },
  {
    position: [2.1, -1.0, -0.8],
    size: [2.2, 1.6, 0.5],
    color: "rgb(244, 204, 204)",
    label: "A034 Tornatermi öltöző",
    category: "Tornaterem",
  },
  {
    position: [4.8, 0.0, 0],
    size: [3.4, 3.6, 2],
    color: "rgb(234, 153, 153)",
    label: "A037 Tornaterem",
    category: "Tornaterem",
  },
];

const firstFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [20, 20, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ép. 1. emelet - Alap",
  },
  {
    position: [-5.4, 0.8, -0.01],
    size: [1.0, 14, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 1. emelet gerinc",
  },
  {
    position: [-1.6, -5.8, -0.01],
    size: [6.7, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 1. emelet irodák",
  },
 //lépcső lefele
  {
    position: [-4.79, -0.9, -0.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.58, -0.9, -0.3],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.37, -0.9, -0.5],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.16, -0.9, -0.7],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
    {
    position: [-3.95, -0.9, -0.9],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
//lépcső Felfele
{
    position: [-4.79, 0.2, 0.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.68, 0.2, 0.3],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.47, 0.2, 0.5],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.26, 0.2, 0.7],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.05, 0.2, 0.9],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-3.84, 0.2, 1.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  //termek
  {
    position: [-5.5, 8.4, 0.4],
    size: [1.0, 1.5, 1],
    color: "rgb(179, 191, 204)",
    label: "A103 Férfi WC",
    category: "WC",
  },
  {
    position: [-4, 8, 0.8],
    size: [2.1, 2.5, 2],
    color: "rgb(205, 226, 248)",
    label: "A105 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, 6.1, 0.8],
    size: [2.1, 1.6, 2],
    color: "rgb(205, 226, 248)",
    label: "A106 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, 4.5, 0.8],
    size: [2.1, 1.8, 2],
    color: "rgb(205, 226, 248)",
    label: "A108 Laboratórium",
    category: "Laboratórium",
  },
  {
    position: [-4, 2.9, 0.4],
    size: [2.1, 1.6, 1],
    color: "rgb(221, 217, 196)",
    label: "A109 Csoport szoba",
    category: "Egyéb",
  },
  {
    position: [-4, 1.7, 0.4],
    size: [2.1, 1, 1],
    color: "rgb(234, 209, 220)",
    label: "A110 Tanári szoba",
    category: "Tanári szoba",
  },
  {
    position: [-4, -2.1, 0.4],
    size: [2.1, 1, 1],
    color: "rgb(234, 209, 220)",
    label: "A116 Tanári szoba",
    category: "Tanári szoba",
  },
  {
    position: [-4, -3.2, 0.8],
    size: [2.2, 1.5, 2],
    color: "rgb(159, 197, 232)",
    label: "A117 Informatika",
    category: "Informatika",
  },
  {
    position: [-4, -4.6, 0.8],
    size: [2.2, 1.5, 2],
    color: "rgb(159, 197, 232)",
    label: "A118 Informatika",
    category: "Informatika",
  },
  {
    position: [-4.5, -7.1, 0.8],
    size: [3, 2, 2],
    color: "rgb(184, 227, 180)",
    label: "A119 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-1.9, -7.1, 0.8],
    size: [2.5, 2, 2],
    color: "rgb(159, 197, 232)",
    label: "A120 Informatika",
    category: "Informatika",
  },
  {
    position: [0.45, -7.1, 0.8],
    size: [2.5, 2, 2],
    color: "rgb(159, 197, 232)",
    label: "A121 Informatika",
    category: "Informatika",
  },
  {
    position: [3, -6.2, 0.8],
    size: [2.5, 2, 2],
    color: "rgb(184, 227, 180)",
    label: "A123 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-6.3, -3.8, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(229, 192, 240)",
    label: "A126 Női WC",
    category: "WC",
  },
  {
    position: [-6.3, -2.9, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(220, 230, 241)",
    label: "A127 Tanari WC",
    category: "WC",
  },
  {
    position: [-6.3, -2, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(220, 230, 241)",
    label: "A128 Akadálymentes WC",
    category: "WC",
  },    {
    position: [1, -2.7, -0.6],
    size: [2.0, 3.0, 0.9],
    color: "rgb(234, 209, 220)",
    label: "A131 Tanári szoba",
    category: "Tanári szoba",
  },  
  {
    position: [1.5, 0, -0.6],
    size: [1.0, 3.0, 0.9],
    color: "rgb(234, 209, 220)",
    label: "A132 Igazgató Helyettes",
    category: "Tanári szoba",
  },  
  {
    position: [0.7, 0.5, -0.6],
    size: [1.0, 2.0, 0.9],
    color: "rgb(231, 190, 208)",
    label: "A133 Tanári szoba",
    category: "Tanári szoba",
  },  
  {
    position: [-1.9, -0.9, -1],
    size: [6, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 1. emelet irodák",
  },
  {
    position: [0, -1 , -0.98],
    size: [8, 8, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ép. 1. emelet - Alap",
  },
];

const secondFloorRooms: RoomDefinition[] = [
  {
    position: [0, 0, -0.2],
    size: [20, 20, 0.12],
    color: "rgb(248, 250, 252)",
    opacity: 0.5,
    label: "A ép. 2. emelet - Alap",
  },
  {
    position: [-5.4, 0, -0.01],
    size: [1.0, 13, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 2. emelet gerinc",
  },
  {
    position: [-1.6, -5.8, -0.01],
    size: [6.7, 1.0, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 2. emelet irodák",
  },
  {
    position: [2.2, -6.3, -0.01],
    size: [1, 2, 0.08],
    color: "rgb(201, 209, 224)",
    opacity: 0.28,
    label: "Folyosó - 2. emelet irodák",
  },
//lépcső lefele
  {
    position: [-4.79, -2, -0.1],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.58, -2, -0.3],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.37, -2, -0.5],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-4.16, -2, -0.7],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
    {
    position: [-3.95, -2, -0.9],
    size: [0.2, 1, 0.2],
    color: "rgb(201, 209, 224)",
    opacity: 0.4,
    label: "Folyosó - Lépcső",
  },
  {
    position: [-5.5, 7, 0.4],
    size: [1.0, 1.5, 1],
    color: "rgb(179, 191, 204)",
    label: "A203 Férfi WC",
    category: "WC",
  },
  {
    position: [-4, 6.5, 0.8],
    size: [2.1, 2.3, 2],
    color: "rgb(184, 227, 180)",
    label: "A205 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, 4.6, 0.8],
    size: [2.1, 1.8, 2],
    color: "rgb(184, 227, 180)",
    label: "A206 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, 3.3, 0.4],
    size: [2.1, 1, 1],
    color: "rgb(248, 232, 191)",
    label: "A207 Előkészítő",
    category: "Előkészítő",
  },
  {
    position: [-4, 2, 0.8],
    size: [2.1, 1.8, 2],
    color: "rgb(162, 196, 201)",
    label: "A208 Fizika előadó",
    category: "Egyéb",
  },
  {
    position: [-4, 0.7, 0.4],
    size: [2.1, 1.0, 1],
    color: "rgb(234, 209, 220)",
    label: "A209 Tanári szoba",
    category: "Tanári szoba",
  },
  {
    position: [-4, -0.6, 0.8],
    size: [2.1, 1.8, 2],
    color: "rgb(184, 227, 180)",
    label: "A210 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, -3.2, 0.8],
    size: [2.2, 1.5, 2],
    color: "rgb(184, 227, 180)",
    label: "A215 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4, -4.6, 0.8],
    size: [2.2, 1.5, 2],
    color: "rgb(184, 227, 180)",
    label: "A216 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-4.5, -7.1, 0.8],
    size: [2.9, 2.0, 2],
    color: "rgb(184, 227, 180)",
    label: "A217 Tanterem",
    category: "Tanterem",
  },
  {
    position: [-1.9, -7.1, 0.8],
    size: [2.4, 2.0, 2],
    color: "rgb(184, 227, 180)",
    label: "A218 Tanterem",
    category: "Tanterem",
  },
  {
    position: [0.45, -7.1, 0.4],
    size: [2.4, 2.0, 1],
    color: "rgb(234, 209, 220)",
    label: "A219 Tanári szoba",
    category: "Tanári szoba",
  },
  {
    position: [2.8, -8.0, 0.8],
    size: [2.5, 1.4, 2],
    color: "rgb(184, 227, 180)",
    label: "A220 Tanterem",
    category: "Tanterem",
  },
  {
    position: [4, -6.2, 0.8],
    size: [2.5, 2.0, 2],
    color: "rgb(159, 197, 232)",
    label: "A222 Informatika",
    category: "Informatika",
  },
  {
    position: [-6.3, -4.8, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(229, 192, 240)",
    label: "A224 Női WC",
    category: "WC",
  },
  {
    position: [-6.3, -3.9, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(220, 230, 241)",
    label: "A225 Tanari WC",
    category: "WC",
  },
  {
    position: [-6.3, -3, 0.4],
    size: [1.0, 1.0, 1],
    color: "rgb(220, 230, 241)",
    label: "A226 Akadálymentes WC",
    category: "WC",
  },
  {
    position: [-6.4, -2.0, 0.4],
    size: [1.3, 1.0, 1],
    color: "rgb(234, 209, 220)",
    label: "A213 Tanári szoba",
    category: "Tanári szoba",
  },  
];

export const floorGroups: FloorGroupDefinition[] = [
  { position: [0, 0, -3], scale: 0.42, rooms: groundFloorRooms, floor: 1 },
  {
    position: [0, 1, 0],
    scale: 0.42,
    rooms: firstFloorRooms,
    floor: 2,
  },
  {
    position: [0, 1, 3],
    scale: 0.42,
    rooms: secondFloorRooms,
    floor: 3,
  },
];
