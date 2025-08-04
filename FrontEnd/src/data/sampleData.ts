import { PortfolioAllocation, PredictionPoint } from '../types';

export const getSampleAllocation = (riskTolerance: string, amount: number): PortfolioAllocation => {
  switch (riskTolerance) {
    case 'low':
      return {
        stocks: 30,
        bonds: 60,
        cash: 10
      };
    case 'high':
      return {
        stocks: 80,
        bonds: 15,
        cash: 5
      };
    default: // medium
      return {
        stocks: 60,
        bonds: 30,
        cash: 10
      };
  }
};

export const getSamplePredictions = (amount: number, riskTolerance: string): PredictionPoint[] => {
  const growthRate = riskTolerance === 'high' ? 0.08 : riskTolerance === 'medium' ? 0.06 : 0.04;
  const volatility = riskTolerance === 'high' ? 0.15 : riskTolerance === 'medium' ? 0.10 : 0.05;
  
  const predictions: PredictionPoint[] = [];
  
  for (let month = 0; month <= 60; month += 6) {
    const baseGrowth = amount * Math.pow(1 + growthRate/12, month);
    const noise = (Math.random() - 0.5) * volatility * baseGrowth;
    predictions.push({
      month,
      value: Math.round(baseGrowth + noise)
    });
  }
  
  return predictions;
};