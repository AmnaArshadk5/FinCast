document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const data = JSON.parse(localStorage.getItem("dashboardData"));
  if (!data) {
    alert("No data found. Please go back and calculate first.");
    return;
  }

  const npv = parseFloat(data.npv);
  const pi = parseFloat(data.pi);
  const irr = parseFloat(data.irr);
  const mirr = parseFloat(data.mirr);
  const dpbp = data.dpbp || "N/A";
  const cashFlows = data.cashFlows;

  const years = Array.from({ length: cashFlows.length }, (_, i) => `Year ${i}`);

  document.getElementById("irrValue").textContent = `${irr}%`;
  document.getElementById("mirrValue").textContent = `${mirr}%`;
  document.getElementById("dpbpValue").textContent = `${dpbp} years`;

  const suggestions = [];
  if (pi < 1) suggestions.push("🔴 Invest in another project");
  else if (pi < 1.4) suggestions.push("🟠 Review financials carefully");
  else {
    if (npv > 0) suggestions.push("🟢 Project meets criteria");
    if (pi >= 1.6) suggestions.push("🔵 High profitability");
  }

  const suggestionList = document.getElementById("suggestionList");
  suggestionList.innerHTML = "";
  suggestions.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    suggestionList.appendChild(li);
  });

 
  const primary = "#3A8DFF";     
  const accent = "#5CE1E6";     
  const highlight = "#9B5DE5";  
  const neutral = "#2C3E50";     
  const textLight = "#ffffff";  

  const discountRate = parseFloat(data.discountRate);

  //Bar Chart (IRR vs Discount Rate) 
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["IRR", "Discount"],
      datasets: [{
        label: "Rate (%)",
        data: [irr, discountRate],
        backgroundColor: [primary, accent],
        borderRadius: 8
      }]
    },
    options: {
      animation: { duration: 1000 },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textLight 
          },
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        },
        x: {
          ticks: {
            color: textLight 
          },
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textLight 
          }
        }
      }
    }
  });

  // Cumulative Cash Flow Line Chart 
  let cumulative = 0;
  const cumulativeFlows = cashFlows.map(cf => cumulative += cf);

  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "Cumulative Cash Flow",
        data: cumulativeFlows,
        borderColor: highlight,
        backgroundColor: highlight + "33",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: textLight
      }]
    },
    options: {
      animation: { duration: 1200 },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textLight 
          }
        }
      },
      scales: {
        y: {
          ticks: { color: textLight }, 
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        },
        x: {
          ticks: { color: textLight },
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        }
      }
    }
  });
  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["NPV", "Investment"],
      datasets: [{
        data: [npv, Math.abs(cashFlows[0])],
        backgroundColor: [primary, accent],
        borderColor: '#222B3A', 
        borderWidth: 2
      }]
    },
    options: {
      cutout: "65%",
      animation: { duration: 1000, animateRotate: true, animateScale: true },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: textLight 
          }
        }
      }
    }
  });

  const npvCenterText = {
    id: 'npvCenterText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const cutoutPercentage = parseFloat(chart.options.cutout) / 100;
      const innerRadius = (chart.outerRadius * cutoutPercentage);

      const text = `NPV\n${npv.toFixed(2)}`;
      const lines = text.split("\n");

      let baseFontSize = (innerRadius / (lines.length > 1 ? 2.5 : 1.5)); 
      let fontSize = `${baseFontSize.toFixed(2)}em`;

      ctx.font = `bold ${fontSize} sans-serif`;
      ctx.fillStyle = textLight;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center"; 

      const measuredTextHeight = ctx.measureText("M").width * lines.length * 1.2;
      const lineHeight = measuredTextHeight / lines.length; 

      lines.forEach((line, i) => {
        const textX = width / 2; 
        const textY = (height / 2) - (measuredTextHeight / 2) + (i * lineHeight) + (lineHeight / 2);
        ctx.fillText(line, textX, textY);
      });

      ctx.save();
    }
  };

  //  NPV Gauge Chart
  new Chart(document.getElementById("npvGauge"), {
    type: "doughnut",
    data: {
      labels: ["NPV", "Remaining"],
      datasets: [{
        data: [npv, Math.max(0, 100 - npv)], 
        backgroundColor: [primary, neutral],
        borderColor: '#222B3A', 
        borderWidth: 3 
      }]
    },
    options: {
      cutout: "70%", 
      rotation: -90, 
      circumference: 360, 
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500 
      },
      plugins: {
        legend: {
          display: true, 
          position: 'top', 
          labels: {
            color: textLight, 
            boxWidth: 15, 
            padding: 20 
          }
        },
        tooltip: { 
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleColor: textLight,
          bodyColor: textLight,
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
              }
              return label;
            }
          }
        }
      },
      maintainAspectRatio: false, 
      responsive: true
    },
    plugins: [npvCenterText]
  });

  const piCenterText = {
    id: 'piCenterText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const cutoutPercentage = parseFloat(chart.options.cutout) / 100;
      const innerRadius = (chart.outerRadius * cutoutPercentage);

      const text = `PI\n${pi.toFixed(2)}`;
      const lines = text.split("\n");

      let baseFontSize = (innerRadius / (lines.length > 1 ? 2.5 : 1.5)); 
      let fontSize = `${baseFontSize.toFixed(2)}em`;

      ctx.font = `bold ${fontSize} sans-serif`;
      ctx.fillStyle = textLight;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const measuredTextHeight = ctx.measureText("M").width * lines.length * 1.2;
      const lineHeight = measuredTextHeight / lines.length;

      lines.forEach((line, i) => {
        const textX = width / 2;
        const textY = (height / 2) - (measuredTextHeight / 2) + (i * lineHeight) + (lineHeight / 2);
        ctx.fillText(line, textX, textY);
      });

      ctx.save();
    }
  };

  // PI Gauge Chart 
  new Chart(document.getElementById("piGauge"), {
    type: "doughnut",
    data: {
      labels: ["PI", "Remaining"],
      datasets: [{
        data: [pi, Math.max(0, 2 - pi)], 
        backgroundColor: [primary, neutral], 
        borderColor: '#222B3A', 
        borderWidth: 3 
      }]
    },
    options: {
      cutout: "70%", 
      rotation: -90, 
      circumference: 360, 
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textLight, 
            boxWidth: 15,
            padding: 20
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleColor: textLight,
          bodyColor: textLight
        }
      },
      maintainAspectRatio: false,
      responsive: true
    },
    plugins: [piCenterText],
  });


});
