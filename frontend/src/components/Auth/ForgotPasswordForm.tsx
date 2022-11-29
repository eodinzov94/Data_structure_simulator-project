import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckEmail } from "./AuthFunctions";
import { RoutePaths } from "../../Routes/routesData";
import ErrorMsg from "../UI/ErrorMsg";
import FormButton from "./FormButton";

const ForgotPasswordForm = () => {
  const enteredEmail = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  let history = useHistory();

  const SubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsValidEmail(true);
    setError(false);
    //get email and password values
    const email = enteredEmail.current?.value || "";
    console.log(email);

    //check values
    var flag = false;
    if (!CheckEmail(email)) {
      setIsValidEmail(false);
      flag = true;
      //errorMsg = "Invalid email";
    }
    //Display the error to the user and return
    if (flag) {
      setError(true);
      return;
    }

    //Send request to the server!!!!!!!!!!!!!!!!!!!!
    history.replace(RoutePaths.LOGIN);
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
      </div>

      {error && (
        <ErrorMsg
          ErrorMessages={[
            { isValid: isValidEmail, msg: "Invalid email", key: 1 },
          ]}
        />
      )}
      <FormButton
        type={"submit"}
        title={"Reset Password"}
        icon={
          <ArrowPathIcon
            className={`h-5 w-5 text-lime-600 group-hover:text-lime-500`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default ForgotPasswordForm;
