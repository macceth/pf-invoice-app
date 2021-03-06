import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import React, { useEffect, useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoicesData } from "../store/invoice-action";
import Page from "../components/Page";
import { capitalize } from "../helper";

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);
  const [darftId, setDraftId] = useState("");
  const [showCreateDraftInvoice, setShowInvoiceDraftForm] = useState(false);
  const invoices = useAppSelector((state) => state.invoice.invoices);

  const showAllType = filter.length === 0;

  const filteredInvoices = showAllType ? invoices : invoices.filter((invoice) => filter.includes(invoice.status));

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

  const clickFilter = (item: string) => {
    if (filter.includes(item)) setFilter(filter.filter((filterItem) => filterItem !== item));
    else setFilter([...filter, item]);
  };

  const filterRender = (filterName: string) => (
    <div onClick={() => clickFilter(filterName)} className="my-2 mx-4 rounded-sm text-gray-800 dark:text-gray-200 hover:font-bold cursor-pointer">
      <input
        type="checkbox"
        className="appearance-none rounded-sm bg-transparent checked:bg-purple mr-2 checked:border-transparent"
        checked={filter.includes(filterName)}
      />
      {" " + capitalize(filterName)}
    </div>
  );

  const filters = (
    <div className="absolute w-full bg-white dark:bg-app-dark-5 rounded-sm z-10">
      {filterRender("draft")}
      {filterRender("pending")}
      {filterRender("paid")}
    </div>
  );

  return (
    <React.Fragment>
      <InvoiceForm mode={modes.CREATE_DRAFT} darftId={darftId} show={showCreateDraftInvoice} setShow={setShowInvoiceDraftForm} reload={reload} />
      <InvoiceForm mode={modes.CREATE} show={showCreateInvoice} setShow={setShowInvoiceForm} reload={reload} />
      <Page>
        <div className="container max-w-5xl pt-10 mx-auto">
          <div className="flex justify-between mb-14">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Invoices</h1>
              <h3 className="text-sm mt-3 text-gray-600 dark:text-white">
                {filteredInvoices.length === 0 ? "No " : `There are ${filteredInvoices.length} `}
                {showAllType && filteredInvoices.length !== 0 && " total "}
                {filter.includes("paid") && " paid, "}
                {filter.includes("pending") && " pending, "}
                {filter.includes("draft") && " draft, "}
                Invoices
              </h3>
            </div>
            <div className="flex items-center">
              {showFilter && <div className=" bg-transparent absolute w-screen h-screen inset-0" onClick={() => setshowFilter(false)}></div>}
              <div className="relative">
                <button className="mr-5 text-gray-600 dark:text-white" onClick={() => setshowFilter(!showFilter)}>
                  Filter by status <img className="inline-block" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="icon-arrow-down" />
                </button>
                {showFilter && filters}
              </div>
              <Button onClick={() => openNewInvoicePanel()} mode={buttonModes.NewInvoice} />
            </div>
          </div>

          {filteredInvoices.map((item) => (
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
          {filteredInvoices.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full max-w-lg flex flex-col justify-center items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/illustration-empty.svg"}
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg"
                  alt="no invoice"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">There is nothing here</h2>
                <h3 className="mt-10 text-gray-800 dark:text-white">
                  Create an invoice by clicking the <b>New</b> button and get started
                </h3>
              </div>
            </div>
          )}
        </div>
      </Page>
    </React.Fragment>
  );
};

export default Invoices;
