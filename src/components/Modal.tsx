import React from "react";

interface ModalProps {
  open: boolean;
  setClose: () => void;
  title: string;
  info: string;
  buttonGroup?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, setClose, title, info, buttonGroup }) => {
  if (open)
    return (
      <React.Fragment>
        <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-70 z-40" onClick={setClose}></div>
          <div className="bg-white dark:bg-app-dark-4 p-8 rounded-md z-50 max-w-xl mx-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-900 dark:text-white mt-8">{info}</p>
            <div className="w-auto text-right mt-6">{buttonGroup}</div>
          </div>
        </div>
      </React.Fragment>
    );
  return null;
};

export default Modal;
