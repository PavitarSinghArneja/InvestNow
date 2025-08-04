# 🚀 InvestNow - AI-Powered Robo Advisor

<div align="center">

![InvestNow Logo](https://img.shields.io/badge/InvestNow-AI%20Robo%20Advisor-blue?style=for-the-badge&logo=chart-line)

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A sophisticated AI-powered investment advisor that provides personalized portfolio recommendations based on real market data and advanced analytics.**

[🎯 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📊 Screenshots](#-screenshots) • [🔧 API Documentation](#-api-documentation)

</div>

---

## 🌟 Overview

InvestNow is a full-stack robo advisor application that combines the power of machine learning with modern web technologies to provide intelligent investment recommendations. Built with React frontend and Python backend, it analyzes real Nifty 50 stock data to generate optimized portfolios tailored to individual risk profiles.

### ✨ What Makes InvestNow Special?

- **🧠 AI-Powered Analytics**: Uses ARIMA modeling and portfolio optimization algorithms
- **📈 Real Market Data**: Analyzes actual Nifty 50 historical stock prices
- **🎯 Personalized Recommendations**: Tailored to individual risk tolerance and investment goals
- **📊 Interactive Visualizations**: Beautiful charts and graphs for portfolio insights
- **🔒 Secure & Fast**: Modern architecture with robust security practices

---

## 🎯 Features

### 🎨 Frontend Features
- **Modern UI/UX** - Clean, responsive design built with React & Tailwind CSS
- **Interactive Dashboard** - Real-time portfolio visualization with Recharts
- **Smart Forms** - Intuitive investment input with validation
- **Authentication System** - Secure user login and session management
- **Mobile Responsive** - Works seamlessly across all device sizes

### 🧮 Backend Features
- **Portfolio Optimization** - Advanced algorithms using Sharpe ratio and risk analysis
- **Market Data Analysis** - Real-time processing of Nifty 50 stock data
- **Risk Assessment** - Intelligent risk profiling based on user preferences
- **Sector Diversification** - Automatic diversification across multiple sectors
- **RESTful API** - Clean, documented API endpoints

### 📊 Analytics & Intelligence
- **ARIMA Forecasting** - Time series analysis for price predictions
- **Sharpe Ratio Optimization** - Risk-adjusted return maximization
- **Volatility Analysis** - Advanced risk metrics calculation
- **Sector Mapping** - Intelligent categorization of stocks by industry
- **Growth Projections** - 5-year portfolio growth estimates

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Python 3.10+** 
- **Node.js 18+** & **npm**
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PavitarSinghArneja/InvestNow.git
cd InvestNow
```

### 2️⃣ Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask API server
python app.py
```

The backend will start on `http://localhost:5001`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4️⃣ Access the Application

Open your browser and navigate to `http://localhost:5173`

**Demo Credentials**: Use any email and password to login (demo mode)

---

## 📁 Project Structure

```
InvestNow/
├── 📁 FrontEnd/              # React TypeScript application
│   ├── 📁 src/
│   │   ├── 📁 components/    # React components
│   │   ├── 📁 hooks/         # Custom React hooks
│   │   ├── 📁 types/         # TypeScript type definitions
│   │   ├── 📁 utils/         # Utility functions & API calls
│   │   └── 📁 data/          # Data models and schemas
│   ├── 📄 package.json      # Frontend dependencies
│   └── 📄 vite.config.ts    # Vite configuration
├── 📄 app.py                # Flask backend server
├── 📄 prediction.py         # Original ML analysis script
├── 📄 requirements.txt      # Python dependencies
├── 📊 nifty_50.xlsx         # Historical stock data
└── 📄 README.md             # This file
```

---

## 🔧 API Documentation

### Base URL
```
http://localhost:5001
```

### Endpoints

#### 🏥 Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "data_status": "loaded",
  "available_stocks": 50
}
```

#### 💼 Generate Portfolio
```http
POST /api/generate-portfolio
```
**Request Body:**
```json
{
  "amount": 100000,
  "riskTolerance": "medium"
}
```

**Response:**
```json
{
  "allocation": {
    "stocks": 60,
    "bonds": 30,
    "cash": 10
  },
  "riskLevel": "medium",
  "investmentAmount": 100000,
  "predictions": [...],
  "stockRecommendations": [...],
  "averageReturn": 12.5,
  "averageRisk": 15.2
}
```

---

## 📊 Screenshots

### 🎨 Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/1E40AF/FFFFFF?text=Portfolio+Dashboard)

### 📈 Investment Form
![Investment Form](https://via.placeholder.com/800x400/059669/FFFFFF?text=Investment+Form)

### 💹 Stock Recommendations
![Stock Recommendations](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Stock+Analysis)

---

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 18** - Modern UI library
- **📘 TypeScript** - Type-safe JavaScript
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **📊 Recharts** - Data visualization library
- **🧭 React Router** - Client-side routing
- **⚡ Vite** - Fast build tool

### Backend
- **🐍 Python 3.10** - Core backend language
- **🌶️ Flask** - Lightweight web framework
- **🔗 Flask-CORS** - Cross-origin resource sharing
- **🐼 Pandas** - Data manipulation and analysis
- **🔢 NumPy** - Numerical computing
- **📈 Scikit-learn** - Machine learning library
- **📊 Statsmodels** - Statistical modeling

### Data & Analytics
- **📈 ARIMA Models** - Time series forecasting
- **⚖️ Portfolio Theory** - Modern portfolio optimization
- **📊 Excel Integration** - Real market data processing
- **🎯 Risk Analytics** - Advanced risk assessment

---

## 🚀 Deployment

### Production Deployment

#### Backend (Flask)
```bash
# Using Gunicorn for production
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

#### Frontend (React)
```bash
# Build for production
npm run build

# Serve static files
npm install -g serve
serve -s dist -l 3000
```

### Docker Deployment
```dockerfile
# Example Dockerfile for backend
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["python", "app.py"]
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔃 Open** a Pull Request

### 📋 Development Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📈 Roadmap

### 🎯 Upcoming Features
- [ ] **Real-time Market Data** - Live stock price integration
- [ ] **Advanced ML Models** - LSTM and transformer models
- [ ] **Portfolio Backtesting** - Historical performance analysis
- [ ] **Social Trading** - Community-driven insights
- [ ] **Mobile App** - React Native implementation
- [ ] **Cryptocurrency Support** - Crypto portfolio optimization

### 🔮 Future Enhancements
- [ ] **Advanced Risk Models** - VaR and CVaR analysis
- [ ] **ESG Integration** - Sustainable investing options
- [ ] **Multi-Asset Support** - Bonds, commodities, REITs
- [ ] **International Markets** - Global diversification
- [ ] **Tax Optimization** - Tax-efficient portfolio management

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

**Pavitar Singh Arneja**
- 🌐 GitHub: [@PavitarSinghArneja](https://github.com/PavitarSinghArneja)
- 📧 Email: [pavitar.arneja@gmail.com](mailto:pavitar.arneja@gmail.com)
- 💼 LinkedIn: [Pavitar Singh Arneja]((https://www.linkedin.com/in/pavitar-arneja/))

**Isha Chandravanshi**
- ⁠🌐 GitHub: [@Shadowfalls123](https://github.com/shadowfalls123)
- 📧 Email: [ishachandravanshi06@gmail.com](mailto:ishachandravanshi06@gmail.com)
- ⁠💼 LinkedIn: [Isha Chandravanshi](https://www.linkedin.com/in/Isha-Chandravanshi/)

---

## 🙏 Acknowledgments

- **Nifty 50 Data** - Historical market data for Indian stock market
- **Modern Portfolio Theory** - Harry Markowitz's portfolio optimization
- **Open Source Community** - Amazing libraries and frameworks used

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=PavitarSinghArneja/InvestNow&type=Date)](https://star-history.com/#PavitarSinghArneja/InvestNow&Date)

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star! ⭐

**Made with ❤️ by [Pavitar Singh Arneja](https://github.com/PavitarSinghArneja) & [Isha Chandravanshi](https://github.com/shadowfalls123)**

</div>
Contribution by Isha Chandravanshi on August 4, 2025
