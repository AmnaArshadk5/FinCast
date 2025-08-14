document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  let yearCounter = 1;

  function updateYearLabels() {
    const groups = document.querySelectorAll(".cashflow-group label");
    groups.forEach((label, index) => {
      label.childNodes[0].textContent = `Year ${index + 1} Cash Flow: `;
    });
  }

  document.getElementById("addYearBtn").addEventListener("click", function () {
    yearCounter++;
    const container = document.createElement("div");
    container.className = "cashflow-group";
    container.innerHTML = `
      <label>Year ${yearCounter} Cash Flow:
        <input type="number" class="cashFlowInput" />
      </label>
      <button class="removeBtn">Remove</button>
    `;
    document.getElementById("cashFlowsContainer").appendChild(container);
    updateYearLabels();
    container.querySelector(".removeBtn").addEventListener("click", function () {
      container.remove();
      yearCounter--;
      updateYearLabels();
    });
  });

  function calculateMIRR(cashFlows, financeRate, reinvestRate) {
    const n = cashFlows.length - 1;
    let fvPositives = 0;
    for (let i = 1; i < cashFlows.length; i++) {
      const cf = cashFlows[i];
      if (cf > 0) {
        fvPositives += cf * Math.pow(1 + reinvestRate, n - i);
      }
    }
    const pvNegative = -cashFlows[0];
    if (pvNegative === 0 || fvPositives === 0) return "N/A";
    const mirrRate = Math.pow(fvPositives / pvNegative, 1 / n) - 1;
    return (mirrRate * 100).toFixed(2) + "%";
  }

  function calculateIRR(cfs) {
    let low = -0.99, high = 1.5;
    for (let i = 0; i < 1000; i++) {
      const guess = (low + high) / 2;
      let npvGuess = 0;
      for (let j = 0; j < cfs.length; j++) {
        npvGuess += cfs[j] / Math.pow(1 + guess, j);
      }
      if (Math.abs(npvGuess) < 1e-6) return guess * 100;
      if (npvGuess > 0) low = guess;
      else high = guess;
    }
    return null;
  }

  document.getElementById("calculateBtn").addEventListener("click", function () {
    const investment = parseFloat(document.getElementById("initialInvestment").value);
    const cashInputs = document.querySelectorAll(".cashFlowInput");
    const cashFlows = Array.from(cashInputs).map(input => parseFloat(input.value));
    const discountRate = parseFloat(document.getElementById("discountRate").value) / 100;
    const reinvestmentRate = parseFloat(document.getElementById("reinvestmentRate").value) / 100;

    if (isNaN(investment) || cashFlows.some(isNaN) || isNaN(discountRate) || isNaN(reinvestmentRate)) {
      alert("Please fill all fields correctly.");
      return;
    }

    let npv = -investment;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }

    const inflowPV = cashFlows.reduce((sum, cf, i) =>
      cf > 0 ? sum + cf / Math.pow(1 + discountRate, i + 1) : sum, 0);
    const PI = inflowPV / Math.abs(investment);

    let cumulative = -investment;
    let pbp = -1;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulative += cashFlows[i];
      if (cumulative >= 0) {
        const prev = cumulative - cashFlows[i];
        const remaining = Math.abs(prev);
        pbp = i + (remaining / cashFlows[i]);
        break;
      }
    }

    let discCumulative = -investment;
    let dpbp = -1;
    for (let i = 0; i < cashFlows.length; i++) {
      const discCF = cashFlows[i] / Math.pow(1 + discountRate, i + 1);
      if (discCumulative + discCF >= 0) {
        const unrecovered = -discCumulative;
        dpbp = i + unrecovered / discCF;
        break;
      }
      discCumulative += discCF;
    }

    const irrValue = calculateIRR([-investment, ...cashFlows]);
    const irr = irrValue !== null ? irrValue.toFixed(2) + "%" : "N/A";
    const mirr = calculateMIRR([-investment, ...cashFlows], discountRate, reinvestmentRate);

    document.getElementById("results").innerHTML = `
      <h3>Results</h3>
      <p><strong>Net Present Value (NPV):</strong> ${npv.toFixed(2)}</p>
      <p><strong>Profitability Index (PI):</strong> ${PI.toFixed(2)}</p>
      <p><strong>Payback Period (PBP):</strong> ${pbp !== -1 ? pbp.toFixed(2) + " years" : "Not recovered"}</p>
      <p><strong>Discounted Payback Period (DPBP):</strong> ${dpbp !== -1 ? dpbp.toFixed(2) + " years" : "Not recovered"}</p>
      <p><strong>Internal Rate of Return (IRR):</strong> ${irr}</p>
      <p><strong>Modified Internal Rate of Return (MIRR):</strong> ${mirr}</p>
    `;

    const resultsData = {
      npv: npv.toFixed(2),
      pi: PI.toFixed(2),
      pbp: pbp !== -1 ? pbp.toFixed(2) : null,
      dpbp: dpbp !== -1 ? dpbp.toFixed(2) : null,
      irr: irr,
      mirr: mirr,
      discountRate: (discountRate * 100).toFixed(2),
      reinvestmentRate: (reinvestmentRate * 100).toFixed(2),
      cashFlows: [investment, ...cashFlows]
    };

    localStorage.setItem("dashboardData", JSON.stringify(resultsData));
  });

  document.getElementById("goToDashboardBtn").addEventListener("click", function () {
    const data = localStorage.getItem("dashboardData");
    if (!data) {
      alert("Please calculate first to generate data.");
      return;
    }
    window.location.href = "dashboard.html";
  });
});
