import React from "react";

interface SideBarProps {
  toggleDarkModeHandler: () => void;
}

const SideBar = ({ toggleDarkModeHandler }: SideBarProps) => {
  return (
    <React.Fragment>
      <div className="hidden sm:flex flex-col w-20 h-screen absolute bg-app-dark-3 rounded-r-3xl overflow-hidden">
        <div className="flex-none flex justify-center items-center text-white bg-purple h-20">
          <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="logo" />
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none text-center text-white">
          <button onClick={toggleDarkModeHandler}>
            <img className="block dark:hidden" src={process.env.PUBLIC_URL + "/assets/icon-moon.svg"} alt="icon-moon" />
            <img className="hidden dark:block" src={process.env.PUBLIC_URL + "/assets/icon-sun.svg"} alt="icon-sun" />
          </button>
        </div>
        <hr className="w-auto mx-1 my-4 border-purple-line" />
        <div className="flex-none flex justify-center">
          <img className="rounded-full w-10 mb-3" src={process.env.PUBLIC_URL + "/assets/image-avatar.jpg"} alt="avatar" />
        </div>
      </div>
      {/* ------------------------------- */}
      <div className="flex justify-between sm:hidden fixed top-0 w-screen bg-app-dark-3 h-16">
        <div className="flex-none flex justify-center items-center text-white bg-purple w-16">
          <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="logo" />
        </div>
        <div className="flex h-auto items-center justify-center">
          <div className="flex-none text-center text-white my-0 mr-3 pr-3 border-r border-gray-600">
            <button onClick={toggleDarkModeHandler}>
              <img className="block dark:hidden" src={process.env.PUBLIC_URL + "/assets/icon-moon.svg"} alt="icon-moon" />
              <img className="hidden dark:block" src={process.env.PUBLIC_URL + "/assets/icon-sun.svg"} alt="icon-sun" />
            </button>
          </div>
          <img className="rounded-full w-10 h-10 mr-3" src={process.env.PUBLIC_URL + "/assets/image-avatar.jpg"} alt="avatar" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
