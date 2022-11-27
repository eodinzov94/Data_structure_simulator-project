import { LockClosedIcon } from "@heroicons/react/20/solid";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import RadioButton from "../helpers/RadioButton";
import { UserIcon } from "@heroicons/react/24/solid";

const RegistrationForm = () => {
  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        {/* first name */}
        <div>
          <label htmlFor="First-Name" className="sr-only">
            First Name
          </label>
          <input
            id="First-Name"
            name="First-Name"
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
            id="Last-Name"
            name="Last-Name"
            type="text"
            autoComplete="family-name"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Last name"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="Age" className="sr-only">
            Age
          </label>
          <input
            id="Age"
            name="Age"
            type="number"
            min={1} 
            max={120}
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Age"
          />
        </div>

        {/* email */}
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
            id="ConfirmPassword"
            name="ConfirmPassword"
            type="password"
            required
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <RadioButton
        labelText="Gender"
        options={[
          <div className="flex flex-1 justify-around">
            <span>Male</span>
            <UserIcon className="w-4" />
          </div>,
          <div className="flex  flex-1 justify-around">
            <span>Female</span>
            <UserIcon className="w-4" />
          </div>,
        ]}
      />


      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-500 py-2 px-4 text-sm font-medium text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
              aria-hidden="true"
            />
          </span>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
