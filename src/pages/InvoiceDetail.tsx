import { Link, useParams } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import React, { useEffect, useState } from "react";
import InvoiceStatus from "../components/InvoiceStatus";
import { useAppDispatch, useAppSelector } from "../hooks";
import moment from "moment";

import Button, { Modes } from "../components/Button";
import Page from "../components/Page";
import BottomButtonGroup from "../components/BottomButtonGroup";
import { fetchInvoiceItemData } from "../store/invoice-action";
import ItemList from "../components/ItemList";

const InvoiceDetail = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const invoiceStoreItem = useAppSelector((state) => state.invoice.invoiceItem);
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const dispatch = useAppDispatch();

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  useEffect(() => {
    if (invoiceId) dispatch(fetchInvoiceItemData(invoiceId));
  }, [dispatch, invoiceId]);

  const markAsPaid = () => {};

  const Edit = () => {
    showInvoiceForm();
  };

  const invoiceItem = invoiceStoreItem && invoiceStoreItem.id === invoiceId ? invoiceStoreItem : null;

  const buttonGroup = (
    <React.Fragment>
      <Button onClick={Edit} mode={Modes.Edit} />
      <Button onClick={Edit} mode={Modes.Delete} />
      <Button onClick={markAsPaid} mode={Modes.MarkAsPaid} />
    </React.Fragment>
  );

  const createDateString = invoiceItem ? moment(invoiceItem.createdAt).format("DD MMM YYYY") : "";
  const dueDateString = invoiceItem ? moment(invoiceItem.paymentDue).format("DD MMM YYYY") : "";

  return (
    <Page className="pb-16 sm:pb-0">
      <div className="container max-w-5xl pt-10 mx-auto">
        <Link to="/invoices">
          <button className="flex items-center mb-10">
            <img className="mr-5" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="icon-arrow-left" />
            <span className="text-gray-800 dark:text-white font-bold">Go Back</span>
          </button>
        </Link>
        {invoiceItem && (
          <React.Fragment>
            <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 mx-auto flex justify-between">
              <div className="flex items-center dark:text-gray-400">
                Status <InvoiceStatus status={invoiceItem.status} className="ml-3" />
              </div>
              <div className="hidden sm:block">{buttonGroup}</div>
            </div>

            <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 mt-6 flex-col justify-between">
              <div className="grid grid-cols-2 justify-between items-center flex-1">
                <div className="mt-3 col-span-2 sm:col-span-1">
                  <div className="text-2xl dark:text-white">
                    #<span className=" font-bold">{invoiceItem.id}</span>
                  </div>
                  <p className="mt-2 text-gray-500">{invoiceItem.description}</p>
                </div>
                <div className="mt-12 sm:mt-6 col-span-2 sm:col-span-1 flex sm:justify-end justify-start">
                  <div className="mr-5 text-gray-500">
                    <p>{invoiceItem.senderAddress.street}</p>
                    <p>{invoiceItem.senderAddress.city}</p>
                    <p>{invoiceItem.senderAddress.postCode}</p>
                    <p>{invoiceItem.senderAddress.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3">
                <div className="flex-1">
                  <div>
                    <p className="text-md text-gray-500 dark:text-gray-200">invoice Date</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{createDateString}</p>
                  </div>
                  <div className="mt-10">
                    <p className="text-md text-gray-500 dark:text-gray-200">Payment Due</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{dueDateString}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-md text-gray-500 dark:text-gray-200">Bill To</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{invoiceItem.clientName}</p>
                  <p className="text-md text-gray-500 dark:text-gray-200">{invoiceItem.clientAddress.street}</p>
                  <p className="text-md text-gray-500 dark:text-gray-200">{invoiceItem.clientAddress.city}</p>
                  <p className="text-md text-gray-500 dark:text-gray-200">{invoiceItem.clientAddress.postCode}</p>
                  <p className="text-md text-gray-500 dark:text-gray-200">{invoiceItem.clientAddress.country}</p>
                </div>
                <div className="flex-1.5 mt-10 sm:mt-0">
                  <p className="text-md text-gray-500 dark:text-gray-200">Sent To</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{invoiceItem.clientEmail}</p>
                </div>
              </div>

              <ItemList itemList={invoiceItem.items} total={invoiceItem.total} />
            </div>

            <div className="flex justify-between mb-14">
              {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.EDIT} />}
            </div>

            <BottomButtonGroup>{buttonGroup}</BottomButtonGroup>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};

export default InvoiceDetail;
