import {
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import FormButton from "../components/Auth/FormButton";
import RadioButton from "../components/UI/RadioButton";
import { useAppSelector } from "../store/hooks";
import { mainColor, mainHoverColor } from "../styles/tColors";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import AuthCard from "../components/Auth/AuthCard";
import { Switch } from "@headlessui/react";
import { FormEvent, useState } from "react";
import { IUser } from "../types/Auth";

const GENDER = ["Male", "Female"];

const EditProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user!);
  const [editUser, setEditUser] = useState<IUser>(user);
  var emailClass = `col-span-2 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`;
  if (user.role === "Lecturer") emailClass += " rounded-b-md";
  let gender = 0;
  if (editUser.gender && editUser.gender == "Female") gender = 1;

  const onChangeHandler = (event: any) => {
    setEditUser((prevstate) => {
      return { ...prevstate, [event.target.name]: event.target.value };
    });
  };

  const onChangeGender = (index: number) => {
    setEditUser((prevstate) => {
      return { ...prevstate, gender: GENDER[index] as "Male" | "Female" };
    });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //SEND TO BACKEND - the data in the editUser state !!!!!!!!!!!!!!!!
  };

  return (
    <FloatUpContainer>
      <AuthCard title={"Edit Profile"}>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="-space-y-px rounded-md shadow-sm grid grid-cols-3">
            {/* first name */}
            <label htmlFor="First-Name">First Name:</label>
            <input
              id="First-Name"
              name="firstName"
              type="text"
              autoComplete="first-name"
              required
              className={`col-span-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
              value={editUser.firstName}
              onChange={onChangeHandler}
            />

            {/* last name */}
            <label htmlFor="Last-Name">Last Name:</label>
            <input
              id="Last-Name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className={`col-span-2 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
              value={editUser.lastName}
              onChange={onChangeHandler}
            />

            {/* email */}
            <label htmlFor="email-address">Email address:</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={emailClass}
              value={editUser.email}
              onChange={onChangeHandler}
            />

            {user.role !== "Lecturer" && (
              <>
                <label htmlFor="birthYear">Birth Year:</label>
                <input
                  id="birthYear"
                  name="birthYear"
                  type="number"
                  max={new Date().getFullYear() - 16}
                  min={new Date().getFullYear() - 120}
                  required
                  className={`col-span-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                  value={editUser.birthYear?.toString()}
                  onChange={onChangeHandler}
                />
                <label htmlFor="" className="py-4">
                  Gender:
                </label>
                <div className="py-2 col-span-2">
                  <RadioButton
                    value={gender}
                    labelText=""
                    onChange={onChangeGender}
                    options={[
                      <div className="flex flex-1 justify-around">
                        <span>{GENDER[0]}</span>
                        <UserIcon className="w-4" />
                      </div>,
                      <div className="flex  flex-1 justify-around">
                        <span>{GENDER[1]}</span>
                        <UserIcon className="w-4" />
                      </div>,
                    ]}
                  />
                </div>
                <label htmlFor="2-factor-auth">2 factor auth:</label>
                <Switch
                  checked={editUser.is2FA}
                  onChange={(checked: boolean) => {
                    setEditUser((prevstate) => {
                      return { ...prevstate, is2FA: checked };
                    });
                  }}
                  className={`${
                    editUser.is2FA ? "bg-lime-500" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      editUser.is2FA ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </>
            )}
          </div>

          <FormButton
            type={"submit"}
            title={"submit"}
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

export default EditProfilePage;
