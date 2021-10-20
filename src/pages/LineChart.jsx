import React from "react";
import { Line } from "react-chartjs-2";
export function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <h3 className="text-3xl text-pink font-black">{`${coinName} Price Chart`}</h3>
      <div className="flex gap-10 font-bold text-[15px]">
        <p>{`Change: ${coinHistory?.data?.change}%`}</p>
        <p>{`Current Bitcoin Price: $${currentPrice}`}</p>
      </div>
      <Line data={data} options={options} />
    </>
  );
}
