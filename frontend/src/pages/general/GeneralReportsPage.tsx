import { useState } from "react";
import DoughnutChart from "../../components/Charts/Doughnut";
import BarChart from "../../components/Charts/BarChart";
import DropDown from "../../components/UI/DropDown";
import MediumCard from "../../components/UI/MediumCard";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import LineChrat from "../../components/Charts/Line";
import ExportExcel from "../../components/Charts/ExportExcel";
import { useGetGeneralReportsQuery} from "../../store/reducers/report-reducer";
import { makeTable } from '../../utils/helper-functions'
import { ExportData, GeneralReport } from '../../types/GeneralReport'

enum choices {
  USERS_GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
  USERS_AGE = "Age",
}


const GeneralReportsPage = () => {
  const {data,isLoading,isError} =  useGetGeneralReportsQuery('');
  const [graphChoosen, setGraphChoosen] = useState("Choose report");
  const getDataToExport = (data:GeneralReport ) => {
    if(!data){
      return []
    }
    const AuthRows: ExportData[] = makeTable({items:data.accountsData,title:""});
    const GenderRows: ExportData[] = makeTable({items:data.usersData.usersGroupedByGender, title:"Users By Gender"});
    const AgeRows: ExportData[] = [
      { title: "AGE INFORMATION", amount: "" },
    ].concat(makeTable({items:data.usersData.usersGroupedByAge,title:"Users By Age"}));
    return AuthRows.concat(GenderRows.concat(AgeRows));
  };


  return (
    <FloatUpContainer>
      {isError && <div>Error fetching</div>}
      {isLoading && <div>Loading ...</div>}
      { !isLoading && data &&
      <MediumCard>
        <DropDown
          title={graphChoosen}
          items={Object.values(choices)}
          onClick={setGraphChoosen}
        />
        {graphChoosen === choices.USERS_GENDER && (
          <DoughnutChart items={data.usersData.usersGroupedByGender} title={"Users Gender"} />
        )}
        {graphChoosen === choices.USERS_AUTH && (
          <BarChart items={data.accountsData} title={"Information"} />)}
        {graphChoosen === choices.USERS_AGE && (
          <LineChrat items={data.usersData.usersGroupedByAge} title={"Information about the age"} />
        )}
        <ExportExcel fileName="general-reports" csvData={getDataToExport(data)} />
      </MediumCard>}
    </FloatUpContainer>
  );
};

export default GeneralReportsPage;
