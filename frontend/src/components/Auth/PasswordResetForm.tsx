import ErrorMsg from "../UI/ErrorMsg";
import { useState, useRef } from "react";
import FormButton from "./FormButton";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { ContentProps } from "../../pages/ForgotPasswordPage";
import { CheckPassword, CheckConfirmPassword } from "./AuthFunctions";

interface Props{
    changePassword:(password:string)=>void
}

const PasswordResetForm = (props:Props)=>{
    const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
    const enterdPassword1 = useRef<HTMLInputElement>(null);
    const enterdPassword2 = useRef<HTMLInputElement>(null);

    const changePassword = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const errorStack = [];
        const password = enterdPassword1.current?.value || "";
        const confirmPassword = enterdPassword2.current?.value || "";

        //check passwords
        if (!CheckPassword(password)) {
          errorStack.push(
            "Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter"
          );
        } else if (
          !CheckConfirmPassword(password, confirmPassword)
        ) {
          errorStack.push("The passwords must match");
        }
    
        //Display the error to the user and return
        setErrorMsgs(errorStack);
        if (errorStack.length!==0) {
            return;
        }

        props.changePassword(password);
    }

    return (
        <form
        className="mt-8 space-y-6"
        action={"#"}
        method="POST"
        onSubmit={changePassword}
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="passord1"
              name="passord1"
              type="password"
              required
              className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
              placeholder="Password"
              ref={enterdPassword1}
            />
            <input
              id="passord2"
              name="passord2"
              type="password"
              required
              className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
              placeholder="Confirm password"
              ref={enterdPassword2}
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
}

export default PasswordResetForm;