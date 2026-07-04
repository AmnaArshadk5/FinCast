# FinCast 📈

FinCast is a modern, web-based financial toolkit designed for professionals, students, and businesses to evaluate capital investments, analyze company performance through key financial ratios, and visualize results on an interactive dashboard. 

Built entirely using **HTML5**, **CSS3 (Flexbox/Grid/Gradients)**, and **Vanilla JavaScript**, it uses **Chart.js** for interactive data visualization and leverages browser **Local Storage** for client-side data persistence.

---

## 📋 Table of Contents

1. [Features](#-features)
   - [1. Financial Ratio Analyzer](#1-financial-ratio-analyzer)
   - [2. Capital Budgeting Calculator](#2-capital-budgeting-calculator)
   - [3. Interactive Project Health Dashboard](#3-interactive-project-health-dashboard)
2. [Calculated Financial Metrics](#-calculated-financial-metrics)
   - [Financial Ratios](#financial-ratios)
   - [Capital Budgeting Metrics](#capital-budgeting-metrics)
3. [Technology Stack](#-technology-stack)
4. [File Structure](#-file-structure)
5. [Getting Started & Usage](#-getting-started--usage)
6. [Future Enhancements](#-future-enhancements)
7. [License](#-license)

---

## ✨ Features

### 1. Financial Ratio Analyzer
* Takes **21 financial data points** as inputs (including Assets, Liabilities, COGS, EBIT, Interest Expense, Net Income, Equity, Share price metrics, and Cash Flow).
* Dynamically calculates and categorizes ratios into **5 vital dimensions of financial analysis**: Liquidity, Asset Management, Debt Management, Profitability, and Market Value.
* Persists calculated data to Local Storage.

### 2. Capital Budgeting Calculator
* Computes key metrics for project appraisal: NPV, IRR, MIRR, PI, and Payback periods.
* Supports **dynamic cash flow inputs** (add or remove project years on the fly).
* Implements numerical root-finding algorithms (bisection method) in pure JavaScript to approximate the **Internal Rate of Return (IRR)**.
* Offers a seamless transition to the Interactive Dashboard.

### 3. Interactive Project Health Dashboard
* Powered by **Chart.js** with customized color palettes and responsive layouts.
* **Bar Chart**: Visualizes project's **Internal Rate of Return (IRR)** vs. the **Discount Rate**.
* **Line Chart**: Traces the **Cumulative Cash Flow** over time to visually identify the payback point.
* **Doughnut Chart**: Compares the project **NPV** to the **Initial Investment**.
* **NPV & PI Gauges**: Beautiful center-text gauge charts showing performance.
* **Smart Decision Engine**: Generates automated suggestions based on rules (e.g., advising investment if Profitability Index is high, or suggesting caution/rejection if PI < 1).

---

## 📊 Calculated Financial Metrics

### Financial Ratios

| Category | Ratios Computed | Formula / Description |
| :--- | :--- | :--- |
| **Liquidity** | Current Ratio | $\text{Current Assets} / \text{Current Liabilities}$ |
| | Quick Ratio | $(\text{Current Assets} - \text{Inventory}) / \text{Current Liabilities}$ |
| **Asset Management** | Inventory Turnover | $\text{COGS} / \text{Inventory}$ |
| | Days Sales Outstanding (DSO) | $(\text{Accounts Receivable} / \text{Sales}) \times 365$ |
| | Fixed Assets Turnover | $\text{Sales} / \text{Fixed Assets}$ |
| | Total Assets Turnover | $\text{Sales} / \text{Total Assets}$ |
| **Debt Management**| Debt Ratio | $\text{Total Debt} / \text{Total Assets}$ |
| | Liabilities to Assets Ratio | $\text{Total Liabilities} / \text{Total Assets}$ |
| | Times Interest Earned (TIE)| $\text{EBIT} / \text{Interest Expense}$ |
| | EBITDA Coverage Ratio | $(\text{EBITDA} + \text{Leases}) / (\text{Interest} + \text{Leases} + \text{Principal Repayments})$ |
| **Profitability** | Profit Margin | $\text{Net Income} / \text{Sales}$ |
| | Basic Earning Power (BEP) | $\text{EBIT} / \text{Total Assets}$ |
| | Return on Assets (ROA) | $\text{Net Income} / \text{Total Assets}$ |
| | Return on Equity (ROE) | $\text{Net Income} / \text{Total Equity}$ |
| **Market Value** | Earnings per Share (EPS) | $\text{Net Income} / \text{Shares Outstanding}$ |
| | Price-to-Earnings (P/E) | $\text{Stock Price} / \text{EPS}$ |
| | Cash Flow per Share | $\text{Cash Flow} / \text{Shares Outstanding}$ |
| | Price-to-Cash Flow Ratio | $\text{Stock Price} / \text{Cash Flow per Share}$ |
| | Book Value per Share | $\text{Book Value Equity} / \text{Shares Outstanding}$ |
| | Market-to-Book Ratio | $\text{Stock Price} / \text{Book Value per Share}$ |

### Capital Budgeting Metrics
* **Net Present Value (NPV)**: Sum of discounted future cash inflows minus initial outlay.
* **Profitability Index (PI)**: Present value of future cash inflows divided by initial investment cost.
* **Payback Period (PBP)**: The time required to recover the initial investment from nominal cash inflows.
* **Discounted Payback Period (DPBP)**: The time required to recover the initial investment from discounted cash inflows.
* **Internal Rate of Return (IRR)**: The discount rate at which project NPV equals zero.
* **Modified Internal Rate of Return (MIRR)**: Re-evaluates inflows at a reinvestment rate and outflows at a financing rate, avoiding the multiple-IRR problem.

---

## 🛠️ Technology Stack

* **Front-End UI**: Semantic HTML5, CSS3 Custom Properties (CSS variables), Flexbox & CSS Grid layouts.
* **Typography**: Styled with premium Google Fonts (`Inter` and `Poppins`).
* **Client-Side Logic**: Vanilla JavaScript (ES6+), Event Listeners, and Local Storage API.
* **Data Visualization**: [Chart.js](https://www.chartjs.org/) (loaded via CDN) & [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/).

---

## 📂 File Structure

```text
FinCast/
├── FINCAST.png                # Platform logo and visual identity
├── index.html                 # Homepage containing features list and walkthrough
├── index.css                  # Core CSS variables, typography, and home layout
├── index.js                   # Navigation & responsive hamburger menu logic
├── financialratios.html       # Financial ratios calculator input page
├── financialratios.css        # Layout styling for the 21-input forms and results grid
├── financialratios.js         # Math logic and categorizations for ratios calculation
├── capitalbudgeting.html      # Project capital budgeting calculator page
├── capitalbudgeting.css       # Layout styling for capital budgeting forms & results
├── capitalbudgeting.js        # Math engines for NPV, IRR, MIRR, PBP, and DPBP
├── dashboard.html             # Visualization and interactive charting center
├── dashboard.css              # Grid container layouts for Chart.js cards
└── dashboard.js               # Chart configs, metrics rendering, and decision suggestions
```

---

## ⚙️ Getting Started & Usage

As a completely client-side application, FinCast does not require a database, package manager (npm), or backend server to run.

### Method 1: Local Browser Execution
1. Clone the repository:
   ```bash
   git clone https://github.com/AmnaArshadk5/FinCast.git
   ```
2. Navigate to the project folder and double-click `index.html` to open it in your default web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (Recommended)
To prevent potential CORS/Local Storage limitations in certain strict environments when loaded from a `file://` protocol, serve the project locally:
* **VS Code**: Install the **Live Server** extension, open the directory, and click **Go Live**.
* **Python**: Run the following command in your terminal inside the project directory:
  ```bash
  python -m http.server 8000
  ```
  Then, navigate to `http://localhost:8000` in your web browser.

---

## 🔮 Future Enhancements
* **Comparative Analysis**: Support saving multiple project evaluations simultaneously to compare side-by-side on the dashboard.
* **Export Reports**: Generate and download PDF/CSV reports of calculations, charts, and recommendations.
* **Scenario & Sensitivity Analysis**: Provide inputs to model best-case, base-case, and worst-case cash flow scenarios.

---

## 📄 License
This repository is open-source. Please check with the repository owner (Amna) for licensing details.
