document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle setup
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".desktop-links"); // matches CSS

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Ratio form calculation and result display
  const ratioForm = document.getElementById("ratioForm");
  if (ratioForm) {
    ratioForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const getVal = (id) => +document.getElementById(id).value;

      const data = {
        currentAssets: getVal("currentAssets"),
        currentLiabilities: getVal("currentLiabilities"),
        inventory: getVal("inventories"),
        totalCOGS: getVal("cogs"),
        totalSales: getVal("netSales"),
        accountsReceivable: getVal("accountsReceivable"),
        fixedAssets: getVal("netFixedAssets"),
        totalAssets: getVal("totalAssets"),
        totalDebt: getVal("totalDebt"),
        totalLiabilities: getVal("totalLiabilities"),
        ebit: getVal("ebit"),
        interest: getVal("interestExpense"),
        ebitda: getVal("ebitda"),
        leasePayments: getVal("leasePayments"),
        principalRepayments: getVal("principalRepayments"),
        netIncome: getVal("netIncome"),
        equity: getVal("equity"),
        shares: getVal("sharesOutstanding"),
        stockPrice: getVal("sharePrice"),
        cashFlow: getVal("cashFlow"),
        bookValue: getVal("bookValueEquity"),
      };

      const ratios = {
        "🔹 Liquidity Ratios": {
          "Current Ratio": (data.currentAssets / data.currentLiabilities).toFixed(2),
          "Quick Ratio": ((data.currentAssets - data.inventory) / data.currentLiabilities).toFixed(2),
        },
        "🔹 Asset Management Ratios": {
          "Inventory Turnover": (data.totalCOGS / data.inventory).toFixed(2),
          "Days Sales Outstanding": ((data.accountsReceivable / data.totalSales) * 365).toFixed(2),
          "Fixed Assets Turnover": (data.totalSales / data.fixedAssets).toFixed(2),
          "Total Assets Turnover": (data.totalSales / data.totalAssets).toFixed(2),
        },
        "🔹 Debt Management Ratios": {
          "Debt Ratio": (data.totalDebt / data.totalAssets).toFixed(2),
          "Liabilities to Assets Ratio": (data.totalLiabilities / data.totalAssets).toFixed(2),
          "Times Interest Earned": (data.ebit / data.interest).toFixed(2),
          "EBITDA Coverage Ratio": ((data.ebitda + data.leasePayments) /
            (data.interest + data.leasePayments + data.principalRepayments)).toFixed(2),
        },
        "🔹 Profitability Ratios": {
          "Profit Margin": (data.netIncome / data.totalSales).toFixed(2),
          "Basic Earning Power": (data.ebit / data.totalAssets).toFixed(2),
          "Return on Assets (ROA)": (data.netIncome / data.totalAssets).toFixed(2),
          "Return on Equity (ROE)": (data.netIncome / data.equity).toFixed(2),
        },
        "🔹 Market Value Ratios": {
          "Earnings per Share": (data.netIncome / data.shares).toFixed(2),
          "Price-to-Earnings Ratio": (data.stockPrice / (data.netIncome / data.shares)).toFixed(2),
          "Cash Flow per Share": (data.cashFlow / data.shares).toFixed(2),
          "Price-to-Cash Flow Ratio": (data.stockPrice / (data.cashFlow / data.shares)).toFixed(2),
          "Book Value per Share": (data.bookValue / data.shares).toFixed(2),
          "Market-to-Book Ratio": (data.stockPrice / (data.bookValue / data.shares)).toFixed(2),
        }
      };

      localStorage.setItem("financialData", JSON.stringify(data));

      const container = document.getElementById("ratios-container");
      container.innerHTML = "";

      for (const category in ratios) {
        const section = document.createElement("div");
        section.classList.add("ratio-section");

        const heading = document.createElement("h3");
        heading.textContent = category;
        section.appendChild(heading);

        const list = document.createElement("ul");
        for (const label in ratios[category]) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${label}:</strong> ${ratios[category][label]}`;
          list.appendChild(li);
        }

        section.appendChild(list);
        container.appendChild(section);
      }

      // Show the results section once calculated
      document.getElementById("resultsSection").style.display = "block";
    });
  }
});

// Helper function: fills form with sample data (run manually when needed)
function fillTestData() {
  document.getElementById('currentAssets').value = 150000;
  document.getElementById('currentLiabilities').value = 80000;
  document.getElementById('inventories').value = 30000;
  document.getElementById('cogs').value = 120000;
  document.getElementById('netSales').value = 200000;
  document.getElementById('accountsReceivable').value = 40000;
  document.getElementById('netFixedAssets').value = 250000;
  document.getElementById('totalAssets').value = 400000;
  document.getElementById('totalDebt').value = 180000;
  document.getElementById('totalLiabilities').value = 220000;
  document.getElementById('ebit').value = 50000;
  document.getElementById('interestExpense').value = 10000;
  document.getElementById('ebitda').value = 65000;
  document.getElementById('leasePayments').value = 5000;
  document.getElementById('principalRepayments').value = 8000;
  document.getElementById('netIncome').value = 30000;
  document.getElementById('equity').value = 180000;
  document.getElementById('sharesOutstanding').value = 10000;
  document.getElementById('sharePrice').value = 25;
  document.getElementById('cashFlow').value = 45000;
  document.getElementById('bookValueEquity').value = 180000;
}
