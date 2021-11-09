import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import React, { useEffect, useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoicesData } from "../store/invoice-action";

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const invoices = useAppSelector((state) => state.invoice.invoices);

  const dispatch = useAppDispatch();

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  useEffect(() => {
    dispatch(fetchInvoicesData());
  }, [dispatch]);

  return (
    <React.Fragment>
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.CREATE} />}
      <div className="flex flex-col items-center w-screen h-screen mx-3 overflow-y-scroll">
        <div className="container max-w-5xl pt-10 mx-auto">
          <div className="flex justify-between mb-14">
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

          {invoices.map((item) => (
            <InvoiceItem
              id={item.id}
              clientName={item.clientName}
              paymentDue={item.paymentDue}
              key={item.id}
              total={item.total}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invoices;
