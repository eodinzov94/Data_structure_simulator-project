import { mainColor, mainHoverColor } from "../styles/tColors";
import {forgotPasswordLime500 } from "../utils/logos";
import EmailForVarification from "../components/Auth/EmailForVarification";
import AuthWrapper from "../components/Auth/AuthWrapper";
import { useState } from "react";
import CodeVerificationForm from "../components/Auth/CodeVerificationForm";
import PasswordResetForm from "../components/Auth/PasswordResetForm";

export interface ContentProps {
  onConfirm: () => void;
}

export enum stage {
  INPUT_EMAIL = 0,
  INPUT_CODE = 1,
  INPUT_NEW_PASSWORD = 2,
}

const Titles = [
  "Forgot your password?",
  "Enter the code",
  "Enter your new password",
];
const ForgotPasswordPage = () => {
  /* The Content card state represents the user's stage in changing the password
    0 = input email
    1 = input code 
    2 = input new password
   */
  const [currentStage, setCurrentStage] = useState(stage.INPUT_EMAIL);

  const changePassword = (password?: string) => {
    //send request to the server
    //if error
    //if the password was change
  };

  const getContent = () => {
    if (currentStage === stage.INPUT_EMAIL) {
      return (
        <EmailForVarification
          onConfirm={() => {
            setCurrentStage(stage.INPUT_CODE);
          }}
        />
      );
    } else if (currentStage === stage.INPUT_CODE) {
      return (
        <CodeVerificationForm
          // onConfirm={() => {
          //   setCurrentStage(stage.INPUT_NEW_PASSWORD);
          // }}
        />
      );
    } else if (currentStage === stage.INPUT_NEW_PASSWORD) {
      return <PasswordResetForm changePassword={changePassword} />;
    }
  };

  const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
  return (
    <AuthWrapper
      cardTitle={Titles[currentStage]}
      cardContent={getContent()}
      imgContent={
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={forgotPasswordLime500} alt="Vzou" />
        </div>
      }
    />
  );
};

export default ForgotPasswordPage;
