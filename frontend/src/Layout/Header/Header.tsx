import ReactDOM from "react-dom";
import HeaderContent from "./HeaderContent";

const Header = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <HeaderContent />,
        document.getElementById("bt_header_id") as HTMLElement
      )}
    </>
  );
};

export default Header;
