import React from "react";
import { Bar } from "react-chartjs-2";

interface AdminTransportBarChartProps {
  transportLabels: string[];
  transportValues: {
    paid: number[];
    notPaid: number[];
    empty: number[];
  };

  paidColor: string;
  notPaidColor: string;
  emptyColor: string;
}

export const AdminTransportBarChart = ({
  transportLabels,
  transportValues,
  paidColor,
  notPaidColor,
  emptyColor,
}: AdminTransportBarChartProps) => {
  return (
    <Bar
      data={{
        labels: transportLabels,
        datasets: [
          {
            label: "Paid",
            data: transportValues.paid,
            backgroundColor: paidColor,
          },
          {
            label: "Not paid",
            data: transportValues.notPaid,
            backgroundColor: notPaidColor,
          },
          {
            label: "Empty",
            data: transportValues.empty,
            backgroundColor: emptyColor,
          },
        ],
      }}
      options={{
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Transport info",
            font: {
              size: 20,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "places",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: "transport",
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
