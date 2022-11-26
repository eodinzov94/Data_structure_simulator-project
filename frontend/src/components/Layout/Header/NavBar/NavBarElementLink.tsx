const onHoverColor:string = "text-lime-500";

interface NavBarElementLinkProps {
  title: string;
  link: string;
}

const NavBarElementLink = (props: NavBarElementLinkProps) => {
  return (
    <a
      href={props.link}
      className={`text-base font-medium text-gray-500 hover:${onHoverColor}`}
    >
      {props.title}
    </a>
  );
};

export default NavBarElementLink;
