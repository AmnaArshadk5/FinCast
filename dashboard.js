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

  // THESE LINES ARE COMMENTED OUT TO REMOVE THE BOTTOM-LEFT LABELS
  // document.getElementById("npvValue").textContent = `${npv.toFixed(2)} NPV`;
  // document.getElementById("piValue").textContent = `${pi.toFixed(2)} PI`;

  // Ensure these elements exist in your HTML if you want to display them
  // Otherwise, if they are meant to be removed, ensure they are also removed from HTML
  // Example: <span id="irrValue"></span>
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

  // Modern color palette
  const primary = "#3A8DFF";     // Bright Blue
  const accent = "#5CE1E6";     // Aqua
  const highlight = "#9B5DE5";  // Purple
  const neutral = "#2C3E50";    // Dark Gray/Blue for 'Remaining' part of gauges
  const textLight = "#ffffff";  // White for text and labels

  const discountRate = parseFloat(data.discountRate);

  // --- Bar Chart (IRR vs Discount Rate) ---
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
            color: textLight // White Y-axis ticks
          },
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        },
        x: {
          ticks: {
            color: textLight // White X-axis ticks
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
            color: textLight // White legend label "Rate (%)"
          }
        }
      }
    }
  });

  // --- Cumulative Cash Flow Line Chart ---
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
            color: textLight // White legend label "Cumulative Cash Flow"
          }
        }
      },
      scales: {
        y: {
          ticks: { color: textLight }, // White Y-axis ticks
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        },
        x: {
          ticks: { color: textLight }, // White X-axis ticks
          grid: {
            color: "rgba(255, 255, 255, 0.3)",
            lineWidth: 1.5
          }
        }
      }
    }
  });

  // --- NPV vs. Investment Chart (Doughnut/Pie) ---
  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["NPV", "Investment"],
      datasets: [{
        data: [npv, Math.abs(cashFlows[0])],
        backgroundColor: [primary, accent],
        borderColor: '#222B3A', // Darker border for separation
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
            color: textLight // White legend labels for NPV and Investment
          }
        }
      }
    }
  });

  // Plugin to display NPV in the center of npvGauge chart
  const npvCenterText = {
    id: 'npvCenterText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const cutoutPercentage = parseFloat(chart.options.cutout) / 100;
      const innerRadius = (chart.outerRadius * cutoutPercentage);

      const text = `NPV\n${npv.toFixed(2)}`;
      const lines = text.split("\n");

      // Dynamic font size calculation based on the inner radius and number of lines
      let baseFontSize = (innerRadius / (lines.length > 1 ? 2.5 : 1.5)); // Adjusted divisors for better fit
      let fontSize = `${baseFontSize.toFixed(2)}em`;

      ctx.font = `bold ${fontSize} sans-serif`;
      ctx.fillStyle = textLight;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center"; // Center align the text horizontally

      // Measure the actual height of the text block to center it precisely
      const measuredTextHeight = ctx.measureText("M").width * lines.length * 1.2; // Adjusted for slightly more line spacing
      const lineHeight = measuredTextHeight / lines.length; // Average line height

      lines.forEach((line, i) => {
        const textX = width / 2; // X position is center because textAlign is 'center'
        // Calculate Y position to perfectly center the entire block of text
        const textY = (height / 2) - (measuredTextHeight / 2) + (i * lineHeight) + (lineHeight / 2);
        ctx.fillText(line, textX, textY);
      });

      ctx.save();
    }
  };

  // --- NPV Gauge Chart ---
  new Chart(document.getElementById("npvGauge"), {
    type: "doughnut",
    data: {
      labels: ["NPV", "Remaining"],
      datasets: [{
        data: [npv, Math.max(0, 100 - npv)], // Ensure 'Remaining' doesn't go negative
        backgroundColor: [primary, neutral], // Primary blue for NPV, neutral dark gray for remaining
        borderColor: '#222B3A', // Subtle dark border for definition
        borderWidth: 3 // Thicker border
      }]
    },
    options: {
      cutout: "70%", // Slightly smaller cutout to give more room for text
      rotation: -90, // Start from top
      circumference: 360, // Full circle
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500 // Slightly longer animation
      },
      plugins: {
        legend: {
          display: true, // Display legend
          position: 'top', // Position legend at the top
          labels: {
            color: textLight, // White labels
            boxWidth: 15, // Smaller color boxes
            padding: 20 // Padding between legend items
          }
        },
        tooltip: { // Enhance tooltips
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
      maintainAspectRatio: false, // Allows chart to take up available space better
      responsive: true
    },
    plugins: [npvCenterText]
  });

  // Plugin to display PI in the center of piGauge chart
  const piCenterText = {
    id: 'piCenterText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const cutoutPercentage = parseFloat(chart.options.cutout) / 100;
      const innerRadius = (chart.outerRadius * cutoutPercentage);

      const text = `PI\n${pi.toFixed(2)}`;
      const lines = text.split("\n");

      // Dynamic font size calculation based on the inner radius and number of lines
      let baseFontSize = (innerRadius / (lines.length > 1 ? 2.5 : 1.5)); // Adjusted divisors
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

  // --- PI Gauge Chart ---
  new Chart(document.getElementById("piGauge"), {
    type: "doughnut",
    data: {
      labels: ["PI", "Remaining"],
      datasets: [{
        data: [pi, Math.max(0, 2 - pi)], // Assuming a max PI of 2 for gauge scale
        backgroundColor: [primary, neutral], // Primary blue for PI, neutral dark gray for remaining
        borderColor: '#222B3A', // Subtle dark border for definition
        borderWidth: 3 // Thicker border
      }]
    },
    options: {
      cutout: "70%", // Slightly smaller cutout
      rotation: -90, // Start from top
      circumference: 360, // Full circle
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
            color: textLight, // White labels
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