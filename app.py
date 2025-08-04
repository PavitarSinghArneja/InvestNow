from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Load and prepare data on startup
def load_data():
    try:
        df = pd.read_excel("nifty_50.xlsx", engine="openpyxl")
        df.rename(columns={df.columns[0]: "Date"}, inplace=True)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df.dropna(subset=['Date'], inplace=True)
        df.set_index('Date', inplace=True)
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

# Global data variable
df = load_data()

def calculate_portfolio_metrics(df):
    """Calculate returns, risk, and other metrics for each stock"""
    if df is None:
        return None
    
    # Calculate daily returns
    daily_returns = df.pct_change().dropna()
    
    # Calculate annual metrics
    annual_returns = daily_returns.mean() * 252  # 252 trading days
    annual_volatility = daily_returns.std() * np.sqrt(252)
    
    # Calculate Sharpe ratio (assuming risk-free rate of 3%)
    risk_free_rate = 0.03
    sharpe_ratio = (annual_returns - risk_free_rate) / annual_volatility
    
    return {
        'returns': annual_returns,
        'volatility': annual_volatility,
        'sharpe': sharpe_ratio
    }

def get_sector_mapping():
    """Define sector mapping for stocks"""
    return {
        'SBI Life Insurance': 'Financials',
        'HDFC Life Insurance': 'Financials', 
        'NTPC': 'Energy',
        'Britannia Industries': 'Consumer Goods',
        'UltraTech Cement': 'Materials',
        'Grasim Industries': 'Materials',
        'Cipla': 'Healthcare',
        'Axis Bank': 'Financials',
        'ITC': 'Consumer Goods',
        'HCL Technologies': 'Technology',
        'Reliance Industries': 'Energy',
        'Tata Consultancy Services': 'Technology',
        'Infosys': 'Technology',
        'HDFC Bank': 'Financials',
        'ICICI Bank': 'Financials',
        'Hindustan Unilever': 'Consumer Goods',
        'Bharti Airtel': 'Telecom',
        'Kotak Mahindra Bank': 'Financials',
        'Larsen & Toubro': 'Infrastructure',
        'Maruti Suzuki': 'Automotive'
    }

def optimize_portfolio(investment_amount, risk_tolerance):
    """Generate optimized portfolio based on user inputs"""
    if df is None:
        return None
    
    metrics = calculate_portfolio_metrics(df)
    if metrics is None:
        return None
    
    # Create portfolio dataframe
    portfolio_df = pd.DataFrame({
        'Expected_Return': metrics['returns'],
        'Risk': metrics['volatility'],
        'Sharpe': metrics['sharpe']
    })
    
    # Remove invalid entries
    portfolio_df = portfolio_df.dropna()
    
    # Normalize scores (0-1)
    portfolio_df['Return_Score'] = (portfolio_df['Expected_Return'] - portfolio_df['Expected_Return'].min()) / \
                                   (portfolio_df['Expected_Return'].max() - portfolio_df['Expected_Return'].min())
    
    portfolio_df['Risk_Score'] = (portfolio_df['Risk'].max() - portfolio_df['Risk']) / \
                                 (portfolio_df['Risk'].max() - portfolio_df['Risk'].min())
    
    # Weighted scoring based on risk tolerance
    if risk_tolerance == 'high':
        portfolio_df['Final_Score'] = 0.8 * portfolio_df['Return_Score'] + 0.2 * portfolio_df['Risk_Score']
    elif risk_tolerance == 'medium':
        portfolio_df['Final_Score'] = 0.5 * portfolio_df['Return_Score'] + 0.5 * portfolio_df['Risk_Score']
    else:  # low
        portfolio_df['Final_Score'] = 0.2 * portfolio_df['Return_Score'] + 0.8 * portfolio_df['Risk_Score']
    
    # Select top stocks
    top_stocks = portfolio_df.sort_values(by='Final_Score', ascending=False).head(10)
    
    # Normalize weights
    top_stocks['Weight'] = top_stocks['Final_Score'] / top_stocks['Final_Score'].sum()
    
    # Calculate individual allocations
    top_stocks['Investment'] = top_stocks['Weight'] * investment_amount
    
    return top_stocks

def generate_predictions(investment_amount, risk_tolerance):
    """Generate portfolio growth predictions"""
    # Base growth rates by risk tolerance
    growth_rates = {
        'low': 0.04,      # 4% annual
        'medium': 0.06,   # 6% annual  
        'high': 0.08      # 8% annual
    }
    
    volatilities = {
        'low': 0.05,      # 5% volatility
        'medium': 0.10,   # 10% volatility
        'high': 0.15      # 15% volatility
    }
    
    growth_rate = growth_rates.get(risk_tolerance, 0.06)
    volatility = volatilities.get(risk_tolerance, 0.10)
    
    predictions = []
    
    # Generate monthly predictions for 5 years
    for month in range(0, 61, 6):  # Every 6 months
        # Compound growth
        base_value = investment_amount * ((1 + growth_rate/12) ** month)
        
        # Add some realistic volatility
        noise_factor = 1 + (np.random.normal(0, volatility/12) * np.sqrt(month/12))
        predicted_value = base_value * max(0.5, noise_factor)  # Prevent negative values
        
        predictions.append({
            'month': month,
            'value': int(predicted_value)
        })
    
    return predictions

@app.route('/api/generate-portfolio', methods=['POST'])
def generate_portfolio_api():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        investment_amount = data.get('amount')
        risk_tolerance = data.get('riskTolerance')
        
        if not investment_amount or not risk_tolerance:
            return jsonify({'error': 'Missing required fields'}), 400
        
        if investment_amount < 100:
            return jsonify({'error': 'Minimum investment amount is $100'}), 400
        
        # Generate optimized portfolio
        portfolio = optimize_portfolio(investment_amount, risk_tolerance)
        
        if portfolio is None:
            return jsonify({'error': 'Unable to generate portfolio'}), 500
        
        # Calculate asset allocation based on selected stocks
        sector_mapping = get_sector_mapping()
        
        # Create simplified allocation for frontend
        total_stocks_weight = 100  # All in stocks for now, can be adjusted
        
        # For simplicity, create standard allocations based on risk tolerance
        if risk_tolerance == 'low':
            allocation = {'stocks': 30, 'bonds': 60, 'cash': 10}
        elif risk_tolerance == 'high':
            allocation = {'stocks': 80, 'bonds': 15, 'cash': 5}
        else:  # medium
            allocation = {'stocks': 60, 'bonds': 30, 'cash': 10}
        
        # Generate predictions
        predictions = generate_predictions(investment_amount, risk_tolerance)
        
        # Prepare detailed stock recommendations
        stock_recommendations = []
        for stock_name, row in portfolio.head(5).iterrows():  # Top 5 stocks
            stock_recommendations.append({
                'name': stock_name,
                'allocation_percentage': round(row['Weight'] * 100, 2),
                'investment_amount': round(row['Investment'], 2),
                'expected_return': round(row['Expected_Return'] * 100, 2),
                'risk_level': round(row['Risk'] * 100, 2),
                'sector': sector_mapping.get(stock_name, 'Other')
            })
        
        response = {
            'allocation': allocation,
            'riskLevel': risk_tolerance,
            'investmentAmount': investment_amount,
            'predictions': predictions,
            'stockRecommendations': stock_recommendations,
            'totalStocks': len(portfolio),
            'averageReturn': round(portfolio['Expected_Return'].mean() * 100, 2),
            'averageRisk': round(portfolio['Risk'].mean() * 100, 2)
        }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error generating portfolio: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    data_status = "loaded" if df is not None else "error"
    return jsonify({
        'status': 'healthy',
        'data_status': data_status,
        'available_stocks': len(df.columns) if df is not None else 0
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'RoboAdvisor API is running',
        'endpoints': [
            '/api/generate-portfolio',
            '/api/health'
        ]
    })

if __name__ == '__main__':
    print("Starting RoboAdvisor API...")
    print(f"Data loaded: {df is not None}")
    if df is not None:
        print(f"Available stocks: {len(df.columns)}")
        print(f"Date range: {df.index.min()} to {df.index.max()}")
    
    app.run(debug=True, host='0.0.0.0', port=5001)