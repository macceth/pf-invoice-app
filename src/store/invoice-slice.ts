import { createSlice } from "@reduxjs/toolkit";

type invoiceType = {
  id: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  paymentDue: string;
  total: number;
  status: string;
  description: string;
  paymentTerms: number;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ];
};

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
