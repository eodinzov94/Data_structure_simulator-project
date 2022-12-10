import { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/Doughnut";
import BarChart from "../components/Charts/BarChart";
import DropDown from "../components/UI/DropDown";
import { ChartProps } from "../components/Charts/interface";

enum choices {
  GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
}

const initialChartData: ChartProps = {
  items: [],
  title: "",
};

const GeneralReports = () => {
  const [graphChoosen, setGraphChoosen] = useState("choose data to display");
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
        { key: "registered users", value: 40 },
        { key: "logged in (last two weeks)", value: 60 },
      ],
      title: "information",
    });

    //age data
  }, []);

  return (
    <div className="max-w-screen-xl	flex min-h-full items-center justify-center py-10 px-2 sm:px-4 lg:px-8">
      <div className="max-w-screen-xl	 max-w-xl w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="container mx-auto w-full max-w-xl space-y-8  place-content-center">
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
        </div>
      </div>
    </div>
  );
};

export default GeneralReports;
