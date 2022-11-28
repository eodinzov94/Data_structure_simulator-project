
import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props{
    key:number
    title:string
    image:string
    url:string
}


const DS_Card = ({ title, image, url }:Props) => {
  return (
    <div className={classNames(["bg-white hover:bg-lime-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center", "transition-all duration-500 ease-in-out"])}>
      <div className="relative mt-2 mx-2">
        <div className="h-56 rounded-2xl overflow-hidden">
            <Link to={url}>
            <img src={image} className="object-cover w-full h-full" alt={title} />
            </Link>
          
        </div>
      </div>
      <div className="pt-10 pb-6 w-full px-4;">
        <h1 className="font-medium leading-none text-base tracking-wider text-black">{title}</h1>
      </div>
    </div>
  );
};

export default DS_Card;