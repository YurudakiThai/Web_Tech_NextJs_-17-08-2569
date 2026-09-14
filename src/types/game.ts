export const GAME_STATUSES = ["not-started", "playing", "finished"] as const;

export type GameStatus = (typeof GAME_STATUSES)[number];
export type Game = {
  id: string;
  name: string;
  platform: string;
  hours: number;
  status: GameStatus;
  image: string;
};

export const GAME_STATUS_LABELS: Record<GameStatus, string> = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  finished: "เล่นจบแล้ว",
};
