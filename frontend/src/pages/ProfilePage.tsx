import AuthCard from "../components/Auth/AuthCard";
import FormButton from "../components/Auth/FormButton";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import { useAppSelector } from "../store/hooks";
import { LockOpenIcon, PencilIcon } from "@heroicons/react/20/solid";
import { ProfileLime500 } from "../utils/logos";
import RoutePaths from "../Routes/RoutePaths";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user!);

  return (
    <>
      <FloatUpContainer>
        <AuthCard title={"Profile"}>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="text-gray-700 rows-1 break-after-column">
              <div className="grid md:grid-cols-1 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{user.firstName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{user.lastName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href="mailto:jane@example.com">
                      {user.email}
                    </a>
                  </div>
                </div>

                {user.role !== "Lecturer" && (
                  <>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthyear</div>
                      <div className="px-4 py-2">{user.birthYear}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{user.gender}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="space-y-3 w-80">
                <Link to={RoutePaths.EDIT_PROFILE}>
                  <FormButton
                    type={"button"}
                    title={"Edit profile"}
                    onClick={() => {}}
                    icon={
                      <PencilIcon
                        className={`h-5 w-5 text-lime-600 group-hover:text-lime-500`}
                        aria-hidden="true"
                      />
                    }
                  />
                </Link>

                <FormButton
                  type={"button"}
                  title={"Change password"}
                  icon={
                    <LockOpenIcon
                      className={`h-5 w-5 text-lime-600 group-hover:text-lime-500`}
                      aria-hidden="true"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </AuthCard>
      </FloatUpContainer>
      <FloatUpContainer>
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={ProfileLime500} alt="Vzou" />
        </div>
      </FloatUpContainer>
    </>
  );
};

export default ProfilePage;
