import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Line } from 'react-chartjs-2';
import { _priceAnalysis } from '../../services/api/flight';

const data = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      label: 'My First Dataset',
      data: [0, 150, 180, 210, 150, 180, 205, 205],
      fill: true,
      backgroundColor: 'rgba(51, 187, 255,0.1)',
      borderColor: 'rgba(51, 187, 255,0.5)',
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 9,
    },
    point: {},
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: true,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          borderDash: [8, 4],
          drawBorder: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4,
          padding: 2,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

export default function Chart() {
  const [pricedata, setPriceData] = useState(false);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    _priceAnalysis({}, function (error: any, response: any) {
  console.log(response,"response")
    });
  };

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginTop: '20px',
        height: '350px',
      }}>
      <Line data={data} options={lineOptions} />
    </div>
  );
}
