import { createSlice } from "@reduxjs/toolkit";

type invoiceType = {
  id: string;
  clientName: string;
  paymentDue: string;
  total: number;
  status: string;
}

 const initialInvoices: invoiceType[] = []; 

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: initialInvoices,
  },
  reducers: {
    replaceInvoices(state, action) {
      state.invoices = action.payload.invoices;
    },
  },
});

export const invoiceActions = invoiceSlice.actions;

export default invoiceSlice;
