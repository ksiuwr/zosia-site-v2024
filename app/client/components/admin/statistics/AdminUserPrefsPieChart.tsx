import React from "react";
import { Pie } from "react-chartjs-2";

interface AdminUserPrefsPieChartProps {
  numOfUsersWithPayment: number;
  numOfUsersWithPrefsOnly: number;
  numOfUsersWithoutPrefs: number;

  colorPaymentAccepted: string;
  colorPrefsOnly: string;
  colorNoPrefs: string;
}

export const AdminUserPrefsPieChart = ({
  numOfUsersWithPayment,
  numOfUsersWithPrefsOnly,
  numOfUsersWithoutPrefs,
  colorPaymentAccepted,
  colorPrefsOnly,
  colorNoPrefs,
}: AdminUserPrefsPieChartProps) => {
  return (
    <Pie
      data={{
        labels: [
          "Users with payment accepted",
          "Users with preferences only",
          "Users without preferences",
        ],
        datasets: [
          {
            data: [
              numOfUsersWithPayment,
              numOfUsersWithPrefsOnly,
              numOfUsersWithoutPrefs,
            ],
            backgroundColor: [
              colorPaymentAccepted,
              colorPrefsOnly,
              colorNoPrefs,
            ],
            borderWidth: 0,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        radius: "90%",

        plugins: {
          title: {
            display: true,
            text: "Users",
            font: {
              size: 20,
            },
          },
        },
      }}
    />
  );
};
