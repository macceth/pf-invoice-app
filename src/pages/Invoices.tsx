import { Link } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useState } from "react";

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  return (
    <div>
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.CREATE} />}
      <h1>Invoices</h1>
      <button onClick={showInvoiceForm}>new</button>
      <Link to="/invoices/1">
        <div>Invoice #1</div>
      </Link>
      <Link to="/invoices/2">
        <div>Invoice #2</div>
      </Link>
    </div>
  );
};

export default Invoices;
