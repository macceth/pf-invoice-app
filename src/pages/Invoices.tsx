import InvoiceForm, { modes } from "../components/InvoiceForm";
import Button, { Modes as buttonModes } from "../components/Button";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";

import InvoiceItem from "../components/InvoiceItem";

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

const Invoices = () => {
  const [showCreateInvoice, setShowInvoiceForm] = useState(false);
  const defaultInvoices: any[] = [];
  const [invoices, setInvoices] = useState(defaultInvoices);

  const showInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  useEffect(() => {
    const q = query(collection(db, "invoices"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setInvoices(data);
    });
    return () => unsub();
  }, []);

  return (
    <React.Fragment>
      {showCreateInvoice && <InvoiceForm setShowInvoiceForm={setShowInvoiceForm} mode={modes.CREATE} />}
      <div className="flex flex-col items-center w-screen h-screen mx-3 overflow-y-scroll">
        <div className="container max-w-5xl pt-10 mx-auto">
          <div className="flex justify-between mb-14">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Invoices</h1>
              <h3 className="text-sm mt-3 text-gray-600 dark:text-white">There are ... total invoices</h3>
            </div>
            <div>
              <button className="mr-5 text-gray-600 dark:text-white">
                Filter by status <img className="inline-block" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="icon-arrow-down" />
              </button>
              <Button onClick={showInvoiceForm} mode={buttonModes.NewInvoice} />
            </div>
          </div>

          {invoices.map((item) => (
            <InvoiceItem
              id={item.id}
              clientName={item.clientName}
              paymentDue={item.paymentDue}
              key={item.id}
              total={item.total}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invoices;
