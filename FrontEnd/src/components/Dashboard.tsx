import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, DollarSign, PieChart as PieChartIcon, Building2, Percent } from 'lucide-react';
import { PortfolioResponse } from '../types';

const COLORS = {
  stocks: '#1E40AF',
  bonds: '#059669',
  cash: '#D97706',
  reits: '#7C3AED',
  commodities: '#DC2626'
};

export default function Dashboard() {
  const [portfolioData, setPortfolioData] = useState<PortfolioResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('portfolioResult');
    if (!stored) {
      navigate('/investment');
      return;
    }

    try {
      const data = JSON.parse(stored);
      setPortfolioData(data);
    } catch (error) {
      navigate('/investment');
    }
  }, [navigate]);

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  const pieData = Object.entries(portfolioData.allocation).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: COLORS[key as keyof typeof COLORS]
  }));

  const totalValue = portfolioData.predictions[portfolioData.predictions.length - 1]?.value || portfolioData.investmentAmount;
  const totalGrowth = totalValue - portfolioData.investmentAmount;
  const growthPercentage = (totalGrowth / portfolioData.investmentAmount) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/investment')}
            className="flex items-center text-blue-700 hover:text-blue-800 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Investment Form
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Investment Recommendations
            </h1>
            <p className="text-lg text-gray-600">
              Based on ${portfolioData.investmentAmount.toLocaleString()} investment with {portfolioData.riskLevel} risk tolerance
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Initial Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${portfolioData.investmentAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projected Value (5 years)</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <PieChartIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expected Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {growthPercentage > 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stock Recommendations Section */}
          {portfolioData.stockRecommendations && portfolioData.stockRecommendations.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <Building2 className="h-6 w-6 text-blue-700 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Top Stock Recommendations</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioData.stockRecommendations.slice(0, 6).map((stock, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{stock.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Allocation:</span>
                        <span className="font-medium">{stock.allocation_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">${stock.investment_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Return:</span>
                        <span className="font-medium text-green-600">{stock.expected_return}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className="font-medium text-orange-600">{stock.risk_level}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {portfolioData.averageReturn && portfolioData.averageRisk && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <Percent className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-medium">Average Expected Return</p>
                    <p className="text-2xl font-bold text-green-900">{portfolioData.averageReturn}%</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-orange-800 font-medium">Average Risk Level</p>
                    <p className="text-2xl font-bold text-orange-900">{portfolioData.averageRisk}%</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-800 font-medium">Total Stocks Analyzed</p>
                    <p className="text-2xl font-bold text-blue-900">{portfolioData.totalStocks}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Allocation */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Asset Allocation</h2>
              
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{item.value}%</span>
                      <div className="text-sm text-gray-600">
                        ${Math.round(portfolioData.investmentAmount * item.value / 100).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* Growth Projection */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Growth Projection</h2>
            
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={portfolioData.predictions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value}m`}
                />
                <YAxis 
                  stroke="#6b7280"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  labelFormatter={(value) => `Month ${value}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1E40AF" 
                  strokeWidth={3}
                  dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Projection Note:</strong> This projection is based on analysis of historical Nifty 50 data and ARIMA modeling. 
                Actual returns may vary and past performance does not guarantee future results.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}