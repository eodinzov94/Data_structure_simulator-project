import { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/Doughnut";
import BarChart from "../components/Charts/BarChart";
import DropDown from "../components/UI/DropDown";
import { ChartProps } from "../components/Charts/interface";
import MediumCard from "../components/UI/MediumCard";
import FloatUpContainer from "../components/UI/FloatUpContainer";

enum choices {
  GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
}

const initialChartData: ChartProps = {
  items: [],
  title: "",
};

const GeneralReports = () => {
  const [graphChoosen, setGraphChoosen] = useState("Choose report");
  const [genderData, setGenderData] = useState<ChartProps>(initialChartData);
  const [authData, setAuthData] = useState<ChartProps>(initialChartData);

  useEffect(() => {
    /******************LOAD DATA FROM SERVER!!!!*****************/

    //gender data

    setGenderData({
      items: [
        { key: "Female", value: 40 },
        { key: "Male", value: 60 },
      ],
      title: "Users Gender",
    });

    //users auth data
    setAuthData({
      items: [
        { key: "Registered users", value: 60 },
        { key: "Logged in (last two weeks)", value: 20 },
      ],
      title: "Information",
    });

    //age data
  }, []);

  return (
    <FloatUpContainer>
      <MediumCard>
        <DropDown
          title={graphChoosen}
          items={Object.values(choices)}
          onClick={setGraphChoosen}
        />
        {graphChoosen === choices.GENDER && (
          <DoughnutChart items={genderData.items} title={genderData.title} />
        )}
        {graphChoosen === choices.USERS_AUTH && (
          <BarChart items={authData.items} title={authData.title} />
        )}
      </MediumCard>
    </FloatUpContainer>
  );
};

export default GeneralReports;
