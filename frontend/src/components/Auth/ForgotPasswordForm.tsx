import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckEmail } from "./AuthFunctions";
import { RoutePaths } from "../../Routes/RoutePaths";
import ErrorMsg from "../UI/ErrorMsg";
import FormButton from "./FormButton";
import { ContentProps } from "../../pages/ForgotPasswordPage";
const ForgotPasswordForm = (props:ContentProps) => {
  const enteredEmail = useRef<HTMLInputElement>(null);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  let history = useHistory();

  const SubmitEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    //get email value
    const email = enteredEmail.current?.value || "";

    //check email
    const errors = [];
    if (!CheckEmail(email)) {
      errors.push("Invalid email");
    }

    //Display the error to the user and return
    setErrorMsgs(errors);
    if (errors.length!==0) {
      return;
    }

    //Send request to the server!!!!
    

    //if error display the error

    //if the email was sent, change the page to input code page
    props.onConfirm() 

  };

  return (
    <form
      className="mt-8 space-y-6"
      action={"#"}
      method="POST"
      onSubmit={SubmitEmail}
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

      {errorMsgs.length!==0 && (
        <ErrorMsg
          ErrorMessages={errorMsgs}
        />
      )}
      <FormButton
        type={"submit"}
        title={"Send code"}
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
