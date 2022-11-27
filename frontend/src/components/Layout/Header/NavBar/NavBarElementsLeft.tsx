import logoImg from "../../../../assets/vzou-logo-trans.png";
import { Link } from "react-router-dom";
const NavBarElementsLeft = () => {
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <span className="sr-only">Your Company</span>
      <Link to={""}>
        <img
          className="h-12 w-auto sm:h-10"
          // src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=500"
          src={logoImg}
          alt=""
        />
      </Link>
      {/* <a className="text-2xl">VisualSCE</a> */}
    </div>
  );
};

export default NavBarElementsLeft;
