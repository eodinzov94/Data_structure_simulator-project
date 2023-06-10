import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FormEvent, useState } from "react";
import AuthCard from "../components/Auth/AuthCard";
import FormButton from "../components/Auth/FormButton";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { mainColor, mainHoverColor } from "../styles/tColors";

interface PasswordData {
  password: string;
  new_password: string;
  new_password2: string;
}

const ChangePassword = () => {
  const [state, setState] = useState<PasswordData>({
    password: "",
    new_password: "",
    new_password2: "",
  });

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //SEND TO BACKEND - the data in the state!!!!!!!
  };

  const onChangeHandler = (event: any) => {
    setState((prevstate) => {
      return { ...prevstate, [event.target.name]: event.target.value };
    });
  };

  return (
    <FloatUpContainer>
      <AuthCard title={"Change Password"}>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="-space-y-px rounded-md shadow-sm grid grid-cols-">
            {/* current password */}
            <div>
              <input
                onChange={onChangeHandler}
                id="current-password"
                name="password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                placeholder="Current password"
              />
            </div>
            {/* new password */}
            <div>
              <input
                onChange={onChangeHandler}
                id="new-password"
                name="new_password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                placeholder="New password"
              />
            </div>
            {/* new password2 */}
            <div>
              <input
                onChange={onChangeHandler}
                id="new-password2"
                name="new_password2"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <FormButton
            type={"submit"}
            title={"Update Password"}
            icon={
              <ClipboardDocumentListIcon
                className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
                aria-hidden="true"
              />
            }
          />
        </form>
      </AuthCard>
    </FloatUpContainer>
  );
};

export default ChangePassword;
