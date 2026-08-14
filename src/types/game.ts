export type Game = {
  id: string;
  name: string;
  description: string;
  icon: string;
  href?: string;
  status: "可游玩" | "即将开放";
};
