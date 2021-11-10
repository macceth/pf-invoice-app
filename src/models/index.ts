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
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ];
};