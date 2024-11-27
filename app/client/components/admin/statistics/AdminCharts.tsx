import { ThemeContext } from "@client/utils/themes/ThemeContext";
import { templates } from "@reactivated";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import React, { useContext, useEffect } from "react";
import { AdminCostsBarChart } from "./AdminCostsBarChart";
import { AdminDiscountsBarChart } from "./AdminDiscountsBarChart";
import { AdminTransportBarChart } from "./AdminTransportBarChart";
import { AdminUserPrefsPieChart } from "./AdminUserPrefsPieChart";

const cssVar = (name: string) => {
  if (typeof getComputedStyle === "undefined") {
    // We can't read the DaisyUI theme color during Server Side Rendering, so we return an empty string.
    // The charts are rendered on the client side, so this is fine.
    return "";
  }
  return `oklch(${getComputedStyle(document.documentElement).getPropertyValue(name)})`;
};

ChartJS.register(ArcElement, Tooltip, Legend);

export const AdminCharts = (props: templates.AdminStatistics) => {
  const { isDark } = useContext(ThemeContext);

  const base300Color = cssVar("--b3");
  const successColor = cssVar("--su");
  const errorColor = cssVar("--er");

  useEffect(() => {
    ChartJS.defaults.color = cssVar("--bc");
    ChartJS.defaults.scale.grid.display = false;
  }, [isDark]);

  return (
    <>
      <div className="relative mx-auto h-[300px] lg:h-[600px]">
        <AdminUserPrefsPieChart
          numOfUsersWithPayment={
            props.user_preferences_data.num_of_users_with_payment
          }
          numOfUsersWithPrefsOnly={
            props.user_preferences_data.num_of_users_with_prefs_only
          }
          numOfUsersWithoutPrefs={
            props.user_preferences_data.num_of_users_without_prefs
          }
          colorPaymentAccepted={successColor}
          colorPrefsOnly={errorColor}
          colorNoPrefs={base300Color}
        />
      </div>

      <span className="divider" />

      <div className="relative mx-auto h-[300px] lg:h-[600px]">
        <AdminCostsBarChart
          costValues={props.cost_data.cost_values}
          costCounts={props.cost_data.cost_counts}
          barColor={successColor}
        />
      </div>

      <span className="divider" />

      <div className="relative mx-auto h-[300px] lg:h-[600px]">
        <AdminDiscountsBarChart
          numOfTakenDiscountsPerRound={
            props.discount_data.num_of_taken_discounts_per_round
          }
          numOfAvailableDiscountsPerRound={
            props.discount_data.available_discounts_per_round
          }
          takenColor={successColor}
          availableColor={base300Color}
        />
      </div>

      <span className="divider" />

      <div
        style={
          {
            "--chart-height-lg": `calc(${props.transport_data.transport_labels.length} * 90px + 120px )`,
            "--chart-height": `calc(${props.transport_data.transport_labels.length} * 60px + 120px )`,
          } as React.CSSProperties
        }
        className="relative mx-auto h-[--chart-height] lg:h-[--chart-height-lg]"
      >
        <AdminTransportBarChart
          transportLabels={props.transport_data.transport_labels}
          transportValues={{
            paid: props.transport_data.transport_values.paid,
            notPaid: props.transport_data.transport_values.not_paid,
            empty: props.transport_data.transport_values.empty,
          }}
          emptyColor={base300Color}
          paidColor={successColor}
          notPaidColor={errorColor}
        />
      </div>
    </>
  );
};
