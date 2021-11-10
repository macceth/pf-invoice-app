import { invoiceActions } from "./invoice-slice";
import type { AppDispatch } from ".";
import { invoiceType } from "../models";
import axios from "axios";

export const fetchInvoicesData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await axios.get(process.env.PUBLIC_URL + "/assets/data.json");
      dispatch(invoiceActions.replaceInvoices({ invoices: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchInvoiceItemData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios.get<invoiceType[]>(process.env.PUBLIC_URL + "/assets/data.json");
      const dataResult = result.data.find((item) => item.id === id);
      dispatch(invoiceActions.replaceInvoiceItem({ invoiceItem: dataResult }));
    } catch (error) {
      console.log(error);
    }
  };
};
