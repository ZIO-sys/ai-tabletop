import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "gomoku",
    name: "五子棋",
    description: "经典连珠对弈，本地双人轮流落子",
    icon: "●",
    href: "/games/gomoku",
    status: "可游玩",
  },
  {
    id: "uno",
    name: "UNO",
    description: "欢乐的颜色与数字卡牌游戏",
    icon: "◇",
    status: "即将开放",
  },
];
