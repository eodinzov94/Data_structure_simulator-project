// const btnColor:string = "text-lime-500";
import { RoutePaths } from "../../../../Routes/routesData";
import {Link} from 'react-router-dom';

const NavBarElementsRight = () => {
  return (
    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
      <Link
        to={RoutePaths.LOGIN}
        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        to={''}
        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600"
      >
        Sign up
      </Link>
    </div>
  );
};

export default NavBarElementsRight;
