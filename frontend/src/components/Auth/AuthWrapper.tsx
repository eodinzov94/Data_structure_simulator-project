import FloatUpContainer from "../UI/FloatUpContainer";
import AuthCard from "./AuthCard";

const AuthWrapper = (props: any) => {
  return (
    <>
      <FloatUpContainer>
        <AuthCard title={props.cardTitle}>{props.cardContent}</AuthCard>
      </FloatUpContainer>

      <FloatUpContainer>{props.imgContent}</FloatUpContainer>
    </>
  );
};

export default AuthWrapper;
