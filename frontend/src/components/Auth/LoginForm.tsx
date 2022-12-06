import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CheckEmail, CheckPassword } from "./AuthFunctions";
import { RoutePaths } from "../../Routes/RoutePaths";
import ErrorMsg from "../UI/ErrorMsg";
import FormButton from "./FormButton";
// import { mainColor, mainHoverColor } from "../../styles/tColors";
import { selectAuthentication } from "../../store/reducers/auth-reducer";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { login } from "../../store/reducers/auth-reducer";

const LoginForm = () => {
  const slice = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();
  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  let history = useHistory();

  const SubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsgs([]);
    //get email and password values
    const password = enteredPassword.current?.value || "";
    const email = enteredEmail.current?.value || "";

    const errors= []
    //check values
    var flag = false;
    if (!CheckEmail(email)) {
      errors.push("Invalid email");
    }

    if (!CheckPassword(password)) {
      errors.push("Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter");
    }

    //Display the error to the user and return
    setErrorMsgs(errors);
    if (errors.length) {
      return;
    }
    dispatch(login({password,email}));
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

      {errorMsgs.length!==0 && (
        <ErrorMsg
          ErrorMessages={errorMsgs}
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
