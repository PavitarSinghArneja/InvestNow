import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Target } from 'lucide-react';
import { generatePortfolio } from '../utils/api';
import { InvestmentInput } from '../types';

export default function InvestmentForm() {
  const [amount, setAmount] = useState('');
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    
    const number = parseInt(numericValue);
    return number.toLocaleString();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setAmount(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''));
    
    if (!numericAmount || numericAmount < 100) {
      setError('Please enter an investment amount of at least $100');
      return;
    }

    if (numericAmount > 10000000) {
      setError('Investment amount cannot exceed $10,000,000');
      return;
    }

    setIsLoading(true);

    try {
      const input: InvestmentInput = {
        amount: numericAmount,
        riskTolerance
      };

      const result = await generatePortfolio(input);
      
      // Store result in sessionStorage for the dashboard
      sessionStorage.setItem('portfolioResult', JSON.stringify(result));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Investment Recommendations
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your investment goals and we'll create a personalized portfolio for you
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="10,000"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the amount you'd like to invest (minimum $100)
                </p>
              </div>

              <div>
                <label htmlFor="risk" className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="risk"
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(e.target.value as 'low' | 'medium' | 'high')}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg appearance-none bg-white"
                  >
                    <option value="low">Low Risk - Conservative approach with stable returns</option>
                    <option value="medium">Medium Risk - Balanced growth and stability</option>
                    <option value="high">High Risk - Aggressive growth potential</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Choose your comfort level with investment risk
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 py-3 px-4 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Your Investment...
                  </div>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}