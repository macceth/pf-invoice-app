import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import React, { useEffect, useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoicesData } from "../store/invoice-action";
import Page from "../components/Page";

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const [darftId, setDraftId] = useState("");
  const [showCreateDraftInvoice, setShowInvoiceDraftForm] = useState(false);
  const invoices = useAppSelector((state) => state.invoice.invoices);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoicesData());
  }, [dispatch]);

  const reload = async () => {
    dispatch(fetchInvoicesData());
  };

  const openEditDraft = (id: string) => {
    setDraftId(id);
    setShowInvoiceDraftForm(true);
  };

  const openNewInvoicePanel = () => {
    setShowInvoiceForm(true);
  };

  return (
    <React.Fragment>
      <InvoiceForm mode={modes.CREATE_DRAFT} darftId={darftId} show={showCreateDraftInvoice} setShow={setShowInvoiceDraftForm} reload={reload} />
      <InvoiceForm mode={modes.CREATE} show={showCreateInvoice} setShow={setShowInvoiceForm} reload={reload} />
      <Page>
        <div className="container max-w-5xl pt-10 mx-auto">
          <div className="flex justify-between mb-14">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Invoices</h1>
              <h3 className="text-sm mt-3 text-gray-600 dark:text-white">There are {invoices.length} total invoices</h3>
            </div>
            <div>
              <button className="mr-5 text-gray-600 dark:text-white">
                Filter by status <img className="inline-block" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="icon-arrow-down" />
              </button>
              <Button onClick={() => openNewInvoicePanel()} mode={buttonModes.NewInvoice} />
            </div>
          </div>

          {invoices.map((item) => (
            <InvoiceItem
              openEditDraft={openEditDraft}
              id={item.id}
              clientName={item.clientName}
              paymentDue={item.paymentDue}
              key={item.id}
              total={item.total}
              status={item.status}
            />
          ))}
        </div>
      </Page>
    </React.Fragment>
  );
};

export default Invoices;
