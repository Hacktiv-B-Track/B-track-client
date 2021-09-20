import React from "react";
import { Pie } from "react-chartjs-2";

const options = {
  maintainAspectRatio: true,
  legend: { display: false },
  tooltips: { enabled: false },
  //! Tooltip & legend gak jalan
};

export default function PieChart({data}) {
  return (
    <>
      <Pie
        data={{
          labels: ["Spent", "Remaining"],
          datasets: [
            {
              data: [data.initial - data.amount, data.amount],
              backgroundColor: [
                "rgba(255,0,0,0.3)",
                "rgba(0,0,255,0.3)",
              ],
            },
          ],
        }}
        options={options}
      />
    </>
  );
}
