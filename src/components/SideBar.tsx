interface SideBarProps {
  toggleDarkModeHandler: () => void;
}

const SideBar = ({ toggleDarkModeHandler }: SideBarProps) => {
  return (
    <div className="flex flex-col w-20 bg-sidebar rounded-r-3xl overflow-hidden">
      <div className="flex-none flex justify-center items-center text-white bg-purple h-20">
        <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="" />
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
  );
};

export default SideBar;
