import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import FormButton from "./FormButton";
import { useState } from "react";
import ErrorMsg from "../UI/ErrorMsg";
import { useHistory } from "react-router-dom";
import { RoutePaths } from "../../Routes/RoutePaths";
import {
  CheckConfirmPassword,
  CheckEmail,
  CheckName,
  CheckPassword,
} from "./AuthFunctions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
};

const RegisterLecturerForm = () => {
  const [dataEntered, setDataEntered] = useState(initialState);
  const [errorMsgs, setErrorMsg] = useState<string[]>([]);
  let history = useHistory();

  const onChangeHandler = (event: any) => {
    setDataEntered((prevstate) => {
      return { ...prevstate, [event.target.name]: event.target.value };
    });
  };

  const checkData = () => {
    const errorStack = [];
    //check passwords
    if (!CheckPassword(dataEntered.password)) {
      errorStack.push(
        "Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter"
      );
    } else if (
      !CheckConfirmPassword(dataEntered.password, dataEntered.ConfirmPassword)
    ) {
      errorStack.push("The passwords must match");
    }

    //check names
    if (!CheckName(dataEntered.firstName) || !CheckName(dataEntered.lastName)) {
      errorStack.push("Invalid name, must contain:[a-z],[A-Z]");
    }

    //check email
    if (!CheckEmail(dataEntered.email)) {
      errorStack.push("Invalid email");
    }
    return errorStack;
  };

  const onSubmitHanler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //check entered data
    const errors = checkData();
    setErrorMsg(errors);
    if (errors.length) {
      return;
    }

    //Send request to the server!!!!!!!!!!!!!!!!!!!!


    history.replace(RoutePaths.LOGIN); //redirect the user to the login page


  };

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={onSubmitHanler}
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        {/* first name */}
        <div>
          <label htmlFor="First-Name" className="sr-only">
            First Name
          </label>
          <input
            onChange={onChangeHandler}
            id="First-Name"
            name="firstName"
            type="text"
            autoComplete="first-name"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="First name"
          />
        </div>

        {/* last name */}
        <div>
          <label htmlFor="Last-Name" className="sr-only">
            Last Name
          </label>
          <input
            onChange={onChangeHandler}
            id="Last-Name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Last name"
          />
        </div>


        {/* email */}
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            onChange={onChangeHandler}
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Email address"
          />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            onChange={onChangeHandler}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="ConfirmPassword" className="sr-only">
            Confirm password
          </label>
          <input
            onChange={onChangeHandler}
            id="ConfirmPassword"
            name="ConfirmPassword"
            type="password"
            required
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Confirm Password"
          />
        </div>
      </div>


      {errorMsgs.length !== 0 && <ErrorMsg ErrorMessages={errorMsgs} />}

      <FormButton
        type={"submit"}
        title={"Register"}
        icon={
          <ClipboardDocumentListIcon
            className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default RegisterLecturerForm;
