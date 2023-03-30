import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { FC, FormEvent, useState } from 'react'
import { CheckEmail } from './AuthFunctions'
import ErrorMsg from '../UI/ErrorMsg'
import FormButton from './FormButton'
import { useSend2FACodeMutation } from '../../store/reducers/auth-reducer-api'
import { CodeTypes } from '../../types/Auth'
import { isErrorWithDataAndMessage } from '../../utils/helper-functions'

interface EmailForVerificationProps{
  setEmail:(code:string) => void
  onConfirm: () => void;
}
const EmailForVerification:FC<EmailForVerificationProps> = ({setEmail,onConfirm}) => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [sendCode, { error,isSuccess }] = useSend2FACodeMutation()
  const SubmitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    //check email
    const errors = [];
    if (!CheckEmail(enteredEmail)) {
      errors.push("Invalid email");
    }

    //Display the error to the user and return
    setErrorMsgs(errors);
    if (errors.length!==0) {
      return;
    }
    //Send request to the server!!!!
    await sendCode({email:enteredEmail,type:CodeTypes.RESET_PW}).unwrap()
      .then(() => {
      setEmail(enteredEmail)
      onConfirm()})
    .catch((rejected) => console.error(rejected));
  };

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={SubmitEmail}
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm`}
            placeholder="Email address"
            value={enteredEmail}
            onChange={(e)=>setEnteredEmail(e.target.value)}
          />
        </div>
      </div>

      {errorMsgs.length!==0 && (
        <ErrorMsg
          ErrorMessages={errorMsgs}
        />
      )}
      {isErrorWithDataAndMessage(error) && (
        <ErrorMsg
          ErrorMessages={[error.data.message]}
        />
      )}
      <FormButton
        type={"submit"}
        title={"Send code"}
        icon={
          <EnvelopeIcon
            className={`h-5 w-5 text-lime-600 group-hover:text-lime-500`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default EmailForVerification;
