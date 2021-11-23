import { useState, useEffect, useCallback, useRef } from "react";
import Input from "./Input";
import Button, { Modes as btnModes } from "./Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoiceItemData, saveEdit as saveEditToServer, addNewInvoice, deleteInvoiceItem } from "../store/invoice-action";
import type { invoiceItemType, invoiceType } from "../models";
import { defaultInvoice } from "../models";
import DatePicker from "./DatePicker";
import moment from "moment";
import Select from "./Select";
import { generateRandomString } from "../helper";
import { Formik, Form, FormikHelpers, FormikProps, FieldArray } from "formik";
import * as Yup from "yup";
import { log } from "console";

export enum modes {
  CREATE,
  EDIT,
  CREATE_DRAFT,
}

interface InvoiceFormProps {
  setShow: (state: boolean) => void;
  show: boolean;
  mode: modes;
  reload: () => void;
  darftId?: string;
}

const InvoiceForm = ({ setShow, show, mode, reload, darftId }: InvoiceFormProps) => {
  const formikRef = useRef<FormikProps<invoiceType>>(null);

  let { invoiceId } = useParams<{ invoiceId: string }>();
  if (mode === modes.CREATE_DRAFT && darftId) invoiceId = darftId;

  const invoiceStoreItem = useAppSelector((state) => state.invoice.invoiceItem);

  const invoiceDataItem = invoiceId ? invoiceStoreItem : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (invoiceId) dispatch(fetchInvoiceItemData(invoiceId));
  }, [dispatch, invoiceId]);

  let title = "";
  if (mode === modes.CREATE) {
    title = "New Invoice";
  } else if (mode === modes.CREATE_DRAFT) {
    title = `New Invoice (Edit Draft: #${darftId})`;
  } else {
    title = "Edit #" + invoiceId;
  }

  const saveData = async (saveMode: string, data: invoiceType) => {
    let NewInvoiceDataItem: invoiceType = defaultInvoice;
    if (invoiceDataItem && invoiceDataItem.clientAddress && invoiceDataItem.senderAddress) {
      NewInvoiceDataItem = {
        ...invoiceDataItem,
        clientAddress: { ...invoiceDataItem.clientAddress },
        senderAddress: { ...invoiceDataItem.senderAddress },
      };
    }

    // NewInvoiceDataItem.senderAddress.street = streetAdress;
    // NewInvoiceDataItem.senderAddress.city = city;
    // NewInvoiceDataItem.senderAddress.postCode = postCode;
    // NewInvoiceDataItem.senderAddress.country = country;

    // NewInvoiceDataItem.clientName = clientName;
    // NewInvoiceDataItem.clientEmail = clientEmail;
    // NewInvoiceDataItem.clientAddress.street = clientStreetAddress;
    // NewInvoiceDataItem.clientAddress.city = clientCity;
    // NewInvoiceDataItem.clientAddress.postCode = clientPostCode;
    // NewInvoiceDataItem.clientAddress.country = clientCountry;

    // NewInvoiceDataItem.description = projectDescription;
    // NewInvoiceDataItem.createdAt = createAt;
    // NewInvoiceDataItem.paymentTerms = paymentTerm;
    // NewInvoiceDataItem.items = invoiceItems;

    // NewInvoiceDataItem.total = invoiceItems.reduce((sum, item) => item.total + sum, 0);

    // const newPaymentDue = moment(createAt, "YYYY-MM-DD").add(paymentTerm, "days").format("YYYY-MM-DD");
    // NewInvoiceDataItem.paymentDue = newPaymentDue;

    if (saveMode === "saveEdit") {
      await dispatch(saveEditToServer(invoiceId, NewInvoiceDataItem));
      reload();
      setShow(false);
    } else if (saveMode === "saveDraft") {
      if (invoiceId) {
        await dispatch(saveEditToServer(invoiceId, NewInvoiceDataItem));
      } else {
        NewInvoiceDataItem.id = generateRandomString(6).toUpperCase();
        NewInvoiceDataItem.status = "draft";
        await dispatch(addNewInvoice(NewInvoiceDataItem));
      }
      reload();
      setShow(false);
    }
    if (saveMode === "saveAndSend") {
      console.log("save and send");
      if (false) {
        NewInvoiceDataItem.status = "pending";
        reload();
        setShow(false);
      }
    }
  };

  const saveEdit = async () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
    // await saveData("saveEdit");
  };

  const saveAndSend = async () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
    // await saveData("saveAndSend");
  };

  const saveDraft = async () => {
    // await saveData("saveDraft");
  };

  const discard = () => {
    if (mode === modes.EDIT && invoiceDataItem) {
      // reset form
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    } else if (mode === modes.CREATE_DRAFT && darftId && invoiceDataItem) {
      dispatch(deleteInvoiceItem(darftId));
      reload();
    }
    setShow(false);
  };

  const submitHandler = (values: invoiceType, { setSubmitting }: FormikHelpers<invoiceType>) => {
    console.log(values);
  };

  const PAYMENT_TERMS = [
    { text: "7 days", value: 7 },
    { text: "15 days", value: 15 },
    { text: "30 days", value: 30 },
  ];

  const defaultValue: invoiceType = {
    id: invoiceDataItem ? invoiceDataItem.id : "",
    clientName: invoiceDataItem ? invoiceDataItem.clientName : "",
    clientEmail: invoiceDataItem ? invoiceDataItem.clientEmail : "",
    description: invoiceDataItem ? invoiceDataItem.description : "",
    senderAddress: {
      street: invoiceDataItem ? invoiceDataItem.senderAddress.street : "",
      city: invoiceDataItem ? invoiceDataItem.senderAddress.city : "",
      postCode: invoiceDataItem ? invoiceDataItem.senderAddress.postCode : "",
      country: invoiceDataItem ? invoiceDataItem.senderAddress.country : "",
    },
    clientAddress: {
      street: invoiceDataItem ? invoiceDataItem.clientAddress.street : "",
      city: invoiceDataItem ? invoiceDataItem.clientAddress.city : "",
      postCode: invoiceDataItem ? invoiceDataItem.clientAddress.postCode : "",
      country: invoiceDataItem ? invoiceDataItem.clientAddress.country : "",
    },
    items: invoiceDataItem ? invoiceDataItem.items : [],
    createdAt: invoiceDataItem ? invoiceDataItem.createdAt : "",
    paymentTerms: invoiceDataItem ? invoiceDataItem.paymentTerms : 0,
    paymentDue: invoiceDataItem ? invoiceDataItem.paymentDue : "",
    total: invoiceDataItem ? invoiceDataItem.total : 0,
    status: invoiceDataItem ? invoiceDataItem.status : "",
  };

  return (
    <div>
      <Formik
        enableReinitialize
        innerRef={formikRef}
        initialValues={defaultValue}
        onSubmit={submitHandler}
        render={({ values, setFieldValue }) => (
          <Form
            className={
              "fixed flex flex-col justify-between z-20 w-screen max-w-3xl top-0 h-screen transition-all translate duration-300 " +
              (show ? " left-0" : " -left-full")
            }
          >
            <div className="bg-white dark:bg-app-dark-4 h-full p-8 md:rounded-r-3xl">
              <div className="h-full pb-24 overflow-y-scroll">
                <div className="mx-2">
                  <h1 className="font-bold text-3xl text-gray-900 dark:text-white">{title}</h1>
                  {/* ----------------------------------------- */}
                  <p className="text-md mt-10 text-purple font-bold mx-2">Bill From {defaultValue.id}</p>
                  <Input label="Street Address" name="senderAddress.street" />
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    <Input label="City" name="senderAddress.city" />
                    <Input label="Post Code" name="senderAddress.postCode" />
                    <Input className=" col-span-2 sm:col-span-1" label="Country" name="senderAddress.country" />
                  </div>
                  {/* ----------------------------------------- */}
                  <p className="text-md mt-10 text-purple font-bold">Bill To</p>
                  <Input label="Client's Name" name="clientName" />
                  <Input label="Client's Email" name="clientEmail" />
                  <Input label="Street Address" name="clientAddress.street" />
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    <Input className="" label="City" name="clientAddress.city" />
                    <Input className="" label="Post Code" name="clientAddress.postCode" />
                    <Input className=" col-span-2 sm:col-span-1" label="Country" name="clientAddress.country" />
                  </div>
                  {/* ----------------------------------------- */}
                  <div className="grid grid-cols-2 gap-5 mt-6">
                    <DatePicker
                      className=" col-span-1"
                      name="createdAt"
                      label="Invoice Date"
                      value={values.createdAt}
                      setValue={(newVal) => {
                        setFieldValue("createdAt", newVal);
                      }}
                    />
                    <Select
                      label="Payment Terms"
                      items={PAYMENT_TERMS}
                      itemName="text"
                      itemValue="value"
                      name="paymentTerms"
                      value={values.paymentTerms}
                      setValue={(newVal) => {
                        setFieldValue("paymentTerms", newVal);
                      }}
                    />
                  </div>
                  <Input label="Project Description" name="description" />
                  <h2 className="mt-10 text-2xl font-bold text-gray-600 dark:text-gray-400">Item List</h2>

                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <div>
                        {values.items.map((item, index) => (
                          <div className="grid grid-cols-10 gap-2" key={index}>
                            <Input className="col-span-4" label="Name" name={`items.${index}.name`} />
                            <Input className="col-span-1" label="Qty." name={`items.${index}.quantity`} />
                            <Input className="col-span-2" label="Price" name={`items.${index}.price`} type="number" />
                            <Input className="col-span-2" label="Total" name={`items.${index}.total`} readonly value={item.price * item.quantity} />
                            <button
                              type="button"
                              className="items-center mt-11 rounded-full hover:bg-red-500 w-8 h-8"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              <img src={process.env.PUBLIC_URL + "/assets/icon-delete.svg"} className="ml-2" alt="icon-delete" />
                            </button>
                          </div>
                        ))}
                        <Button mode={btnModes.NewItem} onClick={() => arrayHelpers.push({ name: "", price: 0, quantity: 0, total: 0 })}></Button>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-app-dark-4 shadow-2xl fixed bottom-0 w-full max-w-3xl h-24 md:rounded-br-3xl flex justify-between px-8 pt-5">
              <div>
                {(mode === modes.CREATE || mode === modes.CREATE_DRAFT) && (
                  <Button
                    mode={btnModes.Discard}
                    onClick={() => {
                      discard();
                    }}
                  ></Button>
                )}
              </div>
              <div>
                {(mode === modes.CREATE || mode === modes.CREATE_DRAFT) && (
                  <Button
                    mode={btnModes.SaveAsDraft}
                    onClick={() => {
                      saveDraft();
                    }}
                  ></Button>
                )}

                {(mode === modes.CREATE || mode === modes.CREATE_DRAFT) && (
                  <Button
                    mode={btnModes.SaveAndSend}
                    onClick={() => {
                      saveAndSend();
                    }}
                  ></Button>
                )}

                {mode === modes.EDIT && (
                  <Button
                    mode={btnModes.Cancel}
                    onClick={() => {
                      discard();
                    }}
                  ></Button>
                )}

                {mode === modes.EDIT && (
                  <Button
                    mode={btnModes.SaveChange}
                    onClick={() => {
                      saveEdit();
                    }}
                  ></Button>
                )}
              </div>
            </div>
          </Form>
        )}
      />
      <div
        onClick={() => {
          setShow(false);
        }}
        className={
          "fixed z-10 inset-0 bg-gray-900 w-screen h-screen transition-opacity duration-300 " +
          (show ? " opacity-60 translate-x-0 left-0 " : " opacity-0 -left-full")
        }
      ></div>
    </div>
  );
};

export default InvoiceForm;
