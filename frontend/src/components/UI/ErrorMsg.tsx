interface Element {
  isValid: Boolean;
  msg?: string;
  key: Number;
}

interface Props {
  ErrorMessages: Element[];
}

const ErrorMsg = (props: Props) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">
        <>
          {props.ErrorMessages.map((element) => 
              !element.isValid && <li>{element.msg}</li>)}
        </>
      </span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
};

export default ErrorMsg;
