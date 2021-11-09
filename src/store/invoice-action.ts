import { invoiceActions } from "./invoice-slice";
import type { AppDispatch } from ".";
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
