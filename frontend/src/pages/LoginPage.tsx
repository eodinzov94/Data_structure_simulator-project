import LoginForm from "../components/Auth/LoginForm";
import { mainColor, mainHoverColor } from "../styles/tColors";
import { RoutePaths } from "../Routes/routesData";
import { Link } from "react-router-dom";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { loginImgLime500, faviconLime500 } from "../utils/logos";

const LoginPage = () => {
  return (
    <>
      <FloatUpContainer>
        <div className="flex min-h-full items-center justify-center py-12 px-2 sm:px-4 lg:px-8 ">
          <div className="max-w-sm w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="w-full max-w-md space-y-8 ">
              <div>
                <img
                  className="mx-auto h-16 w-auto"
                  src={faviconLime500}
                  alt="Vzou"
                />
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm ">
                  Or{" "}
                  <Link
                    to={RoutePaths.REGISTER}
                    className={`font-medium text-${mainColor} hover:text-${mainHoverColor}`}
                  >
                    Sign up now!
                  </Link>
                </p>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </FloatUpContainer>
      <FloatUpContainer>
        <div className="flex items-center justify-center py-12 px-2 sm:px-4 lg:px-8 ">
          <img className="h-96" src={loginImgLime500} alt="Vzou" />
        </div>
      </FloatUpContainer>
    </>
  );
};

export default LoginPage;
