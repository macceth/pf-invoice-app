const BottomButtonGroup: React.FC<{}> = ({children}) => {
  return (
    <div className="fixed left-0 bottom-0 bg-white dark:bg-app-dark-3 shadow-t-xl min-w-full flex items-center justify-end sm:hidden h-auto p-3">
      {children}
    </div>
  );
};

export default BottomButtonGroup;
