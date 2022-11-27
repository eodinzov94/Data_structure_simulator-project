import { mainColor, mainHoverColor } from "../styles/tColors";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { faviconLime500, forgotPasswordLime500 } from "../utils/logos";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import AuthWrapper from "../components/Auth/AuthWrapper";

const ForgotPasswordPage = () => {
  const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
  return (
    <AuthWrapper
      cardTitle={"Forgot your password?"}
      cardContent={<ForgotPasswordForm />}
      imgContent={
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={forgotPasswordLime500} alt="Vzou" />
        </div>
      }
    />
  );
};

export default ForgotPasswordPage;
