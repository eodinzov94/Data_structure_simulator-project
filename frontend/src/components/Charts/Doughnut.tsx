import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {ChartProps,getData,getLabels} from "./interface";
/*
Props: title, array of objects, each object is {key:"category",value:amount}
for example:   
    items=[{key:"Female",value:40},{key:"Male",value:60}] title={"GENDER"}
the component will convert the items to:
    const data = {
        labels: ['Male', 'Female'],
        datasets: [{
            data: [40,60], //in the same order of the lables!
        }],
    }
and display the chart
*/



const DoughnutChart = (props: ChartProps) => {
  const labels = getLabels(props.items);
  const data = getData(props.items);

  return (
    <div style={{width:"400px"}}>
      <Doughnut data={{ labels, datasets: [{ data }] }}
      options={{
        plugins: {
            title: {
                display: true,
                text: props.title
            }
        }}}
      />
    </div>
  );
};

export default DoughnutChart;
