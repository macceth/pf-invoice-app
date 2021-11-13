import { Link } from "react-router-dom";
import moment from "moment";
import InvoiceStatus from "./InvoiceStatus";

interface InvoiceItemProps {
  id: string;
  clientName: string;
  paymentDue: string;
  total: number;
  status: string;
}

const InvoiceItem = (props: InvoiceItemProps) => {
  const dueDateString = moment(props.paymentDue).format("DD MMM YYYY");
  const path = "/invoices/" + (props.status === 'draft' ? 'create/' : '') + props.id

  return (
    <Link to={path}>
      <div className="hidden md:flex bg-white hover:bg-gray-50 dark:bg-app-dark-3 dark:hover:bg-app-dark-4 rounded-md w-auto mb-5 p-7 shadow justify-between items-center">
        <div className="flex-1">
          <span className="text-purple font-bold mr-0.5 text-lg">#</span>
          <span className="font-bold text-gray-800 dark:text-white text-lg">{props.id}</span>
        </div>
        <div className="flex-1.5 text-gray-500 dark:text-gray-200">Due {dueDateString}</div>
        <div className="flex-1.5 text-gray-500 dark:text-gray-200 bg text-left">{props.clientName}</div>
        <div className="flex-1 font-bold text-xl text-right text-black dark:text-gray-200">£{props.total}</div>

        <div className={"flex-1.5 mx-2 flex items-center justify-center "}>
          <InvoiceStatus status={props.status} />
          <img className="ml-2 w-2 h-3" src={process.env.PUBLIC_URL + "/assets/icon-arrow-right.svg"} alt="icon-arrow-right" />
        </div>
      </div>

      <div className="flex-col md:hidden bg-white hover:bg-gray-50 dark:bg-app-dark-3 dark:hover:bg-app-dark-4 rounded-md w-auto mb-5 p-7 shadow justify-between items-center">
        <div className="flex-1 flex items-center justify-between">
          <div>
            <span className="text-purple font-bold mr-0.5 text-lg">#</span>
            <span className="font-bold text-gray-800 dark:text-white text-lg">{props.id}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-200 bg text-right">{props.clientName}</div>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="mt-6">
            <div className="text-gray-500 dark:text-gray-200">Due {dueDateString}</div>
            <div className="text-black dark:text-gray-200 font-bold text-xl text-left">£{props.total}</div>
          </div>
          <InvoiceStatus status={props.status} className="mx-2 mt-4" />
        </div>
      </div>
    </Link>
  );
};

export default InvoiceItem;
