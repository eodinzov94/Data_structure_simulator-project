import { useState } from "react";
import { mainColor } from "../styles/tColors";
import { mainHoverColor } from "../styles/tColors";
import EmailForVerification from "../components/Auth/EmailForVarification";
import CodeVerificationForm from "../components/Auth/CodeVerificationForm";
import AuthWrapper from "../components/Auth/AuthWrapper";
import { Login2FALime500 } from "../utils/logos";


const TwoFactorAuthPage = () => {
  /* The Content card state represents the user's stage in changing the password
    0 = input email
    1 = input code 
    2 = input new password
   */
  
  const onConfirmCode = ()=>{
    //perform login...
  }

  const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
  return (
    <AuthWrapper
      cardTitle={"Enter the code"}
      cardContent={<CodeVerificationForm onConfirm={onConfirmCode} />}
      imgContent={
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={Login2FALime500} alt="Vzou" />
        </div>
      }
    />
  );
};

export default TwoFactorAuthPage;
