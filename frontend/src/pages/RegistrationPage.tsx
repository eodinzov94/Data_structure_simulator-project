import RegistrationForm from "../components/Auth/RegistrationForm";
import { mainColor, mainHoverColor } from "../styles/tColors";
import { Link } from "react-router-dom";
import logoImg from "../assets/vzou-favicon-color.png";
import { RoutePaths } from "../Routes/routesData";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { registerImgLime500 } from "../utils/logos";
import AuthCard from "../components/Auth/AuthCard";
import AuthWrapper from "../components/Auth/AuthWrapper";

const RegistrationPage = () => {
  return (
    <>
      {/*
        This example requires updating your template:
    
        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      {/* pt-64 for padding top */}
      <AuthWrapper
        cardTitle={"Create new account"}
        cardContent={
          <>
            {" "}
            <p className="mt-2 text-center text-sm ">
              Or{" "}
              <Link
                to={RoutePaths.LOGIN}
                className={`font-medium text-${mainColor} hover:text-${mainHoverColor}`}
              >
                Sign in now!
              </Link>
            </p>
            <RegistrationForm />
          </>
        }
        imgContent={
          <div className="flex items-center justify-center py- px-2 sm:px-4 lg:px-8 ">
            <img className="h-64" src={registerImgLime500} alt="Vzou" />
          </div>
        }
      />
    </>
  );
};

export default RegistrationPage;
