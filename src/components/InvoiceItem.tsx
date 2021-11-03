import { Link } from "react-router-dom";
import moment from "moment";

interface InvoiceItemProps {
  id: string;
  clientName: string;
  paymentDue: string;
  total: number;
  status: string;
}

const InvoiceItem = (props: InvoiceItemProps) => {
  const dueDateString = moment(props.paymentDue).format("DD MMM YYYY");

  const statusText = props.status[0].toUpperCase() + props.status.substring(1);

  let statusClass = "text-center p-3 w-36 rounded-xl";
  if (props.status === "paid") statusClass += " bg-green-50 text-green-500";
  if (props.status === "pending") statusClass += " bg-yellow-50 text-yellow-500";
  if (props.status === "draft") statusClass += " bg-gray-50 text-gray-500";

  return (
    <Link to={"/invoices/" + props.id}>
      <div className="hidden md:flex bg-white hover:bg-gray-50 dark:bg-app-dark-3 dark:hover:bg-app-dark-4 rounded-md w-auto mb-5 p-7 shadow justify-between items-center">
        <div className="flex-1">
          <span className="text-purple font-bold mr-0.5 text-lg">#</span>
          <span className="font-bold text-gray-800 dark:text-white text-lg">{props.id}</span>
        </div>
        <div className="flex-1.5 text-gray-500 dark:text-gray-200">Due {dueDateString}</div>
        <div className="flex-1.5 text-gray-500 dark:text-gray-200 bg text-left">{props.clientName}</div>
        <div className="flex-1 font-bold text-xl text-right text-black dark:text-gray-200">£{props.total}</div>
        <div className="flex-1.5 mx-2 flex items-center justify-center">
          <div className={statusClass}>⬤ {statusText}</div>
          <img className="ml-2 w-2 h-3" src={process.env.PUBLIC_URL + "/assets/icon-arrow-right.svg"} alt="icon-arrow-right" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:hidden bg-white hover:bg-gray-50 dark:bg-app-dark-3 dark:hover:bg-app-dark-4 rounded-md w-auto mb-5 p-7 shadow justify-between items-center">
        <div className="">
          <span className="text-purple font-bold mr-0.5 text-lg">#</span>
          <span className="font-bold text-gray-800 dark:text-white text-lg">{props.id}</span>
        </div>
        <div className="text-gray-500 dark:text-gray-200 bg text-right">{props.clientName}</div>
        <div className="mt-6">
          <div className="text-gray-500 dark:text-gray-200">Due {dueDateString}</div>
          <div className="text-black dark:text-gray-200 font-bold text-xl text-left">£{props.total}</div>
        </div>
        <div className="mx-2 mt-4 flex items-center justify-end">
          <div className={statusClass}>⬤ {statusText}</div>
          <img className="ml-2 w-2 h-3" src={process.env.PUBLIC_URL + "/assets/icon-arrow-right.svg"} alt="icon-arrow-right" />
        </div>
      </div>
    </Link>
  );
};

export default InvoiceItem;
