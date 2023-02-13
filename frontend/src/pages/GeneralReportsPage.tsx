import { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/Doughnut";
import BarChart from "../components/Charts/BarChart";
import DropDown from "../components/UI/DropDown";
import { ChartProps } from "../components/Charts/interface";
import MediumCard from "../components/UI/MediumCard";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import LineChrat from "../components/Charts/Line";
import ExportExcel from "../components/Charts/ExportExcel";
import { useGetGeneralReportsQuery} from "../store/reducers/report-reducer";

enum choices {
  USERS_GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
  USERS_AGE = "Age",
}

const initialChartData: ChartProps = {
  items: [],
  title: "",
};

interface ExportData {
  title: string;
  amount: string;
}

const GeneralReportsPage = () => {
  const {data} =  useGetGeneralReportsQuery('');
  const [graphChoosen, setGraphChoosen] = useState("Choose report");
  const [genderData, setGenderData] = useState<ChartProps>(initialChartData);
  const [authData, setAuthData] = useState<ChartProps>(initialChartData);
  const [ageData, setAgeData] = useState<ChartProps>(initialChartData);
  useEffect(() => {
    /******************LOAD DATA FROM SERVER!!!!*****************/

    if(!data){
      return
    }
    //gender data
     setGenderData({
      items:
        data.usersData.usersGroupedByGender.map(user => ({key:user.gender,value:Number(user.count)}))
       ,
       title: "Users Gender",
     });
    //users auth data
    setAuthData({
      items: [
        { key: "Registered users", value: data.accountsData.allRegisteredUsersCount },
        { key: "Logged in (last two weeks)", value: data.accountsData.activeUsersCount },
      ],
      title: "Information",
    });

    //age data
    setAgeData({
      items: data.usersData.usersGroupedByAge.map(user => ({key:user.age.toString(),value:Number(user.count)})),
      title: "Information about the age",
    });
  }, [data]);

  const makeTable = (tableData: ChartProps) => {
    return tableData.items
      .map((item) => {
        return { title: item.key, amount: item.value.toString() };
      })
      .concat([{ title: " ", amount: " " }]);
  };

  const getDataToExport = () => {
    const AuthRows: ExportData[] = makeTable(authData);
    const GenderRows: ExportData[] = makeTable(genderData);
    const AgeRows: ExportData[] = [
      { title: "AGE INFORMATION", amount: "" },
    ].concat(makeTable(ageData));
    return AuthRows.concat(GenderRows.concat(AgeRows));
  };

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
        <ExportExcel fileName="general-reports" csvData={getDataToExport()} />
      </MediumCard>
    </FloatUpContainer>
  );
};

export default GeneralReportsPage;
