import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Inline SVG Ikona za Header (Fuel Pump)
const FuelIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "12px" }}
  >
    <path d="M3 22L15 22" />
    <path d="M4 9L14 9" />
    <path d="M14 22V4a2 2 0 00-2-2H6a2 2 0 00-2 2v18" />
    <path d="M14 9h2a2 2 0 012 2v3.9a2 2 0 001.24 1.84l2 .76a.4.4 0 01.26.36V19a2 2 0 01-2 2h-1" />
    <path d="M15 6h.01" />
  </svg>
);

function App() {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "GET_PRICES" }, (response) => {
      if (response.prices) setPrices(response.prices);
    });
  }, []);

  const renderChart = (title: string, dataItems: any[], color: string) => {
    const data = {
      labels: dataItems.map((item) => item.code.replace("_USD", "")),
      datasets: [
        {
          label: "Price (USD)",
          data: dataItems.map((item) => item.price),
          backgroundColor: color,
          borderRadius: 6,
          hoverBackgroundColor: color.replace("0.8", "1"),
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const, // Legenda ispod
          labels: { boxWidth: 12, padding: 15, font: { size: 11 } },
        },
        title: {
          display: true,
          text: title,
          font: { size: 18, weight: "bold" as any },
          padding: { bottom: 20 },
        },
        tooltip: {
          backgroundColor: "#1e293b",
          padding: 12,
          cornerRadius: 4,
        },
      },
      scales: {
        y: { grid: { display: false }, ticks: { font: { size: 10 } } },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10, weight: "bold" as any } },
        },
      },
    };

    return (
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    );
  };

  const fuelItems = prices.filter((p) =>
    ["BRENT_CRUDE_USD", "WTI_USD", "GASOLINE_USD", "DIESEL_USD"].includes(
      p.code,
    ),
  );
  const otherItems = prices.filter((p) => !fuelItems.includes(p));

  return (
    <div
      style={{
        width: "90%",
        margin: "80px auto",
        padding: "30px",
        background: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Moderan Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <FuelIcon />
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            Fuel Prices
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Real-time commodity & currency telemetry
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          width: "90%",
        }}
      >
        {fuelItems.length > 0 &&
          renderChart("Energy Sector", fuelItems, "rgba(37, 99, 235, 0.8)")}
        {otherItems.length > 0 &&
          renderChart("FX & Metals", otherItems, "rgba(71, 85, 105, 0.8)")}
      </div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: "30px",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
          AuthoredUp Build Showcase by Mirko Acimovic @ 2026
        </span>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>
          Last Sync:{" "}
          {prices[0]?.updated_at
            ? new Date(prices[0].updated_at).toLocaleTimeString()
            : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default App;
