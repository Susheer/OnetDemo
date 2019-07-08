import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
class BudgetOverview extends Component {
  componentWillMount() {
    let label = this.props.label;
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = label,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }
  state = { text: this.props.label };
  render() {
    return (
      <Doughnut
        data={{
          datasets: [
            {
              data: [100],
              backgroundColor: "#f2f7f8"
            }
          ]
        }}
        options={{ cutoutPercentage: 80 }}
      />
    );
  }
}

export default BudgetOverview;
