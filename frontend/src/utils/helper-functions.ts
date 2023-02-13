import { ChartProps } from '../components/Charts/interface'


export  const makeTable = (tableData: ChartProps) => {
    return tableData.items
      .map((item) => {
        return { title: item.key, amount: item.value.toString() };
      })
      .concat([{ title: " ", amount: " " }]);
  };

