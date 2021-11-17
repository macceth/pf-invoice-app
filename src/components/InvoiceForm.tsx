import { useState, useEffect, useCallback } from "react";
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
  const [streetAdress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreetAddress, setClientStreetAddress] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<invoiceItemType[]>([]);
  const [createAt, setCreateAt] = useState(moment().format("YYYY-MM-DD"));
  const [paymentTerm, setPaymentTerm] = useState(0);

  let { invoiceId } = useParams<{ invoiceId: string }>();
  if (mode === modes.CREATE_DRAFT && darftId) invoiceId = darftId;

  const invoiceStoreItem = useAppSelector((state) => state.invoice.invoiceItem);
  const invoiceDataItem = invoiceId ? invoiceStoreItem : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (invoiceId) dispatch(fetchInvoiceItemData(invoiceId));
  }, [dispatch, invoiceId]);

  const loadDataForEdit = useCallback(() => {
    if (invoiceDataItem) {
      setStreetAddress(invoiceDataItem.senderAddress.street);
      setCity(invoiceDataItem.senderAddress.city);
      setPostCode(invoiceDataItem.senderAddress.postCode);
      setCountry(invoiceDataItem.senderAddress.country);
      setClientName(invoiceDataItem.clientName);
      setClientEmail(invoiceDataItem.clientEmail);
      setClientStreetAddress(invoiceDataItem.clientAddress.street);
      setClientCity(invoiceDataItem.clientAddress.city);
      setClientPostCode(invoiceDataItem.clientAddress.postCode);
      setClientCountry(invoiceDataItem.clientAddress.country);
      setInvoiceItems(invoiceDataItem.items);
      setProjectDescription(invoiceDataItem.description);
      setCreateAt(invoiceDataItem.createdAt);
      setPaymentTerm(invoiceDataItem.paymentTerms);
    }
  }, [invoiceDataItem]);

  useEffect(() => {
    if ((mode === modes.CREATE_DRAFT || mode === modes.EDIT) && invoiceDataItem) {
      loadDataForEdit();
    }
  }, [invoiceDataItem, loadDataForEdit, mode]);

  let title = "";
  if (mode === modes.CREATE || mode === modes.CREATE_DRAFT) {
    title = "New Invoice";
  } else {
    title = "Edit #" + invoiceId;
  }

  const saveData = async (saveMode: string) => {
    let NewInvoiceDataItem: invoiceType = defaultInvoice;
    if (invoiceDataItem && invoiceDataItem.clientAddress && invoiceDataItem.senderAddress) {
      NewInvoiceDataItem = {
        ...invoiceDataItem,
        clientAddress: { ...invoiceDataItem.clientAddress },
        senderAddress: { ...invoiceDataItem.senderAddress },
      };
    }

    NewInvoiceDataItem.senderAddress.street = streetAdress;
    NewInvoiceDataItem.senderAddress.city = city;
    NewInvoiceDataItem.senderAddress.postCode = postCode;
    NewInvoiceDataItem.senderAddress.country = country;

    NewInvoiceDataItem.clientName = clientName;
    NewInvoiceDataItem.clientEmail = clientEmail;
    NewInvoiceDataItem.clientAddress.street = clientStreetAddress;
    NewInvoiceDataItem.clientAddress.city = clientCity;
    NewInvoiceDataItem.clientAddress.postCode = clientPostCode;
    NewInvoiceDataItem.clientAddress.country = clientCountry;

    NewInvoiceDataItem.description = projectDescription;
    NewInvoiceDataItem.createdAt = createAt;
    NewInvoiceDataItem.paymentTerms = paymentTerm;
    NewInvoiceDataItem.items = invoiceItems;

    NewInvoiceDataItem.total = invoiceItems.reduce((sum, item) => item.total + sum, 0);

    const newPaymentDue = moment(createAt, "YYYY-MM-DD").add(paymentTerm, "days").format("YYYY-MM-DD");
    NewInvoiceDataItem.paymentDue = newPaymentDue;

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
    await saveData("saveEdit");
  };

  const saveAndSend = async () => {
    await saveData("saveAndSend");
  };

  const saveDraft = async () => {
    await saveData("saveDraft");
  };

  const removeInvoiceItem = (index: number) => {
    let newInvoiceItems = invoiceItems.filter((item, id) => id !== index);
    setInvoiceItems(newInvoiceItems);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { name: "", price: 0, quantity: 0, total: 0 }]);
  };

  const discard = () => {
    if (mode === modes.EDIT && invoiceDataItem) {
      loadDataForEdit();
    } else if (mode === modes.CREATE_DRAFT && darftId && invoiceDataItem) {
      dispatch(deleteInvoiceItem(darftId));
      reload();
    }
    setShow(false);
  };

  const saveInvoiceItem = ({
    index,
    name,
    price,
    quantity,
    field,
  }: {
    index: number;
    name?: string;
    price?: string;
    quantity?: string;
    field: string;
  }) => {
    let newInvoiceItems = [...invoiceItems];
    let newInvoiceItem = { ...invoiceItems[index] };
    if (invoiceItems[index]) {
      if (field === "name") newInvoiceItem.name = name ? name : "";
      else if (field === "price") {
        const princeNum = price ? parseFloat(price) : 0;
        newInvoiceItem.price = princeNum;
        newInvoiceItem.total = newInvoiceItem.quantity * princeNum;
      } else if (field === "quantity") {
        const qtyNum = quantity ? parseInt(quantity) : 0;
        newInvoiceItem.quantity = qtyNum;
        newInvoiceItem.total = qtyNum * newInvoiceItem.price;
      }
    }
    newInvoiceItems[index] = newInvoiceItem;
    setInvoiceItems(newInvoiceItems);
  };

  const ItemList = invoiceItems.map((item, index) => (
    <div className="grid grid-cols-10 gap-2" key={index}>
      <Input
        className="col-span-4"
        name="Name"
        value={item.name}
        setValue={(val) => {
          saveInvoiceItem({ index, name: val, field: "name" });
        }}
      />
      <Input
        className="col-span-1"
        name="Qty."
        value={item.quantity.toString()}
        setValue={(val) => {
          saveInvoiceItem({ index, quantity: val, field: "quantity" });
        }}
      />
      <Input
        className="col-span-2"
        name="Price"
        value={item.price.toString()}
        setValue={(val) => {
          saveInvoiceItem({ index, price: val, field: "price" });
        }}
      />
      <Input className="col-span-2" name="Total" readonly={true} value={item.total.toString()} setValue={(val) => {}} />
      <button className="items-center mt-11 rounded-full hover:bg-red-500 w-8 h-8" onClick={() => removeInvoiceItem(index)}>
        <img src={process.env.PUBLIC_URL + "/assets/icon-delete.svg"} className="ml-2" alt="icon-delete" />
      </button>
    </div>
  ));

  const PAYMENT_TERMS = [
    { text: "7 days", value: 7 },
    { text: "15 days", value: 15 },
    { text: "30 days", value: 30 },
  ];

  return (
    <div>
      <form
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
              <p className="text-md mt-10 text-purple font-bold mx-2">Bill From</p>
              <Input name="Street Address" value={streetAdress} setValue={setStreetAddress} />
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                <Input name="City" value={city} setValue={setCity} />
                <Input name="Post Code" value={postCode} setValue={setPostCode} />
                <Input className=" col-span-2 sm:col-span-1" name="Country" value={country} setValue={setCountry} />
              </div>
              {/* ----------------------------------------- */}
              <p className="text-md mt-10 text-purple font-bold">Bill To</p>
              <Input name="Client's Name" value={clientName} setValue={setClientName} />
              <Input name="Client's Email" value={clientEmail} setValue={setClientEmail} />
              <Input name="Street Address" value={clientStreetAddress} setValue={setClientStreetAddress} />
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                <Input className="" name="City" value={clientCity} setValue={setClientCity} />
                <Input className="" name="Post Code" value={clientPostCode} setValue={setClientPostCode} />
                <Input className=" col-span-2 sm:col-span-1" name="Country" value={clientCountry} setValue={setClientPostCode} />
              </div>
              {/* ----------------------------------------- */}
              <div className="grid grid-cols-2 gap-5 mt-6">
                <DatePicker className=" col-span-1" dateVal={createAt} setDateVal={setCreateAt} label="Invoice Date" />
                <Select label="Payment Terms" items={PAYMENT_TERMS} itemName="text" itemValue="value" value={paymentTerm} setValue={setPaymentTerm} />
              </div>
              <Input name="Project Description" value={projectDescription} setValue={setProjectDescription} />
              <h2 className="mt-10 text-2xl font-bold text-gray-600 dark:text-gray-400">Item List</h2>
              {ItemList}
              <Button mode={btnModes.NewItem} onClick={() => addInvoiceItem()}></Button>
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
      </form>
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
