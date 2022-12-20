import MediumCard from "../UI/MediumCard";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import FormButton from "./FormButton";
import ErrorMsg from "../UI/ErrorMsg";
import { useState } from "react";
import { MailboxLime500 } from "../../utils/logos";
import FloatUpContainer from "../UI/FloatUpContainer";
import { useRef } from "react";

const AddFeedbackPage = () => {
  const [errorMsgs, setErrorMsg] = useState<string[]>([]);
  const dataEntered = useRef<HTMLTextAreaElement>(null);

  const onSubmitHanler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = dataEntered.current?.value;
    if (content?.trim().length === 0) {
      setErrorMsg(["You can't submit empty feedback"]);
      return;
    }

    //send to the server
  };

  return (
    <MediumCard>
      <form
        className="mt-8 space-y-6"
        action="#"
        method="POST"
        onSubmit={onSubmitHanler}
      >
        <div className="-space-y-px rounded-md shadow-sm">
          {/* feedback input */}
          <div>
            <textarea
              ref={dataEntered}
              required
              placeholder="Enter your feedback"
              cols={50}
              rows={7}
              className={`relative block w-full appearance-none rounded border border-gray-300 px-3 py-6 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            ></textarea>
          </div>
        </div>

        {errorMsgs.length !== 0 && <ErrorMsg ErrorMessages={errorMsgs} />}

        <FormButton
          type={"submit"}
          title={"Submit Feddback"}
          icon={
            <ClipboardDocumentListIcon
              className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
              aria-hidden="true"
            />
          }
        />
      </form>
      <FloatUpContainer>
        <div className="flex items-center justify-center py- px-2 sm:px-4 lg:px-8 ">
          <img className="h-64" src={MailboxLime500} alt="Vzou" />
        </div>
      </FloatUpContainer>
    </MediumCard>
  );
};

export default AddFeedbackPage;
