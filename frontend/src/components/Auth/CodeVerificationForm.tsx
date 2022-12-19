import ErrorMsg from "../UI/ErrorMsg";
import { useState, useRef } from "react";
import FormButton from "./FormButton";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { ContentProps } from "../../pages/ForgotPasswordPage";

const CodeVerificationForm = (props:ContentProps) => {
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const enterdCode = useRef<HTMLInputElement>(null);

  const SubmitCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onConfirm();
  };

  return (
    <form
      className="mt-8 space-y-6"
      action={"#"}
      method="POST"
      onSubmit={SubmitCode}
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="code"
            name="code"
            type="text"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Enter code"
            ref={enterdCode}
          />
        </div>
      </div>

      {errorMsgs.length !== 0 && <ErrorMsg ErrorMessages={errorMsgs} />}
      <FormButton
        type={"submit"}
        title={"Submit code"}
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

export default CodeVerificationForm;
