import React, { useRef, useState, useEffect } from "react";

import Chart from "chart.js";

function Line(props) {
  const canvasRef = useRef();

  const [chart, setChart] = useState();

  const { x, y, type } = props;

  useEffect(() => {
    const newChart = new Chart(canvasRef.current, {
      type: type === "area" ? "line" : type,
      data: {
        labels: ["first", "second", "third"],
        datasets: [
          {
            label: "Dataset",
            data: [1, 2, 3],
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: "#2980b9",
            borderWidth: 1.5,
          },
        ],
      },
      options: {},
    });
    setChart(newChart);
  }, []);

  useEffect(() => {
    const xAxis = [...x];
    const yAxis = [...y];
    const yLabel = yAxis.splice(0, 1);
    const xLabel = xAxis.splice(0, 1);
    
    if (chart) {
      const labels = chart.data.labels;
      const data = chart.data.datasets[0].data;
      chart.data.datasets[0].fill =
        type === "line"
          ? false
          : type === "area" || type === "radar"
          ? "origin"
          : null;
      
      type === "line" && (chart.data.datasets[0].lineTension = 0);
      
      labels.splice(0, labels.length, ...xAxis);
      data.splice(0, data.length, ...yAxis);
      if (type !== "radar") {
        chart.options = {
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: type === "horizontalBar" ? xLabel : yLabel,
                  fontSize: 15,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: type === "horizontalBar" ? yLabel : xLabel,
                  fontSize: 15,
                },
              },
            ],
          },
        };
      }
      chart.update();
    }

    console.log("update");
  }, [props]);

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
    </React.Fragment>
  );
}
export default Line;
