import DsCard from "../../components/Home/DsCard";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import RoutePaths from "../../Routes/RoutePaths";
import GRP from '../../assets/generalReportsPhoto.png'
import ARP from '../../assets/algorithmsReportsPhoto.png'
import { SubjectImg } from "../../components/UI/SubjectImg";
import headlinePhoto from "../../assets/ReportsHead.png";

const ReportsPage = () => {
  return (
    <FloatUpContainer>
      <section className="container mx-auto px-0 sm:px-0 py-24">
        <div className="grid grid-cols-0 md:grid-cols-0 lg:grid-cols-0 2xl:grid-cols-0 justify-items-center gap-10">
        <SubjectImg name={"GR"} src={headlinePhoto} width="300px" />
            <DsCard key={0} title={"General"} image={GRP} gif={GRP} url={RoutePaths.GENERAL_REPORTS}/>
            <DsCard key={1} title={"Algorithms"} image={ARP} gif={ARP} url={RoutePaths.ALGORITHMS_REPORTS}/>
        </div>
      </section>
    </FloatUpContainer>
  );
};

export default ReportsPage;
