interface PageProps {
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className }) => {
  return <div className={"flex flex-col items-center w-screen mx-3 overflow-y-scroll pt-16 sm:pt-0 " + (className ? className : "")}>{children}</div>;
};

export default Page;
