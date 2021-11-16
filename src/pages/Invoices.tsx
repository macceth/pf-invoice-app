import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import React, { useEffect, useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoicesData } from "../store/invoice-action";
import Page from "../components/Page";

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
                {showFilter && (
                  <div className="absolute w-full bg-white dark:bg-app-dark-5 rounded-sm z-10">
                    <div
                      onClick={() => clickFilter("draft")}
                      className="my-2 mx-4 rounded-sm text-gray-800 dark:text-gray-200 hover:font-bold cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="appearance-none rounded-sm bg-transparent checked:bg-purple mr-2 checked:border-transparent"
                        checked={filter.includes("draft")}
                        onChange={() => clickFilter("draft")}
                      />{" "}
                      Draft
                    </div>
                    <div
                      onClick={() => clickFilter("pending")}
                      className="my-2 mx-4 rounded-sm text-gray-800 dark:text-gray-200 hover:font-bold cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="appearance-none rounded-sm bg-transparent checked:bg-purple mr-2 checked:border-transparent"
                        checked={filter.includes("pending")}
                        onChange={() => clickFilter("pending")}
                      />{" "}
                      Pending
                    </div>
                    <div
                      onClick={() => clickFilter("paid")}
                      className="my-2 mx-4 rounded-sm text-gray-800 dark:text-gray-200 hover:font-bold cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="appearance-none rounded-sm bg-transparent checked:bg-purple mr-2 checked:border-transparent"
                        checked={filter.includes("paid")}
                        onChange={() => clickFilter("paid")}
                      />{" "}
                      Paid
                    </div>
                  </div>
                )}
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
        </div>
      </Page>
    </React.Fragment>
  );
};

export default Invoices;
