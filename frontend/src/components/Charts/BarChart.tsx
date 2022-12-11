import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartProps, getData, getLabels } from "./interface";

const bar = {
  data: {
    labels: [] as string[],
    datasets: [
      {
        label:'Registerd',
        backgroundColor:["rgba(163, 230, 53, 0.3)","rgba(125, 212, 252, 0.3)"],
        borderColor: ["rgba(163, 230, 53, 0.8)","rgba(125, 212, 252, 0.8)"],
        borderWidth: 2,
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
