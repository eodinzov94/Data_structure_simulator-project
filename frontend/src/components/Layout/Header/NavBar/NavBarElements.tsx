import { Popover } from "@headlessui/react";
import {
  resources,
  //solutions,
  // recentPosts,
  // callsToAction,
} from "../HeaderData";
import NavBarElementLink from "./NavBarElementLink";
import NavBarElementDropDown from "./NavBarElementDropDown";
import { RoutePaths } from '../../../../Routes/RoutePaths';
import { useAppSelector } from '../../../../store/hooks'


const NavBarElements = () => {
  const userRole = useAppSelector(state => state.auth.user?.role)

  return (
    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
      {/* <NavBarElementDropDown title={"Solutions"} items={solutions} />
      <NavBarElementLink title={"Docs"} link="#"></NavBarElementLink> */}
      <NavBarElementLink title={"Reports"} link={RoutePaths.REPORTS}></NavBarElementLink>
              <NavBarElementLink title={"Feedback"} link={userRole === 'Lecturer' ?RoutePaths.ALL_FEEDBACKS: RoutePaths.POST_FEEDBACK}></NavBarElementLink>
      <NavBarElementDropDown title={"More"} items={resources} />
    </Popover.Group>
  );
};

export default NavBarElements;
