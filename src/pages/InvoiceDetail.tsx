import { Link, useParams } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useState } from "react";
import InvoiceStatus from "../components/InvoiceStatus";

import data from "../data.json";
import Button, { Modes } from "../components/Button";

const InvoiceDetail = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  const { invoiceId } = useParams<{ invoiceId: string }>();
  const itemData = data.find((item) => item.id === invoiceId);

  const markAsPaid = () => {};

  const Edit = () => {
    showInvoiceForm();
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen mx-3 overflow-y-scroll">
      {itemData && (
        <div className="container max-w-5xl pt-10 mx-auto">
          <Link to="/invoices">
            <button className="flex items-center mb-10">
              <img className="mr-5" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="icon-arrow-left" />
              <span className="text-gray-800 dark:text-white font-bold">Go Back</span>
            </button>
          </Link>

          <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 flex justify-between">
            <div className="flex items-center dark:text-gray-400">
              Status <InvoiceStatus status={itemData.status} className="ml-3" />
            </div>
            <div>
              <Button onClick={Edit} mode={Modes.Edit} />
              <Button onClick={Edit} mode={Modes.Delete} />
              <Button onClick={markAsPaid} mode={Modes.MarkAsPaid} />
            </div>
          </div>

          <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 mt-6 flex justify-between">
            test
          </div>

          <div className="flex justify-between mb-14">
            {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.EDIT} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
