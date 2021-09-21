import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        min: 0,
      },
    ],
  },
};

const LineChartTransaction = (props) => {
  return (
    <>
      {props.data.labels.length > 1 && (
        <Line data={props.data} options={options} />
      )}
    </>
  );
};

export default LineChartTransaction;
