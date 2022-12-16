import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  key: number;
  title: string;
  image: string;
  gif?: string;
  url: string;
  description?: string;
}

const DsCard = ({ title, image, url, description, gif }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className=" hover:bg-lime-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out bg-lime-100"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="relative mt-2 mx-2">
        <div className="h-56 rounded-2xl overflow-hidden">
          <Link to={url}>
            {isHovering ? (
              <img
                src={gif}
                className="object-cover w-full h-full"
                alt={title}
              />
            ) : (
              <img
                src={image}
                className="object-cover w-full h-full"
                alt={title}
              />
            )}
          </Link>
        </div>
      </div>
      <div className="pt-8 pb-6 w-full px-4;">
        <h1 className="font-medium leading-none text-base tracking-wider text-black">
          {title}
        </h1>
        {description && (
          <h1 className="text-gray-700 text-base ">{description}</h1>
        )}
      </div>
    </div>
  );
};

export default DsCard;
