import BarChart from "../../components/Charts/BarChart";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import MediumCard from "../../components/UI/MediumCard";
import {
  getData,
  getLabels,
} from "../../components/Charts/interface";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  datasetConfig,
  DUMMY,
  DUMMY1,
} from "../../components/Charts/charts-utils";

const AlgorithmsReportPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const barClickHandler = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <FloatUpContainer>
      <MediumCard>
        <BarChart
          id="first"
          items={DUMMY}
          title={"Alogrithms usage details"}
          onClick={barClickHandler}
        />

        {selectedIndex > 0 && DUMMY1[selectedIndex].length > 0 && (
          <>
            <br />
            <br />
            <br />
            <Bar
              data={{
                labels: getLabels(DUMMY1[selectedIndex]),
                datasets: [
                  { label:`${DUMMY[selectedIndex].key} details`,data: getData(DUMMY1[selectedIndex]), ...datasetConfig },
                ],
              }}
            />
          </>
        )}
      </MediumCard>
    </FloatUpContainer>
  );
};
export default AlgorithmsReportPage;
