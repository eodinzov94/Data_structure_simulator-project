interface ChartItem {
    key: string;
    value: number;
  }
  
  export interface ChartProps {
    items: ChartItem[];
    title: string;
  }


  export function getLabels(items:ChartItem[]){
    return items.map((item:ChartItem) => item.key);
  }

  export function getData(items:ChartItem[]){
    return items.map((item:ChartItem) => item.value);
  }