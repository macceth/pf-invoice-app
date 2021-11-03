import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import { useState } from "react";

import data from "../data.json";
import InvoiceItem from "../components/InvoiceItem";

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  return (
    <div className="flex flex-col items-center w-screen">
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.CREATE} />}
      <div className="container max-w-5xl pt-10 mx-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Invoices</h1>
            <h3 className="text-sm mt-3 text-gray-600 dark:text-white">There are ... total invoices</h3>
          </div>
          <div>
            <button className="mr-5 text-gray-600 dark:text-white">
              Filter by status <img className="inline-block" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="icon-arrow-down" />
            </button>
            <Button onClick={showInvoiceForm} mode={buttonModes.NewInvoice} />
          </div>
        </div>

        {data.map((item) => (
          <InvoiceItem id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Invoices;
