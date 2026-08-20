import { ChartCandlestick, FileClock, SquarePen, Wallet } from "lucide-react";

export const MENU_BOARD = [
  // {
  //   id: "favourite",
  //   title: "watchlist",
  // },
  {
    id: "VN30",
    title: "VN30",
    children: [
      {
        id: "VN30",
        title: "VN30",
      },
      {
        id: "VN100",
        title: "VN100",
      },
    ],
  },
  {
    id: "HNX30",
    title: "HNX30",
  },
  {
    id: "HOSE",
    title: "HOSE",
  },
  {
    id: "HNX",
    title: "HNX",
  },
  {
    id: "UPCOM",
    title: "UPCOM",
  },
];

export const VALID_TOPICS = [
  "VN30",
  "VN100",
  "HNX30",
  "HNX",
  "HOSE",
  "UPCOM",
] as const;

export const MENU_ITEMS = [
  { key: "BOARD", label: "menu.board", icon: ChartCandlestick, link: "/" },
  { key: "ORDER", label: "menu.order", icon: SquarePen, link: "/order" },
  { key: "ASSET", label: "menu.asset", icon: Wallet, link: "/asset" },
  {
    key: "STATEMENT",
    label: "menu.statement",
    icon: FileClock,
    link: "/statement",
  },
];

export const MENU_ORDER = [
  {
    key: "BASE",
    label: "order.normal",
  },
  // {
  //   key: "COND",
  //   label: "order.conditional",
  // },
];

export const MENU_HISTORY = [
  {
    key: "ORDER",
    label: "menu.orders",
  },
  {
    key: "CATEGORY",
    label: "menu.portfolio",
  },
  {
    key: "ASSET",
    label: "menu.asset",
  },
];