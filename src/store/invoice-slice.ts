import { createSlice } from "@reduxjs/toolkit";
import { invoiceType } from "../models";

const initialInvoices: invoiceType[] = [];

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: initialInvoices,
    invoiceItem: null as invoiceType | null,
  },
  reducers: {
    replaceInvoices(state, action) {
      state.invoices = action.payload.invoices;
    },
    replaceInvoiceItem(state, action) {
      state.invoiceItem = action.payload.invoiceItem;
    },
  },
});

export const invoiceActions = invoiceSlice.actions;

export default invoiceSlice;
