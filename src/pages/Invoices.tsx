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
    <div className="flex flex-col items-center w-screen">
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.CREATE} />}
      <h1 className="text-xl font-bold color-red-500">Invoices</h1>
      <button onClick={showInvoiceForm}>new</button>

      {data.map((item) => (
        <Link to={"/invoices/" + item.id} key={item.id}>
          <div>
            {item.id}: {item.description}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Invoices;
