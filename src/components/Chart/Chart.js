import React from "react";
import { Line } from "react-chartjs-2";
import "../commonStyles.css";

class Chart extends React.Component {
  render() {
    const { labels, data } = this.props;
    console.log("y labels in chart.js", labels);
    console.log("x dataset in chart.js", data);

    return (
        <div className="graph">
        <Line
          options={{
            responsive: true,
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Upvotes'
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'ID'
                    }
                  }]
              }
          }}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Upvotes",
                fill: false,
                lineTension: 0,
                backgroundColor: "#0b9ed8",
                borderColor: "#0b9ed8",
                borderWidth: 2,
                data: data
              }
            ]
          }}
        />
        </div>
    );
  }
}
export default Chart;
