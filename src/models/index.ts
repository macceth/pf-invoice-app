export interface invoiceItemType {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface invoiceType {
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
  items: invoiceItemType[];
}

export const defaultInvoice = {
  id: "",
  clientName: "",
  clientEmail: "",
  createdAt: "",
  paymentDue: "",
  total: 0,
  status: "",
  description: "",
  paymentTerms: 0,
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
};
