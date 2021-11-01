import { Link } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useState } from "react";

import data from "../data.json";

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

      {data.map((item) => (
        <Link to={"/invoices/" + item.id}>
          <div>
            {item.id}: {item.description}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Invoices;
