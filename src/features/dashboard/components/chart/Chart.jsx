import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import styles from "./chart.module.css";

Chart.propTypes = {};

function Chart(props) {
  const { monthlyRevenue } = props
  console.log(monthlyRevenue);
  const chartData = useMemo(() => {
    const chart = {
      series: [0, 0, 0, 1000000000, 0, 0],
      options: {
        chart: {
          type: "polarArea",
        },
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    return chart;
  }, []);

  const [chart, setChart] = useState(chartData);

  return (
    <div className={styles.chart}>
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="polarArea"
      />
    </div>
  );
}

export default Chart;
