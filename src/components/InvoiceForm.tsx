import { create } from "domain";
import React, { Dispatch, SetStateAction } from "react";

export enum modes {
  CREATE,
  EDIT,
}

interface InvoiceFormProps {
  setShowInvoiceForm: Dispatch<SetStateAction<boolean>>;
  mode: modes;
}

const InvoiceForm = ({ setShowInvoiceForm, mode }: InvoiceFormProps) => {
  const hideInvoiceForm = () => {
    setShowInvoiceForm(false);
  };

  return (
    <div>
      <h1>Form</h1>
      {mode === modes.CREATE && <h2>CREATE</h2>}
      {mode === modes.EDIT && <h2>EDIT</h2>}
      <button onClick={hideInvoiceForm}>cancel</button>
    </div>
  );
};

export default InvoiceForm;
