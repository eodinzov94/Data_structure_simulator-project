import { motion, useTime, useTransform } from "framer-motion";
import { faviconLime500 } from "../../utils/logos";

interface Props {
    title:string;
    children?: JSX.Element | JSX.Element[];
}

const AuthCard = (props: Props) => {
  const time = useTime();
  const rotate = useTransform(time, [0, 6000], [0, 360], { clamp: false });

  return (
    <div className="flex min-h-full items-center justify-center py-10 px-2 sm:px-4 lg:px-8 ">
      <div className="max-w-md w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="w-full max-w-md space-y-8 ">
          <div>
            <motion.img
              style={{ rotate }} 
              className="mx-auto h-16 w-16"
              src={faviconLime500}
              alt="Vzou"
            />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              {props.title}
            </h2>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
