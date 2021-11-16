import { invoiceActions } from "./invoice-slice";
import type { AppDispatch, RootState } from ".";
import { invoiceType } from "../models";
import axios from "axios";

export const fetchInvoicesData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const localData = localStorage.getItem("data");
      if (localData) {
        const data = JSON.parse(localData);
        dispatch(invoiceActions.replaceInvoices({ invoices: data }));
      } else {
        const response = await axios.get(process.env.PUBLIC_URL + "/assets/data.json");
        localStorage.setItem("data", JSON.stringify(response.data));
        dispatch(invoiceActions.replaceInvoices({ invoices: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchInvoiceItemData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data: invoiceType[] | undefined;
      const localData = localStorage.getItem("data");
      if (localData) {
        data = JSON.parse(localData);
      } else {
        const response = await axios.get(process.env.PUBLIC_URL + "/assets/data.json");
        data = response.data;
      }
      const dataResult = data ? data.find((item) => item.id === id) : null;
      dispatch(invoiceActions.replaceInvoiceItem({ invoiceItem: dataResult }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteInvoiceItem = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentInvoicesData = getState().invoice.invoices;
      const newInvoicesData = currentInvoicesData.filter((item) => item.id !== id);
      localStorage.setItem("data", JSON.stringify(newInvoicesData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const markAsPaid = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentInvoicesData = getState().invoice.invoices;
      const newInvoicesData = currentInvoicesData.map((item) => ({ ...item, status: item.id === id ? "paid" : item.status }));
      localStorage.setItem("data", JSON.stringify(newInvoicesData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveEdit = (id: string, data: invoiceType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentInvoicesData = getState().invoice.invoices;
      const newInvoicesData = currentInvoicesData.map((item) => {
        if (item.id === id) return data;
        return item;
      });
      console.log(newInvoicesData);
      localStorage.setItem("data", JSON.stringify(newInvoicesData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewInvoice = (data: invoiceType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentInvoicesData = getState().invoice.invoices;
      const newInvoicesData = [...currentInvoicesData, data];
      console.log(newInvoicesData);
      localStorage.setItem("data", JSON.stringify(newInvoicesData));
    } catch (error) {
      console.log(error);
    }
  };
};
