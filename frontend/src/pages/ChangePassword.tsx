import { useState } from 'react'
import AuthWrapper from '../components/Auth/AuthWrapper'
import CodeVerificationForm from '../components/Auth/CodeVerificationForm'
import EmailVerForPassordChange from '../components/Auth/EmailVerForPassordChange'
import PasswordResetForm from '../components/Auth/PasswordResetForm'
import { useAppSelector } from '../store/hooks'
import { CodeTypes } from '../types/Auth'
import { forgotPasswordLime500 } from '../utils/logos'

export interface ContentProps {
  onConfirm: () => void;
}

export enum stage {
  SEND_CODE = 0,
  INPUT_CODE = 1,
  INPUT_NEW_PASSWORD = 2,
}

const Titles = [
  "The code will sent to your email",
  "Enter the code",
  "Enter your new password",
];
const ForgotPasswordPage = () => {
  /* The Content card state represents the user's stage in changing the password
    0 = confirm email send
    1 = input code 
    2 = input new password
   */
  const [currentStage, setCurrentStage] = useState(stage.SEND_CODE);
  const [currentCode, setCurrentCode] = useState('');
  const email = useAppSelector((state) => state.auth.user!.email);
  const getContent = () => {
    if (currentStage === stage.SEND_CODE) {
      return (
        <EmailVerForPassordChange
          onConfirm={() => {
            setCurrentStage(stage.INPUT_CODE);
          }}
          email={email}
        />
      );
    } else if (currentStage === stage.INPUT_CODE) {
      return (
        <CodeVerificationForm
          type={CodeTypes.RESET_PW}
          onConfirm={() => {
            setCurrentStage(stage.INPUT_NEW_PASSWORD);
          }}
          setCode={(code:string)=>setCurrentCode(code)}
          email={email}
        />
      );
    } else if (currentStage === stage.INPUT_NEW_PASSWORD) {
      return <PasswordResetForm
        code={currentCode}
        email={email}
      />;
    }
  };

  //const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
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
