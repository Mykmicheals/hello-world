import { useState } from "react";
// import { Transition } from "@headlessui/react";
import SideBar from "./SideBar";
import {BiMenuAltRight} from 'react-icons/bi'

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="relative fixed">
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className='w-1/2 backdrop-brightness-50 h-screen fixed top-0 right-0 z-20 md:backdrop-brightness-100'
          ></div>
        )}

        <header className=" w-full bg-white shadow-lg z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <h1>FT9ja</h1>

              <div className="md:hidden">
                <button
                  type="button"
                  className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {!isOpen ? (
                  <BiMenuAltRight className="w-8 h-8" />
                ) : (
                  <h2 className=" text-2xl">X</h2>
                )}
                </button>
{/* 
                <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="fixed h-screen overflow-scroll absolute top-0 w-2/3 left-0 z-50 md:hidden"
              >
                <div className="w-full h-screen overflow-scroll bg-[#242426]">
                  <SideBar setIsOpen={setIsOpen} />
                </div>
              </Transition> */}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
