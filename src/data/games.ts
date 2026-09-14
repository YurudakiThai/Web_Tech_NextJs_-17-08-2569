import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "g1",
    name: "Hades",
    platform: "PC",
    hours: 30,
    status: "finished",
  },
  {
    id: "g2",
    name: "Hollow Knight",
    platform: "Switch",
    hours: 40,
    status: "playing",
  },
  {
    id: "g3",
    name: "Stardew Valley",
    platform: "PC",
    hours: 60,
    status: "not-started",
  },
  {
    id: "g4",
    name: "Celeste",
    platform: "PlayStation",
    hours: 15,
    status: "not-started",
  },
  {
    id: "g5",
    name: "Vampire Survivors",
    platform: "Mobile",
    hours: 20,
    status: "not-started",
  },
];
