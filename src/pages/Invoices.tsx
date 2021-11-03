import { Link } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
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
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Invoices</h1>
      <button onClick={showInvoiceForm}>new</button>

      <Button mode={buttonModes.NewInvoice}/>
      <Button mode={buttonModes.MarkAsPaid}/>
      <Button mode={buttonModes.Edit}/>

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
