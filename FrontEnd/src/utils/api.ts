import { InvestmentInput, PortfolioResponse } from '../types';

const API_BASE_URL = 'http://localhost:5001';

// API functions connected to Python backend
export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  // Simple authentication - accepts any valid email/password for demo
  await new Promise(resolve => setTimeout(resolve, 1000));
  return email.length > 0 && password.length > 0;
};

export const generatePortfolio = async (input: InvestmentInput): Promise<PortfolioResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate portfolio');
    }

    const data = await response.json();
    
    return {
      allocation: data.allocation,
      riskLevel: data.riskLevel,
      investmentAmount: data.investmentAmount,
      predictions: data.predictions,
      stockRecommendations: data.stockRecommendations,
      totalStocks: data.totalStocks,
      averageReturn: data.averageReturn,
      averageRisk: data.averageRisk
    };
  } catch (error) {
    console.error('Error generating portfolio:', error);
    throw new Error('Failed to connect to portfolio service. Please ensure the Python backend is running.');
  }
};

export const checkBackendHealth = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await response.json();
  } catch (error) {
    throw new Error('Backend service is not available');
  }
};

export const getPredictions = async (portfolioId: string): Promise<any> => {
  // Legacy function - predictions are now included in generatePortfolio
  await new Promise(resolve => setTimeout(resolve, 500));
  return { status: 'ready' };
};