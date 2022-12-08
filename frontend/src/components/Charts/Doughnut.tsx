import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

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

interface DoughnutItem {
  key: string;
  value: number;
}

interface DoughnutProps {
  items: DoughnutItem[];
  title: string;
}

const DoughnutChart = (props: DoughnutProps) => {
  const labels = props.items.map((e: DoughnutItem) => {
    return e.key;
  });
  const data = props.items.map((e: DoughnutItem) => {
    return e.value;
  });

  return (
    <div style={{ width: "400px" }}>
      <h1>{props.title}</h1>
      <Doughnut data={{ labels, datasets: [{ data }] }} />
    </div>
  );
};

export default DoughnutChart;
