import React from "react";
import { Bar } from "react-chartjs-2";

interface AdminDiscountsBarChartProps {
  numOfTakenDiscountsPerRound: number[];
  numOfAvailableDiscountsPerRound: number[];

  takenColor: string;
  availableColor: string;
}

export const AdminDiscountsBarChart = ({
  numOfTakenDiscountsPerRound,
  numOfAvailableDiscountsPerRound,
  takenColor,
  availableColor,
}: AdminDiscountsBarChartProps) => {
  return (
    <Bar
      redraw={true}
      data={{
        labels: ["Round 1", "Round 2", "Round 3"],
        datasets: [
          {
            label: "Taken",
            data: numOfTakenDiscountsPerRound,
            backgroundColor: takenColor,
          },
          {
            label: "Available",
            data: numOfAvailableDiscountsPerRound,
            backgroundColor: availableColor,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Discounts",
            font: {
              size: 20,
            },
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      }}
    />
  );
};
