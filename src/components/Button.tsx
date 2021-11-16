import React from "react";

interface ButtonProps {
  mode: Modes;
  className?: string;
  onClick: () => void;
}

export enum Modes {
  NewInvoice,
  MarkAsPaid,
  Edit,
  Delete,
  Cancel,
  SaveAsDraft,
  Discard,
  SaveAndSend,
  SaveChange,
  NewItem,
}

const Button = ({ mode, className, onClick }: ButtonProps) => {
  let btnClass = className ? className : "";
  if (mode === Modes.NewInvoice) {
    btnClass = "bg-purple m-1 text-white rounded-3xl px-2 py-2 hover:bg-purple-light transition-color duration-100";
  } else if (mode === Modes.MarkAsPaid || mode === Modes.SaveAndSend || mode === Modes.SaveChange) {
    btnClass = "bg-purple m-1 text-white rounded-3xl px-5 py-3 hover:bg-purple-light transition-color duration-100";
  } else if (mode === Modes.Edit || mode === Modes.Cancel) {
    btnClass =
      "bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 m-1 text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 rounded-3xl px-5 py-3 transition-color duration-100";
  } else if (mode === Modes.Delete) {
    btnClass = "bg-red-500 m-1 text-white rounded-3xl px-5 py-3 hover:bg-red-400 transition-color duration-100";
  } else if (mode === Modes.Discard) {
    btnClass = "bg-gray-100 m-1 text-gray-600 rounded-3xl px-5 py-3 hover:bg-gray-300 transition-color duration-100";
  } else if (mode === Modes.SaveAsDraft) {
    btnClass = "bg-app-dark-3 m-1 text-gray-400 rounded-3xl px-5 py-3 hover:bg-app-dark-2 transition-color duration-100";
  } else if (mode === Modes.NewItem) {
    btnClass =
      "w-full flex justify-center items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 mt-5 text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 rounded-3xl px-5 py-3 transition-color duration-100";
  }

  return (
    <button className={btnClass} onClick={onClick}>
      {mode === Modes.NewInvoice && (
        <React.Fragment>
          <img className="bg-white rounded-full p-3 inline-block mr-3" src={process.env.PUBLIC_URL + "/assets/icon-plus.svg"} alt="icon plus" />
          New Invoice
        </React.Fragment>
      )}
      {mode === Modes.MarkAsPaid && <React.Fragment>Mark as Paid</React.Fragment>}
      {mode === Modes.Edit && <React.Fragment>Edit</React.Fragment>}
      {mode === Modes.Cancel && <React.Fragment>Cancel</React.Fragment>}
      {mode === Modes.Delete && <React.Fragment>Delete</React.Fragment>}
      {mode === Modes.Discard && <React.Fragment>Discard</React.Fragment>}
      {mode === Modes.SaveAsDraft && <React.Fragment>Save as Draft</React.Fragment>}
      {mode === Modes.SaveChange && <React.Fragment>Save Change</React.Fragment>}
      {mode === Modes.NewItem && (
        <React.Fragment>
          <img src={process.env.PUBLIC_URL + "/assets/icon-plus.svg"} alt="plus-icon" className="mr-3"/>
          Add New Item
        </React.Fragment>
      )}
    </button>
  );
};

export default Button;
