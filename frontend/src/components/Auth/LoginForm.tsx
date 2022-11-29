import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CheckEmail, CheckPassword } from "./AuthFunctions";
import { RoutePaths } from "../../Routes/routesData";
import ErrorMsg from "../UI/ErrorMsg";
import FormButton from "./FormButton";
// import { mainColor, mainHoverColor } from "../../styles/tColors";

const LoginForm = () => {
  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isVaildPassword, setIsPassword] = useState(true);

  let history = useHistory();

  const SubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPassword(true);
    setIsValidEmail(true);
    setError(false);
    //get email and password values
    const password = enteredPassword.current?.value || "";
    const email = enteredEmail.current?.value || "";
    console.log(password, email);

    //check values
    var flag = false;
    if (!CheckEmail(email)) {
      setIsValidEmail(false);
      flag = true;
      //errorMsg = "Invalid email";
    }
    if (!CheckPassword(password)) {
      setIsPassword(false);
      flag = true;
      //errorMsg +="Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter";
    }

    //Display the error to the user and return
    if (flag) {
      setError(true);
      return;
    }

    //Send request to the server!!!!!!!!!!!!!!!!!!!!
    history.replace(RoutePaths.HOME);
  };

  return (
    <form
      className="mt-8 space-y-6"
      action={"#"}
      method="POST"
      onSubmit={SubmitLogin}
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Email address"
            ref={enteredEmail}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Password"
            ref={enteredPassword}
          />
        </div>
      </div>

      {error && (
        <ErrorMsg
          ErrorMessages={[
            { isValid: isValidEmail, msg: "Invalid email", key: 1 },
            {
              isValid: isVaildPassword,
              msg: `Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter`,
              key: 2,
            },
          ]}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to={RoutePaths.FORGOT_PASSWORD}
            className={`font-medium text-lime-500 hover:text-lime-600`}
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <FormButton
        type={"submit"}
        title={"Sign in"}
        icon={
          <LockClosedIcon
            className={`h-5 w-5 text-lime-600 group-hover:text-lime-500`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default LoginForm;
