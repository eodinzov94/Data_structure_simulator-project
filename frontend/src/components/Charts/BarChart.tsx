import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartProps, getData, getLabels } from "./interface";

const bar = {
  data: {
    labels: [] as string[],
    datasets: [
      {
        backgroundColor: "rgba(131, 205, 21, 0.2)",
        borderColor: "rgba(131, 205, 21, 0.8)",
        borderWidth: 1,
        data: [] as number[],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  },
};

const BarChart = (props: ChartProps) => {
  bar.data.labels = getLabels(props.items);
  bar.data.datasets[0].data = getData(props.items);
  bar.options.plugins.title.text = props.title; 
  
  return(
    <>
      <Bar data={bar.data} options={bar.options}></Bar>
    </>
  );
};

export default BarChart;
