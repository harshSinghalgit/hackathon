import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FraudScanner = () => {
  const [contractAddress, setContractAddress] = useState("");  // Input field state
  const [network, setNetwork] = useState("mainnet"); // New state for network selection
  const [scanResult, setScanResult] = useState(null); // Scan result state

  const handleScan = () => {
    const parameters = [
      "Liquidity Lock",
      "Owner Control",
      "Minting Restrictions",
      "Honeypot Risk",
      "Transaction History"
    ];

    const scores = parameters.map(() => Math.floor(Math.random() * 100));
    const overallRisk = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    const decision = overallRisk > 50 ? "High Risk - Avoid" : "Low Risk - Consider Buying";

    setScanResult({
      address: contractAddress,
      network, 
      parameters,
      scores,
      overallRisk,
      decision
    });
  };

  return (
    <div className="scanner-container">
      {!scanResult ? (
        <div>
          <h1 className="title">NFT Fraud Scanner</h1>
          
        
          <input
            type="text"
            placeholder="Enter NFT Contract Address"
            className="input-box"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />

          
          <select className="network-dropdown" value={network} onChange={(e) => setNetwork(e.target.value)}>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </select>

          
          <button className="scan-button" onClick={handleScan}>Analyze NFT</button>
        </div>
      ) : (
        <div className="result-page">
          <h2 className="result-title">Analysis Result</h2>
          <p className="contract-address">Contract: {scanResult.address}</p>
          <p className="network-selected">Network: {scanResult.network}</p> 
          
          <div className="chart-container">
            <Bar
              data={{
                labels: scanResult.parameters,
                datasets: [
                  {
                    label: "Risk Score (0-100)",
                    data: scanResult.scores,
                    backgroundColor: scanResult.scores.map(score =>
                      score > 75 ? "rgba(255,0,0,1)" : // High Risk (Red)
                      score > 50 ? "rgba(255, 165, 0, 1)" : // Medium Risk (Orange)
                      "rgba(0, 255, 0, 1)" // Low Risk (Green)
                    ),
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Individual Risk Analysis", color: "#ffffff", font: { size: 14 }, family: 'courier,monospace' }
                },
                scales: {
                  x: {
                    ticks: {
                      color: "rgba(255,255,255,1)",
                      font: { size: 14 }
                    }
                  },
                  y: {
                    ticks: {
                      color: "rgba(250,154,368,1)",
                      font: { size: 14, weight: "bold" }
                    }
                  }
                }
              }}
              height={200}
            />
          </div>

          <p className="overall-risk">Overall Risk: {scanResult.overallRisk.toFixed(2)}%</p>
          <p className={`decision ${scanResult.overallRisk > 50 ? "high-risk" : "low-risk"}`}>
            {scanResult.decision}
          </p>
          <button className="scan-again" onClick={() => setScanResult(null)}>Scan Another NFT</button>
        </div>
      )}
    </div>
  );
};

export default FraudScanner;
