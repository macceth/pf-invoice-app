import { Link, useParams } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useState } from "react";
import InvoiceStatus from "../components/InvoiceStatus";

const InvoiceDetail = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  const params = useParams<{ invoiceId: string }>();
  return (
    <div className="flex flex-col items-center w-screen h-screen mx-3 overflow-scroll">
      <div className="container max-w-5xl pt-10 mx-auto">
        <Link to="/invoices">
          <button className="flex items-center mb-10">
            <img className="mr-5" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="icon-arrow-left" />
            <span className="text-gray-800 dark:text-white font-bold">Go Back</span>
          </button>
        </Link>

        <div className="bg-white shadow-sm p-5">
          <div className="flex items-center">Status <InvoiceStatus status="paid" className="ml-3"/></div>
        </div>
        <div className="flex justify-between mb-14">
          {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.EDIT} />}
          <button onClick={showInvoiceForm}>Edit</button>
          <h1>Invoice #{params.invoiceId}</h1>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
