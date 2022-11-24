interface NavBarElementLinkProps {
  title: string;
  link: string;
}

const NavBarElementLink = (props: NavBarElementLinkProps) => {
  return (
    <a
      href={props.link}
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      {props.title}
    </a>
  );
};

export default NavBarElementLink;
