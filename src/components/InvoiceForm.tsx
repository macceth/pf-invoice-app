import { useState, useEffect, useCallback } from "react";
import Input from "./Input";
import Button, { Modes as btnModes } from "./Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchInvoiceItemData } from "../store/invoice-action";
import type { invoiceItemType } from "../models";
import DatePicker from "./DatePicker";

export enum modes {
  CREATE,
  EDIT,
  CREATE_DRAFT,
}

interface InvoiceFormProps {
  setShow: (state: boolean) => void;
  show: boolean;
  mode: modes;
}

const InvoiceForm = ({ setShow, show, mode }: InvoiceFormProps) => {
  const [streetAdress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreetAddress, setClientStreetAddress] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostcode, setClientPostcode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<invoiceItemType[]>([]);
  const [createAt, setCreateAt] = useState("");

  const { invoiceId } = useParams<{ invoiceId: string }>();

  const invoiceStoreItem = useAppSelector((state) => state.invoice.invoiceItem);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (invoiceId) dispatch(fetchInvoiceItemData(invoiceId));
  }, [dispatch, invoiceId]);

  const loadDataForEdit = useCallback(() => {
    if (invoiceStoreItem) {
      setStreetAddress(invoiceStoreItem.senderAddress.street);
      setCity(invoiceStoreItem.senderAddress.city);
      setPostcode(invoiceStoreItem.senderAddress.postCode);
      setCountry(invoiceStoreItem.senderAddress.country);
      setClientName(invoiceStoreItem.clientName);
      setClientEmail(invoiceStoreItem.clientEmail);
      setClientStreetAddress(invoiceStoreItem.clientAddress.street);
      setClientCity(invoiceStoreItem.clientAddress.city);
      setClientPostcode(invoiceStoreItem.clientAddress.postCode);
      setClientCountry(invoiceStoreItem.clientAddress.country);
      setInvoiceItems(invoiceStoreItem.items);
      setProjectDescription(invoiceStoreItem.description);
      setCreateAt(invoiceStoreItem.createdAt);
    }
  }, [invoiceStoreItem]);

  useEffect(() => {
    if ((mode === modes.CREATE_DRAFT || mode === modes.EDIT) && invoiceStoreItem) {
      loadDataForEdit();
    }
  }, [invoiceStoreItem, loadDataForEdit, mode]);

  let title = "";
  if (mode === modes.CREATE || mode === modes.CREATE_DRAFT) {
    title = "New Invoice";
  } else {
    title = "Edit #" + invoiceId;
  }

  const saveDraft = () => {
    console.log(streetAdress);
  };

  const removeInvoiceItem = (index: number) => {
    let newInvoiceItems = invoiceItems.filter((item, id) => id !== index);
    setInvoiceItems(newInvoiceItems);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { name: "", price: 0, quantity: 0, total: 0 }]);
  };

  const discard = () => {
    setShow(false);
    if ((mode === modes.CREATE_DRAFT || mode === modes.EDIT) && invoiceStoreItem) {
      loadDataForEdit();
    }
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
                <Input name="Post Code" value={postcode} setValue={setPostcode} />
                <Input className=" col-span-2 sm:col-span-1" name="Country" value={country} setValue={setCountry} />
              </div>
              {/* ----------------------------------------- */}
              <p className="text-md mt-10 text-purple font-bold">Bill To</p>
              <Input name="Client's Name" value={clientName} setValue={setClientName} />
              <Input name="Client's Email" value={clientEmail} setValue={setClientEmail} />
              <Input name="Street Address" value={clientStreetAddress} setValue={setClientStreetAddress} />
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                <Input className="" name="City" value={clientCity} setValue={setClientCity} />
                <Input className="" name="Post Code" value={clientPostcode} setValue={setClientPostcode} />
                <Input className=" col-span-2 sm:col-span-1" name="Country" value={clientCountry} setValue={setClientPostcode} />
              </div>
              {/* ----------------------------------------- */}
              <DatePicker dateVal={createAt} setDateVal={setCreateAt} label="Invoice Date" />
              <Input name="Project Description" value={projectDescription} setValue={setProjectDescription} />
              <h2 className="mt-20 text-2xl font-bold text-gray-600 dark:text-gray-400">Item List</h2>
              {ItemList}
              <Button mode={btnModes.NewItem} onClick={() => addInvoiceItem()}></Button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-app-dark-4 shadow-2xl fixed bottom-0 w-full max-w-3xl h-24 md:rounded-br-3xl flex justify-between px-8">
          <div>
            <Button
              mode={btnModes.Discard}
              onClick={() => {
                discard();
              }}
            ></Button>
          </div>
          <div>
            <Button
              mode={btnModes.SaveAsDraft}
              onClick={() => {
                saveDraft();
              }}
            ></Button>
          </div>
        </div>
      </form>
      <div
        className={
          "fixed z-10 inset-0 bg-gray-900 w-screen h-screen transition-opacity duration-300 " +
          (show ? " opacity-60 translate-x-0 left-0 " : " opacity-0 -left-full")
        }
      ></div>
    </div>
  );
};

export default InvoiceForm;
