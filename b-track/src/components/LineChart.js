import React from "react";
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Budget Utilization',
        data: [80, 92, 90, 85, 96, 87, 90, 98, 93, 88, 94, 99],
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
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
          min: 0
        },
      ],
    },
  };
  
  const LineChart = ({className}) => (
    <>
      <Line data={data} options={options} className={className}/>
    </>
  );
  
  export default LineChart;
