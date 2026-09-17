export type AssetState = {
  assetSummary: AssetSummary | null;

  loading: {
    assetSummary: boolean;
  };

  error: {
    assetSummary: string | null;
  };
};

export type AssetSummary = {
  cashBalance: number;
  reservedBalance: number;
  portfolioValue: number;
  totalAssets: number;
  availableBalance: number;
  portfolio: PortfolioItem[];
  portfolioSummary: PortfolioSummary;
};

export type PortfolioItem = {
  symbol: string;
  quantity: number;
  avgCost: number;
  marketPrice: number; // giá tham chiếu = giá khớp gần nhất của mã đó
  costValue: number; // quantity * avgCost — tổng vốn đã bỏ ra
  marketValue: number; // quantity * marketPrice — giá trị theo giá thị trường hiện tại
  unrealizedPnL: number; // marketValue - costValue — lãi/lỗ chưa thực hiện
  unrealizedPnLPercent: number;
};

export type PortfolioSummary = {
  totalCostValue: number;
  totalMarketValue: number;
  totalUnrealizedPnL: number;
  totalUnrealizedPnLPercent: number;
};
