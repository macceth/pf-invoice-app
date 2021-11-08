import { Link, useParams } from "react-router-dom";
import InvoiceForm, { modes } from "../components/InvoiceForm";
import { useEffect, useState } from "react";
import InvoiceStatus from "../components/InvoiceStatus";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, onSnapshot, where } from "firebase/firestore";

import Button, { Modes } from "../components/Button";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

initializeApp(firebaseConfig);
const db = getFirestore();

const defaultInvoice: any = null;

const InvoiceDetail = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const [invoice, setInvoice] = useState(defaultInvoice);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  const { invoiceId } = useParams<{ invoiceId: string }>();

  useEffect(() => {
    const q = query(collection(db, "invoices"), where("id", "==", invoiceId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data: any;
      querySnapshot.forEach((doc) => {
        data = doc.data();
      });
      setInvoice(data);
    });
    return () => unsub();
  }, [invoiceId]);

  const markAsPaid = () => {};

  const Edit = () => {
    showInvoiceForm();
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen mx-3 overflow-y-scroll">
      {invoice && (
        <div className="container max-w-5xl pt-10 mx-auto">
          <Link to="/invoices">
            <button className="flex items-center mb-10">
              <img className="mr-5" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="icon-arrow-left" />
              <span className="text-gray-800 dark:text-white font-bold">Go Back</span>
            </button>
          </Link>

          <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 mx-auto flex justify-between">
            <div className="flex items-center dark:text-gray-400">
              Status <InvoiceStatus status={invoice.status} className="ml-3" />
            </div>
            <div>
              <Button onClick={Edit} mode={Modes.Edit} />
              <Button onClick={Edit} mode={Modes.Delete} />
              <Button onClick={markAsPaid} mode={Modes.MarkAsPaid} />
            </div>
          </div>

          <div className="bg-white dark:bg-app-dark-3 rounded-md shadow-md p-5 mt-6 flex-col justify-between">
            <div className="flex justify-between items-center flex-1">
              <div>
                <div className="text-2xl dark:text-white">
                  #<span className=" font-bold">{invoice.id}</span>
                </div>
                <p className="mt-3 text-gray-500">{invoice.description}</p>
              </div>
              <div className="text-gray-500">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>

            <div className="mt-6 flex">
              <div className="flex-1">
                <div>
                  <p className="text-md text-gray-800 dark:text-gray-200">invoice Date</p>
                </div>
                <div>Payment Due</div>
              </div>
              <div className="flex-1">Bill To</div>
              <div className="flex-1.5">Sent To</div>
            </div>
          </div>

          <div className="flex justify-between mb-14">
            {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.EDIT} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
