import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropDownItem {
  name: string;
  description: string;
  href: string;
  icon: JSX.Element;
}

interface NavBarElementDropDownProps {
  title: string;
  items: DropDownItem[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBarElementDropDown = (props: NavBarElementDropDownProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-gray-500",
              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span>{props.title}</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {props.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NavBarElementDropDown;

//2 button in the buttom of the dropdwon
//   <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
//                     {callsToAction.map((item) => (
//                       <div key={item.name} className="flow-root">
//                         <a
//                           href={item.href}
//                           className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
//                         >
//                           <item.icon
//                             className="h-6 w-6 flex-shrink-0 text-gray-400"
//                             aria-hidden="true"
//                           />
//                           <span className="ml-3">{item.name}</span>
//                         </a>
//                       </div>
//                     ))}
//                   </div>
