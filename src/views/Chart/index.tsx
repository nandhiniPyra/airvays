import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Line } from 'react-chartjs-2';
import { _priceAnalysis } from '../../services/api/flight';
import _ from 'lodash';

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
      // label: 'My First Dataset',
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
    enabled: true,
  },
};

export default function Chart(props:any) {
  const [pricedata, setPriceData] = useState([]);
  const [chartDate, setChartDate] = useState([]);
  const [chartAmount, setChartAmount] = useState([]);



  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    _priceAnalysis(props.params, function (error: any, response: any) {
      if (response.status == 200) {
        setPriceData(response.result)
        let date: any = []
        let price: any = []
         response.result.map((item: any) => {
          date.push(item.departureDate)
        })
        response.result.map((x: any) => {
          x.priceMetrics.forEach((item: any) => {
            if (item.quartileRanking == "MINIMUM")
              price.push(_.toNumber(item.amount))
          })
        })
        setChartDate(date)
        setChartAmount(price)
      }
    });
  };

  const data1 = {
    labels:chartDate,
    datasets: [
      {
        // label: 'My First Dataset',
        data: chartAmount,
        fill: true,
        backgroundColor: 'rgba(51, 187, 255,0.1)',
        borderColor: 'rgba(51, 187, 255,0.5)',
        tension: 0.4,
      },
    ],
  };

  const handlemap =()=>{
    let data=[]
    let price=[]
    const chart = pricedata.map((item:any)=>{
      data.push(item.departureDate)
      price.push(item.priceMetrics.amount)
    })

  }
  console.log('ress',data1)
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginTop: '20px',
        height: '350px',
      }}>
      <Line data={data1} options={lineOptions} />
    </div>
  );
}
