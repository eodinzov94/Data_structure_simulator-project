import { Popover } from "@headlessui/react";
import {
  resources,
  //solutions,
  // recentPosts,
  // callsToAction,
} from "../HeaderData";
import NavBarElementLink from "./NavBarElementLink";
import NavBarElementDropDown from "./NavBarElementDropDown";
import { RoutePaths } from "../../../../Routes/RoutePaths";
import { selectAuthentication } from "../../../../store/reducers/auth-reducer";
import { useAppSelector } from "../../../../store/hooks";

const NavBarElements = () => {
  const authSlice = useAppSelector(selectAuthentication);

  return (
    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
      {/* <NavBarElementDropDown title={"Solutions"} items={solutions} />
      <NavBarElementLink title={"Docs"} link="#"></NavBarElementLink> */}

      {authSlice.isLoggedIn ? (
        //you can add here buttons for every role that logged in

        authSlice.user?.role === "Lecturer" ? (
          // lecturer
          <>
            <NavBarElementLink
              title={"Reports"}
              link={RoutePaths.REPORTS}
            ></NavBarElementLink>
            <NavBarElementLink
              title={"Feedback"}
              link={RoutePaths.ALL_FEEDBACKS}
            ></NavBarElementLink>
            <NavBarElementLink
              title={"Register Lecturer"}
              link={RoutePaths.REGISTER_LECTURER}
            ></NavBarElementLink>
          </>
        ) : (
          // general user - not lecturer
          <>
            <NavBarElementLink
              title={"Add Feedback"}
              link={RoutePaths.ADD_FEEDBACK}
            ></NavBarElementLink>
          </>
        )
      ) : (
        // not logged in
        <>
          <NavBarElementDropDown title={"More"} items={resources} />
        </>
      )}
    </Popover.Group>
  );
};

export default NavBarElements;
