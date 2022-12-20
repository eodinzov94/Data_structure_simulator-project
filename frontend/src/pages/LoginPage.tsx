import LoginForm from "../components/Auth/LoginForm";
import { mainColor, mainHoverColor } from "../styles/tColors";
import { RoutePaths } from "../Routes/RoutePaths";
import { Link } from "react-router-dom";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { loginImgLime500 } from "../utils/logos";
import AuthCard from "../components/Auth/AuthCard";

const LoginPage = () => {
  const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
  return (
    <>
      <FloatUpContainer>
        <AuthCard title={"Sign in to your account"}>
          <p className="mt-2 text-center text-sm ">
            Or{" "}
            <Link to={RoutePaths.REGISTER} className={FPstr}>
              Sign up now!
            </Link>
          </p>
          <LoginForm />
          <br />
        </AuthCard>
      </FloatUpContainer>

      <FloatUpContainer>
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={loginImgLime500} alt="Vzou" />
        </div>
      </FloatUpContainer>
    </>
  );
};

export default LoginPage;
