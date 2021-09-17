import React from "react";
import { Pie } from "react-chartjs-2";

const options = {
  maintainAspectRatio: true,
  legend: { display: false },
  tooltips: { enabled: false },
  //! Tooltip & legend gak jalan
};

export default function PieChart() {
  return (
    <>
      <Pie
        data={{
          labels: ["Red", "Blue"],
          datasets: [
            {
              data: [20, 80],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
            },
          ],
        }}
        options={options}
      />
    </>
  );
}
