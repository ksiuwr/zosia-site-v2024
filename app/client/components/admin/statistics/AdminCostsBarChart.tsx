import React from "react";
import { Bar } from "react-chartjs-2";

interface AdminCostsBarChartProps {
  costValues: number[];
  costCounts: number[];

  barColor: string;
}

export const AdminCostsBarChart = ({
  costValues,
  costCounts,
  barColor,
}: AdminCostsBarChartProps) => {
  return (
    <Bar
      data={{
        labels: costValues,
        datasets: [
          {
            data: costCounts,
            backgroundColor: barColor,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Costs preferences",
            font: {
              size: 20,
            },
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return context[0].label + " PLN";
              },
              label: function (context) {
                return " " + context.raw + " os.";
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "cost [PLN]",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: "users",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
        },
      }}
    />
  );
};
