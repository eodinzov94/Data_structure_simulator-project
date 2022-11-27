import LoginForm from "../components/Auth/LoginForm";
import { mainColor, mainHoverColor } from "../styles/tColors";

import logoImg from '../assets/vzou-favicon-color.png';

const LoginPage = () => {
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
      <div className="flex min-h-full items-center justify-center py-12 px-2 sm:px-4 lg:px-8 ">
        <div className="max-w-sm w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="w-full max-w-md space-y-8 ">
            <div>
              <img
                className="mx-auto h-16 w-auto"
                src={logoImg}
                alt="Vzou"
              />
              <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm ">
                Or{" "}
                <a
                  href="#"
                  className={`font-medium text-${mainColor} hover:text-${mainHoverColor}`}
                >
                  Sign up now!
                </a>
              </p>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
