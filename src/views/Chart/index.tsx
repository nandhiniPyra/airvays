import React from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";

// Chart.plugin.register({
//   afterDatasetsDraw: function (chart: any) {
//     const chart_type = chart.config.type;
//     if (
//       chart.tooltip._active &&
//       chart.tooltip._active.length &&
//       chart_type === "line"
//     ) {
//       var activePoint = chart.tooltip._active[0],
//         ctx = chart.chart.ctx,
//         x_axis = chart.scales["x-axis-0"],
//         y_axis = chart.scales["y-axis-0"],
//         x = activePoint.tooltipPosition().x,
//         topY = y_axis.top,
//         bottomY = y_axis.bottom;

//       // draw line
//       ctx.save();
//       ctx.beginPath();
//       ctx.moveTo(x, topY + 7);
//       ctx.lineTo(x, bottomY + 1);
//       ctx.setLineDash([2, 3]);
//       ctx.lineWidth = 1;
//       ctx.strokeStyle = "#ff7e01";
//       ctx.stroke();
//       ctx.restore();
//     }
//   },
// });

const data = {
  labels: [
    0,
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [0, 150, 180, 210, 150, 180, 205, 205],
      fill: true,
      backgroundColor: "rgba(51, 187, 255,0.1)",
      borderColor: "rgba(51, 187, 255,0.5)",

      tension: 0.4,
    },
  ],
};

//const myRef = React.createRef();
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 9,
    },
    point: {
      //   radius: 0,
    },
  },

  // onClick: (e, element) => {
  //   if (element.length > 0) {
  //     var ind = element[0]._index;
  //     alert(ind);
  //   }
  // },
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
        // stacked: true,

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
        // ticks: {
        //
        //   // Return an empty string to draw the tick line but hide the tick label
        //   // Return `null` or `undefined` to hide the tick line entirely
        //   userCallback(value) {
        //     // Convert the number to a string and splite the string every 3 charaters from the end
        //     value = value.toString();
        //     value = value.split(/(?=(?:...)*$)/);

        //     // Convert the array to a string and format the output
        //     value = value.join(".");
        //     return `Rp.${value}`;
        //   }
        // }
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
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "20px",
        height: "350px",
      }}
    >
      <Line data={data} options={lineOptions} />
    </div>
  );
}
