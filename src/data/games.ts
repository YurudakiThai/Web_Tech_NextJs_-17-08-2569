import type { Game } from "@/src/types/game";

export const games: Game[] = [
  {
    id: "g1",
    name: "Warhammer 40,000: Space Marine 2",
    platform: "PC",
    hours: 40,
    status: "playing",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2183900/header.jpg",
  },
  {
    id: "g2",
    name: "Roblox",
    platform: "PC",
    hours: 100,
    status: "finished",
    image: "https://i.redd.it/b3evfee0vb571.png",
  },
  {
    id: "g3",
    name: "Counter-Strike 2",
    platform: "PC",
    hours: 250,
    status: "playing",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    id: "g4",
    name: "Grand Theft Auto V",
    platform: "PC",
    hours: 80,
    status: "not-started",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
  },
  {
    id: "g5",
    name: "SCP: Secret Laboratory",
    platform: "PC",
    hours: 60,
    status: "not-started",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/700330/header.jpg",
  },
];
