import { Link, useParams } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useState } from "react";

const InvoiceDetail = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  const params = useParams<{ invoiceId: string }>();
  return (
    <div>
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.EDIT} />}
      <button onClick={showInvoiceForm}>Edit</button>
      <Link to="/invoices">back</Link>
      <h1>Invoice #{params.invoiceId}</h1>
    </div>
  );
};

export default InvoiceDetail;
