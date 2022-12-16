import { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/Doughnut";
import BarChart from "../components/Charts/BarChart";
import DropDown from "../components/UI/DropDown";
import { ChartProps } from "../components/Charts/interface";
import MediumCard from "../components/UI/MediumCard";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import LineChrat from "../components/Charts/Line";

enum choices {
  USERS_GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
  USERS_AGE = "Age",
}

const initialChartData: ChartProps = {
  items: [],
  title: "",
};

const GeneralReportsPage = () => {
  const [graphChoosen, setGraphChoosen] = useState("Choose report");
  const [genderData, setGenderData] = useState<ChartProps>(initialChartData);
  const [authData, setAuthData] = useState<ChartProps>(initialChartData);
  const [ageData, setAgeData] = useState<ChartProps>(initialChartData);

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
    setAgeData({
      items: [
        { key: "24", value: 45 },
        { key: "28", value: 60 },
        { key: "30", value: 35 },
        { key: "35", value: 15 }

      ],
      title: "Information about the age",
    });



  }, []);

  return (
    <FloatUpContainer>
      <MediumCard>
        <DropDown
          title={graphChoosen}
          items={Object.values(choices)}
          onClick={setGraphChoosen}
        />
        {graphChoosen === choices.USERS_GENDER && (
          <DoughnutChart items={genderData.items} title={genderData.title} />
        )}
        {graphChoosen === choices.USERS_AUTH && (
          <BarChart items={authData.items} title={authData.title} />
        )}
        {graphChoosen === choices.USERS_AGE && (
          <LineChrat items={ageData.items} title={ageData.title} />
        )}
      </MediumCard>
    </FloatUpContainer>
  );
};

export default GeneralReportsPage;
