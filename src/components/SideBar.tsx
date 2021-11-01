const SideBar = () => {
  return (
    <div className="flex flex-col w-24 bg-sidebar rounded-r-3xl overflow-hidden">
      <div className="flex-none flex justify-center items-center text-white bg-purple h-20">
        LOGO
      </div>
      <div className="flex-grow"></div>
      <div className="flex-none text-white">name</div>
    </div>
  );
};

export default SideBar;
