import "chart.js/auto";
import {Line } from "react-chartjs-2";
import {ChartProps,getData,getLabels} from "./interface";

/*
Props: label(title), array of objects, each object is {key:"category",value:amount}
for example:   
    items={[{key:"one",value:50},{key:"two",value:100}]}
    the component wil convert it to:
    labels= ["one","two"]
    data = [50,100]
and display the chart
*/

const data = {
  labels: [] as string[],
  datasets: [
    {
      label: "",
      data: [] as number[],
      fill: true,
      backgroundColor: "rgba(221,247,183,0.2)",
      borderColor: "rgba(102,159,17,1)",
    },
  ],
};

const LineChrat= (props: ChartProps)=> {
  data.datasets[0].label = props.title;
  data.labels = getLabels(props.items);
  data.datasets[0].data = getData(props.items);

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default LineChrat;