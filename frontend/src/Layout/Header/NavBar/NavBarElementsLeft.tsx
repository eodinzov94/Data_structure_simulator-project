const NavBarElementsLeft = () => {
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <a href="#">
        <span className="sr-only">Your Company</span>
        <img
          className="h-8 w-auto sm:h-10"
          src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=500"
          alt=""
        />
      </a>
      <a className="text-2xl">VisualSCE</a>
    </div>
  );
};

export default NavBarElementsLeft;
