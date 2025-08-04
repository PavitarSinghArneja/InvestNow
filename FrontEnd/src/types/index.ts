export interface User {
  id: string;
  email: string;
}

export interface InvestmentInput {
  amount: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface PortfolioAllocation {
  stocks: number;
  bonds: number;
  cash: number;
  reits?: number;
  commodities?: number;
}

export interface PredictionPoint {
  month: number;
  value: number;
}

export interface StockRecommendation {
  name: string;
  allocation_percentage: number;
  investment_amount: number;
  expected_return: number;
  risk_level: number;
  sector: string;
}

export interface PortfolioResponse {
  allocation: PortfolioAllocation;
  riskLevel: string;
  investmentAmount: number;
  predictions: PredictionPoint[];
  stockRecommendations?: StockRecommendation[];
  totalStocks?: number;
  averageReturn?: number;
  averageRisk?: number;
}