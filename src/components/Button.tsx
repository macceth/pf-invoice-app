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
  B6,
}

const Button = ({ mode, className, onClick }: ButtonProps) => {
  let btnClass = className ? className : "";
  if (mode === Modes.NewInvoice) {
    btnClass = "bg-purple m-1 text-white rounded-3xl px-2 py-2 hover:bg-purple-light transition-color duration-100";
  } else if (mode === Modes.MarkAsPaid) {
    btnClass = "bg-purple m-1 text-white rounded-3xl px-5 py-3 hover:bg-purple-light transition-color duration-100";
  } else if (mode === Modes.Edit || mode === Modes.Cancel) {
    btnClass =
      "bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 m-1 text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 rounded-3xl px-5 py-3 transition-color duration-100";
  } else if (mode === Modes.Delete) {
    btnClass = "bg-red-400 m-1 text-white rounded-3xl px-5 py-3 hover:bg-red-300 transition-color duration-100";
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
    </button>
  );
};

export default Button;
